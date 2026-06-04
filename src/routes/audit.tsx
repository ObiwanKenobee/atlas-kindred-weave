import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ScrollText, Download, FileJson } from "lucide-react";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Audit Trail — Atlas Sanctum" }] }),
  component: AuditPage,
});

type AuditRow = {
  id: string;
  actor_id: string | null;
  actor_name: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  subject_user_id: string | null;
  summary: string;
  details: Record<string, unknown>;
  created_at: string;
};

const ENTITY_OPTIONS = [
  { value: "all", label: "All activity" },
  { value: "funding_request", label: "Funding requests" },
  { value: "verification_event", label: "Verification events" },
  { value: "profile", label: "Trust recalculations" },
];

const ACTION_OPTIONS = [
  { value: "all", label: "All actions" },
  { value: "funding.submitted", label: "Funding submitted" },
  { value: "funding.approved", label: "Funding approved" },
  { value: "funding.declined", label: "Funding declined" },
  { value: "funding.revision_requested", label: "Revision requested" },
  { value: "verification.insert", label: "Verification recorded" },
  { value: "verification.update", label: "Verification updated" },
  { value: "trust.recalculated", label: "Trust recalculated" },
];

function AuditPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [entity, setEntity] = useState("all");
  const [action, setAction] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    let q = supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(500);
    if (entity !== "all") q = q.eq("entity_type", entity);
    if (action !== "all") q = q.eq("action", action);
    q.then(({ data }) => {
      setRows((data as unknown as AuditRow[]) ?? []);
      setLoading(false);
    });
  }, [user, entity, action]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) =>
      [r.summary, r.action, r.entity_type, r.actor_name ?? "", JSON.stringify(r.details)]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [rows, query]);

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Audit Trail</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view your audit history.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Sanctum Records</div>
        <h1 className="mt-3 flex items-center gap-3 font-display text-4xl">
          <ScrollText className="h-7 w-7 text-gold" /> Audit Trail
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every funding submission, verification outcome, trust recalculation, and reviewer
          decision recorded by the Sanctum. Reviewers see the full ledger; everyone else sees
          activity that touches them.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_220px]">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Full-text search summaries, actors, details…"
            className="pl-9"
          />
        </div>
        <Select value={entity} onValueChange={setEntity}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {ENTITY_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {ACTION_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          {loading ? "Loading the ledger…" : `${filtered.length} record${filtered.length === 1 ? "" : "s"} match${filtered.length === 1 ? "es" : ""} the current filters.`}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline" size="sm"
            disabled={filtered.length === 0}
            onClick={() => downloadCsv(filtered, query)}
          >
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button
            variant="outline" size="sm"
            disabled={filtered.length === 0}
            onClick={() => downloadJson(filtered, query)}
          >
            <FileJson className="mr-2 h-4 w-4" /> JSON
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No records match your filters.</p>
        )}
        {filtered.map((r) => (
          <Card key={r.id} className="glyph-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-gold/40 text-gold">{r.action}</Badge>
                  <Badge variant="outline">{r.entity_type}</Badge>
                  {r.actor_name && (
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      by {r.actor_name}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm">{r.summary}</div>
                {Object.keys(r.details ?? {}).length > 0 && (
                  <details className="mt-2 text-xs text-muted-foreground">
                    <summary className="cursor-pointer hover:text-foreground">Details</summary>
                    <pre className="mt-2 overflow-x-auto rounded bg-secondary/40 p-2 text-[11px]">
{JSON.stringify(r.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
              <div className="whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground">
                {new Date(r.created_at).toLocaleString()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function highlightMatches(needle: string, hay: string): string[] {
  const q = needle.trim().toLowerCase();
  if (!q) return [];
  const out: string[] = [];
  const text = hay.toLowerCase();
  let idx = 0;
  while ((idx = text.indexOf(q, idx)) !== -1) {
    const start = Math.max(0, idx - 30);
    const end = Math.min(hay.length, idx + q.length + 30);
    out.push((start > 0 ? "…" : "") + hay.slice(start, end) + (end < hay.length ? "…" : ""));
    idx = idx + q.length;
    if (out.length >= 5) break;
  }
  return out;
}

function csvCell(v: unknown): string {
  const s = v == null ? "" : typeof v === "string" ? v : JSON.stringify(v);
  return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function downloadCsv(rows: AuditRow[], query: string) {
  const headers = ["created_at","action","entity_type","entity_id","actor_id","actor_name","subject_user_id","summary","details","matches"];
  const lines = [headers.join(",")];
  for (const r of rows) {
    const blob = [r.summary, r.action, r.entity_type, r.actor_name ?? "", JSON.stringify(r.details ?? {})].join(" ");
    const matches = highlightMatches(query, blob).join(" | ");
    lines.push([
      r.created_at, r.action, r.entity_type, r.entity_id ?? "", r.actor_id ?? "",
      r.actor_name ?? "", r.subject_user_id ?? "", r.summary, r.details ?? {}, matches,
    ].map(csvCell).join(","));
  }
  triggerDownload(new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" }), `atlas-audit-${stamp()}.csv`);
}

function downloadJson(rows: AuditRow[], query: string) {
  const payload = {
    exported_at: new Date().toISOString(),
    query,
    count: rows.length,
    rows: rows.map((r) => ({
      ...r,
      matches: highlightMatches(
        query,
        [r.summary, r.action, r.entity_type, r.actor_name ?? "", JSON.stringify(r.details ?? {})].join(" "),
      ),
    })),
  };
  triggerDownload(
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    `atlas-audit-${stamp()}.json`,
  );
}
