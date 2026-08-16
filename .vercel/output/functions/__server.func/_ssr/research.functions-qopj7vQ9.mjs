import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as recordAgentEvent } from "./observability.server-CSo3iCeb.mjs";
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
const OpportunitySchema = objectType({
  opportunities: arrayType(objectType({
    title: stringType(),
    type: enumType(["grant", "loan", "equity", "accelerator", "government", "ngo", "cooperative"]),
    provider: stringType(),
    description: stringType().max(300),
    eligibility: arrayType(stringType()).min(1).max(5),
    estimated_amount: stringType(),
    fit_score: numberType().min(0).max(100),
    fit_rationale: stringType().max(200),
    next_step: stringType().max(150),
    url_hint: stringType().optional()
  })).min(1).max(8),
  summary: stringType().max(400),
  readiness_gap: stringType().max(300),
  recommended_priority: stringType().max(200)
});
const ResearchInput = objectType({
  focus: stringType().max(300).optional()
});
const findFundingOpportunities_createServerFn_handler = createServerRpc({
  id: "a3a74cc9c2345b53123bbe206d2577b7259572fef2d53b07f8cfd30937822baf",
  name: "findFundingOpportunities",
  filename: "src/lib/research.functions.ts"
}, (opts) => findFundingOpportunities.__executeServer(opts));
const findFundingOpportunities = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ResearchInput.parse(d)).handler(findFundingOpportunities_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "funding_match");
  const {
    userId
  } = context;
  const [{
    data: profile
  }, {
    data: funding
  }, {
    data: verEvents
  }, {
    data: vaultDocs
  }] = await Promise.all([supabaseAdmin.from("profiles").select("display_name, trust_score, verified, region, bio").eq("user_id", userId).single(), supabaseAdmin.from("funding_requests").select("sector, amount_requested, currency, human_approval, decision_report").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(5), supabaseAdmin.from("verification_events").select("kind, status").eq("user_id", userId), supabaseAdmin.from("knowledge_documents").select("doc_kind, file_name").eq("user_id", userId).eq("chunk_index", 0)]);
  const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const sectors = [...new Set((funding ?? []).map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";
  const totalFunded = (funding ?? []).filter((r) => r.human_approval === "approved").reduce((s, r) => s + Number(r.amount_requested), 0);
  const docKinds = [...new Set((vaultDocs ?? []).map((d) => d.doc_kind))].join(", ") || "none";
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const prompt = `You are the Atlas Research Agent — a specialist in finding funding opportunities for entrepreneurs in emerging markets, Africa, and the Global South.

Entrepreneur profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false} (${verified} verified proofs)
- Business sectors: ${sectors}
- Capital previously approved: $${totalFunded.toLocaleString()}
- Documents in vault: ${docKinds}
${data.focus ? `
Focus area: "${data.focus}"` : ""}

Find 4–8 real, actionable funding opportunities that this entrepreneur could realistically pursue. Include:
- Grants from development banks, NGOs, and foundations (e.g. IFC, USAID, Tony Elumelu Foundation, Mastercard Foundation)
- Revenue-based financing and microfinance options
- Accelerators and incubators active in their region
- Government programs relevant to their sector
- Impact investors and cooperative capital

For each opportunity, score fit (0-100) based on their trust score, verification status, sector, and region.
Be realistic: a trust score of ${profile?.trust_score ?? 50} with ${verified} verified proofs will not qualify for large institutional grants.
Identify what they need to close the readiness gap.`;
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: OpportunitySchema,
    prompt
  });
  void recordAgentEvent({
    userId,
    agent: "Research Agent",
    action: "find_opportunities",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    confidence: object.opportunities[0]?.fit_score ? object.opportunities[0].fit_score / 100 : void 0,
    outcome: "answered",
    metadata: {
      region: profile?.region,
      sectors
    }
  });
  return object;
});
const TreasuryReportSchema = objectType({
  period: stringType(),
  health_score: enumType(["A+", "A", "B+", "B", "C", "D"]),
  headline: stringType().max(200),
  cashflow_assessment: stringType().max(400),
  runway_estimate: stringType().max(150),
  top_risks: arrayType(stringType()).min(1).max(5),
  recommendations: arrayType(stringType()).min(1).max(6),
  next_milestone: stringType().max(200),
  kpis: objectType({
    total_capital_approved: numberType(),
    approval_rate_pct: numberType(),
    avg_deal_size: numberType(),
    portfolio_health: stringType()
  })
});
const generateTreasuryReport_createServerFn_handler = createServerRpc({
  id: "2ec8701abfcd04814ab0d2747f90b7ec351de6e3d87f4f67e3d4784fcfb25cf3",
  name: "generateTreasuryReport",
  filename: "src/lib/research.functions.ts"
}, (opts) => generateTreasuryReport.__executeServer(opts));
const generateTreasuryReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(generateTreasuryReport_createServerFn_handler, async ({
  context
}) => {
  await requireFeature(context.userId, "treasury_reports");
  const {
    userId
  } = context;
  const [{
    data: profile
  }, {
    data: funding
  }, {
    data: vaultDocs
  }] = await Promise.all([supabaseAdmin.from("profiles").select("display_name, trust_score, region, bio").eq("user_id", userId).single(), supabaseAdmin.from("funding_requests").select("title, amount_requested, currency, status, human_approval, sector, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(20), supabaseAdmin.from("knowledge_documents").select("doc_kind, file_name, created_at").eq("user_id", userId).eq("chunk_index", 0)]);
  const allFunding = funding ?? [];
  const approved = allFunding.filter((r) => r.human_approval === "approved");
  const declined = allFunding.filter((r) => r.human_approval === "declined");
  const pending = allFunding.filter((r) => r.human_approval === "pending");
  const totalCapital = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const avgDeal = approved.length ? totalCapital / approved.length : 0;
  const approvalRate = allFunding.length ? approved.length / allFunding.length * 100 : 0;
  const docKindCounts = (vaultDocs ?? []).reduce((acc, d) => {
    acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
    return acc;
  }, {});
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const prompt = `You are the Atlas Treasury Agent generating a comprehensive treasury health report.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Bio: ${profile?.bio ?? "not provided"}

Funding portfolio:
- Total requests: ${allFunding.length}
- Approved: ${approved.length} (${totalCapital.toLocaleString()} USD total)
- Declined: ${declined.length}
- Pending: ${pending.length}
- Approval rate: ${approvalRate.toFixed(1)}%
- Average deal size: $${avgDeal.toFixed(0)}
- Recent deals: ${approved.slice(0, 3).map((r) => `${r.title} ($${r.amount_requested})`).join("; ") || "none"}

Knowledge Vault documents: ${JSON.stringify(docKindCounts)}

Generate a treasury health report for the current period. Be concrete and actionable. 
If the user has no approved funding, focus on what they need to do to reach their first approval.
runway_estimate should reflect ability to sustain business operations based on available capital.`;
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: TreasuryReportSchema,
    prompt
  });
  void recordAgentEvent({
    userId,
    agent: "Treasury Agent",
    action: "treasury_report",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    outcome: object.health_score,
    metadata: {
      health_score: object.health_score,
      total_capital: totalCapital
    }
  });
  return object;
});
export {
  findFundingOpportunities_createServerFn_handler,
  generateTreasuryReport_createServerFn_handler
};
