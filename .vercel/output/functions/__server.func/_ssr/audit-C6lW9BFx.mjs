import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { u as useAuth, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7IUb7tBK.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { c as ScrollText, S as Search, at as Download, aH as FileBraces } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const ENTITY_OPTIONS = [{
  value: "all",
  label: "All activity"
}, {
  value: "funding_request",
  label: "Funding requests"
}, {
  value: "verification_event",
  label: "Verification events"
}, {
  value: "profile",
  label: "Trust recalculations"
}];
const ACTION_OPTIONS = [{
  value: "all",
  label: "All actions"
}, {
  value: "funding.submitted",
  label: "Funding submitted"
}, {
  value: "funding.approved",
  label: "Funding approved"
}, {
  value: "funding.declined",
  label: "Funding declined"
}, {
  value: "funding.revision_requested",
  label: "Revision requested"
}, {
  value: "verification.insert",
  label: "Verification recorded"
}, {
  value: "verification.update",
  label: "Verification updated"
}, {
  value: "trust.recalculated",
  label: "Trust recalculated"
}];
function AuditPage() {
  const {
    user
  } = useAuth();
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [entity, setEntity] = reactExports.useState("all");
  const [action, setAction] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!user) return;
    let q = supabase.from("audit_log").select("*").order("created_at", {
      ascending: false
    }).limit(500);
    if (entity !== "all") q = q.eq("entity_type", entity);
    if (action !== "all") q = q.eq("action", action);
    q.then(({
      data
    }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, [user, entity, action]);
  const filtered = reactExports.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => [r.summary, r.action, r.entity_type, r.actor_name ?? "", JSON.stringify(r.details)].join(" ").toLowerCase().includes(needle));
  }, [rows, query]);
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Audit Trail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to view your audit history." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Sanctum Records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 flex items-center gap-3 font-display text-4xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "h-7 w-7 text-gold" }),
        " Audit Trail"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: "Every funding submission, verification outcome, trust recalculation, and reviewer decision recorded by the Sanctum. Reviewers see the full ledger; everyone else sees activity that touches them." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 md:grid-cols-[1fr_220px_220px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Full-text search summaries, actors, details…", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: entity, onValueChange: setEntity, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ENTITY_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: action, onValueChange: setAction, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ACTION_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: loading ? "Loading the ledger…" : `${filtered.length} record${filtered.length === 1 ? "" : "s"} match${filtered.length === 1 ? "es" : ""} the current filters.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: filtered.length === 0, onClick: () => downloadCsv(filtered, query), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          " CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: filtered.length === 0, onClick: () => downloadJson(filtered, query), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileBraces, { className: "mr-2 h-4 w-4" }),
          " JSON"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
      !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No records match your filters." }),
      filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold", children: r.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.entity_type }),
            r.actor_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: [
              "by ",
              r.actor_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm", children: r.summary }),
          Object.keys(r.details ?? {}).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer hover:text-foreground", children: "Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 overflow-x-auto rounded bg-secondary/40 p-2 text-[11px]", children: JSON.stringify(r.details, null, 2) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground", children: new Date(r.created_at).toLocaleString() })
      ] }) }, r.id))
    ] })
  ] });
}
function highlightMatches(needle, hay) {
  const q = needle.trim().toLowerCase();
  if (!q) return [];
  const out = [];
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
function csvCell(v) {
  const s = v == null ? "" : typeof v === "string" ? v : JSON.stringify(v);
  return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function stamp() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
}
function downloadCsv(rows, query) {
  const headers = ["created_at", "action", "entity_type", "entity_id", "actor_id", "actor_name", "subject_user_id", "summary", "details", "matches"];
  const lines = [headers.join(",")];
  for (const r of rows) {
    const blob = [r.summary, r.action, r.entity_type, r.actor_name ?? "", JSON.stringify(r.details ?? {})].join(" ");
    const matches = highlightMatches(query, blob).join(" | ");
    lines.push([r.created_at, r.action, r.entity_type, r.entity_id ?? "", r.actor_id ?? "", r.actor_name ?? "", r.subject_user_id ?? "", r.summary, r.details ?? {}, matches].map(csvCell).join(","));
  }
  triggerDownload(new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8"
  }), `atlas-audit-${stamp()}.csv`);
}
function downloadJson(rows, query) {
  const payload = {
    exported_at: (/* @__PURE__ */ new Date()).toISOString(),
    query,
    count: rows.length,
    rows: rows.map((r) => ({
      ...r,
      matches: highlightMatches(query, [r.summary, r.action, r.entity_type, r.actor_name ?? "", JSON.stringify(r.details ?? {})].join(" "))
    }))
  };
  triggerDownload(new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  }), `atlas-audit-${stamp()}.json`);
}
export {
  AuditPage as component
};
