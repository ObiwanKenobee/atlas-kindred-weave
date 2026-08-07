import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { computeRiskScore, type RiskOutput } from "@/lib/risk.functions";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, ShieldAlert, Loader2, Sparkles, Download,
  BadgeCheck, AlertTriangle, TrendingUp, Users, FileText,
} from "lucide-react";
import { toast } from "sonner";

const m = SANCTUM_MODULES.find((x) => x.slug === "identity")!;

export const Route = createFileRoute("/identity")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
      { property: "og:title", content: `${m.name} — Atlas Sanctum` },
      { property: "og:description", content: m.purpose },
    ],
  }),
  component: IdentityPage,
});

type VerEvent = {
  id: string;
  kind: string;
  status: "pending" | "verified" | "rejected";
  notes: string | null;
  created_at: string;
};

type FundingReq = {
  id: string;
  title: string;
  amount_requested: number;
  currency: string;
  sector: string | null;
  human_approval: string;
  created_at: string;
};

function TrustGauge({ score }: { score: number }) {
  const r = 54, cx = 70, cy = 70;
  const circumference = Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "text-sage" : score >= 40 ? "text-gold" : "text-destructive";
  return (
    <svg width="140" height="84" viewBox="0 0 140 84" className="overflow-visible">
      <path d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none" stroke="currentColor" strokeWidth="10" className="text-border" />
      <path d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none" stroke="currentColor" strokeWidth="10"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" className={color}
        style={{ transition: "stroke-dashoffset 1s ease" }} />
      <text x={cx} y={cy - 2} textAnchor="middle" className="fill-foreground" fontSize="24" fontWeight="bold">
        {Math.round(score)}
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
        / 100
      </text>
    </svg>
  );
}

