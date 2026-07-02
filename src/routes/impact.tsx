import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Leaf, Users, TrendingUp, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

const m = SANCTUM_MODULES.find((x) => x.slug === "impact")!;

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: ImpactPage,
});

// ── Server fn ─────────────────────────────────────────────────────────────────
const getImpactMetrics = createServerFn({ method: "GET" }).handler(async () => {
  const [
    { data: profiles },
    { data: funding },
    { data: verEvents },
    { data: decisionVersions },
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("user_id, verified, trust_score, region, created_at"),
    supabaseAdmin.from("funding_requests").select("id, user_id, amount_requested, currency, sector, region, human_approval, decision_report, created_at"),
    supabaseAdmin.from("verification_events").select("id, status, kind, user_id, created_at"),
    supabaseAdmin.from("decision_report_versions").select("report, generated_at").eq("human_approval", "approved"),
  ]);

  const allProfiles = profiles ?? [];
  const allFunding = funding ?? [];
  const allVer = verEvents ?? [];
  const approved = allFunding.filter((r) => r.human_approval === "approved");

  // Capital deployed
  const capitalDeployed = approved.reduce((s, r) => s + Number(r.amount_requested), 0);

  // Jobs & households from AI impact forecasts in approved decision reports
  let totalJobs = 0;
  let totalHouseholds = 0;
  let totalProsperity = 0;

  for (const v of decisionVersions ?? []) {
    const report = v.report as Record<string, unknown>;
    const forecast = report?.impact_forecast as { jobs_created?: number; households_reached?: number; prosperity_index_delta?: number } | undefined;
    if (forecast) {
      totalJobs += forecast.jobs_created ?? 0;
      totalHouseholds += forecast.households_reached ?? 0;
      totalProsperity += forecast.prosperity_index_delta ?? 0;
    }
  }

  // Verified users (trust score >= 60 or verified flag)
  const verifiedUsers = allProfiles.filter((p) => p.verified || p.trust_score >= 60).length;
  const avgTrust = allProfiles.length > 0
    ? allProfiles.reduce((s, p) => s + p.trust_score, 0) / allProfiles.length
    : 0;

  // Sector breakdown of funded businesses
  const bySector: Record<string, { count: number; capital: number }> = {};
  for (const r of approved) {
    const sec = r.sector ?? "Unspecified";
    if (!bySector[sec]) bySector[sec] = { count: 0, capital: 0 };
    bySector[sec].count++;
    bySector[sec].capital += Number(r.amount_requested);
  }

  // Region breakdown
  const byRegion: Record<string, number> = {};
  for (const r of approved) {
    const reg = r.region ?? "Unknown";
    byRegion[reg] = (byRegion[reg] ?? 0) + 1;
  }

  // Verification success rate
  const verifiedProofs = allVer.filter((e) => e.status === "verified").length;
  const verSuccessRate = allVer.length > 0 ? verifiedProofs / allVer.length : 0;

  // Unique users served (funded or verified)
  const fundedUsers = new Set(approved.map((r) => r.user_id ?? "")).size;
  const verifiedUserIds = new Set(allVer.filter((e) => e.status === "verified").map((e) => e.user_id)).size;
  const totalUsersServed = new Set([...approved.map((r) => r.user_id ?? ""), ...allVer.map((e) => e.user_id)]).size;

  // 30d momentum
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const newFunded30 = approved.filter((r) => r.created_at >= cutoff).length;
  const newVerified30 = allVer.filter((e) => e.status === "verified" && e.created_at >= cutoff).length;
  const newUsers30 = allProfiles.filter((p) => p.created_at >= cutoff).length;

  return {
    capitalDeployed,
    businessesFunded: approved.length,
    totalUsers: allProfiles.length,
    verifiedUsers,
    avgTrustScore: Math.round(avgTrust),
    totalJobs,
    totalHouseholds,
    totalProsperity: Math.round(totalProsperity * 100) / 100,
    verificationSuccessRate: Math.round(verSuccessRate * 100),
    totalVerifications: allVer.length,
    verifiedProofs,
    totalUsersServed,
    fundedUsers,
    verifiedUserIds,
    momentum: { newFunded30, newVerified30, newUsers30 },
    topSectors: Object.entries(bySector)
      .sort((a, b) => b[1].capital - a[1].capital)
      .slice(0, 6)
      .map(([sector, data]) => ({ sector, ...data })),
    topRegions: Object.entries(byRegion)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([region, count]) => ({ region, count })),
  };
});

