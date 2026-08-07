import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { getFundingEligibility, type EligibilityOutput } from "@/lib/launch.functions";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Sparkles, CheckCircle2, XCircle, AlertCircle,
  ArrowRight, ShieldCheck, Clock,
} from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Funding Eligibility — Atlas Sanctum" },
      { name: "description", content: "Check your funding eligibility and readiness score." },
      { property: "og:title", content: "Funding Eligibility — Atlas Sanctum" },
      { property: "og:description", content: "Check your funding eligibility and readiness score." },
    ],
  }),
  component: GatedEligibilityPage,
});

function GatedEligibilityPage() {
  return (
    <PlanGate feature="funding_eligibility">
      <EligibilityPage />
    </PlanGate>
  );
}

const READINESS_META = {
  not_ready: { label: "Not Ready",  color: "text-destructive border-destructive/60", bg: "bg-destructive/10" },
  building:  { label: "Building",   color: "text-gold border-gold/60",              bg: "bg-gold/5" },
  ready:     { label: "Ready",      color: "text-sage border-sage/60",              bg: "bg-sage/5" },
  strong:    { label: "Strong",     color: "text-sage border-sage/80",              bg: "bg-sage/10" },
};

const STATUS_META = {
  met:      { icon: CheckCircle2, color: "text-sage" },
  partial:  { icon: AlertCircle,  color: "text-gold" },
  not_met:  { icon: XCircle,      color: "text-destructive" },
};

const INSTRUMENT_LABELS = {
  grant:         "Grant",
  loan:          "Loan",
  revenue_share: "Revenue Share",
  equity:        "Equity",
  microfinance:  "Microfinance",
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function EligibilityPage() {
  const { user } = useAuth();
  const [result, setResult] = useState<EligibilityOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const fetch = useServerFn(getFundingEligibility);

  async function load() {
    if (!user) return;
    setBusy(true);
    try {
      const data = await fetch({ data: {} });
      setResult(data);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to check eligibility.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Atlas Launch · Funding</div>
          <h1 className="mt-3 font-display text-4xl">Funding Eligibility</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            AI assessment of your funding readiness — what you qualify for, what's blocking you, and how to get ready.
          </p>
        </div>
        <Button
          onClick={load}
          disabled={busy}
          className="mt-4 bg-gradient-gold text-gold-foreground shadow-glow"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : result ? <><Sparkles className="h-4 w-4" /> Re-check</> : <><ShieldCheck className="h-4 w-4" /> Check Eligibility</>}
        </Button>
      </div>

      {!result && !busy && (
        <div className="mt-16 flex flex-col items-center gap-4 text-center text-muted-foreground">
          <ShieldCheck className="h-10 w-10 text-gold/30" />
          <p className="text-sm max-w-xs">
            Click Check Eligibility to get an AI assessment of your funding readiness based on your trust score, verification history, and business activity.
          </p>
          <div className="mt-4 grid gap-2 w-full max-w-xs text-xs text-left">
            {["Identity verification", "Business activity evidence", "Trust score threshold", "Prior funding history"].map((c) => (
              <div key={c} className="flex items-center gap-2 rounded border border-border/30 bg-secondary/20 px-3 py-2 text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-gold shrink-0" /> {c}
              </div>
            ))}
          </div>
        </div>
      )}

      {busy && !result && (
        <div className="mt-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      )}

      {result && (() => {
        const readiness = READINESS_META[result.readiness_level];
        return (
          <div className="mt-8 space-y-6">
            {/* Score + readiness */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className={`glyph-border p-6 col-span-1 flex flex-col items-center justify-center text-center ${readiness.bg}`}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Eligibility Score</div>
                <div className={`mt-2 font-display text-6xl ${readiness.color.split(" ")[0]}`}>
                  {result.overall_score}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">/ 100</div>
                <Badge variant="outline" className={`mt-3 ${readiness.color}`}>
                  {readiness.label}
                </Badge>
              </Card>
              <Card className="glyph-border p-6 col-span-2">
                <div className="text-xs uppercase tracking-widest text-gold mb-2">Assessment</div>
                <p className="text-sm text-foreground/90">{result.headline}</p>
                {result.blocking_issues.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-widest text-destructive mb-2">Blocking Issues</div>
                    <ul className="space-y-1">
                      {result.blocking_issues.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/80">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.estimated_days_to_ready > 0 && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Estimated {result.estimated_days_to_ready} days to reach funding readiness
                  </div>
                )}
              </Card>
            </div>

            {/* Criteria */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Eligibility Criteria</div>
              <div className="space-y-4">
                {result.criteria.map((c, i) => {
                  const meta = STATUS_META[c.status];
                  const Icon = meta.icon;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 shrink-0 ${meta.color}`} />
                          <span className="text-sm font-medium">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-medium ${meta.color}`}>{c.score}/100</span>
                          <Badge variant="outline" className={`text-[9px] ${meta.color} border-current/40`}>
                            {c.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                      <div className="ml-6">
                        <div className="h-1.5 w-full rounded-full bg-secondary mb-1">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-700 ${c.status === "met" ? "bg-sage" : c.status === "partial" ? "bg-gold" : "bg-destructive/60"}`}
                            style={{ width: `${c.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{c.notes}</p>
                        {c.status !== "met" && (
                          <p className="text-xs text-gold mt-0.5">→ {c.action}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Eligible instruments */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">You May Qualify For</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.eligible_instruments.map((inst, i) => (
                  <div key={i} className="rounded-md border border-border/40 bg-secondary/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-gold/40 text-gold text-xs">
                        {INSTRUMENT_LABELS[inst.type]}
                      </Badge>
                      <span className="font-display text-lg text-gold">
                        up to {fmt(inst.max_amount)} {inst.currency}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {inst.conditions.map((cond, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex gap-1.5">
                          <span className="text-gold shrink-0">·</span> {cond}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* Next steps */}
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">Next Steps</div>
              <ol className="space-y-2">
                {result.next_steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-display text-gold shrink-0">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm" className="bg-gradient-gold text-gold-foreground shadow-glow">
                  <Link to="/funding"><Sparkles className="h-3.5 w-3.5" /> Apply for Funding</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/verification"><ShieldCheck className="h-3.5 w-3.5" /> Submit Proof <ArrowRight className="h-3 w-3" /></Link>
                </Button>
              </div>
            </Card>

            <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-right">
              AI assessment · {new Date().toLocaleString()}
            </p>
          </div>
        );
      })()}
    </div>
  );
}
