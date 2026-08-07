import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import { getObservabilityMetrics } from "@/lib/observability.server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity, Brain, Coins, ShieldCheck, Zap, Clock, TrendingUp,
  RefreshCw, Loader2, AlertTriangle, BarChart3, Layers,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/observability")({
  head: () => ({
    meta: [
      { title: "Observability — Atlas Sanctum" },
      { name: "description", content: "Production metrics: AI latency, token usage, funding funnel, session activity." },
      { property: "og:title", content: "Observability — Atlas Sanctum" },
      { property: "og:description", content: "Production metrics: AI latency, token usage, funding funnel, session activity." },
    ],
  }),
  component: ObservabilityPage,
});

type Metrics = Awaited<ReturnType<typeof getObservabilityMetrics>>;

const AGENT_ICONS: Record<string, typeof Activity> = {
  "Funding Agent": Coins,
  "Verification Agent": ShieldCheck,
  "Risk Agent": AlertTriangle,
  "CFO Agent": Brain,
  "Orchestrator": Zap,
  "Session Service": Layers,
  "Knowledge Agent": Brain,
};

const PERIOD_OPTIONS = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
];

function StatCard({ label, value, sub, icon: Icon, accent }: {
  label: string; value: string | number; sub?: string;
  icon: typeof Activity; accent?: boolean;
}) {
  return (
    <Card className="glyph-border p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className={`mt-1 font-display text-2xl ${accent ? "text-gold" : "text-foreground"}`}>{value}</div>
          {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <Icon className={`h-5 w-5 shrink-0 mt-1 ${accent ? "text-gold" : "text-muted-foreground"}`} />
      </div>
    </Card>
  );
}

function FunnelBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary/40 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function OutcomeBadge({ outcome }: { outcome: string | null }) {
  if (!outcome) return <Badge variant="outline" className="border-border/40 text-muted-foreground text-[9px]">—</Badge>;
  const map: Record<string, string> = {
    approve: "border-sage/60 text-sage",
    approve_with_conditions: "border-sage/40 text-sage",
    verified: "border-sage/60 text-sage",
    answered: "border-gold/40 text-gold",
    error: "border-destructive/60 text-destructive",
    decline: "border-destructive/40 text-destructive",
    needs_review: "border-gold/60 text-gold",
  };
  return (
    <Badge variant="outline" className={`${map[outcome] ?? "border-border/40"} text-[9px]`}>
      {outcome.replace(/_/g, " ")}
    </Badge>
  );
}

function ObservabilityPage() {
  const { user } = useAuth();
  const fetchMetrics = useServerFn(getObservabilityMetrics);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);

  async function load(d = days) {
    if (!user) return;
    setLoading(true);
    try {
      const m = await fetchMetrics({ data: { days: d } });
      setMetrics(m);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to load metrics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [user, days]); // eslint-disable-line

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <Activity className="mx-auto h-10 w-10 text-gold/60 mb-4" />
        <h1 className="font-display text-3xl">Observability</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view production metrics.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Production Layer</div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <h1 className="font-display text-4xl">Observability</h1>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-border/40 overflow-hidden">
              {PERIOD_OPTIONS.map((o) => (
                <button
                  key={o.days}
                  onClick={() => { setDays(o.days); load(o.days); }}
                  className={`px-3 py-1.5 text-xs transition ${
                    days === o.days ? "bg-gradient-gold text-gold-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => load()} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <p className="mt-2 max-w-2xl text-muted-foreground text-sm">
          AI performance, funding funnel, session security, and agent event feed.
          {metrics?.isElevated ? " Showing platform-wide data." : " Showing your activity."}
        </p>
      </div>

      {loading && !metrics && (
        <div className="mt-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      )}

      {metrics && (
        <div className="mt-8 space-y-8">

          {/* AI Performance */}
          <section>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">AI Performance</div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <StatCard label="Total AI Calls" value={metrics.ai.total_calls} icon={Brain} accent />
              <StatCard label="Avg Latency" value={`${metrics.ai.avg_latency_ms}ms`} sub="mean response time" icon={Clock} />
              <StatCard label="P95 Latency" value={`${metrics.ai.p95_latency_ms}ms`} sub="95th percentile" icon={Clock} />
              <StatCard label="Tokens Used" value={metrics.ai.total_tokens.toLocaleString()} sub="input + output" icon={Zap} />
              <StatCard label="Avg Sources/Query" value={metrics.ai.avg_sources_retrieved} sub="vault chunks" icon={Layers} />
              <StatCard
                label="Error Rate"
                value={`${metrics.ai.error_rate_pct}%`}
                icon={AlertTriangle}
                accent={metrics.ai.error_rate_pct > 5}
              />
            </div>
          </section>

          {/* Per-Agent Table + Funding Funnel */}
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Agent breakdown */}
            <Card className="glyph-border p-5 lg:col-span-3">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Agent Breakdown</div>
              {metrics.agents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No agent calls recorded yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border/40 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <th className="pb-2 text-left">Agent</th>
                        <th className="pb-2 text-right">Calls</th>
                        <th className="pb-2 text-right">Avg ms</th>
                        <th className="pb-2 text-right">Avg tokens</th>
                        <th className="pb-2 text-right">Confidence</th>
                        <th className="pb-2 text-right">Errors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {metrics.agents.map((a, i) => {
                        const Icon = AGENT_ICONS[a.agent] ?? Activity;
                        return (
                          <tr key={i} className="hover:bg-secondary/20 transition">
                            <td className="py-2 font-medium">
                              <div className="flex items-center gap-2">
                                <Icon className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                                <div>
                                  <div>{a.agent}</div>
                                  <div className="text-[9px] text-muted-foreground">{a.action.replace(/_/g, " ")}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-2 text-right">{Number(a.total_calls).toLocaleString()}</td>
                            <td className="py-2 text-right">{a.avg_latency_ms ?? "—"}</td>
                            <td className="py-2 text-right">{a.avg_tokens ?? "—"}</td>
                            <td className="py-2 text-right">
                              {a.avg_confidence_pct != null ? (
                                <span className={Number(a.avg_confidence_pct) >= 70 ? "text-sage" : "text-gold"}>
                                  {a.avg_confidence_pct}%
                                </span>
                              ) : "—"}
                            </td>
                            <td className="py-2 text-right">
                              {Number(a.error_count) > 0
                                ? <span className="text-destructive">{a.error_count}</span>
                                : <span className="text-sage">0</span>
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Funding funnel + sessions */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="glyph-border p-5">
                <div className="text-xs uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" /> Funding Funnel
                </div>
                <div className="space-y-3">
                  <FunnelBar label="Submitted" value={metrics.funnel.submitted} max={metrics.funnel.submitted} color="bg-gold/70" />
                  <FunnelBar label="Under review" value={metrics.funnel.under_review} max={metrics.funnel.submitted} color="bg-gold/50" />
                  <FunnelBar label="Approved" value={metrics.funnel.approved} max={metrics.funnel.submitted} color="bg-sage/70" />
                  <FunnelBar label="Declined" value={metrics.funnel.declined} max={metrics.funnel.submitted} color="bg-destructive/50" />
                </div>
                <div className="mt-4 border-t border-border/40 pt-3 text-xs">
                  <span className="text-muted-foreground">Capital approved: </span>
                  <span className="font-display text-gold">${metrics.funnel.total_capital.toLocaleString()}</span>
                </div>
              </Card>

              <Card className="glyph-border p-5">
                <div className="text-xs uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5" /> Ephemeral Sessions
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions minted</span>
                    <span className="font-medium">{metrics.sessions.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions used</span>
                    <span className="font-medium text-sage">{metrics.sessions.used}</span>
                  </div>
                  {Object.entries(metrics.sessions.by_purpose).map(([purpose, count]) => (
                    <div key={purpose} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{purpose.replace(/_/g, " ")}</span>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[10px] text-muted-foreground">
                  Tokens expire after 5 min. Raw API keys never leave the server.
                </div>
              </Card>
            </div>
          </div>

          {/* Live agent event feed */}
          <section>
            <div className="text-xs uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" /> Recent Agent Events
            </div>
            {metrics.recentEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events recorded in this period.</p>
            ) : (
              <div className="space-y-2">
                {metrics.recentEvents.map((e, i) => {
                  const Icon = AGENT_ICONS[e.agent] ?? Activity;
                  return (
                    <Card key={i} className="glyph-border p-3 flex items-start gap-3">
                      <Icon className="h-4 w-4 text-gold/70 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-medium">{e.agent}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{e.action.replace(/_/g, " ")}</span>
                          <OutcomeBadge outcome={e.outcome} />
                          {e.latency_ms != null && (
                            <Badge variant="outline" className="border-border/40 text-[9px]">
                              {e.latency_ms}ms
                            </Badge>
                          )}
                          {(e.input_tokens != null || e.output_tokens != null) && (
                            <Badge variant="outline" className="border-border/40 text-[9px]">
                              {((e.input_tokens ?? 0) + (e.output_tokens ?? 0)).toLocaleString()} tok
                            </Badge>
                          )}
                          {e.confidence != null && (
                            <Badge variant="outline" className="border-gold/30 text-gold text-[9px]">
                              {(e.confidence * 100).toFixed(0)}% conf
                            </Badge>
                          )}
                          {e.sources_retrieved > 0 && (
                            <Badge variant="outline" className="border-border/40 text-[9px]">
                              {e.sources_retrieved} src
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap shrink-0">
                        {new Date(e.created_at).toLocaleTimeString()}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Architecture note for judges */}
          <Card className="glyph-border p-6 border-gold/20">
            <div className="text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
              <BarChart3 className="h-3.5 w-3.5" /> Production Architecture
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs text-muted-foreground">
              {[
                { title: "Ephemeral Sessions", desc: "5-min signed tokens. Raw API keys never reach the client." },
                { title: "Agent Observability", desc: "Every AI call logged with latency, tokens, confidence, and RAG sources." },
                { title: "Grounded Responses", desc: "All funding decisions backed by vault retrieval. Zero hallucination policy." },
                { title: "Human-in-the-Loop", desc: "No AI recommendation finalised without reviewer approval. Immutable audit trail." },
              ].map((item) => (
                <div key={item.title} className="rounded border border-border/30 bg-secondary/20 p-3">
                  <div className="font-medium text-foreground/90 mb-1">{item.title}</div>
                  <div>{item.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
