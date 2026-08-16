import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { a as recordInteractionStep, r as recordAgentEvent } from "./observability.server-D5WP9btl.mjs";
import { r as requireFeature } from "./entitlements.server-Dp7K62E0.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, i as stringType, j as arrayType, h as numberType, k as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./entitlements-DDmJ5IMx.mjs";
const WorkflowInput = objectType({
  requestId: stringType().uuid()
});
const WorkflowDecisionSchema = objectType({
  recommendation: enumType(["approve", "approve_with_conditions", "decline", "needs_more_info"]),
  summary: stringType().min(20).max(800),
  recommended_amount: numberType().min(0),
  recommended_currency: stringType().min(3).max(6),
  recommended_terms: objectType({
    instrument: stringType(),
    duration_months: numberType().int().positive().max(120),
    revenue_share_pct: numberType().min(0).max(50).optional(),
    interest_rate_pct: numberType().min(0).max(40).optional(),
    milestones: arrayType(stringType()).min(1).max(8)
  }),
  trust_assessment: objectType({
    score: numberType().min(0).max(100),
    rationale: stringType()
  }),
  risk_assessment: objectType({
    score: numberType().min(0).max(100),
    flags: arrayType(stringType())
  }),
  impact_forecast: objectType({
    jobs_created: numberType().int().min(0),
    households_reached: numberType().int().min(0),
    prosperity_index_delta: numberType(),
    notes: stringType()
  }),
  agents_invoked: arrayType(stringType()).min(1),
  safeguards: arrayType(stringType()).min(1)
});
const runOrchestratorWorkflow_createServerFn_handler = createServerRpc({
  id: "5c1f198297bc2606523b85ef88dd1cf980e21e20f00d62bfa82ab2a0e4b4a131",
  name: "runOrchestratorWorkflow",
  filename: "src/lib/orchestrator.functions.ts"
}, (opts) => runOrchestratorWorkflow.__executeServer(opts));
const runOrchestratorWorkflow = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => WorkflowInput.parse(d)).handler(runOrchestratorWorkflow_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "orchestrator");
  const {
    userId
  } = context;
  const steps = [];
  const {
    data: req,
    error: reqErr
  } = await supabaseAdmin.from("funding_requests").select("*").eq("id", data.requestId).eq("user_id", userId).single();
  if (reqErr || !req) throw new Error("Funding request not found or access denied");
  steps.push({
    engine: "Funding Engine",
    status: "complete",
    result: `Loaded: "${req.title}"`
  });
  void recordInteractionStep({
    userId,
    workflowId: data.requestId,
    step: "Retrieve Financial Records",
    status: "complete"
  });
  const [{
    data: profile
  }, {
    data: verEvents
  }, {
    data: pastFunding
  }] = await Promise.all([supabaseAdmin.from("profiles").select("trust_score, verified, region, display_name").eq("user_id", userId).single(), supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", userId), supabaseAdmin.from("funding_requests").select("human_approval, amount_requested").eq("user_id", userId)]);
  const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const rejected = (verEvents ?? []).filter((e) => e.status === "rejected").length;
  const approvals = (pastFunding ?? []).filter((r) => r.human_approval === "approved").length;
  const totalFunded = (pastFunding ?? []).filter((r) => r.human_approval === "approved").reduce((s, r) => s + Number(r.amount_requested), 0);
  steps.push({
    engine: "Identity & Trust Engine",
    status: "complete",
    result: `Trust score: ${profile?.trust_score ?? 50}/100 · ${verified} verified proofs`
  });
  void recordInteractionStep({
    userId,
    workflowId: data.requestId,
    step: "Calculate Trust Score",
    status: "complete",
    metadata: {
      trust_score: profile?.trust_score ?? 50
    }
  });
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const prompt = `You are the Atlas Funding Council, coordinating the Underwriting Agent, Risk Agent, Treasury Agent, and Impact Agent in a single orchestrated workflow.

Funding Request:
- Title: ${req.title}
- Sector: ${req.sector ?? "unspecified"}
- Region: ${req.region ?? "unspecified"}
- Amount: ${req.amount_requested} ${req.currency}
- Attachments: ${req.attachments.map((a) => a.name).join(", ") || "none"}

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
  steps.push({
    engine: "Underwriting Agent",
    status: "running"
  });
  void recordInteractionStep({
    userId,
    workflowId: data.requestId,
    step: "Analyze Inventory",
    status: "running"
  });
  const t0 = Date.now();
  const genResult = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: WorkflowDecisionSchema,
    prompt
  });
  const decision = genResult.object;
  const usage = genResult.usage;
  steps[steps.length - 1] = {
    engine: "Underwriting Agent",
    status: "complete",
    result: decision.recommendation
  };
  void recordInteractionStep({
    userId,
    workflowId: data.requestId,
    step: "Generate Funding Recommendation",
    status: "complete",
    metadata: {
      recommendation: decision.recommendation
    }
  });
  steps.push({
    engine: "Risk Engine",
    status: "complete",
    result: `Risk score: ${decision.risk_assessment.score}/100 · ${decision.risk_assessment.flags.length} flags`
  });
  steps.push({
    engine: "Impact Engine",
    status: "complete",
    result: `${decision.impact_forecast.jobs_created} jobs · ${decision.impact_forecast.households_reached} households`
  });
  const {
    data: existing
  } = await supabaseAdmin.from("decision_report_versions").select("version").eq("funding_request_id", req.id).order("version", {
    ascending: false
  }).limit(1);
  const nextVersion = (existing?.[0]?.version ?? 0) + 1;
  await supabaseAdmin.from("decision_report_versions").insert({
    funding_request_id: req.id,
    version: nextVersion,
    report: decision,
    human_approval: "pending"
  });
  await supabaseAdmin.from("funding_requests").update({
    decision_report: decision,
    current_version: nextVersion,
    status: "under_review",
    human_approval: "pending",
    human_decision_notes: null,
    human_decided_at: null,
    human_decided_by: null
  }).eq("id", req.id);
  steps.push({
    engine: "Treasury Engine",
    status: "complete",
    result: `Decision stored v${nextVersion}`
  });
  const newTrust = decision.trust_assessment.score;
  await supabaseAdmin.from("profiles").update({
    trust_score: newTrust,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("user_id", userId);
  await supabaseAdmin.from("risk_scores").insert({
    user_id: userId,
    trust_score: newTrust,
    risk_level: decision.risk_assessment.score > 70 ? "high" : decision.risk_assessment.score > 50 ? "medium" : "low",
    recommendation: decision.recommendation,
    rationale: decision.trust_assessment.rationale,
    flags: decision.risk_assessment.flags,
    signals: {}
  });
  steps.push({
    engine: "Trust Score Engine",
    status: "complete",
    result: `Score updated to ${newTrust}/100`
  });
  await supabaseAdmin.rpc("notify_user", {
    _user: userId,
    _kind: "orchestrator_decision",
    _title: `Orchestrator decision: ${decision.recommendation.replace(/_/g, " ")}`,
    _body: decision.summary.slice(0, 200),
    _link: "/funding",
    _metadata: {
      requestId: req.id,
      version: nextVersion
    }
  });
  steps.push({
    engine: "Notification Engine",
    status: "complete",
    result: "Applicant notified"
  });
  void recordInteractionStep({
    userId,
    workflowId: data.requestId,
    step: "Create Funding Request",
    status: "complete",
    metadata: {
      version: nextVersion
    }
  });
  void recordAgentEvent({
    userId,
    agent: "Orchestrator",
    action: "funding_workflow",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    confidence: decision.trust_assessment.score / 100,
    outcome: decision.recommendation,
    metadata: {
      requestId: req.id,
      version: nextVersion,
      agents: decision.agents_invoked
    }
  });
  return {
    requestId: req.id,
    steps,
    decision,
    version: nextVersion,
    trustScore: newTrust
  };
});
export {
  runOrchestratorWorkflow_createServerFn_handler
};
