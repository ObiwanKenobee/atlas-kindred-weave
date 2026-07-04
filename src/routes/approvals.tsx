import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useIsReviewer } from "@/lib/notifications";
import {
  listApprovals, decideApproval, cancelApproval,
  assignApprovalReviewer, listReviewers,
} from "@/lib/approvals.functions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  ShieldCheck, Vault, AlertTriangle, CheckCircle2, XCircle,
  Loader2, Clock, User, Gavel, UserPlus, Ban, ScrollText,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approval Queue — Atlas Sanctum" },
      { name: "description", content: "Human-in-the-loop reviews for risk overrides and vault releases." },
    ],
  }),
  component: ApprovalsPage,
});

type Approval = Awaited<ReturnType<typeof listApprovals>>[number];
type Reviewer = Awaited<ReturnType<typeof listReviewers>>[number];
type Scope = "pending" | "assigned" | "mine" | "decided" | "all";

const SCOPES: { value: Scope; label: string }[] = [
  { value: "pending", label: "Pending review" },
  { value: "assigned", label: "Assigned to me" },
  { value: "mine", label: "My requests" },
  { value: "decided", label: "Decided" },
  { value: "all", label: "All" },
];

const KIND_META: Record<string, { label: string; icon: typeof AlertTriangle; color: string }> = {
  risk_override: { label: "Risk override", icon: AlertTriangle, color: "text-orange-400 border-orange-400/60" },
  vault_release: { label: "Vault release", icon: Vault, color: "text-sage border-sage/60" },
};

const STATUS_META: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "text-gold border-gold/60" },
  approved: { label: "Approved", icon: CheckCircle2, color: "text-sage border-sage/60" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-destructive border-destructive/60" },
  cancelled: { label: "Cancelled", icon: Ban, color: "text-muted-foreground border-border" },
};

