import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { getCashflowInsights, type CashflowOutput } from "@/lib/launch.functions";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Sparkles, TrendingUp, TrendingDown, Minus,
  AlertTriangle, CheckCircle2, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

export const Route = createFileRoute("/cashflow")({
  head: () => ({
    meta: [
      { title: "Cashflow Insights — Atlas Sanctum" },
      { name: "description", content: "AI-powered cashflow analysis for your business." },
    ],
  }),
  component: GatedCashflowPage,
});

function GatedCashflowPage() {
  return (
    <PlanGate feature="cashflow_insights">
      <CashflowPage />
    </PlanGate>
  );
}

const GRADE_COLOR: Record<string, string> = {
  A: "text-sage border-sage/60",
  B: "text-gold border-gold/60",
  C: "text-orange-400 border-orange-400/60",
  D: "text-destructive border-destructive/60",
  F: "text-destructive border-destructive/80",
};

const TREND_ICON = {
  improving: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
  unknown: Minus,
};

const TREND_COLOR = {
  improving: "text-sage",
  stable: "text-gold",
  declining: "text-destructive",
  unknown: "text-muted-foreground",
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function CashflowPage() {
  const { user } = useAuth();
  const [result, setResult] = useState<CashflowOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const fetch = useServerFn(getCashflowInsights);

  async function load() {
    if (!user) return;
    setBusy(true);
    try {
      const data = await fetch({ data: {} });
      setResult(data);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to load cashflow insights.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Atlas Launch · Treasury</div>
          <h1 className="mt-3 font-display text-4xl">Cashflow Insights</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            AI-powered cashflow analysis grounded in your funding history and business activity.
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
          <p className="text-sm max-w-xs">Click Analyse to generate your AI cashflow report based on your funding history and business profile.</p>
        </div>
      )}

      {busy && !result && (
        <div className="mt-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          {/* Header KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className={`glyph-border p-5 ${GRADE_COLOR[result.health_grade]}`}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Health Grade</div>
              <div className="mt-2 font-display text-5xl">{result.health_grade}</div>
              <div className="mt-1 text-xs text-muted-foreground">{result.period}</div>
            </Card>
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Monthly Inflow</div>
              <div className="mt-2 font-display text-3xl text-sage">{fmt(result.estimated_monthly_inflow)}</div>
            </Card>
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Monthly Outflow</div>
              <div className="mt-2 font-display text-3xl text-gold">{fmt(result.estimated_monthly_outflow)}</div>
            </Card>
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Net Cashflow</div>
              <div className={`mt-2 font-display text-3xl ${result.net_cashflow >= 0 ? "text-sage" : "text-destructive"}`}>
                {result.net_cashflow >= 0 ? "+" : ""}{fmt(result.net_cashflow)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{result.runway_months.toFixed(1)} mo runway</div>
            </Card>
          </div>

          {/* Trend + headline */}
          <Card className="glyph-border p-6">
            <div className="flex items-center gap-3">
              {(() => { const Icon = TREND_ICON[result.cashflow_trend]; return <Icon className={`h-5 w-5 ${TREND_COLOR[result.cashflow_trend]}`} />; })()}
              <div>
                <div className={`text-xs uppercase tracking-widest ${TREND_COLOR[result.cashflow_trend]}`}>{result.cashflow_trend.replace("_", " ")}</div>
                <p className="mt-1 text-sm text-foreground/90">{result.headline}</p>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Observations */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">Key Observations</div>
              <ul className="space-y-2">
                {result.key_observations.map((o, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> {o}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Risks */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">Risks</div>
              <ul className="space-y-2">
                {result.risks.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {r}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommendations */}
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

          {/* Next 30 days */}
          <Card className="glyph-border border-gold/30 p-6">
            <div className="text-xs uppercase tracking-widest text-gold mb-2">Next 30 Days</div>
            <p className="text-sm text-foreground/90">{result.next_30_days}</p>
          </Card>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-right">
            AI estimate · {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
