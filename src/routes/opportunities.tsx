import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import {
  findFundingOpportunities,
  generateTreasuryReport,
  type OpportunityOutput,
  type TreasuryReportOutput,
} from "@/lib/research.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, Loader2, Sparkles, TrendingUp, ExternalLink,
  CheckCircle2, Circle, Zap, FileText, BarChart3, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunity Hub — Atlas Sanctum" },
      { name: "description", content: "AI-matched grants, investors, accelerators, and funding programs for your business." },
      { property: "og:title", content: "Opportunity Hub — Atlas Sanctum" },
      { property: "og:description", content: "AI-matched grants, investors, accelerators, and funding programs for your business." },
    ],
  }),
  component: GatedOpportunitiesPage,
});

function GatedOpportunitiesPage() {
  return (
    <PlanGate feature="funding_match">
      <OpportunitiesPage />
    </PlanGate>
  );
}

const TYPE_COLORS: Record<string, string> = {
  grant: "border-sage/60 text-sage",
  loan: "border-gold/60 text-gold",
  equity: "border-gold/40 text-gold",
  accelerator: "border-blue-400/60 text-blue-400",
  government: "border-purple-400/60 text-purple-400",
  ngo: "border-sage/40 text-sage",
  cooperative: "border-orange-400/60 text-orange-400",
};

// The Atlas Observe→Act loop steps
const WORKFLOW_STEPS = [
  { key: "observe", label: "Observe", desc: "Scan profile, vault, and history" },
  { key: "understand", label: "Understand", desc: "Parse sector, region, trust score" },
  { key: "verify", label: "Verify", desc: "Check verification evidence" },
  { key: "reason", label: "Reason", desc: "Research Agent matches opportunities" },
  { key: "act", label: "Act", desc: "Generate ranked opportunity list" },
  { key: "record", label: "Record", desc: "Log agent event to observability" },
  { key: "learn", label: "Learn", desc: "Refine fit scores over time" },
];

function WorkflowStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {WORKFLOW_STEPS.map((step, i) => {
        const done = i < activeStep;
        const active = i === activeStep;
        return (
          <div key={step.key} className="flex items-center gap-1">
            <div
              title={step.desc}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest transition-all ${
                done
                  ? "bg-sage/20 text-sage border border-sage/40"
                  : active
                  ? "bg-gold/20 text-gold border border-gold/60 animate-pulse"
                  : "bg-secondary/40 text-muted-foreground border border-border/30"
              }`}
            >
              {done ? (
                <CheckCircle2 className="h-2.5 w-2.5" />
              ) : active ? (
                <Zap className="h-2.5 w-2.5" />
              ) : (
                <Circle className="h-2.5 w-2.5" />
              )}
              {step.label}
            </div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <ArrowRight className="h-2.5 w-2.5 text-border/60 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FitBar({ score }: { score: number }) {
  const color = score >= 70 ? "bg-sage" : score >= 45 ? "bg-gold" : "bg-destructive/60";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-secondary">
        <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-medium tabular-nums ${score >= 70 ? "text-sage" : score >= 45 ? "text-gold" : "text-destructive"}`}>
        {score}%
      </span>
    </div>
  );
}

function OpportunityCard({ opp, rank }: { opp: OpportunityOutput["opportunities"][number]; rank: number }) {
  return (
    <Card className="glyph-border p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-display text-[10px] text-gold/60">#{rank}</span>
            <Badge variant="outline" className={`${TYPE_COLORS[opp.type] ?? "border-border/40"} text-[9px]`}>
              {opp.type}
            </Badge>
          </div>
          <div className="font-display text-base leading-snug">{opp.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{opp.provider}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-sm text-gold">{opp.estimated_amount}</div>
        </div>
      </div>

      <p className="text-xs text-foreground/80 leading-relaxed">{opp.description}</p>

      <div>
        <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1.5">Fit score</div>
        <FitBar score={opp.fit_score} />
        <p className="text-[10px] text-muted-foreground mt-1">{opp.fit_rationale}</p>
      </div>

      <div>
        <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Eligibility</div>
        <ul className="space-y-0.5">
          {opp.eligibility.map((e, i) => (
            <li key={i} className="text-xs text-foreground/70 flex gap-1.5">
              <span className="text-gold shrink-0">·</span> {e}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/30">
        <div className="text-xs text-sage">{opp.next_step}</div>
        {opp.url_hint && (
          <a
            href={opp.url_hint.startsWith("http") ? opp.url_hint : `https://${opp.url_hint}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground hover:text-gold"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </Card>
  );
}

function TreasuryReportPanel({ report }: { report: TreasuryReportOutput }) {
  const healthColor: Record<string, string> = {
    "A+": "text-sage", "A": "text-sage", "B+": "text-gold", "B": "text-gold",
    "C": "text-orange-400", "D": "text-destructive",
  };
  return (
    <Card className="glyph-border p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold mb-1 flex items-center gap-2">
            <BarChart3 className="h-3.5 w-3.5" /> Treasury Report · {report.period}
          </div>
          <div className={`font-display text-4xl ${healthColor[report.health_score] ?? "text-foreground"}`}>
            {report.health_score}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Runway</div>
          <div className="font-display text-sm text-foreground">{report.runway_estimate}</div>
        </div>
      </div>

      <p className="text-sm text-foreground/90">{report.headline}</p>
      <p className="text-xs text-muted-foreground">{report.cashflow_assessment}</p>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Capital approved</div>
          <div className="font-medium">${report.kpis.total_capital_approved.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Approval rate</div>
          <div className="font-medium">{report.kpis.approval_rate_pct.toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Avg deal size</div>
          <div className="font-medium">${report.kpis.avg_deal_size.toFixed(0)}</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Portfolio</div>
          <div className="font-medium">{report.kpis.portfolio_health}</div>
        </div>
      </div>

      {report.top_risks.length > 0 && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-gold mb-1.5">Risks</div>
          <ul className="space-y-1">
            {report.top_risks.map((r, i) => (
              <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                <span className="text-destructive shrink-0">·</span> {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.recommendations.length > 0 && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-gold mb-1.5">Recommendations</div>
          <ul className="space-y-1">
            {report.recommendations.map((r, i) => (
              <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                <span className="text-sage shrink-0">{i + 1}.</span> {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-border/30 pt-3 text-xs text-sage">
        Next milestone: {report.next_milestone}
      </div>
    </Card>
  );
}

function OpportunitiesPage() {
  const { user } = useAuth();
  const searchOpps = useServerFn(findFundingOpportunities);
  const genReport = useServerFn(generateTreasuryReport);

  const [focus, setFocus] = useState("");
  const [result, setResult] = useState<OpportunityOutput | null>(null);
  const [treasury, setTreasury] = useState<TreasuryReportOutput | null>(null);
  const [searching, setSearching] = useState(false);
  const [reportBusy, setReportBusy] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to find opportunities.");
    setSearching(true);
    setResult(null);
    setActiveStep(0);

    try {
      // Animate through Observe→Reason steps while the server call runs
      const stepInterval = setInterval(() => {
        setActiveStep((s) => (s < 4 ? s + 1 : s));
      }, 600);

      const data = await searchOpps({ data: { focus: focus || undefined } });
      clearInterval(stepInterval);
      setActiveStep(5); // Record
      setTimeout(() => setActiveStep(6), 400); // Learn
      setTimeout(() => setActiveStep(-1), 1200);
      setResult(data);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Research failed");
      setActiveStep(-1);
    } finally {
      setSearching(false);
    }
  }

  async function loadReport() {
    if (!user) return toast.error("Sign in to generate a treasury report.");
    setReportBusy(true);
    try {
      const data = await genReport({ data: {} });
      setTreasury(data);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Report failed");
    } finally {
      setReportBusy(false);
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <Search className="mx-auto h-10 w-10 text-gold/60 mb-4" />
        <h1 className="font-display text-3xl">Opportunity Hub</h1>
        <p className="mt-3 text-muted-foreground">Sign in to discover grants, investors, and accelerators matched to your business.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Research Agent</div>
        <h1 className="mt-3 font-display text-4xl">Opportunity Hub</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          AI-matched grants, loans, accelerators, and investors. Every result is grounded in your profile, region, and trust score.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {/* Workflow stepper */}
        {activeStep >= 0 && <WorkflowStepper activeStep={activeStep} />}

        {/* Search bar */}
        <form onSubmit={search} className="flex gap-2">
          <Input
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Optional focus — e.g. 'women-owned agri business in Kenya' or 'tech startup'"
            className="flex-1"
          />
          <Button type="submit" disabled={searching} className="bg-gradient-gold text-gold-foreground shadow-glow shrink-0">
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Find Opportunities</>}
          </Button>
        </form>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Opportunity cards */}
        <div className="lg:col-span-3 space-y-4">
          {result ? (
            <>
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-gold">
                  {result.opportunities.length} opportunities matched
                </div>
              </div>

              {/* Summary */}
              <Card className="glyph-border p-4 border-gold/20">
                <p className="text-sm text-foreground/90">{result.summary}</p>
                {result.readiness_gap && (
                  <p className="mt-2 text-xs text-gold">{result.readiness_gap}</p>
                )}
                {result.recommended_priority && (
                  <p className="mt-1 text-xs text-sage">{result.recommended_priority}</p>
                )}
              </Card>

              {result.opportunities
                .sort((a, b) => b.fit_score - a.fit_score)
                .map((opp, i) => (
                  <OpportunityCard key={i} opp={opp} rank={i + 1} />
                ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-muted-foreground">
              <TrendingUp className="h-10 w-10 text-gold/30" />
              <div className="text-sm max-w-xs">
                The Research Agent scans grants, investors, accelerators, and government programs to find opportunities matched to your profile.
              </div>
              <div className="mt-2 grid gap-2 w-full max-w-xs text-xs text-left">
                {[
                  "Tony Elumelu Foundation grant",
                  "IFC SME financing",
                  "Mastercard Foundation programs",
                  "Government SME fund",
                ].map((ex) => (
                  <div key={ex} className="rounded border border-border/30 bg-secondary/20 px-3 py-2 text-muted-foreground">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Treasury report panel */}
        <div className="lg:col-span-2 space-y-4">
          {treasury ? (
            <TreasuryReportPanel report={treasury} />
          ) : (
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" /> Treasury Report
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Generate an AI treasury health report for your business — cashflow assessment, runway estimate, risks, and recommendations.
              </p>
              <Button
                onClick={loadReport}
                disabled={reportBusy}
                className="w-full bg-gradient-gold text-gold-foreground shadow-glow"
              >
                {reportBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><BarChart3 className="h-4 w-4" /> Generate Report</>}
              </Button>
            </Card>
          )}

          {/* Quick links */}
          <Card className="glyph-border p-4">
            <div className="text-xs uppercase tracking-widest text-gold mb-3">Related</div>
            <div className="space-y-2">
              {[
                { to: "/funding", label: "Submit funding request", icon: Sparkles },
                { to: "/vault", label: "Upload business documents", icon: FileText },
                { to: "/identity", label: "Improve your trust score", icon: TrendingUp },
                { to: "/cfo", label: "Talk to Atlas CFO", icon: Search },
              ].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition p-2 rounded hover:bg-secondary/30"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                  <ArrowRight className="h-3 w-3 ml-auto" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
