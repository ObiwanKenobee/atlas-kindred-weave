import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { generateFundingDecision, reviewFundingDecision } from "@/lib/funding.functions";
import { useIsReviewer } from "@/lib/notifications";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Sparkles, Paperclip, X, FileText, Download, Check, RotateCcw, Ban, ShieldCheck, History, Lock,
} from "lucide-react";
import { toast } from "sonner";
import { downloadDecisionPdf } from "@/lib/decision-pdf";

const m = SANCTUM_MODULES.find((x) => x.slug === "funding")!;

export const Route = createFileRoute("/funding")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: FundingPage,
});

type DecisionReport = {
  recommendation: "approve" | "approve_with_conditions" | "decline" | "needs_more_info";
  summary: string;
  recommended_amount: number;
  recommended_currency: string;
  recommended_terms: {
    instrument: string;
    duration_months: number;
    revenue_share_pct?: number;
    interest_rate_pct?: number;
    milestones: string[];
  };
  trust_assessment: { score: number; rationale: string };
  risk_assessment: { score: number; flags: string[] };
  impact_forecast: {
    jobs_created: number;
    households_reached: number;
    prosperity_index_delta: number;
    notes: string;
  };
  agents_invoked: string[];
  safeguards: string[];
};

type Version = {
  id: string;
  funding_request_id: string;
  version: number;
  report: DecisionReport;
  generated_at: string;
  human_approval: "pending" | "approved" | "declined" | "revision_requested";
  human_decision_notes: string | null;
  human_decided_by_name: string | null;
  human_decided_at: string | null;
};

type FundingReq = {
  id: string;
  title: string;
  pitch: string;
  amount_requested: number;
  currency: string;
  region: string | null;
  sector: string | null;
  status: string;
  attachments: { name: string; path: string; size: number }[];
  decision_report: DecisionReport | null;
  current_version: number;
  final_version_id: string | null;
  created_at: string;
  user_id: string;
  human_approval: "pending" | "approved" | "declined" | "revision_requested";
  human_decision_notes: string | null;
  human_decided_at: string | null;
};

