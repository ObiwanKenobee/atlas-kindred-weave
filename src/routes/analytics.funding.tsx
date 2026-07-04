import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useIsReviewer } from "@/lib/notifications";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Loader2, TrendingUp, Coins, CheckCircle2, XCircle, Clock, Download, FileText, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

export const Route = createFileRoute("/analytics/funding")({
  head: () => ({ meta: [{ title: "Funding analytics — Atlas Sanctum" }] }),
  component: FundingAnalytics,
});

type Row = {
  id: string;
  amount_requested: number | null;
  currency: string | null;
  status: string;
  human_approval: string | null;
  region: string | null;
  sector: string | null;
  created_at: string;
  human_decided_at: string | null;
  human_decided_by: string | null;
};

const RANGES = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "365", label: "Last 12 months" },
  { value: "all", label: "All time" },
];

const COLORS = ["#d4af37", "#7c9eff", "#10b981", "#ef4444", "#a855f7", "#f59e0b", "#06b6d4"];

function FundingAnalytics() {
  const { user } = useAuth();
  const isReviewer = useIsReviewer();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [range, setRange] = useState("90");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("funding_requests")
      .select("id,amount_requested,currency,status,human_approval,region,sector,created_at,human_decided_at,human_decided_by")
      .order("created_at", { ascending: false })
      .limit(2000)
      .then(({ data }) => setRows((data as Row[]) ?? []));
  }, [user]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    if (range === "all") return rows;
    const cutoff = subDays(new Date(), parseInt(range, 10));
    return rows.filter((r) => new Date(r.created_at) >= cutoff);
  }, [rows, range]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const approved = filtered.filter((r) => r.human_approval === "approved").length;
    const declined = filtered.filter((r) => r.human_approval === "declined").length;
    const pending = filtered.filter((r) => !r.human_approval || r.human_approval === "pending").length;
    const revision = filtered.filter((r) => r.human_approval === "revision_requested").length;
    const requested = filtered.reduce((s, r) => s + Number(r.amount_requested ?? 0), 0);
    const approvedAmt = filtered
      .filter((r) => r.human_approval === "approved")
      .reduce((s, r) => s + Number(r.amount_requested ?? 0), 0);
    const decided = approved + declined + revision;
    const approvalRate = decided > 0 ? Math.round((approved / decided) * 100) : 0;
    return { total, approved, declined, pending, revision, requested, approvedAmt, approvalRate };
  }, [filtered]);

  const byStatus = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((r) => m.set(r.status, (m.get(r.status) ?? 0) + 1));
    return Array.from(m, ([name, value]) => ({ name, value }));
  }, [filtered]);

  const byRegion = useMemo(() => {
    const m = new Map<string, { region: string; requested: number; approved: number; count: number }>();
    filtered.forEach((r) => {
      const k = r.region || "Unspecified";
      const cur = m.get(k) ?? { region: k, requested: 0, approved: 0, count: 0 };
      cur.requested += Number(r.amount_requested ?? 0);
      if (r.human_approval === "approved") cur.approved += Number(r.amount_requested ?? 0);
      cur.count += 1;
      m.set(k, cur);
    });
    return Array.from(m.values()).sort((a, b) => b.requested - a.requested).slice(0, 8);
  }, [filtered]);

  const bySector = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((r) => {
      const k = r.sector || "Unspecified";
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return Array.from(m, ([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value).slice(0, 7);
  }, [filtered]);

  const timeline = useMemo(() => {
    const days = range === "all" ? 90 : Math.min(parseInt(range, 10), 90);
    const buckets = new Map<string, { day: string; submitted: number; approved: number }>();
    for (let i = days - 1; i >= 0; i--) {
      const d = format(subDays(new Date(), i), "MMM d");
      buckets.set(d, { day: d, submitted: 0, approved: 0 });
    }
    const cutoff = startOfDay(subDays(new Date(), days - 1));
    filtered.forEach((r) => {
      const created = new Date(r.created_at);
      if (created >= cutoff) {
        const k = format(created, "MMM d");
        const b = buckets.get(k);
        if (b) b.submitted += 1;
      }
      if (r.human_decided_at && r.human_approval === "approved") {
        const dec = new Date(r.human_decided_at);
        if (dec >= cutoff) {
          const k = format(dec, "MMM d");
          const b = buckets.get(k);
          if (b) b.approved += 1;
        }
      }
    });
    return Array.from(buckets.values());
  }, [filtered, range]);

  const throughput = useMemo(() => {
    if (!isReviewer) return [];
    const m = new Map<string, number>();
    filtered.forEach((r) => {
      if (r.human_decided_by && r.human_approval && r.human_approval !== "pending") {
        m.set(r.human_decided_by, (m.get(r.human_decided_by) ?? 0) + 1);
      }
    });
    return Array.from(m, ([id, value]) => ({ id, value }))
      .sort((a, b) => b.value - a.value).slice(0, 6);
  }, [filtered, isReviewer]);

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Funding analytics</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view the Sanctum's funding signal.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow">Enter</Link>
      </div>
    );
  }

  if (rows === null) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading funding signal…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Signal</div>
          <h1 className="mt-3 font-display text-4xl">Funding analytics</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pipeline, approvals, capital flow, regional concentration, and reviewer throughput.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Download className="mr-1.5 h-3.5 w-3.5" />Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Filtered data</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => exportRowsCsv(filtered, range)}>
                <FileSpreadsheet className="mr-2 h-3.5 w-3.5" />CSV — filtered rows
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportTimelineCsv(timeline, range)}>
                <FileSpreadsheet className="mr-2 h-3.5 w-3.5" />CSV — timeline series
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportPdfSnapshot({ stats, byStatus, byRegion, bySector, timeline, range })}>
                <FileText className="mr-2 h-3.5 w-3.5" />PDF snapshot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" asChild>
            <Link to="/funding">Open pipeline</Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Requests" value={stats.total.toString()}
                  sub={`${stats.pending} pending`} />
        <StatCard icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />} label="Approval rate"
                  value={`${stats.approvalRate}%`} sub={`${stats.approved} approved · ${stats.declined} declined`} />
        <StatCard icon={<Coins className="h-4 w-4 text-gold" />} label="Capital requested"
                  value={fmtMoney(stats.requested)} sub={`${fmtMoney(stats.approvedAmt)} approved`} />
        <StatCard icon={<Clock className="h-4 w-4" />} label="Revision requested"
                  value={stats.revision.toString()} sub={`${stats.declined} declined outright`} />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="glyph-border p-5">
          <CardHeader title="Submissions vs approvals" subtitle="Daily timeline" />
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <LineChart data={timeline} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={10} interval="preserveStartEnd" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="submitted" stroke="#7c9eff" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="approved" stroke="#d4af37" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glyph-border p-5">
          <CardHeader title="Pipeline by status" subtitle="Count of requests" />
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" outerRadius={90} label={(e) => e.name}>
                  {byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glyph-border p-5 lg:col-span-2">
          <CardHeader title="Capital by region" subtitle="Requested vs approved" />
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={byRegion} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(v) => fmtMoney(v)} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => fmtMoney(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="requested" fill="#7c9eff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="#d4af37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glyph-border p-5">
          <CardHeader title="Top sectors" subtitle="By request volume" />
          <div className="mt-4 space-y-2">
            {bySector.length === 0 && <div className="text-xs text-muted-foreground">No data in range.</div>}
            {bySector.map((s, i) => {
              const max = Math.max(...bySector.map((x) => x.value));
              const pct = max ? Math.round((s.value / max) * 100) : 0;
              return (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-32 truncate text-sm">{s.name}</div>
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }} />
                  </div>
                  <div className="w-10 text-right text-xs tabular-nums text-muted-foreground">{s.value}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="glyph-border p-5">
          <CardHeader title="Reviewer throughput" subtitle={isReviewer ? "Decisions per reviewer" : "Visible to reviewers"} />
          <div className="mt-4 space-y-2">
            {!isReviewer && <div className="text-xs text-muted-foreground">Sign in as a reviewer or admin to see decision throughput.</div>}
            {isReviewer && throughput.length === 0 && <div className="text-xs text-muted-foreground">No decisions in range.</div>}
            {isReviewer && throughput.map((t, i) => {
              const max = Math.max(...throughput.map((x) => x.value));
              const pct = max ? Math.round((t.value / max) * 100) : 0;
              return (
                <div key={t.id} className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono text-[10px]">{t.id.slice(0, 8)}</Badge>
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-10 text-right text-xs tabular-nums text-muted-foreground">{t.value}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <XCircle className="h-3 w-3" /> Numbers update live from Council deliberations
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <Card className="glyph-border p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-2 font-display text-3xl">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </Card>
  );
}

function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <div className="font-display text-base">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
    </div>
  );
}

function fmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${Math.round(n)}`;
}

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 6,
  fontSize: 12,
};
