import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

async function getRiskContext(userId: string): Promise<string> {
  const [{ data: profile }, { data: verEvents }, { data: pastFunding }] = await Promise.all([
    supabaseAdmin.from("profiles").select("trust_score, verified, region").eq("user_id", userId).single(),
    supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", userId),
    supabaseAdmin.from("funding_requests").select("human_approval, amount_requested").eq("user_id", userId),
  ]);
  const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const rejected = (verEvents ?? []).filter((e) => e.status === "rejected").length;
  const approvals = (pastFunding ?? []).filter((r) => r.human_approval === "approved").length;
  const totalFunded = (pastFunding ?? [])
    .filter((r) => r.human_approval === "approved")
    .reduce((s, r) => s + Number(r.amount_requested), 0);
  return `Applicant Risk Context:
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false}
- Verified proofs: ${verified} | Rejected proofs: ${rejected}
- Past approvals: ${approvals} | Total capital previously approved: $${totalFunded.toLocaleString()}`;
}

const GenInput = z.object({ requestId: z.string().uuid() });

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
  trust_assessment: z.object({ score: z.number().min(0).max(100), rationale: z.string() }),
  risk_assessment: z.object({ score: z.number().min(0).max(100), flags: z.array(z.string()) }),
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
  .inputValidator((d: unknown) => GenInput.parse(d))
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

    const riskContext = await getRiskContext(req.user_id);

    const prompt = `You are the Atlas Funding Council, coordinating the Deal Agent, Risk Agent, Treasury Agent, and Impact Agent.

A funding request has been submitted:
Title: ${req.title}
Sector: ${req.sector ?? "unspecified"}
Region: ${req.region ?? "unspecified"}
Amount requested: ${req.amount_requested} ${req.currency}
Attachments: ${(req.attachments as Array<{ name: string }>).map((a) => a.name).join(", ") || "none"}

${riskContext}

Pitch:
"""
${req.pitch}
"""

Generate a Funding Decision Report that maximizes prosperity, trust, and opportunity while preserving human agency. Incorporate the applicant's trust score and verification history when calibrating the recommended amount, terms, and risk flags. Be concrete. If the pitch is thin, set recommendation to "needs_more_info". Milestones must be measurable.`;

    const { object } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: DecisionSchema,
      prompt,
    });

    // Compute next version & insert immutable version row via service role
    const { data: existing } = await supabaseAdmin
      .from("decision_report_versions")
      .select("version")
      .eq("funding_request_id", req.id)
      .order("version", { ascending: false })
      .limit(1);
    const nextVersion = (existing?.[0]?.version ?? 0) + 1;

    const { error: vErr } = await supabaseAdmin
      .from("decision_report_versions")
      .insert({
        funding_request_id: req.id,
        version: nextVersion,
        report: object,
        human_approval: "pending",
      });
    if (vErr) throw new Error(vErr.message);

    const { error: upErr } = await supabaseAdmin
      .from("funding_requests")
      .update({
        decision_report: object,
        current_version: nextVersion,
        status: "under_review",
        human_approval: "pending",
        human_decision_notes: null,
        human_decided_at: null,
        human_decided_by: null,
      })
      .eq("id", req.id);
    if (upErr) throw new Error(upErr.message);

    return { decision: object, version: nextVersion };
  });

// ============ REVIEWER-ONLY APPROVAL ============
const ReviewInput = z.object({
  requestId: z.string().uuid(),
  approval: z.enum(["approved", "declined", "revision_requested"]),
  notes: z.string().max(4000).optional(),
});

export const reviewFundingDecision = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ReviewInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // SERVER-SIDE role check — never trust UI
    const { data: roles, error: rErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (rErr) throw new Error(rErr.message);
    const isReviewer = (roles ?? []).some((r) => r.role === "reviewer" || r.role === "admin");
    if (!isReviewer) {
      throw new Error("Forbidden: reviewer role required to record a funding decision.");
    }

    const { data: req, error: reqErr } = await supabaseAdmin
      .from("funding_requests")
      .select("id, current_version, title")
      .eq("id", data.requestId)
      .single();
    if (reqErr || !req) throw new Error("Funding request not found");
    if (!req.current_version) throw new Error("No AI decision report to review yet.");

    const { data: version, error: vErr } = await supabaseAdmin
      .from("decision_report_versions")
      .select("id, human_approval")
      .eq("funding_request_id", req.id)
      .eq("version", req.current_version)
      .single();
    if (vErr || !version) throw new Error("Decision version not found");

    // Versions are immutable once decided — only 'pending' can be transitioned
    if (version.human_approval !== "pending") {
      throw new Error(
        `Version ${req.current_version} is already finalized (${version.human_approval}). Regenerate a new version to revise.`,
      );
    }

    const { data: reviewer } = await supabaseAdmin
      .from("profiles")
      .select("display_name")
      .eq("user_id", userId)
      .single();
    const reviewerName = reviewer?.display_name ?? "Atlas Reviewer";
    const decidedAt = new Date().toISOString();

    // Stamp the version (immutable thereafter)
    const { error: stampErr } = await supabaseAdmin
      .from("decision_report_versions")
      .update({
        human_approval: data.approval,
        human_decision_notes: data.notes ?? null,
        human_decided_by: userId,
        human_decided_by_name: reviewerName,
        human_decided_at: decidedAt,
      })
      .eq("id", version.id);
    if (stampErr) throw new Error(stampErr.message);

    const nextStatus =
      data.approval === "approved" ? "approved" :
      data.approval === "declined" ? "declined" : "under_review";

    const { error: frErr } = await supabaseAdmin
      .from("funding_requests")
      .update({
        human_approval: data.approval,
        human_decision_notes: data.notes ?? null,
        human_decided_by: userId,
        human_decided_at: decidedAt,
        status: nextStatus,
        final_version_id: data.approval === "approved" ? version.id : null,
      })
      .eq("id", req.id);
    if (frErr) throw new Error(frErr.message);

    return { ok: true, version: req.current_version, reviewer: reviewerName, decidedAt };
  });
