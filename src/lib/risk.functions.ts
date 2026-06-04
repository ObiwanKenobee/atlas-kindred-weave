import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const RiskOutputSchema = z.object({
  trust_score: z.number().min(0).max(100),
  risk_level: z.enum(["very_low", "low", "medium", "high", "very_high"]),
  flags: z.array(z.string()).min(0).max(10),
  recommendation: z.enum([
    "approve_large_limit",
    "approve_standard_limit",
    "approve_small_limit",
    "approve_with_conditions",
    "decline",
  ]),
  rationale: z.string().min(20).max(600),
  signals: z.object({
    verified_events: z.number().int(),
    rejected_events: z.number().int(),
    total_funded: z.number(),
    repayment_rate: z.number().min(0).max(1),
    funding_requests_count: z.number().int(),
    approvals_count: z.number().int(),
  }),
});

export type RiskOutput = z.infer<typeof RiskOutputSchema>;

export const computeRiskScore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ targetUserId: z.string().uuid().optional() }).parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    // Reviewers/admins can score any user; otherwise self only
    const targetId = data.targetUserId ?? userId;

    if (targetId !== userId) {
      const { data: roles } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      const elevated = (roles ?? []).some((r) => r.role === "reviewer" || r.role === "admin");
      if (!elevated) throw new Error("Forbidden");
    }

    const [{ data: profile }, { data: verEvents }, { data: fundingReqs }] = await Promise.all([
      supabaseAdmin.from("profiles").select("trust_score, verified, region, display_name").eq("user_id", targetId).single(),
      supabaseAdmin.from("verification_events").select("status, kind, created_at").eq("user_id", targetId).order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.from("funding_requests").select("status, amount_requested, currency, sector, human_approval, created_at").eq("user_id", targetId).order("created_at", { ascending: false }).limit(20),
    ]);

    const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
    const rejected = (verEvents ?? []).filter((e) => e.status === "rejected").length;
    const approvals = (fundingReqs ?? []).filter((r) => r.human_approval === "approved").length;
    const totalFunded = (fundingReqs ?? [])
      .filter((r) => r.human_approval === "approved")
      .reduce((sum, r) => sum + Number(r.amount_requested), 0);

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas Risk Agent. Compute a dynamic trust and risk profile for this Sanctum participant.

Profile:
- Current trust score (DB): ${profile?.trust_score ?? 50}
- Verified: ${profile?.verified ?? false}
- Region: ${profile?.region ?? "unknown"}

Verification history (last 50 events):
- Verified events: ${verified}
- Rejected events: ${rejected}
- Pending events: ${(verEvents ?? []).filter((e) => e.status === "pending").length}
- Event kinds: ${[...new Set((verEvents ?? []).map((e) => e.kind))].join(", ") || "none"}

Funding history:
- Total requests: ${(fundingReqs ?? []).length}
- Approved: ${approvals}
- Declined: ${(fundingReqs ?? []).filter((r) => r.human_approval === "declined").length}
- Total capital approved: ${totalFunded} USD
- Sectors: ${[...new Set((fundingReqs ?? []).map((r) => r.sector).filter(Boolean))].join(", ") || "none"}

Compute: trust_score (0-100), risk_level, flags, recommendation, and rationale. A new user with no history starts at 50. Verified events increase trust. Rejected events are strong negative signals. Approved funding with no defaults is a strong positive.`;

    const { object } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: RiskOutputSchema,
      prompt,
    });

    // Write the AI score back to profiles
    await supabaseAdmin
      .from("profiles")
      .update({ trust_score: object.trust_score, updated_at: new Date().toISOString() })
      .eq("user_id", targetId);

    return {
      ...object,
      signals: {
        verified_events: verified,
        rejected_events: rejected,
        total_funded: totalFunded,
        repayment_rate: approvals > 0 ? approvals / Math.max((fundingReqs ?? []).length, 1) : 0,
        funding_requests_count: (fundingReqs ?? []).length,
        approvals_count: approvals,
      },
    };
  });
