import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { getRevenueTracking, type RevenueOutput } from "@/lib/launch.functions";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Sparkles, TrendingUp, TrendingDown, Minus,
  CheckCircle2, Circle, Clock, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

export const Route = createFileRoute("/revenue")({
  head: () => ({
    meta: [
      { title: "Revenue Tracking — Atlas Sanctum" },
      { name: "description", content: "Track and forecast your business revenue with AI." },
      { property: "og:title", content: "Revenue Tracking — Atlas Sanctum" },
      { property: "og:description", content: "Track and forecast your business revenue with AI." },
    ],
  }),
  component: GatedRevenuePage,
});

function GatedRevenuePage() {
  return (
    <PlanGate feature="revenue_tracking">
      <RevenuePage />
    </PlanGate>
  );
}

const TREND_META = {
  growing:     { icon: TrendingUp,   color: "text-sage",             label: "Growing" },
  stable:      { icon: Minus,        color: "text-gold",             label: "Stable" },
  declining:   { icon: TrendingDown, color: "text-destructive",      label: "Declining" },
  early_stage: { icon: Sparkles,     color: "text-gold",             label: "Early Stage" },
  unknown:     { icon: Minus,        color: "text-muted-foreground", label: "Unknown" },
};

const STATUS_META = {
  achieved:    { icon: CheckCircle2, color: "text-sage" },
  in_progress: { icon: Clock,        color: "text-gold" },
  not_started: { icon: Circle,       color: "text-muted-foreground" },
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function RevenuePage() {
  const { user } = useAuth();
  const [result, setResult] = useState<RevenueOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const fetch = useServerFn(getRevenueTracking);

  async function load() {
    if (!user) return;
    setBusy(true);
    try {
      const data = await fetch({ data: {} });
      setResult(data);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to load revenue data.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Atlas Launch · Revenue</div>
          <h1 className="mt-3 font-display text-4xl">Revenue Tracking</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            AI-powered revenue analysis, growth tracking, and milestone management for your business.
          </p>
        </div>
        <Button
          onClick={load}
          disabled={busy}
          className="mt-4 bg-gradient-gold text-gold-foreground shadow-glow"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : result ? <><RefreshCw className="h-4 w-4" /> Refresh</> : <><Sparkles className="h-4 w-4" /> Analyse</>}
        </Button>
      </div>

      {!result && !busy && (
        <div className="mt-16 flex flex-col items-center gap-4 text-center text-muted-foreground">
          <TrendingUp className="h-10 w-10 text-gold/30" />
          <p className="text-sm max-w-xs">Click Analyse to generate your AI revenue report based on your funding history and business profile.</p>
        </div>
      )}

      {busy && !result && (
        <div className="mt-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      )}

      {result && (() => {
        const trend = TREND_META[result.revenue_trend];
        const TrendIcon = trend.icon;
        return (
          <div className="mt-8 space-y-6">
            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="glyph-border p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Est. MRR</div>
                <div className="mt-2 font-display text-3xl text-gold">{fmt(result.estimated_mrr)}</div>
                <div className="mt-1 text-xs text-muted-foreground">{result.period}</div>
              </Card>
              <Card className="glyph-border p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Est. ARR</div>
                <div className="mt-2 font-display text-3xl">{fmt(result.estimated_arr)}</div>
              </Card>
              <Card className={`glyph-border p-5 ${trend.color}`}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Trend</div>
                <div className="mt-2 flex items-center gap-2 font-display text-xl">
                  <TrendIcon className="h-5 w-5" /> {trend.label}
                </div>
              </Card>
              <Card className="glyph-border p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Growth Rate</div>
                <div className={`mt-2 font-display text-3xl ${result.growth_rate_pct >= 0 ? "text-sage" : "text-destructive"}`}>
                  {result.growth_rate_pct >= 0 ? "+" : ""}{result.growth_rate_pct.toFixed(1)}%
                </div>
              </Card>
            </div>

            {/* Revenue sources */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Revenue Sources</div>
              <div className="space-y-4">
                {result.top_revenue_sources.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{s.source}</span>
                      <span className="text-gold">{s.estimated_contribution_pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-gradient-gold transition-all duration-700"
                        style={{ width: `${s.estimated_contribution_pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.notes}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Milestones */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Revenue Milestones</div>
              <div className="space-y-3">
                {result.milestones.map((m, i) => {
                  const meta = STATUS_META[m.status];
                  const Icon = meta.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${meta.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium">{m.label}</span>
                          <Badge variant="outline" className={`text-[9px] shrink-0 ${meta.color} border-current/40`}>
                            {m.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{m.target}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Forecast + recommendations */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="glyph-border p-6">
                <div className="text-xs uppercase tracking-widest text-gold mb-2">Next Quarter Forecast</div>
                <p className="text-sm text-foreground/90">{result.forecast_next_quarter}</p>
              </Card>
              <Card className="glyph-border p-6">
                <div className="text-xs uppercase tracking-widest text-gold mb-3">Recommendations</div>
                <ol className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="font-display text-gold shrink-0">{i + 1}.</span> {r}
                    </li>
                  ))}
                </ol>
              </Card>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-right">
              AI estimate · {new Date().toLocaleString()}
            </p>
          </div>
        );
      })()}
    </div>
  );
}
