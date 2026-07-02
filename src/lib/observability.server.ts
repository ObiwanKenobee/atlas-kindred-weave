import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Json } from "@/integrations/supabase/types";

// ─── recordAgentEvent ─────────────────────────────────────────────────────────
// Call this after every AI inference in server functions. Fire-and-forget — wrap
// in void so it never blocks the primary response.
//
// Usage:
//   const t0 = Date.now();
//   const { object } = await generateObject({ ... });
//   void recordAgentEvent({ userId, agent: "Funding Agent", action: "funding_decision",
//     latencyMs: Date.now() - t0, inputTokens: usage.promptTokens,
//     outputTokens: usage.completionTokens, confidence: object.trust_assessment.score / 100,
//     outcome: object.recommendation, sourcesRetrieved: 0, metadata: { requestId } });

export async function recordAgentEvent(params: {
  userId: string | null;
  agent: string;
  action: string;
  latencyMs?: number;
  inputTokens?: number;
  outputTokens?: number;
  confidence?: number;
  outcome?: string;
  sourcesRetrieved?: number;
  metadata?: Record<string, unknown>;
}) {
  try {
    await supabaseAdmin.from("agent_events").insert({
      user_id: params.userId ?? undefined,
      agent: params.agent,
      action: params.action,
      latency_ms: params.latencyMs ?? null,
      input_tokens: params.inputTokens ?? null,
      output_tokens: params.outputTokens ?? null,
      confidence: params.confidence ?? null,
      outcome: params.outcome ?? null,
      sources_retrieved: params.sourcesRetrieved ?? 0,
      metadata: (params.metadata ?? {}) as Json,
    });
  } catch {
    // Never let observability failures break the primary flow
  }
}

// ─── recordInteractionStep ────────────────────────────────────────────────────
// Persists observable workflow steps for auditability (Interactions API pattern).

export async function recordInteractionStep(params: {
  userId: string | null;
  workflowId: string;
  step: string;
  status?: "running" | "complete" | "error";
  metadata?: Record<string, unknown>;
}) {
  try {
    await supabaseAdmin.from("interaction_steps").insert({
      user_id: params.userId ?? undefined,
      workflow_id: params.workflowId,
      step: params.step,
      status: params.status ?? "complete",
      metadata: (params.metadata ?? {}) as Json,
    });
  } catch {
    // Non-blocking
  }
}

// ─── getObservabilityMetrics ──────────────────────────────────────────────────

export const getObservabilityMetrics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ days: z.number().int().min(1).max(90).default(7) }).parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // Only admins/reviewers see platform-wide metrics; others see their own
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const isElevated = (roles ?? []).some((r) => r.role === "reviewer" || r.role === "admin");

    const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1000).toISOString();

    // ── Agent performance (per-agent averages) ────────────────────────────
    const perfQuery = supabaseAdmin
      .from("agent_performance" as never)
      .select("*");
    const { data: agentPerf } = await perfQuery;

    // ── Recent events (last 100) ──────────────────────────────────────────
    let eventsQuery = supabaseAdmin
      .from("agent_events")
      .select("id, agent, action, latency_ms, input_tokens, output_tokens, confidence, outcome, sources_retrieved, created_at, metadata")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(100);
    if (!isElevated) eventsQuery = eventsQuery.eq("user_id", userId);
    const { data: recentEvents } = await eventsQuery;

    // ── Ephemeral session counts ──────────────────────────────────────────
    let sessionsQuery = supabaseAdmin
      .from("ephemeral_sessions")
      .select("purpose, created_at, used_at")
      .gte("created_at", since);
    if (!isElevated) sessionsQuery = sessionsQuery.eq("user_id", userId);
    const { data: sessions } = await sessionsQuery;

    // ── Funding funnel (scoped) ───────────────────────────────────────────
    let fundingQuery = supabaseAdmin
      .from("funding_requests")
      .select("status, human_approval, amount_requested, created_at")
      .gte("created_at", since);
    if (!isElevated) fundingQuery = fundingQuery.eq("user_id", userId);
    const { data: fundingRows } = await fundingQuery;

    const funnel = {
      submitted: (fundingRows ?? []).length,
      under_review: (fundingRows ?? []).filter((r) => r.status === "under_review").length,
      approved: (fundingRows ?? []).filter((r) => r.human_approval === "approved").length,
      declined: (fundingRows ?? []).filter((r) => r.human_approval === "declined").length,
      total_capital: (fundingRows ?? [])
        .filter((r) => r.human_approval === "approved")
        .reduce((s, r) => s + Number(r.amount_requested), 0),
    };

    // ── Aggregate latency buckets from recentEvents ───────────────────────
    const events = (recentEvents ?? []) as {
      agent: string; action: string; latency_ms: number | null;
      input_tokens: number | null; output_tokens: number | null;
      confidence: number | null; outcome: string | null;
      sources_retrieved: number; created_at: string; metadata: Record<string, unknown>;
    }[];

    const latencies = events.filter((e) => e.latency_ms != null).map((e) => e.latency_ms!);
    const totalTokens = events.reduce((s, e) => s + (e.input_tokens ?? 0) + (e.output_tokens ?? 0), 0);
    const avgLatency = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
    const p95Latency = latencies.length
      ? latencies.sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)] ?? 0
      : 0;

    const errorRate = events.length
      ? +(events.filter((e) => e.outcome === "error").length / events.length * 100).toFixed(1)
      : 0;

    return {
      isElevated,
      period: { days: data.days, since },
      ai: {
        total_calls: events.length,
        avg_latency_ms: avgLatency,
        p95_latency_ms: p95Latency,
        total_tokens: totalTokens,
        error_rate_pct: errorRate,
        avg_sources_retrieved: events.length
          ? +(events.reduce((s, e) => s + e.sources_retrieved, 0) / events.length).toFixed(1)
          : 0,
      },
      agents: (agentPerf ?? []) as {
        agent: string; action: string; total_calls: number;
        avg_latency_ms: number; avg_tokens: number;
        avg_confidence_pct: number; avg_sources: number;
        error_count: number; last_call_at: string;
      }[],
      funnel,
      sessions: {
        total: (sessions ?? []).length,
        used: (sessions ?? []).filter((s) => s.used_at != null).length,
        by_purpose: (sessions ?? []).reduce<Record<string, number>>((acc, s) => {
          acc[s.purpose] = (acc[s.purpose] ?? 0) + 1;
          return acc;
        }, {}),
      },
      recentEvents: events.slice(0, 20),
    };
  });