function FundingReadiness({ score }: { score: number }) {
  const level = score >= 75 ? "High" : score >= 50 ? "Medium" : score >= 25 ? "Low" : "Building";
  const color = score >= 75 ? "text-sage border-sage/60" : score >= 50 ? "text-gold border-gold/60" : "text-muted-foreground border-border";
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${color}`}>
      <TrendingUp className="h-3.5 w-3.5" />
      Funding Readiness: {level}
    </div>
  );
}

function exportPassport(
  profile: { display_name: string | null; trust_score: number; region: string | null; bio: string | null; verified: boolean } | null,
  risk: RiskOutput | null,
  events: VerEvent[],
  funding: FundingReq[],
) {
  const lines = [
    "=== ATLAS REPUTATION PASSPORT ===",
    `Generated: ${new Date().toISOString()}`,
    "",
    "IDENTITY",
    `Name: ${profile?.display_name ?? "—"}`,
    `Region: ${profile?.region ?? "—"}`,
    `Verified: ${profile?.verified ? "Yes" : "No"}`,
    "",
    "TRUST SCORE",
    `Score: ${profile?.trust_score ?? 0} / 100`,
    `Risk Level: ${risk?.risk_level?.replace("_", " ") ?? "Unknown"}`,
    `Funding Readiness: ${(profile?.trust_score ?? 0) >= 75 ? "High" : (profile?.trust_score ?? 0) >= 50 ? "Medium" : "Low"}`,
    "",
    "VERIFICATION HISTORY",
    ...events.map((e) => `  [${e.status.toUpperCase()}] ${e.kind} — ${new Date(e.created_at).toLocaleDateString()}`),
    "",
    "FUNDING HISTORY",
    ...funding.map((f) => `  [${f.human_approval.toUpperCase()}] ${f.title} — ${f.amount_requested} ${f.currency}`),
    "",
    risk ? [
      "AI RATIONALE",
      risk.rationale,
    ].join("\n") : "",
    "",
    "=== END OF PASSPORT ===",
    "This document is issued by Atlas Sanctum and represents verifiable trust signals.",
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `atlas-passport-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function IdentityPage() {
  const { user, profile } = useAuth();
  const scoreRisk = useServerFn(computeRiskScore);

  const [events, setEvents] = useState<VerEvent[]>([]);
  const [funding, setFunding] = useState<FundingReq[]>([]);
  const [risk, setRisk] = useState<RiskOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user) { setLoadingData(false); return; }
    Promise.all([
      supabase.from("verification_events").select("id,kind,status,notes,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
      supabase.from("funding_requests").select("id,title,amount_requested,currency,sector,human_approval,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
      supabase.from("risk_scores").select("trust_score,risk_level,recommendation,rationale,flags,signals").eq("user_id", user.id).order("computed_at", { ascending: false }).limit(1).maybeSingle(),
    ]).then(([{ data: ev }, { data: fr }, { data: rs }]) => {
      setEvents((ev as VerEvent[]) ?? []);
      setFunding((fr as FundingReq[]) ?? []);
      if (rs) setRisk(rs as unknown as RiskOutput);
      setLoadingData(false);
    });
  }, [user]);

  async function runRisk() {
    if (!user) return;
    setBusy(true);
    try {
      const res = await scoreRisk({ data: {} });
      setRisk(res);
      toast.success("Trust score recomputed.");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to compute score.");
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Identity & Trust</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view your Atlas Trust Passport.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  const trust = profile?.trust_score ?? 0;
  const verified = events.filter((e) => e.status === "verified").length;
  const approvedFunding = funding.filter((f) => f.human_approval === "approved");
  const totalFunded = approvedFunding.reduce((s, f) => s + f.amount_requested, 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-8">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
            <span className="font-display">{m.glyph}</span>
            <span>Engine</span>
          </div>
          <h1 className="mt-3 font-display text-4xl">{m.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{m.tagline}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportPassport(profile, risk, events, funding)}
            className="border-gold/40 text-gold hover:bg-secondary/40"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export Passport
          </Button>
          <Button
            size="sm"
            onClick={runRisk}
            disabled={busy}
            className="bg-gradient-gold text-gold-foreground shadow-glow"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4 mr-1.5" /> Recompute</>}
          </Button>
        </div>
      </div>

      {loadingData ? (
        <div className="mt-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      ) : (
        <div className="mt-8 space-y-6">

          {/* Trust Score Passport */}
          <Card className="glyph-border p-6">
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Atlas Reputation Passport</div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
              <div className="flex flex-col items-center gap-2">
                <TrustGauge score={trust} />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Trust Score</div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <div className="font-display text-2xl">{profile?.display_name ?? user.email}</div>
                  {profile?.region && <div className="text-sm text-muted-foreground">{profile.region}</div>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile?.verified ? (
                    <Badge variant="outline" className="border-sage/60 text-sage">
                      <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-gold/60 text-gold">
                      <ShieldAlert className="mr-1 h-3 w-3" /> Probationary
                    </Badge>
                  )}
                  {risk && (
                    <Badge variant="outline" className={
                      risk.risk_level === "low" || risk.risk_level === "very_low"
                        ? "border-sage/60 text-sage"
                        : risk.risk_level === "medium"
                        ? "border-gold/60 text-gold"
                        : "border-destructive/60 text-destructive"
                    }>
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Risk: {risk.risk_level.replace("_", " ")}
                    </Badge>
                  )}
                </div>
                <FundingReadiness score={trust} />
                {risk && (
                  <div className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                    {risk.rationale}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* KPI row */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Trust Score</div>
              <div className={`mt-1 font-display text-3xl ${trust >= 70 ? "text-sage" : trust >= 40 ? "text-gold" : "text-destructive"}`}>
                {Math.round(trust)}
              </div>
              <div className="text-xs text-muted-foreground">/ 100</div>
            </Card>
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Verified Proofs</div>
              <div className="mt-1 font-display text-3xl text-sage">{verified}</div>
              <div className="text-xs text-muted-foreground">of {events.length} total</div>
            </Card>
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Capital Approved</div>
              <div className="mt-1 font-display text-3xl text-gold">
                ${totalFunded.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">{approvedFunding.length} deals</div>
            </Card>
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Risk Level</div>
              <div className="mt-1 font-display text-2xl">
                {risk ? risk.risk_level.replace("_", " ") : "—"}
              </div>
              <div className="text-xs text-muted-foreground">AI assessment</div>
            </Card>
          </div>

          {/* Risk signals */}
          {risk && risk.signals && (
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Behavioral Signals</div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {[
                  { label: "Verified proofs", value: risk.signals?.verified_events ?? "—" },
                  { label: "Rejected proofs", value: risk.signals?.rejected_events ?? "—" },
                  { label: "Funding requests", value: risk.signals?.funding_requests_count ?? "—" },
                  { label: "Approvals", value: risk.signals?.approvals_count ?? "—" },
                  { label: "Capital approved", value: `$${((risk.signals?.total_funded as number) ?? 0).toLocaleString()}` },
                  { label: "Approval rate", value: `${(((risk.signals?.repayment_rate as number) ?? 0) * 100).toFixed(0)}%` },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                    <div className="mt-1 font-display text-xl">{s.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Flags */}
          {risk && risk.flags.length > 0 && (
            <Card className="glyph-border p-5">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">
                <AlertTriangle className="mr-2 inline h-3.5 w-3.5" />Active Flags
              </div>
              <div className="flex flex-wrap gap-2">
                {risk.flags.map((f) => (
                  <Badge key={f} variant="outline" className="border-gold/40 text-foreground/80">{f}</Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Verification history */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-widest text-gold flex items-center gap-2">
                <BadgeCheck className="h-3.5 w-3.5" /> Verification History
              </div>
              <Link to="/verification" className="text-xs text-gold/80 hover:text-gold">
                Submit new proof →
              </Link>
            </div>
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">No verification events yet. Submit proof to build your trust score.</p>
            ) : (
              <div className="space-y-2">
                {events.map((e) => (
                  <Card key={e.id} className="glyph-border flex items-center justify-between p-4">
                    <div>
                      <div className="font-display text-sm capitalize">{e.kind.replace("_", " ")}</div>
                      {e.notes && (
                        <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {(() => { try { return JSON.parse(e.notes).summary ?? e.notes; } catch { return e.notes; } })()}
                        </div>
                      )}
                      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                        {new Date(e.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      e.status === "verified" ? "border-sage/60 text-sage"
                        : e.status === "rejected" ? "border-destructive/60 text-destructive"
                        : "border-gold/60 text-gold"
                    }>
                      {e.status}
                    </Badge>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Funding history */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-widest text-gold flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" /> Funding History
              </div>
              <Link to="/funding" className="text-xs text-gold/80 hover:text-gold">
                Submit request →
              </Link>
            </div>
            {funding.length === 0 ? (
              <p className="text-sm text-muted-foreground">No funding requests yet.</p>
            ) : (
              <div className="space-y-2">
                {funding.map((f) => (
                  <Card key={f.id} className="glyph-border flex items-center justify-between p-4">
                    <div>
                      <div className="font-display text-sm">{f.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {f.amount_requested.toLocaleString()} {f.currency}
                        {f.sector ? ` · ${f.sector}` : ""}
                        {" · "}{new Date(f.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      f.human_approval === "approved" ? "border-sage/60 text-sage"
                        : f.human_approval === "declined" ? "border-destructive/60 text-destructive"
                        : "border-gold/60 text-gold"
                    }>
                      {f.human_approval}
                    </Badge>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Passport export note */}
          <Card className="glyph-border border-gold/20 p-5">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-widest text-gold">Reputation Passport</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your Atlas Trust Score, verification history, and funding record are exportable for use with banks, investors,
                  and employers. Click "Export Passport" above to download a signed plaintext report.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
