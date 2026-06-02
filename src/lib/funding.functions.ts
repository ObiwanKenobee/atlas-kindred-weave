import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const InputSchema = z.object({
  requestId: z.string().uuid(),
});

const DecisionSchema = z.object({
  recommendation: z.enum(["approve", "approve_with_conditions", "decline", "needs_more_info"]),
  summary: z.string().min(20).max(800),
  recommended_amount: z.number().nonnegative(),
  recommended_currency: z.string().min(3).max(6),
  recommended_terms: z.object({
    instrument: z.string(),
    duration_months: z.number().int().positive().max(120),
    revenue_share_pct: z.number().min(0).max(50).optional(),
    interest_rate_pct: z.number().min(0).max(40).optional(),
    milestones: z.array(z.string()).min(1).max(8),
  }),
  trust_assessment: z.object({
    score: z.number().min(0).max(100),
    rationale: z.string(),
  }),
  risk_assessment: z.object({
    score: z.number().min(0).max(100),
    flags: z.array(z.string()),
  }),
  impact_forecast: z.object({
    jobs_created: z.number().int().nonnegative(),
    households_reached: z.number().int().nonnegative(),
    prosperity_index_delta: z.number(),
    notes: z.string(),
  }),
  agents_invoked: z.array(z.string()).min(1),
  safeguards: z.array(z.string()).min(1),
});

export const generateFundingDecision = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: req, error } = await supabase
      .from("funding_requests")
      .select("*")
      .eq("id", data.requestId)
      .eq("user_id", userId)
      .single();
    if (error || !req) throw new Error("Funding request not found");

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas Funding Council, coordinating the Deal Agent, Risk Agent, Treasury Agent, and Impact Agent.

A funding request has been submitted:
Title: ${req.title}
Sector: ${req.sector ?? "unspecified"}
Region: ${req.region ?? "unspecified"}
Amount requested: ${req.amount_requested} ${req.currency}
Attachments: ${(req.attachments as Array<{ name: string }>).map((a) => a.name).join(", ") || "none"}

Pitch:
"""
${req.pitch}
"""

Generate a Funding Decision Report that maximizes prosperity, trust, and opportunity while preserving human agency. Be concrete. If the pitch is thin, set recommendation to "needs_more_info" and explain what evidence is required. Recommended_amount may differ from amount requested. Currency should match unless there's a strong reason. Milestones must be measurable.`;

    const { object } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: DecisionSchema,
      prompt,
    });

    const { error: upErr } = await supabase
      .from("funding_requests")
      .update({ decision_report: object, status: "under_review" })
      .eq("id", req.id);
    if (upErr) throw new Error(upErr.message);

    return { decision: object };
  });