type ImpactMetrics = Awaited<ReturnType<typeof getImpactMetrics>>;

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function ImpactKPI({
  label, value, sub, delta, icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="glyph-border p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="mt-2 font-display text-3xl">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
      {delta && <div className="mt-1 text-xs text-sage">{delta}</div>}
    </Card>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-foreground/80 truncate">{label}</span>
        <span className="ml-2 shrink-0 text-gold">{value}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary">
        <div
          className="h-1.5 rounded-full bg-gradient-gold transition-all duration-700"
          style={{ width: `${Math.max(pct, 1)}%` }}
        />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function ImpactPage() {
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);
  const [busy, setBusy] = useState(false);
  const fetchMetrics = useServerFn(getImpactMetrics);

  async function load() {
    setBusy(true);
    try {
      const data = await fetchMetrics({});
      setMetrics(data);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to load impact data.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const maxSector = Math.max(...(metrics?.topSectors.map((s) => s.count) ?? [1]), 1);
  const maxRegion = Math.max(...(metrics?.topRegions.map((r) => r.count) ?? [1]), 1);

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
        <Button variant="outline" size="sm" onClick={load} disabled={busy} className="mt-6">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><RefreshCw className="h-4 w-4" /> Refresh</>}
        </Button>
      </div>

      {busy && !metrics && (
        <div className="mt-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      )}

      {metrics && (
        <div className="mt-8 space-y-6">

          {/* Primary KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ImpactKPI
              label="Businesses Funded"
              value={metrics.businessesFunded.toLocaleString()}
              sub={`${metrics.momentum.newFunded30} this month`}
              delta={`+${metrics.momentum.newFunded30} (30d)`}
              icon={TrendingUp}
            />
            <ImpactKPI
              label="Capital Deployed"
              value={fmtMoney(metrics.capitalDeployed)}
              sub="to entrepreneurs"
              icon={Sparkles}
            />
            <ImpactKPI
              label="Jobs Forecast"
              value={metrics.totalJobs.toLocaleString()}
              sub="from AI impact models"
              icon={Users}
            />
            <ImpactKPI
              label="Households Reached"
              value={metrics.totalHouseholds.toLocaleString()}
              sub="projected impact"
              icon={Globe2}
            />
          </div>

          {/* Secondary KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ImpactKPI
              label="Users Served"
              value={metrics.totalUsersServed.toLocaleString()}
              sub={`${metrics.verifiedUsers} verified`}
              delta={`+${metrics.momentum.newUsers30} (30d)`}
              icon={Users}
            />
            <ImpactKPI
              label="Verification Rate"
              value={`${metrics.verificationSuccessRate}%`}
              sub={`${metrics.verifiedProofs} of ${metrics.totalVerifications}`}
              delta={`+${metrics.momentum.newVerified30} (7d)`}
              icon={ShieldCheck}
            />
            <ImpactKPI
              label="Avg Trust Score"
              value={`${metrics.avgTrustScore}/100`}
              sub={`${metrics.verifiedUsers} trusted members`}
              icon={ShieldCheck}
            />
            <ImpactKPI
              label="Prosperity Index"
              value={metrics.totalProsperity >= 0 ? `+${metrics.totalProsperity}` : `${metrics.totalProsperity}`}
              sub="cumulative AI forecast"
              icon={Leaf}
            />
          </div>

          {/* Sector + Region */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Impact by Sector</div>
              {metrics.topSectors.length === 0 ? (
                <p className="text-sm text-muted-foreground">No funded deals yet.</p>
              ) : (
                <div className="space-y-3">
                  {metrics.topSectors.map((s) => (
                    <div key={s.sector}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground/80 truncate">{s.sector}</span>
                        <span className="ml-2 shrink-0 text-muted-foreground">{s.count} deals · {fmtMoney(s.capital)}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary">
                        <div
                          className="h-1.5 rounded-full bg-gradient-gold transition-all duration-700"
                          style={{ width: `${Math.max((s.count / maxSector) * 100, 1)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Impact by Region</div>
              {metrics.topRegions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No regional data yet.</p>
              ) : (
                <div className="space-y-3">
                  {metrics.topRegions.map((r) => (
                    <BarRow key={r.region} label={r.region} value={r.count} max={maxRegion} />
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Momentum */}
          <Card className="glyph-border p-6">
            <div className="text-xs uppercase tracking-widest text-gold mb-4">30-Day Momentum</div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="font-display text-4xl text-gold">+{metrics.momentum.newFunded30}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">New businesses funded</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-sage">+{metrics.momentum.newVerified30}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">New verifications</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-gold">+{metrics.momentum.newUsers30}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">New community members</div>
              </div>
            </div>
          </Card>

          {/* SDG tags */}
          <Card className="glyph-border p-5">
            <div className="text-xs uppercase tracking-widest text-gold mb-3">Aligned SDGs</div>
            <div className="flex flex-wrap gap-2">
              {[
                "SDG 1 · No Poverty",
                "SDG 8 · Decent Work",
                "SDG 9 · Industry & Innovation",
                "SDG 10 · Reduced Inequality",
                "SDG 11 · Sustainable Communities",
                "SDG 17 · Partnerships",
              ].map((sdg) => (
                <Badge key={sdg} variant="outline" className="border-sage/40 text-sage/90 text-xs">
                  <Leaf className="mr-1 h-2.5 w-2.5" /> {sdg}
                </Badge>
              ))}
            </div>
          </Card>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-right">
            Live data from Sanctum ledger · {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
