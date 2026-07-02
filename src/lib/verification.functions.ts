import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { recordAgentEvent } from "@/lib/observability.server";

const VerifyInput = z.object({
  storagePath: z.string().min(1),
  kind: z.enum(["receipt", "inventory", "identity", "location", "delivery", "business_premise", "other"]),
  claimDescription: z.string().min(10).max(500),
  fundingRequestId: z.string().uuid().optional(),
});

const VerifyOutputSchema = z.object({
  verdict: z.enum(["verified", "invalid", "needs_review"]),
  confidence: z.number().min(0).max(1),
  summary: z.string().min(10).max(600),
  findings: z.array(z.string()).min(1).max(8),
  fraud_signals: z.array(z.string()).min(0).max(5),
  recommended_action: z.string().min(5).max(200),
});

export type VerifyOutput = z.infer<typeof VerifyOutputSchema>;

export const analyzeProof = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => VerifyInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // Generate a short-lived signed URL so Gemini can fetch the image
    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from("funding-attachments")
      .createSignedUrl(data.storagePath, 120); // 2-minute TTL
    if (signErr || !signed?.signedUrl) throw new Error("Could not generate signed URL for proof.");

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas Verification Agent. Analyze this proof document/image.

Proof type: ${data.kind}
Applicant's claim: "${data.claimDescription}"
Image URL: ${signed.signedUrl}

Determine:
1. Does the image content match the claimed proof type and description?
2. Are there signs of tampering, screenshot artifacts, or reuse?
3. Is the document authentic and internally consistent (dates, amounts, logos, context)?
4. Does the visual evidence support the funding claim?

Be strict. Real-world finance depends on your accuracy. If you cannot view the image clearly, set verdict to needs_review.`;

    const t0 = Date.now();
    const { object, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: VerifyOutputSchema,
      prompt,
    });
    void recordAgentEvent({
      userId,
      agent: "Verification Agent",
      action: "proof_analysis",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      confidence: object.confidence,
      outcome: object.verdict,
      metadata: { kind: data.kind, fundingRequestId: data.fundingRequestId ?? null },
    });

    // Insert into verification_events — DB trigger auto-recalculates trust_score
    const { data: event, error: evErr } = await supabaseAdmin
      .from("verification_events")
      .insert({
        user_id: userId,
        kind: data.kind,
        status: object.verdict === "verified" ? "verified"
               : object.verdict === "invalid" ? "rejected"
               : "pending",
        evidence_url: signed.signedUrl,
        notes: JSON.stringify({
          confidence: object.confidence,
          summary: object.summary,
          findings: object.findings,
          fraud_signals: object.fraud_signals,
          funding_request_id: data.fundingRequestId ?? null,
        }),
      })
      .select()
      .single();
    if (evErr) throw new Error(evErr.message);

    return { ...object, eventId: event.id };
  });
