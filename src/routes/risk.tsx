import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { computeRiskScore, type RiskOutput } from "@/lib/risk.functions";
import { submitApproval } from "@/lib/approvals.functions";
import { useAuth } from "@/lib/auth";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, ShieldCheck, Sparkles, TrendingUp, Gavel } from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

const m = SANCTUM_MODULES.find((x) => x.slug === "risk")!;

export const Route = createFileRoute("/risk")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
      { property: "og:title", content: `${m.name} — Atlas Sanctum` },
      { property: "og:description", content: m.purpose },
    ],
  }),
  component: GatedRiskPage,
});

function GatedRiskPage() {
  return (
    <PlanGate feature="trust_score">
      <RiskPage />
    </PlanGate>
  );
}

const RISK_COLORS: Record<RiskOutput["risk_level"], string> = {
  very_low: "text-sage border-sage/60",
  low: "text-sage border-sage/40",
  medium: "text-gold border-gold/60",
  high: "text-orange-400 border-orange-400/60",
  very_high: "text-destructive border-destructive/60",
};

const RISK_LABELS: Record<RiskOutput["risk_level"], string> = {
  very_low: "Very Low",
  low: "Low",
  medium: "Medium",
  high: "High",
  very_high: "Very High",
};

function ScoreArc({ score }: { score: number }) {
  // SVG half-circle gauge 0–100
  const r = 54;
  const cx = 70;
  const cy = 70;
  const circumference = Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  return (
    <svg width="140" height="80" viewBox="0 0 140 80" className="overflow-visible">
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-border"
      />
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={score >= 70 ? "text-sage" : score >= 40 ? "text-gold" : "text-destructive"}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground font-bold" fontSize="22">
        {score}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        / 100
      </text>
    </svg>
  );
}

function RiskPage() {
  const { user } = useAuth();
  const [result, setResult] = useState<RiskOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const [reviewBusy, setReviewBusy] = useState(false);
  const score = useServerFn(computeRiskScore);
  const submit = useServerFn(submitApproval);

  async function run() {
    if (!user) return toast.error("Sign in to run the Risk Engine.");
    setBusy(true);
    try {
      const res = await score({ data: {} });
      setResult(res);
      toast.success("Risk profile updated.");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Risk computation failed.");
    } finally {
      setBusy(false);
    }
  }

  async function requestOverride() {
    if (!user || !result) return;
    setReviewBusy(true);
    try {
      await submit({ data: {
        kind: "risk_override",
        title: `Request risk override — currently ${result.risk_level.replace("_", " ")}`,
        rationale: `Auto risk score ${result.trust_score}/100. Requesting reviewer to override this classification.`,
        entity_type: "profile",
        proposed_change: {
          current_risk_level: result.risk_level,
          current_trust_score: result.trust_score,
          flags: result.flags,
        },
      }});
      toast.success("Sent to the approval queue");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to submit");
    } finally { setReviewBusy(false); }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-start justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
            <span className="font-display">{m.glyph}</span>
            <span>Engine</span>
          </div>
          <h1 className="mt-3 font-display text-4xl">{m.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{m.tagline}</p>
        </div>
        <Button
          onClick={run}
          disabled={busy || !user}
          className="mt-6 bg-gradient-gold text-gold-foreground shadow-glow"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <><Sparkles className="h-4 w-4" /> Compute my risk profile</>
          )}
        </Button>
      </div>

      {!result && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {m.metrics.map((k) => (
            <Card key={k.label} className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{k.label}</div>
              <div className="mt-2 font-display text-3xl">{k.value}</div>
              {k.delta && <div className="mt-1 text-xs text-sage">{k.delta}</div>}
            </Card>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          {/* Score + level */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="glyph-border flex flex-col items-center justify-center p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Trust Score</div>
              <div className="mt-3">
                <ScoreArc score={result.trust_score} />
              </div>
            </Card>
            <Card className={`glyph-border p-6 ${RISK_COLORS[result.risk_level]}`}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Risk Level</div>
              <div className="mt-3 font-display text-3xl">{RISK_LABELS[result.risk_level]}</div>
              <Badge variant="outline" className={`mt-3 ${RISK_COLORS[result.risk_level]}`}>
                <AlertTriangle className="mr-1 h-3 w-3" /> {result.risk_level.replace("_", " ")}
              </Badge>
            </Card>
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommendation</div>
              <div className="mt-3 font-display text-lg leading-snug">
                {result.recommendation.replace(/_/g, " ")}
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-sage">
                <ShieldCheck className="h-3.5 w-3.5" /> AI Risk Agent
              </div>
            </Card>
          </div>

          {/* Behavioral signals */}
          <Card className="glyph-border p-6">
            <div className="text-xs uppercase tracking-widest text-gold">Behavioral Signals</div>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {[
                { label: "Verified proofs", value: result.signals.verified_events },
                { label: "Rejected proofs", value: result.signals.rejected_events },
                { label: "Funding requests", value: result.signals.funding_requests_count },
                { label: "Approvals", value: result.signals.approvals_count },
                { label: "Capital approved", value: `$${result.signals.total_funded.toLocaleString()}` },
                { label: "Approval rate", value: `${(result.signals.repayment_rate * 100).toFixed(0)}%` },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  <div className="mt-1 font-display text-xl">{s.value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Rationale */}
          <Card className="glyph-border p-6">
            <div className="text-xs uppercase tracking-widest text-gold">AI Rationale</div>
            <p className="mt-3 text-sm text-foreground/90">{result.rationale}</p>
          </Card>

          {/* Flags */}
          {result.flags.length > 0 && (
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold">
                <AlertTriangle className="mr-2 inline h-3.5 w-3.5" />Active Flags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.flags.map((f) => (
                  <Badge key={f} variant="outline" className="border-gold/40 text-foreground/80">
                    {f}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" />
            Trust score written back to your profile. Re-run after submitting new proofs.
            <Button variant="ghost" size="sm" onClick={requestOverride} disabled={reviewBusy} className="ml-auto text-xs">
              {reviewBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Gavel className="mr-1 h-3 w-3" />Request override</>}
            </Button>
            <Button variant="ghost" size="sm" onClick={run} disabled={busy} className="text-xs text-gold">
              {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Re-run"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
