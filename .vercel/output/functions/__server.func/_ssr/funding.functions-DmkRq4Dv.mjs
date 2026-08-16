import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as recordAgentEvent } from "./observability.server-CSo3iCeb.mjs";
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
async function getRiskContext(userId) {
  const [{
    data: profile
  }, {
    data: verEvents
  }, {
    data: pastFunding
  }] = await Promise.all([supabaseAdmin.from("profiles").select("trust_score, verified, region").eq("user_id", userId).single(), supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", userId), supabaseAdmin.from("funding_requests").select("human_approval, amount_requested").eq("user_id", userId)]);
  const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const rejected = (verEvents ?? []).filter((e) => e.status === "rejected").length;
  const approvals = (pastFunding ?? []).filter((r) => r.human_approval === "approved").length;
  const totalFunded = (pastFunding ?? []).filter((r) => r.human_approval === "approved").reduce((s, r) => s + Number(r.amount_requested), 0);
  return `Applicant Risk Context:
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false}
- Verified proofs: ${verified} | Rejected proofs: ${rejected}
- Past approvals: ${approvals} | Total capital previously approved: $${totalFunded.toLocaleString()}`;
}
const GenInput = objectType({
  requestId: stringType().uuid()
});
const DecisionSchema = objectType({
  recommendation: enumType(["approve", "approve_with_conditions", "decline", "needs_more_info"]),
  summary: stringType().min(20).max(800),
  recommended_amount: numberType().nonnegative(),
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
    jobs_created: numberType().int().nonnegative(),
    households_reached: numberType().int().nonnegative(),
    prosperity_index_delta: numberType(),
    notes: stringType()
  }),
  agents_invoked: arrayType(stringType()).min(1),
  safeguards: arrayType(stringType()).min(1)
});
const generateFundingDecision_createServerFn_handler = createServerRpc({
  id: "ce6708c36699fb579f5a0384b6c864fe901c773ba7a23483dc971ea2c2352a27",
  name: "generateFundingDecision",
  filename: "src/lib/funding.functions.ts"
}, (opts) => generateFundingDecision.__executeServer(opts));
const generateFundingDecision = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => GenInput.parse(d)).handler(generateFundingDecision_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: req,
    error
  } = await supabase.from("funding_requests").select("*").eq("id", data.requestId).eq("user_id", userId).single();
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
Attachments: ${req.attachments.map((a) => a.name).join(", ") || "none"}

${riskContext}

Pitch:
"""
${req.pitch}
"""

Generate a Funding Decision Report that maximizes prosperity, trust, and opportunity while preserving human agency. Incorporate the applicant's trust score and verification history when calibrating the recommended amount, terms, and risk flags. Be concrete. If the pitch is thin, set recommendation to "needs_more_info". Milestones must be measurable.`;
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: DecisionSchema,
    prompt
  });
  void recordAgentEvent({
    userId: req.user_id,
    agent: "Funding Agent",
    action: "funding_decision",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    confidence: object.trust_assessment.score / 100,
    outcome: object.recommendation,
    metadata: {
      requestId: req.id
    }
  });
  const {
    data: existing
  } = await supabaseAdmin.from("decision_report_versions").select("version").eq("funding_request_id", req.id).order("version", {
    ascending: false
  }).limit(1);
  const nextVersion = (existing?.[0]?.version ?? 0) + 1;
  const {
    error: vErr
  } = await supabaseAdmin.from("decision_report_versions").insert({
    funding_request_id: req.id,
    version: nextVersion,
    report: object,
    human_approval: "pending"
  });
  if (vErr) throw new Error(vErr.message);
  const {
    error: upErr
  } = await supabaseAdmin.from("funding_requests").update({
    decision_report: object,
    current_version: nextVersion,
    status: "under_review",
    human_approval: "pending",
    human_decision_notes: null,
    human_decided_at: null,
    human_decided_by: null
  }).eq("id", req.id);
  if (upErr) throw new Error(upErr.message);
  return {
    decision: object,
    version: nextVersion
  };
});
const ReviewInput = objectType({
  requestId: stringType().uuid(),
  approval: enumType(["approved", "declined", "revision_requested"]),
  notes: stringType().max(4e3).optional()
});
const reviewFundingDecision_createServerFn_handler = createServerRpc({
  id: "c054143d943196845fe8c7425121cfb12ae3f6f3d3462c7c77a76d9c25407c1b",
  name: "reviewFundingDecision",
  filename: "src/lib/funding.functions.ts"
}, (opts) => reviewFundingDecision.__executeServer(opts));
const reviewFundingDecision = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ReviewInput.parse(d)).handler(reviewFundingDecision_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: roles,
    error: rErr
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
  if (rErr) throw new Error(rErr.message);
  const isReviewer = (roles ?? []).some((r) => r.role === "reviewer" || r.role === "admin");
  if (!isReviewer) {
    throw new Error("Forbidden: reviewer role required to record a funding decision.");
  }
  const {
    data: req,
    error: reqErr
  } = await supabaseAdmin.from("funding_requests").select("id, current_version, title").eq("id", data.requestId).single();
  if (reqErr || !req) throw new Error("Funding request not found");
  if (!req.current_version) throw new Error("No AI decision report to review yet.");
  const {
    data: version,
    error: vErr
  } = await supabaseAdmin.from("decision_report_versions").select("id, human_approval").eq("funding_request_id", req.id).eq("version", req.current_version).single();
  if (vErr || !version) throw new Error("Decision version not found");
  if (version.human_approval !== "pending") {
    throw new Error(`Version ${req.current_version} is already finalized (${version.human_approval}). Regenerate a new version to revise.`);
  }
  const {
    data: reviewer
  } = await supabaseAdmin.from("profiles").select("display_name").eq("user_id", userId).single();
  const reviewerName = reviewer?.display_name ?? "Atlas Reviewer";
  const decidedAt = (/* @__PURE__ */ new Date()).toISOString();
  const {
    error: stampErr
  } = await supabaseAdmin.from("decision_report_versions").update({
    human_approval: data.approval,
    human_decision_notes: data.notes ?? null,
    human_decided_by: userId,
    human_decided_by_name: reviewerName,
    human_decided_at: decidedAt
  }).eq("id", version.id);
  if (stampErr) throw new Error(stampErr.message);
  const nextStatus = data.approval === "approved" ? "approved" : data.approval === "declined" ? "declined" : "under_review";
  const {
    error: frErr
  } = await supabaseAdmin.from("funding_requests").update({
    human_approval: data.approval,
    human_decision_notes: data.notes ?? null,
    human_decided_by: userId,
    human_decided_at: decidedAt,
    status: nextStatus,
    final_version_id: data.approval === "approved" ? version.id : null
  }).eq("id", req.id);
  if (frErr) throw new Error(frErr.message);
  return {
    ok: true,
    version: req.current_version,
    reviewer: reviewerName,
    decidedAt
  };
});
export {
  generateFundingDecision_createServerFn_handler,
  reviewFundingDecision_createServerFn_handler
};
