import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { recordAgentEvent, recordInteractionStep } from "@/lib/observability.server";

const WorkflowInput = z.object({ requestId: z.string().uuid() });

const WorkflowDecisionSchema = z.object({
  recommendation: z.enum(["approve", "approve_with_conditions", "decline", "needs_more_info"]),
  summary: z.string().min(20).max(800),
  recommended_amount: z.number().nonneg(),
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
    jobs_created: z.number().int().nonneg(),
    households_reached: z.number().int().nonneg(),
    prosperity_index_delta: z.number(),
    notes: z.string(),
  }),
  agents_invoked: z.array(z.string()).min(1),
  safeguards: z.array(z.string()).min(1),
});

export type WorkflowStep = {
  engine: string;
  status: "running" | "complete" | "error";
  result?: string;
};

export type OrchestratorResult = {
  requestId: string;
  steps: WorkflowStep[];
  decision: z.infer<typeof WorkflowDecisionSchema>;
  version: number;
  trustScore: number;
};

export const runOrchestratorWorkflow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => WorkflowInput.parse(d))
  .handler(async ({ data, context }): Promise<OrchestratorResult> => {
    const { userId } = context;
    const steps: WorkflowStep[] = [];

    // ── Step 1: Load funding request ──────────────────────────────────────
    const { data: req, error: reqErr } = await supabaseAdmin
      .from("funding_requests")
      .select("*")
      .eq("id", data.requestId)
      .eq("user_id", userId)
      .single();
    if (reqErr || !req) throw new Error("Funding request not found or access denied");
    steps.push({ engine: "Funding Engine", status: "complete", result: `Loaded: "${req.title}"` });
    void recordInteractionStep({ userId, workflowId: data.requestId, step: "Retrieve Financial Records", status: "complete" });

    // ── Step 2: Load applicant context ────────────────────────────────────
    const [{ data: profile }, { data: verEvents }, { data: pastFunding }] = await Promise.all([
      supabaseAdmin.from("profiles").select("trust_score, verified, region, display_name").eq("user_id", userId).single(),
      supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", userId),
      supabaseAdmin.from("funding_requests").select("human_approval, amount_requested").eq("user_id", userId),
    ]);

    const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
    const rejected = (verEvents ?? []).filter((e) => e.status === "rejected").length;
    const approvals = (pastFunding ?? []).filter((r) => r.human_approval === "approved").length;
    const totalFunded = (pastFunding ?? [])
      .filter((r) => r.human_approval === "approved")
      .reduce((s, r) => s + Number(r.amount_requested), 0);
    steps.push({ engine: "Identity & Trust Engine", status: "complete", result: `Trust score: ${profile?.trust_score ?? 50}/100 · ${verified} verified proofs` });
    void recordInteractionStep({ userId, workflowId: data.requestId, step: "Calculate Trust Score", status: "complete", metadata: { trust_score: profile?.trust_score ?? 50 } });

    // ── Step 3: AI Underwriting + Risk + Impact (single Gemini call) ──────
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas Funding Council, coordinating the Underwriting Agent, Risk Agent, Treasury Agent, and Impact Agent in a single orchestrated workflow.

Funding Request:
- Title: ${req.title}
- Sector: ${req.sector ?? "unspecified"}
- Region: ${req.region ?? "unspecified"}
- Amount: ${req.amount_requested} ${req.currency}
- Attachments: ${(req.attachments as Array<{ name: string }>).map((a) => a.name).join(", ") || "none"}

Pitch:
"""
${req.pitch}
"""

Applicant Context (from Identity & Trust Engine):
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false}
- Verified proofs: ${verified} | Rejected proofs: ${rejected}
- Past approvals: ${approvals} | Total capital previously approved: $${totalFunded.toLocaleString()}

Workflow: Run Underwriting → Risk Engine → Trust Engine → Impact Forecast in sequence and synthesize a unified decision. Maximise prosperity, trust, and opportunity. Be concrete. If pitch is thin, set recommendation to needs_more_info. Milestones must be measurable.`;

    steps.push({ engine: "Underwriting Agent", status: "running" });
    void recordInteractionStep({ userId, workflowId: data.requestId, step: "Analyze Inventory", status: "running" });

    const t0 = Date.now();
    const { object: decision, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: WorkflowDecisionSchema,
      prompt,
    });

    steps[steps.length - 1] = { engine: "Underwriting Agent", status: "complete", result: decision.recommendation };
    void recordInteractionStep({ userId, workflowId: data.requestId, step: "Generate Funding Recommendation", status: "complete", metadata: { recommendation: decision.recommendation } });
    steps.push({ engine: "Risk Engine", status: "complete", result: `Risk score: ${decision.risk_assessment.score}/100 · ${decision.risk_assessment.flags.length} flags` });
    steps.push({ engine: "Impact Engine", status: "complete", result: `${decision.impact_forecast.jobs_created} jobs · ${decision.impact_forecast.households_reached} households` });

    // ── Step 4: Persist decision version ─────────────────────────────────
    const { data: existing } = await supabaseAdmin
      .from("decision_report_versions")
      .select("version")
      .eq("funding_request_id", req.id)
      .order("version", { ascending: false })
      .limit(1);
    const nextVersion = (existing?.[0]?.version ?? 0) + 1;

    await supabaseAdmin.from("decision_report_versions").insert({
      funding_request_id: req.id,
      version: nextVersion,
      report: decision,
      human_approval: "pending",
    });

    await supabaseAdmin.from("funding_requests").update({
      decision_report: decision,
      current_version: nextVersion,
      status: "under_review",
      human_approval: "pending",
      human_decision_notes: null,
      human_decided_at: null,
      human_decided_by: null,
    }).eq("id", req.id);

    steps.push({ engine: "Treasury Engine", status: "complete", result: `Decision stored v${nextVersion}` });

    // ── Step 5: Update trust score from workflow result ───────────────────
    const newTrust = decision.trust_assessment.score;
    await supabaseAdmin.from("profiles").update({ trust_score: newTrust, updated_at: new Date().toISOString() }).eq("user_id", userId);

    await supabaseAdmin.from("risk_scores").insert({
      user_id: userId,
      trust_score: newTrust,
      risk_level: decision.risk_assessment.score > 70 ? "high" : decision.risk_assessment.score > 50 ? "medium" : "low",
      recommendation: decision.recommendation,
      rationale: decision.trust_assessment.rationale,
      flags: decision.risk_assessment.flags,
      signals: {},
    });

    steps.push({ engine: "Trust Score Engine", status: "complete", result: `Score updated to ${newTrust}/100` });

    // ── Step 6: Notify applicant ──────────────────────────────────────────
    await supabaseAdmin.rpc("notify_user", {
      _user: userId,
      _kind: "orchestrator_decision",
      _title: `Orchestrator decision: ${decision.recommendation.replace(/_/g, " ")}`,
      _body: decision.summary.slice(0, 200),
      _link: "/funding",
      _metadata: { requestId: req.id, version: nextVersion },
    });

    steps.push({ engine: "Notification Engine", status: "complete", result: "Applicant notified" });
    void recordInteractionStep({ userId, workflowId: data.requestId, step: "Create Funding Request", status: "complete", metadata: { version: nextVersion } });

    void recordAgentEvent({
      userId,
      agent: "Orchestrator",
      action: "funding_workflow",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.promptTokens,
      outputTokens: usage?.completionTokens,
      confidence: decision.trust_assessment.score / 100,
      outcome: decision.recommendation,
      metadata: { requestId: req.id, version: nextVersion, agents: decision.agents_invoked },
    });

    return { requestId: req.id, steps, decision, version: nextVersion, trustScore: newTrust };
  });