function FundingPage() {
  const { user } = useAuth();
  const isReviewer = useIsReviewer();
  const [requests, setRequests] = useState<FundingReq[]>([]);
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<FundingReq | null>(null);
  const generateDecision = useServerFn(generateFundingDecision);

  // form
  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [region, setRegion] = useState("");
  const [sector, setSector] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  async function refresh() {
    if (!user) return;
    // Reviewers see all; everyone else sees their own (RLS already enforces this server-side)
    const { data } = await supabase
      .from("funding_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests((data as unknown as FundingReq[]) ?? []);
  }
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [user]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to submit a funding request.");
    setBusy(true);
    try {
      const attachments: FundingReq["attachments"] = [];
      for (const f of files) {
        const path = `${user.id}/${Date.now()}-${f.name}`;
        const { error } = await supabase.storage.from("funding-attachments").upload(path, f);
        if (error) throw error;
        attachments.push({ name: f.name, path, size: f.size });
      }
      const { data: ins, error: insErr } = await supabase
        .from("funding_requests")
        .insert({
          user_id: user.id,
          title,
          pitch,
          amount_requested: Number(amount) || 0,
          currency,
          region: region || null,
          sector: sector || null,
          attachments,
          status: "submitted",
        })
        .select()
        .single();
      if (insErr) throw insErr;
      toast.success("Request submitted. The Funding Council is deliberating…");

      setTitle(""); setPitch(""); setAmount(""); setRegion(""); setSector(""); setFiles([]);
      await refresh();

      await generateDecision({ data: { requestId: ins.id } });
      toast.success("Funding Decision Report ready.");
      await refresh();
      const { data: fresh } = await supabase.from("funding_requests").select("*").eq("id", ins.id).single();
      if (fresh) setSelected(fresh as unknown as FundingReq);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Funding Engine</h1>
        <p className="mt-3 text-muted-foreground">Sign in to submit a pitch and receive an AI Funding Decision Report.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Engine II · Funding</div>
          {isReviewer && (
            <Badge variant="outline" className="border-gold/60 text-gold">
              <ShieldCheck className="mr-1 h-3 w-3" /> Reviewer privileges
            </Badge>
          )}
        </div>
        <h1 className="mt-3 font-display text-4xl">{m.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{m.tagline}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <Card className="glyph-border p-6 lg:col-span-2">
          <div className="text-xs uppercase tracking-widest text-gold">Submit a pitch</div>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div className="grid grid-cols-3 gap-2">
              <Input type="number" min="0" step="100" placeholder="Amount" value={amount}
                onChange={(e) => setAmount(e.target.value)} required className="col-span-2" />
              <Input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} maxLength={4} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />
              <Input placeholder="Sector" value={sector} onChange={(e) => setSector(e.target.value)} />
            </div>
            <Textarea placeholder="Pitch — what will you build, who benefits, what evidence supports it?"
              value={pitch} onChange={(e) => setPitch(e.target.value)} rows={6} required minLength={40} />
            <label className="glyph-border flex cursor-pointer items-center justify-center gap-2 rounded-md p-3 text-sm text-muted-foreground hover:text-gold">
              <Paperclip className="h-4 w-4" />
              {files.length ? `${files.length} file(s) attached` : "Attach evidence"}
              <input type="file" multiple className="hidden"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
            </label>
            {files.length > 0 && (
              <ul className="space-y-1 text-xs text-muted-foreground">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded bg-secondary/40 px-2 py-1">
                    <span className="truncate">{f.name}</span>
                    <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Button type="submit" disabled={busy} className="w-full bg-gradient-gold text-gold-foreground shadow-glow">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Submit & generate report</>}
            </Button>
          </form>
        </Card>

        <div className="space-y-3 lg:col-span-3">
          <div className="text-xs uppercase tracking-widest text-gold">
            {isReviewer ? "Review queue" : "Your funding requests"}
          </div>
          {requests.length === 0 && (
            <p className="text-sm text-muted-foreground">No requests yet.</p>
          )}
          {requests.map((r) => (
            <Card key={r.id} onClick={() => setSelected(r)}
              className={`glyph-border cursor-pointer p-4 transition hover:border-gold/60 ${
                selected?.id === r.id ? "border-gold/80 shadow-glow" : ""
              }`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg">{r.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {r.amount_requested.toLocaleString()} {r.currency} · {r.region ?? "—"} · {r.sector ?? "—"}
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>
              {r.decision_report && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-sage">
                    ✦ v{r.current_version} · {recommendationLabel(r.decision_report.recommendation)} ·{" "}
                    {r.decision_report.recommended_amount.toLocaleString()} {r.decision_report.recommended_currency}
                  </span>
                  <HumanBadge approval={r.human_approval} />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {selected?.decision_report && (
        <DecisionPanel
          req={selected}
          isReviewer={isReviewer}
          onClose={() => setSelected(null)}
          onUpdated={async () => {
            await refresh();
            const fresh = await supabase.from("funding_requests").select("*").eq("id", selected.id).single();
            if (fresh.data) setSelected(fresh.data as unknown as FundingReq);
          }}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    submitted: "border-gold/60 text-gold",
    under_review: "border-sage/60 text-sage",
    approved: "border-sage/80 text-sage",
    declined: "border-destructive/60 text-destructive",
  };
  return <Badge variant="outline" className={map[status] ?? "border-border"}>{status.replace("_", " ")}</Badge>;
}

function recommendationLabel(r: DecisionReport["recommendation"]) {
  return {
    approve: "Approve",
    approve_with_conditions: "Approve with conditions",
    decline: "Decline",
    needs_more_info: "Needs more info",
  }[r];
}

function HumanBadge({ approval }: { approval: FundingReq["human_approval"] }) {
  const map: Record<FundingReq["human_approval"], string> = {
    pending: "border-gold/60 text-gold",
    approved: "border-sage/80 text-sage",
    declined: "border-destructive/60 text-destructive",
    revision_requested: "border-gold/60 text-gold",
  };
  const text: Record<FundingReq["human_approval"], string> = {
    pending: "Awaiting human review",
    approved: "Human approved",
    declined: "Human declined",
    revision_requested: "Revision requested",
  };
  return (
    <Badge variant="outline" className={map[approval]}>
      <ShieldCheck className="mr-1 h-3 w-3" /> {text[approval]}
    </Badge>
  );
}

function DecisionPanel({
  req, isReviewer, onClose, onUpdated,
}: {
  req: FundingReq;
  isReviewer: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void> | void;
}) {
  const d = req.decision_report!;
  const [notes, setNotes] = useState(req.human_decision_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const review = useServerFn(reviewFundingDecision);
  const pending = req.human_approval === "pending" || req.human_approval === "revision_requested";

  useEffect(() => {
    supabase
      .from("decision_report_versions")
      .select("*")
      .eq("funding_request_id", req.id)
      .order("version", { ascending: false })
      .then(({ data }) => setVersions((data as unknown as Version[]) ?? []));
  }, [req.id, req.current_version, req.human_approval]);

  async function decide(approval: "approved" | "declined" | "revision_requested") {
    setSaving(true);
    try {
      await review({ data: { requestId: req.id, approval, notes: notes || undefined } });
      toast.success(`Decision recorded: ${approval.replace("_", " ")}`);
      await onUpdated();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to record decision";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function exportPdf() {
    setExporting(true);
    try { await downloadDecisionPdf(req); } finally { setExporting(false); }
  }

  return (
    <div className="mt-10 rounded-xl glyph-border p-8 shadow-sanctum">
      <div className="flex items-start justify-between border-b border-border/60 pb-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Funding Decision Report</div>
          <h2 className="mt-2 font-display text-2xl">{req.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <HumanBadge approval={req.human_approval} />
            <Badge variant="outline" className="border-gold/40 text-gold">v{req.current_version}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportPdf} disabled={exporting}>
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Download className="h-4 w-4" /> Export PDF</>}
          </Button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat label="AI Recommendation" value={recommendationLabel(d.recommendation)} accent />
        <Stat label="Recommended" value={`${d.recommended_amount.toLocaleString()} ${d.recommended_currency}`} />
        <Stat label="Instrument" value={`${d.recommended_terms.instrument} · ${d.recommended_terms.duration_months}mo`} />
        <Stat label="Trust" value={`${d.trust_assessment.score}/100`} />
        <Stat label="Risk" value={`${d.risk_assessment.score}/100`} />
        <Stat label="Jobs forecast" value={d.impact_forecast.jobs_created.toLocaleString()} />
      </div>

      <Section title="Summary"><p className="text-sm text-foreground/90">{d.summary}</p></Section>
      <Section title="Milestones">
        <ul className="space-y-2">
          {d.recommended_terms.milestones.map((mi, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-display text-gold">{String(i + 1).padStart(2, "0")}</span> {mi}
            </li>
          ))}
        </ul>
      </Section>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Section title="Trust assessment"><p className="text-sm text-muted-foreground">{d.trust_assessment.rationale}</p></Section>
        <Section title="Risk flags">
          {d.risk_assessment.flags.length === 0 ? (
            <p className="text-sm text-sage">No flags raised.</p>
          ) : (
            <ul className="space-y-1 text-sm text-foreground/90">
              {d.risk_assessment.flags.map((f, i) => <li key={i}>• {f}</li>)}
            </ul>
          )}
        </Section>
        <Section title="Impact forecast">
          <p className="text-sm text-muted-foreground">{d.impact_forecast.notes}</p>
          <div className="mt-2 text-xs text-sage">Prosperity Δ {d.impact_forecast.prosperity_index_delta.toFixed(2)}</div>
        </Section>
        <Section title="Safeguards & human override">
          <ul className="space-y-1 text-sm text-foreground/90">
            {d.safeguards.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </Section>
      </div>
      <div className="mt-6 text-xs text-muted-foreground">
        Agents invoked: {d.agents_invoked.join(", ")}
      </div>
      {req.attachments.length > 0 && (
        <Section title="Attachments">
          <ul className="space-y-1 text-sm text-muted-foreground">
            {req.attachments.map((a) => (
              <li key={a.path} className="flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> {a.name}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={<><History className="mr-2 inline h-4 w-4" /> Version history</> as unknown as string}>
        <div className="space-y-2">
          {versions.length === 0 && <p className="text-xs text-muted-foreground">No versions recorded yet.</p>}
          {versions.map((v) => (
            <div key={v.id} className="flex items-start justify-between gap-3 rounded border border-border/40 bg-secondary/20 px-3 py-2 text-xs">
              <div>
                <div className="font-display text-sm">
                  v{v.version} · {recommendationLabel(v.report.recommendation)}
                  {v.human_approval !== "pending" && <Lock className="ml-2 inline h-3 w-3 text-gold" />}
                </div>
                <div className="text-muted-foreground">
                  Generated {new Date(v.generated_at).toLocaleString()}
                </div>
                {v.human_approval !== "pending" ? (
                  <div className="mt-1 text-sage">
                    {v.human_approval.replace("_", " ")} by {v.human_decided_by_name ?? "reviewer"} ·{" "}
                    {v.human_decided_at ? new Date(v.human_decided_at).toLocaleString() : ""}
                  </div>
                ) : (
                  <div className="mt-1 text-gold">Awaiting reviewer</div>
                )}
                {v.human_decision_notes && (
                  <div className="mt-1 text-muted-foreground italic">“{v.human_decision_notes}”</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Human-in-the-loop review">
        {!isReviewer && (
          <div className="mb-3 flex items-start gap-2 rounded border border-gold/40 bg-secondary/30 p-3 text-xs">
            <Lock className="mt-0.5 h-3.5 w-3.5 text-gold" />
            <span>
              Approval is restricted to users with the <strong>reviewer</strong> or <strong>admin</strong> role.
              The server enforces this regardless of UI state — your account currently does not have these privileges.
            </span>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          No AI recommendation is final until a reviewer with the required role approves. Each
          decision permanently stamps the active report version; further changes require a new
          version (re-generate the report).
        </p>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Reviewer notes — what tipped the decision, what conditions must be met…"
          rows={4}
          className="mt-3"
          disabled={!isReviewer || (!pending && !saving)}
        />
        {req.human_decided_at && (
          <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            Latest decision: {req.human_approval.replace("_", " ")} · {new Date(req.human_decided_at).toLocaleString()}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => decide("approved")}
            disabled={!isReviewer || saving || !pending}
            className="bg-gradient-gold text-gold-foreground shadow-glow">
            <Check className="h-4 w-4" /> Approve & finalize
          </Button>
          <Button size="sm" variant="outline" onClick={() => decide("revision_requested")}
            disabled={!isReviewer || saving || !pending} className="border-gold/40">
            <RotateCcw className="h-4 w-4" /> Request revision
          </Button>
          <Button size="sm" variant="outline" onClick={() => decide("declined")}
            disabled={!isReviewer || saving || !pending}
            className="border-destructive/60 text-destructive">
            <Ban className="h-4 w-4" /> Decline
          </Button>
        </div>
      </Section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <Card className="glyph-border p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-xl ${accent ? "text-gold" : "text-foreground"}`}>{value}</div>
    </Card>
  );
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-widest text-gold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
