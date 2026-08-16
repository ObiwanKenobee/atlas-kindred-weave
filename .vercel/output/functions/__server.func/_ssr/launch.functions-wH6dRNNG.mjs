import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as requireFeature } from "./entitlements.server-Dp7K62E0.mjs";
import { r as recordAgentEvent } from "./observability.server-D5WP9btl.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, i as stringType, j as arrayType, k as enumType, h as numberType } from "../_libs/zod.mjs";
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
function getGateway() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  return createLovableAiGatewayProvider(key);
}
async function getUserContext(userId) {
  const [{
    data: profile
  }, {
    data: funding
  }, {
    data: verEvents
  }] = await Promise.all([supabaseAdmin.from("profiles").select("display_name, trust_score, verified, region, bio").eq("user_id", userId).single(), supabaseAdmin.from("funding_requests").select("title, amount_requested, currency, sector, human_approval, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(20), supabaseAdmin.from("verification_events").select("kind, status, created_at").eq("user_id", userId).limit(30)]);
  return {
    profile,
    funding: funding ?? [],
    verEvents: verEvents ?? []
  };
}
const CashflowSchema = objectType({
  period: stringType(),
  health_grade: enumType(["A", "B", "C", "D", "F"]),
  headline: stringType().max(200),
  estimated_monthly_inflow: numberType().nonnegative(),
  estimated_monthly_outflow: numberType().nonnegative(),
  net_cashflow: numberType(),
  runway_months: numberType().nonnegative(),
  cashflow_trend: enumType(["improving", "stable", "declining", "unknown"]),
  key_observations: arrayType(stringType()).min(2).max(6),
  risks: arrayType(stringType()).min(1).max(4),
  recommendations: arrayType(stringType()).min(2).max(5),
  next_30_days: stringType().max(300)
});
const getCashflowInsights_createServerFn_handler = createServerRpc({
  id: "731695e246aa2740a9576377a2b249cde85a6adb6ed614be51d7574acfa42454",
  name: "getCashflowInsights",
  filename: "src/lib/launch.functions.ts"
}, (opts) => getCashflowInsights.__executeServer(opts));
const getCashflowInsights = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getCashflowInsights_createServerFn_handler, async ({
  context
}) => {
  await requireFeature(context.userId, "cashflow_insights");
  const {
    userId
  } = context;
  const {
    profile,
    funding,
    verEvents
  } = await getUserContext(userId);
  const approved = funding.filter((r) => r.human_approval === "approved");
  const totalCapital = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const sectors = [...new Set(funding.map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";
  const verifiedCount = verEvents.filter((e) => e.status === "verified").length;
  const cutoff30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString();
  const recent30 = funding.filter((r) => r.created_at >= cutoff30);
  const gateway = getGateway();
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: CashflowSchema,
    prompt: `You are the Atlas Treasury Agent generating a cashflow analysis for an entrepreneur.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false} (${verifiedCount} verified proofs)
- Sectors: ${sectors}

Funding history:
- Total requests: ${funding.length}
- Approved deals: ${approved.length} totalling $${totalCapital.toLocaleString()}
- Requests in last 30 days: ${recent30.length}
- Recent: ${approved.slice(0, 3).map((r) => `${r.title} ($${r.amount_requested} ${r.currency})`).join("; ") || "none"}

Generate a realistic cashflow analysis. Since we don't have direct bank data, base estimates on:
- Approved funding amounts as capital inflows
- Typical operating costs for their sector and region
- Trust score as a proxy for business maturity
- Number of verified proofs as activity signal

Be honest about data limitations. If data is sparse, say so and give conservative estimates.
runway_months should reflect how long current capital can sustain operations.`
  });
  void recordAgentEvent({
    userId,
    agent: "Treasury Agent",
    action: "cashflow_insights",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    outcome: object.health_grade,
    metadata: {
      trust_score: profile?.trust_score
    }
  });
  return object;
});
const RevenueSchema = objectType({
  period: stringType(),
  estimated_mrr: numberType().nonnegative(),
  estimated_arr: numberType().nonnegative(),
  revenue_trend: enumType(["growing", "stable", "declining", "early_stage", "unknown"]),
  growth_rate_pct: numberType(),
  top_revenue_sources: arrayType(objectType({
    source: stringType(),
    estimated_contribution_pct: numberType().min(0).max(100),
    notes: stringType()
  })).min(1).max(5),
  milestones: arrayType(objectType({
    label: stringType(),
    target: stringType(),
    status: enumType(["achieved", "in_progress", "not_started"])
  })).min(2).max(6),
  forecast_next_quarter: stringType().max(300),
  recommendations: arrayType(stringType()).min(2).max(5)
});
const getRevenueTracking_createServerFn_handler = createServerRpc({
  id: "2d1585c7df8fd273dc761630b8adafe09502889930716e504036290e26579f18",
  name: "getRevenueTracking",
  filename: "src/lib/launch.functions.ts"
}, (opts) => getRevenueTracking.__executeServer(opts));
const getRevenueTracking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getRevenueTracking_createServerFn_handler, async ({
  context
}) => {
  await requireFeature(context.userId, "revenue_tracking");
  const {
    userId
  } = context;
  const {
    profile,
    funding,
    verEvents
  } = await getUserContext(userId);
  const approved = funding.filter((r) => r.human_approval === "approved");
  const totalCapital = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const sectors = [...new Set(funding.map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";
  const byMonth = {};
  for (const r of approved) {
    const month = r.created_at.slice(0, 7);
    byMonth[month] = (byMonth[month] ?? 0) + Number(r.amount_requested);
  }
  const monthlyData = Object.entries(byMonth).sort().slice(-6);
  const gateway = getGateway();
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: RevenueSchema,
    prompt: `You are the Atlas Revenue Intelligence Agent tracking business revenue for an entrepreneur.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Sectors: ${sectors}
- Verified proofs: ${verEvents.filter((e) => e.status === "verified").length}

Capital history (approved funding by month):
${monthlyData.map(([m, v]) => `  ${m}: $${v.toLocaleString()}`).join("\n") || "  No approved funding yet"}
Total capital approved: $${totalCapital.toLocaleString()} across ${approved.length} deals

Generate a revenue tracking report. Use approved funding as a proxy for business revenue/capital deployment.
Identify revenue sources based on sector and funding patterns.
Set milestones appropriate for their stage (trust score ${profile?.trust_score ?? 50}/100).
Be realistic — early-stage businesses with low trust scores should have conservative estimates.`
  });
  void recordAgentEvent({
    userId,
    agent: "Treasury Agent",
    action: "revenue_tracking",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    outcome: object.revenue_trend
  });
  return object;
});
const EligibilitySchema = objectType({
  overall_score: numberType().min(0).max(100),
  readiness_level: enumType(["not_ready", "building", "ready", "strong"]),
  headline: stringType().max(200),
  criteria: arrayType(objectType({
    name: stringType(),
    status: enumType(["met", "partial", "not_met"]),
    score: numberType().min(0).max(100),
    notes: stringType().max(200),
    action: stringType().max(150)
  })).min(4).max(8),
  eligible_instruments: arrayType(objectType({
    type: enumType(["grant", "loan", "revenue_share", "equity", "microfinance"]),
    max_amount: numberType().nonnegative(),
    currency: stringType(),
    conditions: arrayType(stringType()).min(1).max(4)
  })).min(1).max(4),
  blocking_issues: arrayType(stringType()).min(0).max(4),
  next_steps: arrayType(stringType()).min(2).max(5),
  estimated_days_to_ready: numberType().int().nonnegative()
});
const getFundingEligibility_createServerFn_handler = createServerRpc({
  id: "460938fc2efe034fa532b12d67bf7dd1c43bd1dbb3faee7f8951d8ed7402da0f",
  name: "getFundingEligibility",
  filename: "src/lib/launch.functions.ts"
}, (opts) => getFundingEligibility.__executeServer(opts));
const getFundingEligibility = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getFundingEligibility_createServerFn_handler, async ({
  context
}) => {
  await requireFeature(context.userId, "funding_eligibility");
  const {
    userId
  } = context;
  const {
    profile,
    funding,
    verEvents
  } = await getUserContext(userId);
  const approved = funding.filter((r) => r.human_approval === "approved");
  const declined = funding.filter((r) => r.human_approval === "declined");
  const verifiedCount = verEvents.filter((e) => e.status === "verified").length;
  const rejectedCount = verEvents.filter((e) => e.status === "rejected").length;
  const totalFunded = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const sectors = [...new Set(funding.map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";
  const gateway = getGateway();
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: EligibilitySchema,
    prompt: `You are the Atlas Funding Eligibility Agent assessing whether an entrepreneur qualifies for funding.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false}
- Sectors: ${sectors}

Evidence record:
- Verified proofs: ${verifiedCount}
- Rejected proofs: ${rejectedCount}
- Funding requests submitted: ${funding.length}
- Approved: ${approved.length} ($${totalFunded.toLocaleString()} total)
- Declined: ${declined.length}

Assess eligibility across these criteria:
1. Identity verification (verified flag + proof count)
2. Business activity evidence (verification events)
3. Trust score threshold (60+ = good, 75+ = strong)
4. Funding history (prior approvals = positive signal)
5. Sector viability (known sector = better)
6. Region coverage (known region = better)
7. Documentation quality (vault docs if any)
8. Repayment track record (no defaults = positive)

For eligible_instruments, base max_amount on trust score:
- Trust < 40: microfinance up to $500
- Trust 40-60: microfinance/loan up to $2,000
- Trust 60-75: loan/revenue_share up to $10,000
- Trust 75+: loan/grant up to $50,000

Be strict and honest. A trust score of ${profile?.trust_score ?? 50} with ${verifiedCount} verified proofs is the ground truth.`
  });
  void recordAgentEvent({
    userId,
    agent: "Funding Agent",
    action: "eligibility_check",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    confidence: object.overall_score / 100,
    outcome: object.readiness_level
  });
  return object;
});
export {
  getCashflowInsights_createServerFn_handler,
  getFundingEligibility_createServerFn_handler,
  getRevenueTracking_createServerFn_handler
};
