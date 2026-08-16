import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, h as numberType, i as stringType, k as enumType, j as arrayType } from "../_libs/zod.mjs";
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
const RiskOutputSchema = objectType({
  trust_score: numberType().min(0).max(100),
  risk_level: enumType(["very_low", "low", "medium", "high", "very_high"]),
  flags: arrayType(stringType()).min(0).max(10),
  recommendation: enumType(["approve_large_limit", "approve_standard_limit", "approve_small_limit", "approve_with_conditions", "decline"]),
  rationale: stringType().min(20).max(600),
  signals: objectType({
    verified_events: numberType().int(),
    rejected_events: numberType().int(),
    total_funded: numberType(),
    repayment_rate: numberType().min(0).max(1),
    funding_requests_count: numberType().int(),
    approvals_count: numberType().int()
  })
});
const computeRiskScore_createServerFn_handler = createServerRpc({
  id: "472104fcaf52938f2f1f9c0d54b42011f1672fdeb98c22ab936b7d6710ad5a65",
  name: "computeRiskScore",
  filename: "src/lib/risk.functions.ts"
}, (opts) => computeRiskScore.__executeServer(opts));
const computeRiskScore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  targetUserId: stringType().uuid().optional()
}).parse(d)).handler(computeRiskScore_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const targetId = data.targetUserId ?? userId;
  if (targetId !== userId) {
    const {
      data: roles
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
    const elevated = (roles ?? []).some((r) => r.role === "reviewer" || r.role === "admin");
    if (!elevated) throw new Error("Forbidden");
  }
  const [{
    data: profile
  }, {
    data: verEvents
  }, {
    data: fundingReqs
  }] = await Promise.all([supabaseAdmin.from("profiles").select("trust_score, verified, region, display_name").eq("user_id", targetId).single(), supabaseAdmin.from("verification_events").select("status, kind, created_at").eq("user_id", targetId).order("created_at", {
    ascending: false
  }).limit(50), supabaseAdmin.from("funding_requests").select("status, amount_requested, currency, sector, human_approval, created_at").eq("user_id", targetId).order("created_at", {
    ascending: false
  }).limit(20)]);
  const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const rejected = (verEvents ?? []).filter((e) => e.status === "rejected").length;
  const approvals = (fundingReqs ?? []).filter((r) => r.human_approval === "approved").length;
  const totalFunded = (fundingReqs ?? []).filter((r) => r.human_approval === "approved").reduce((sum, r) => sum + Number(r.amount_requested), 0);
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
  const {
    object
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: RiskOutputSchema,
    prompt
  });
  await supabaseAdmin.from("profiles").update({
    trust_score: object.trust_score,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("user_id", targetId);
  return {
    ...object,
    signals: {
      verified_events: verified,
      rejected_events: rejected,
      total_funded: totalFunded,
      repayment_rate: approvals > 0 ? approvals / Math.max((fundingReqs ?? []).length, 1) : 0,
      funding_requests_count: (fundingReqs ?? []).length,
      approvals_count: approvals
    }
  };
});
export {
  computeRiskScore_createServerFn_handler
};
