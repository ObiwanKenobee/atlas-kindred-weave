import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, TrendingDown, TrendingUp, Vault } from "lucide-react";
import { toast } from "sonner";

const m = SANCTUM_MODULES.find((x) => x.slug === "treasury")!;

// ── Server fn: compute treasury metrics from real funding_requests data ──
const getTreasuryMetrics = createServerFn({ method: "GET" }).handler(async () => {
  const { data: requests } = await supabaseAdmin
    .from("funding_requests")
    .select("amount_requested, currency, status, human_approval, sector, region, created_at");

  const all = requests ?? [];

  const approved = all.filter((r) => r.human_approval === "approved");
  const declined = all.filter((r) => r.human_approval === "declined");
  const pending = all.filter((r) => r.human_approval === "pending");

  const capitalDeployed = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const totalRequested = all.reduce((s, r) => s + Number(r.amount_requested), 0);

  // Sector breakdown
  const bySector: Record<string, number> = {};
  for (const r of approved) {
    const sec = r.sector ?? "Unspecified";
    bySector[sec] = (bySector[sec] ?? 0) + Number(r.amount_requested);
  }

  // Region breakdown
  const byRegion: Record<string, number> = {};
  for (const r of approved) {
    const reg = r.region ?? "Unknown";
    byRegion[reg] = (byRegion[reg] ?? 0) + Number(r.amount_requested);
  }

  // 30-day velocity
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const recent = approved.filter((r) => r.created_at >= cutoff);
  const deployedLast30 = recent.reduce((s, r) => s + Number(r.amount_requested), 0);

  // Default rate approximation: declined / (approved + declined)
  const decided = approved.length + declined.length;
  const defaultRate = decided > 0 ? declined.length / decided : 0;

  return {
    capitalDeployed,
    totalRequested,
    activeDeals: approved.length,
    pendingDeals: pending.length,
    declinedDeals: declined.length,
    totalRequests: all.length,
    defaultRate,
    deployedLast30,
    bySector: Object.entries(bySector)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([label, amount]) => ({ label, amount })),
    byRegion: Object.entries(byRegion)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([label, amount]) => ({ label, amount })),
  };
});

type TreasuryMetrics = Awaited<ReturnType<typeof getTreasuryMetrics>>;

export const Route = createFileRoute("/treasury")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: TreasuryPage,
});

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function BarChart({ items, total }: { items: { label: string; amount: number }[]; total: number }) {
  if (items.length === 0) return <p className="text-xs text-muted-foreground">No data yet.</p>;
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const pct = total > 0 ? (item.amount / total) * 100 : 0;
        return (
          <div key={item.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="truncate text-foreground/80">{item.label}</span>
              <span className="ml-2 shrink-0 text-gold">{fmt(item.amount)}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary">
              <div
                className="h-1.5 rounded-full bg-gradient-gold transition-all duration-700"
                style={{ width: `${Math.max(pct, 1)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TreasuryPage() {
  const [metrics, setMetrics] = useState<TreasuryMetrics | null>(null);
  const [busy, setBusy] = useState(false);
  const fetch = useServerFn(getTreasuryMetrics);

  async function load() {
    setBusy(true);
    try {
      const data = await fetch({});
      setMetrics(data);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to load treasury data.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

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
        <div className="mt-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      )}

      {metrics && (
        <div className="mt-8 space-y-6">
          {/* KPI row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPI
              label="Capital Deployed"
              value={fmt(metrics.capitalDeployed)}
              sub={`${fmt(metrics.deployedLast30)} last 30d`}
              icon={<TrendingUp className="h-5 w-5 text-sage" />}
            />
            <KPI
              label="Active Deals"
              value={metrics.activeDeals.toString()}
              sub={`${metrics.pendingDeals} pending review`}
              icon={<Vault className="h-5 w-5 text-gold" />}
            />
            <KPI
              label="Default Rate"
              value={`${(metrics.defaultRate * 100).toFixed(1)}%`}
              sub={`${metrics.declinedDeals} declined of ${metrics.activeDeals + metrics.declinedDeals} decided`}
              icon={<TrendingDown className={`h-5 w-5 ${metrics.defaultRate > 0.1 ? "text-destructive" : "text-sage"}`} />}
            />
            <KPI
              label="Total Requested"
              value={fmt(metrics.totalRequested)}
              sub={`${metrics.totalRequests} total submissions`}
              icon={
                <Badge variant="outline" className="border-gold/40 text-gold">
                  {metrics.totalRequests} reqs
                </Badge>
              }
            />
          </div>

          {/* Sector + Region breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold">Capital by Sector</div>
              <div className="mt-4">
                <BarChart items={metrics.bySector} total={metrics.capitalDeployed} />
              </div>
            </Card>
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold">Capital by Region</div>
              <div className="mt-4">
                <BarChart items={metrics.byRegion} total={metrics.capitalDeployed} />
              </div>
            </Card>
          </div>

          {/* Health assessment */}
          <Card className="glyph-border p-6">
            <div className="text-xs uppercase tracking-widest text-gold">Treasury Health</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <HealthLine
                label="Deployment efficiency"
                value={metrics.totalRequested > 0 ? metrics.capitalDeployed / metrics.totalRequested : 0}
                fmt={(v) => `${(v * 100).toFixed(1)}%`}
                good={0.4}
              />
              <HealthLine
                label="Portfolio quality"
                value={1 - metrics.defaultRate}
                fmt={(v) => `${(v * 100).toFixed(1)}%`}
                good={0.85}
              />
              <HealthLine
                label="30d deployment momentum"
                value={metrics.capitalDeployed > 0 ? metrics.deployedLast30 / metrics.capitalDeployed : 0}
                fmt={(v) => `${(v * 100).toFixed(1)}%`}
                good={0.1}
              />
            </div>
          </Card>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Live data from Sanctum ledger · {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

function KPI({
  label, value, sub, icon,
}: {
  label: string; value: string; sub: string; icon: React.ReactNode;
}) {
  return (
    <Card className="glyph-border p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        {icon}
      </div>
      <div className="mt-2 font-display text-3xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </Card>
  );
}

function HealthLine({
  label, value, fmt: fmtFn, good,
}: {
  label: string; value: number; fmt: (v: number) => string; good: number;
}) {
  const healthy = value >= good;
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={healthy ? "text-sage" : "text-gold"}>{fmtFn(value)}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-secondary">
        <div
          className={`h-1.5 rounded-full transition-all duration-700 ${healthy ? "bg-sage" : "bg-gold"}`}
          style={{ width: `${Math.min(value * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