function ApprovalsPage() {
  const { user } = useAuth();
  const isReviewer = useIsReviewer();
  const [scope, setScope] = useState<Scope>("pending");
  const [items, setItems] = useState<Approval[] | null>(null);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [active, setActive] = useState<Approval | null>(null);
  const [decisionMode, setDecisionMode] = useState<"approved" | "rejected" | null>(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const fetchList = useServerFn(listApprovals);
  const fetchReviewers = useServerFn(listReviewers);
  const decide = useServerFn(decideApproval);
  const cancel = useServerFn(cancelApproval);
  const assign = useServerFn(assignApprovalReviewer);

  const load = useCallback(async () => {
    if (!user) return;
    setItems(null);
    try {
      const rows = await fetchList({ data: { scope } });
      setItems(rows);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load queue");
      setItems([]);
    }
  }, [user, scope, fetchList]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!user || !isReviewer) return;
    fetchReviewers({ data: {} }).then(setReviewers).catch(() => setReviewers([]));
  }, [user, isReviewer, fetchReviewers]);

  const stats = useMemo(() => {
    const src = items ?? [];
    return {
      pending: src.filter((r) => r.status === "pending").length,
      approved: src.filter((r) => r.status === "approved").length,
      rejected: src.filter((r) => r.status === "rejected").length,
      total: src.length,
    };
  }, [items]);

  async function submitDecision() {
    if (!active || !decisionMode) return;
    setBusy(true);
    try {
      await decide({ data: { approval_id: active.id, decision: decisionMode, notes: notes || undefined } });
      toast.success(`Approval ${decisionMode}`);
      setActive(null); setDecisionMode(null); setNotes("");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to decide");
    } finally { setBusy(false); }
  }

  async function submitCancel(a: Approval) {
    setBusy(true);
    try {
      await cancel({ data: { approval_id: a.id } });
      toast.success("Request cancelled");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to cancel");
    } finally { setBusy(false); }
  }

  async function submitAssign(a: Approval, reviewerId: string | null) {
    setBusy(true);
    try {
      await assign({ data: { approval_id: a.id, reviewer_id: reviewerId } });
      toast.success(reviewerId ? "Reviewer assigned" : "Reviewer cleared");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to assign");
    } finally { setBusy(false); }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-4 font-display text-3xl">Approval queue</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view pending reviews.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow">Enter</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Council</div>
          <h1 className="mt-3 font-display text-4xl">Approval queue</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Human-in-the-loop review for risk score overrides and knowledge vault releases.
            Every decision is recorded in the audit trail.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={scope} onValueChange={(v) => setScope(v as Scope)}>
            <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SCOPES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <Link to="/audit"><ScrollText className="mr-2 h-4 w-4" />Audit trail</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <Stat label="In queue" value={stats.total.toString()} icon={<Gavel className="h-4 w-4" />} />
        <Stat label="Pending" value={stats.pending.toString()} icon={<Clock className="h-4 w-4 text-gold" />} />
        <Stat label="Approved" value={stats.approved.toString()} icon={<CheckCircle2 className="h-4 w-4 text-sage" />} />
        <Stat label="Rejected" value={stats.rejected.toString()} icon={<XCircle className="h-4 w-4 text-destructive" />} />
      </div>

      <div className="mt-6 space-y-3">
        {items === null && (
          <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading queue…</div>
        )}
        {items && items.length === 0 && (
          <Card className="glyph-border p-10 text-center text-sm text-muted-foreground">
            No approvals in this view.
          </Card>
        )}
        {items?.map((a) => {
          const km = KIND_META[a.kind] ?? KIND_META.risk_override;
          const sm = STATUS_META[a.status] ?? STATUS_META.pending;
          const KIcon = km.icon; const SIcon = sm.icon;
          const isMine = a.requester_id === user.id;
          return (
            <Card key={a.id} className="glyph-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={km.color}><KIcon className="mr-1 h-3 w-3" />{km.label}</Badge>
                    <Badge variant="outline" className={sm.color}><SIcon className="mr-1 h-3 w-3" />{sm.label}</Badge>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 font-display text-lg">{a.title}</div>
                  {a.rationale && <p className="mt-1 text-sm text-muted-foreground">{a.rationale}</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />Requester {a.requester_id.slice(0, 8)}</span>
                    {a.subject_user_id && a.subject_user_id !== a.requester_id && (
                      <span>· Subject {a.subject_user_id.slice(0, 8)}</span>
                    )}
                    {a.entity_type && a.entity_id && (
                      <span>· {a.entity_type} {a.entity_id.slice(0, 8)}</span>
                    )}
                    {a.assigned_reviewer_id && (
                      <span>· Assigned to {a.assigned_reviewer_id.slice(0, 8)}</span>
                    )}
                  </div>
                  {Object.keys(a.proposed_change ?? {}).length > 0 && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[10px] uppercase tracking-widest text-gold/80">
                        Proposed change
                      </summary>
                      <pre className="mt-2 max-h-48 overflow-auto rounded-md border border-border/60 bg-secondary/30 p-2 text-[11px]">
                        {JSON.stringify(a.proposed_change, null, 2)}
                      </pre>
                    </details>
                  )}
                  {a.decision_notes && (
                    <div className="mt-3 rounded-md border border-border/60 bg-secondary/30 p-2 text-xs">
                      <span className="text-gold">Decision:</span> {a.decision_notes}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {isReviewer && a.status === "pending" && (
                    <>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setActive(a); setDecisionMode("approved"); setNotes(""); }}>
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-sage" />Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => { setActive(a); setDecisionMode("rejected"); setNotes(""); }}>
                          <XCircle className="mr-1 h-3.5 w-3.5 text-destructive" />Reject
                        </Button>
                      </div>
                      <Select
                        value={a.assigned_reviewer_id ?? "unassigned"}
                        onValueChange={(v) => submitAssign(a, v === "unassigned" ? null : v)}
                      >
                        <SelectTrigger className="w-44 text-xs"><UserPlus className="mr-1 h-3 w-3" /><SelectValue placeholder="Assign reviewer" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {reviewers.map((r) => (
                            <SelectItem key={r.user_id} value={r.user_id}>
                              {r.display_name} · {r.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                  {isMine && a.status === "pending" && (
                    <Button size="sm" variant="ghost" disabled={busy} onClick={() => submitCancel(a)}>
                      <Ban className="mr-1 h-3.5 w-3.5" />Cancel request
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!active && !!decisionMode} onOpenChange={(o) => { if (!o) { setActive(null); setDecisionMode(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {decisionMode === "approved" ? "Approve request" : "Reject request"}
            </DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-3">
              <div className="rounded-md border border-border/60 bg-secondary/30 p-3">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{KIND_META[active.kind]?.label}</div>
                <div className="mt-1 font-display">{active.title}</div>
                {active.rationale && <p className="mt-1 text-xs text-muted-foreground">{active.rationale}</p>}
              </div>
              <Textarea
                placeholder="Decision notes (recorded in the audit trail)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setActive(null); setDecisionMode(null); }}>Cancel</Button>
            <Button onClick={submitDecision} disabled={busy}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm {decisionMode}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="glyph-border p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">{icon} {label}</div>
      <div className="mt-2 font-display text-3xl">{value}</div>
    </Card>
  );
}
