import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as requireFeature } from "./entitlements.server-Dp7K62E0.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, i as stringType, k as enumType, j as arrayType } from "../_libs/zod.mjs";
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
const AdvisorInput = objectType({
  question: stringType().min(5).max(1e3)
});
const AdvisorOutputSchema = objectType({
  answer: stringType().min(20).max(1500),
  recommendations: arrayType(stringType()).min(1).max(6),
  risks: arrayType(stringType()).min(0).max(4),
  next_actions: arrayType(stringType()).min(1).max(4),
  confidence: enumType(["high", "medium", "low"])
});
const askAdvisor_createServerFn_handler = createServerRpc({
  id: "0fce52ea9259f34e91391d84816711a82b4e5df89d72a9e92824198da2acda20",
  name: "askAdvisor",
  filename: "src/lib/advisor.functions.ts"
}, (opts) => askAdvisor.__executeServer(opts));
const askAdvisor = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AdvisorInput.parse(d)).handler(askAdvisor_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "advisor");
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
    data: riskScore
  }] = await Promise.all([supabaseAdmin.from("profiles").select("display_name, trust_score, verified, region, bio").eq("user_id", userId).single(), supabaseAdmin.from("funding_requests").select("title, sector, amount_requested, currency, status, human_approval, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(5), supabaseAdmin.from("verification_events").select("kind, status").eq("user_id", userId).limit(20), supabaseAdmin.from("risk_scores").select("trust_score, risk_level, recommendation").eq("user_id", userId).order("computed_at", {
    ascending: false
  }).limit(1).maybeSingle()]);
  const approved = (funding ?? []).filter((r) => r.human_approval === "approved");
  const totalFunded = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const sectors = [...new Set((funding ?? []).map((r) => r.sector).filter(Boolean))];
  const verifiedCount = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const prompt = `You are the Atlas AI Business Advisor — a trusted strategic advisor for entrepreneurs in emerging markets.

User profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unspecified"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false} (${verifiedCount} verification events)
- Risk level: ${riskScore?.risk_level ?? "unknown"}

Funding history:
- Total funded: $${totalFunded.toLocaleString()} across ${approved.length} approved requests
- Sectors: ${sectors.join(", ") || "none yet"}
- Recent requests: ${(funding ?? []).length}

User's question:
"${data.question}"

Provide strategic, practical advice grounded in their specific context. Be direct, honest, and actionable. Reference their trust score and verification status where relevant. Speak like a seasoned mentor, not a textbook.`;
  const {
    object
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: AdvisorOutputSchema,
    prompt
  });
  return object;
});
export {
  askAdvisor_createServerFn_handler
};
