import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, h as numberType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const getObservabilityMetrics_createServerFn_handler = createServerRpc({
  id: "741594ab2472aa9463e4cf8d90ef701b740ecaf5cbddb205376cd6b5f3ecce2e",
  name: "getObservabilityMetrics",
  filename: "src/lib/observability.server.ts"
}, (opts) => getObservabilityMetrics.__executeServer(opts));
const getObservabilityMetrics = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  days: numberType().int().min(1).max(90).default(7)
}).parse(d)).handler(getObservabilityMetrics_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: roles
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
  const isElevated = (roles ?? []).some((r) => r.role === "reviewer" || r.role === "admin");
  const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1e3).toISOString();
  const perfQuery = supabaseAdmin.from("agent_performance").select("*");
  const {
    data: agentPerf
  } = await perfQuery;
  let eventsQuery = supabaseAdmin.from("agent_events").select("id, agent, action, latency_ms, input_tokens, output_tokens, confidence, outcome, sources_retrieved, created_at, metadata").gte("created_at", since).order("created_at", {
    ascending: false
  }).limit(100);
  if (!isElevated) eventsQuery = eventsQuery.eq("user_id", userId);
  const {
    data: recentEvents
  } = await eventsQuery;
  let sessionsQuery = supabaseAdmin.from("ephemeral_sessions").select("purpose, created_at, used_at").gte("created_at", since);
  if (!isElevated) sessionsQuery = sessionsQuery.eq("user_id", userId);
  const {
    data: sessions
  } = await sessionsQuery;
  let fundingQuery = supabaseAdmin.from("funding_requests").select("status, human_approval, amount_requested, created_at").gte("created_at", since);
  if (!isElevated) fundingQuery = fundingQuery.eq("user_id", userId);
  const {
    data: fundingRows
  } = await fundingQuery;
  const funnel = {
    submitted: (fundingRows ?? []).length,
    under_review: (fundingRows ?? []).filter((r) => r.status === "under_review").length,
    approved: (fundingRows ?? []).filter((r) => r.human_approval === "approved").length,
    declined: (fundingRows ?? []).filter((r) => r.human_approval === "declined").length,
    total_capital: (fundingRows ?? []).filter((r) => r.human_approval === "approved").reduce((s, r) => s + Number(r.amount_requested), 0)
  };
  const events = recentEvents ?? [];
  const latencies = events.filter((e) => e.latency_ms != null).map((e) => e.latency_ms);
  const totalTokens = events.reduce((s, e) => s + (e.input_tokens ?? 0) + (e.output_tokens ?? 0), 0);
  const avgLatency = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
  const p95Latency = latencies.length ? latencies.sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)] ?? 0 : 0;
  const errorRate = events.length ? +(events.filter((e) => e.outcome === "error").length / events.length * 100).toFixed(1) : 0;
  return {
    isElevated,
    period: {
      days: data.days,
      since
    },
    ai: {
      total_calls: events.length,
      avg_latency_ms: avgLatency,
      p95_latency_ms: p95Latency,
      total_tokens: totalTokens,
      error_rate_pct: errorRate,
      avg_sources_retrieved: events.length ? +(events.reduce((s, e) => s + e.sources_retrieved, 0) / events.length).toFixed(1) : 0
    },
    agents: agentPerf ?? [],
    funnel,
    sessions: {
      total: (sessions ?? []).length,
      used: (sessions ?? []).filter((s) => s.used_at != null).length,
      by_purpose: (sessions ?? []).reduce((acc, s) => {
        acc[s.purpose] = (acc[s.purpose] ?? 0) + 1;
        return acc;
      }, {})
    },
    recentEvents: events.slice(0, 20)
  };
});
export {
  getObservabilityMetrics_createServerFn_handler
};
