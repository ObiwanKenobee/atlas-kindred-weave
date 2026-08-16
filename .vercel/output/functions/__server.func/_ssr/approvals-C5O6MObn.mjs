import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, j as useIsReviewer, B as Button } from "./router-Dq4PHNk3.mjs";
import { l as listApprovals, a as listReviewers, b as assignApprovalReviewer, c as cancelApproval, d as decideApproval } from "./approvals.functions-Bmzz-tEN.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, f as DialogFooter } from "./dialog-DbjIujIp.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7IUb7tBK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { i as ShieldCheck, c as ScrollText, G as Gavel, a0 as Clock, a1 as CircleCheck, ay as CircleX, v as LoaderCircle, V as Vault, l as TriangleAlert, ax as Ban, aI as User, aJ as UserPlus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./client-ChmNSUU0.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./entitlements-DDmJ5IMx.mjs";
import "./observability.server-CSo3iCeb.mjs";
import "./server-D6kup5O1.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-D86cXXU7.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/zod.mjs";
import "./ephemeral-session.server-DRewInbI.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "./ai-gateway.server-C06lV5S3.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./paystack.server-Bs-IoxkW.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const SCOPES = [{
  value: "pending",
  label: "Pending review"
}, {
  value: "assigned",
  label: "Assigned to me"
}, {
  value: "mine",
  label: "My requests"
}, {
  value: "decided",
  label: "Decided"
}, {
  value: "all",
  label: "All"
}];
const KIND_META = {
  risk_override: {
    label: "Risk override",
    icon: TriangleAlert,
    color: "text-orange-400 border-orange-400/60"
  },
  vault_release: {
    label: "Vault release",
    icon: Vault,
    color: "text-sage border-sage/60"
  }
};
const STATUS_META = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-gold border-gold/60"
  },
  approved: {
    label: "Approved",
    icon: CircleCheck,
    color: "text-sage border-sage/60"
  },
  rejected: {
    label: "Rejected",
    icon: CircleX,
    color: "text-destructive border-destructive/60"
  },
  cancelled: {
    label: "Cancelled",
    icon: Ban,
    color: "text-muted-foreground border-border"
  }
};
function ApprovalsPage() {
  const {
    user
  } = useAuth();
  const isReviewer = useIsReviewer();
  const [scope, setScope] = reactExports.useState("pending");
  const [items, setItems] = reactExports.useState(null);
  const [reviewers, setReviewers] = reactExports.useState([]);
  const [active, setActive] = reactExports.useState(null);
  const [decisionMode, setDecisionMode] = reactExports.useState(null);
  const [notes, setNotes] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const fetchList = useServerFn(listApprovals);
  const fetchReviewers = useServerFn(listReviewers);
  const decide = useServerFn(decideApproval);
  const cancel = useServerFn(cancelApproval);
  const assign = useServerFn(assignApprovalReviewer);
  const load = reactExports.useCallback(async () => {
    if (!user) return;
    setItems(null);
    try {
      const rows = await fetchList({
        data: {
          scope
        }
      });
      setItems(rows);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load queue");
      setItems([]);
    }
  }, [user, scope, fetchList]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  reactExports.useEffect(() => {
    if (!user || !isReviewer) return;
    fetchReviewers({
      data: {}
    }).then(setReviewers).catch(() => setReviewers([]));
  }, [user, isReviewer, fetchReviewers]);
  const stats = reactExports.useMemo(() => {
    const src = items ?? [];
    return {
      pending: src.filter((r) => r.status === "pending").length,
      approved: src.filter((r) => r.status === "approved").length,
      rejected: src.filter((r) => r.status === "rejected").length,
      total: src.length
    };
  }, [items]);
  async function submitDecision() {
    if (!active || !decisionMode) return;
    setBusy(true);
    try {
      await decide({
        data: {
          approval_id: active.id,
          decision: decisionMode,
          notes: notes || void 0
        }
      });
      toast.success(`Approval ${decisionMode}`);
      setActive(null);
      setDecisionMode(null);
      setNotes("");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to decide");
    } finally {
      setBusy(false);
    }
  }
  async function submitCancel(a) {
    setBusy(true);
    try {
      await cancel({
        data: {
          approval_id: a.id
        }
      });
      toast.success("Request cancelled");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to cancel");
    } finally {
      setBusy(false);
    }
  }
  async function submitAssign(a, reviewerId) {
    setBusy(true);
    try {
      await assign({
        data: {
          approval_id: a.id,
          reviewer_id: reviewerId
        }
      });
      toast.success(reviewerId ? "Reviewer assigned" : "Reviewer cleared");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to assign");
    } finally {
      setBusy(false);
    }
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mx-auto h-10 w-10 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-3xl", children: "Approval queue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to view pending reviews." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow", children: "Enter" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Council" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Approval queue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: "Human-in-the-loop review for risk score overrides and knowledge vault releases. Every decision is recorded in the audit trail." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: scope, onValueChange: (v) => setScope(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SCOPES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/audit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "mr-2 h-4 w-4" }),
          "Audit trail"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "In queue", value: stats.total.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Pending", value: stats.pending.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Approved", value: stats.approved.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-sage" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Rejected", value: stats.rejected.toString(), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-destructive" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
      items === null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Loading queue…"
      ] }),
      items && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-10 text-center text-sm text-muted-foreground", children: "No approvals in this view." }),
      items?.map((a) => {
        const km = KIND_META[a.kind] ?? KIND_META.risk_override;
        const sm = STATUS_META[a.status] ?? STATUS_META.pending;
        const KIcon = km.icon;
        const SIcon = sm.icon;
        const isMine = a.requester_id === user.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: km.color, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(KIcon, { className: "mr-1 h-3 w-3" }),
                km.label
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: sm.color, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SIcon, { className: "mr-1 h-3 w-3" }),
                sm.label
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: new Date(a.created_at).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-lg", children: a.title }),
            a.rationale && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: a.rationale }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                "Requester ",
                a.requester_id.slice(0, 8)
              ] }),
              a.subject_user_id && a.subject_user_id !== a.requester_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· Subject ",
                a.subject_user_id.slice(0, 8)
              ] }),
              a.entity_type && a.entity_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· ",
                a.entity_type,
                " ",
                a.entity_id.slice(0, 8)
              ] }),
              a.assigned_reviewer_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· Assigned to ",
                a.assigned_reviewer_id.slice(0, 8)
              ] })
            ] }),
            Object.keys(a.proposed_change ?? {}).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-[10px] uppercase tracking-widest text-gold/80", children: "Proposed change" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 max-h-48 overflow-auto rounded-md border border-border/60 bg-secondary/30 p-2 text-[11px]", children: JSON.stringify(a.proposed_change, null, 2) })
            ] }),
            a.decision_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-md border border-border/60 bg-secondary/30 p-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Decision:" }),
              " ",
              a.decision_notes
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
            isReviewer && a.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                  setActive(a);
                  setDecisionMode("approved");
                  setNotes("");
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mr-1 h-3.5 w-3.5 text-sage" }),
                  "Approve"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                  setActive(a);
                  setDecisionMode("rejected");
                  setNotes("");
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-1 h-3.5 w-3.5 text-destructive" }),
                  "Reject"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: a.assigned_reviewer_id ?? "unassigned", onValueChange: (v) => submitAssign(a, v === "unassigned" ? null : v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-44 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "mr-1 h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Assign reviewer" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "unassigned", children: "Unassigned" }),
                  reviewers.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r.user_id, children: [
                    r.display_name,
                    " · ",
                    r.role
                  ] }, r.user_id))
                ] })
              ] })
            ] }),
            isMine && a.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", disabled: busy, onClick: () => submitCancel(a), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "mr-1 h-3.5 w-3.5" }),
              "Cancel request"
            ] })
          ] })
        ] }) }, a.id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!active && !!decisionMode, onOpenChange: (o) => {
      if (!o) {
        setActive(null);
        setDecisionMode(null);
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: decisionMode === "approved" ? "Approve request" : "Reject request" }) }),
      active && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/60 bg-secondary/30 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: KIND_META[active.kind]?.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display", children: active.title }),
          active.rationale && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: active.rationale })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Decision notes (recorded in the audit trail)", value: notes, onChange: (e) => setNotes(e.target.value), rows: 4 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
          setActive(null);
          setDecisionMode(null);
        }, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submitDecision, disabled: busy, children: [
          busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Confirm ",
          decisionMode
        ] })
      ] })
    ] }) })
  ] });
}
function Stat({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: value })
  ] });
}
export {
  ApprovalsPage as component
};
