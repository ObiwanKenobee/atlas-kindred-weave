import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { u as useAuth, s as useIsAdmin, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7IUb7tBK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { i as ShieldCheck, S as Search, v as LoaderCircle, I as Trash2, aJ as UserPlus, O as RefreshCw, U as Users, k as Coins, a as BadgeCheck, T as TrendingUp } from "../_libs/lucide-react.mjs";
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
import "./client.server-D5ro3rAQ.mjs";
import "./ephemeral-session.server-DRewInbI.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "./ai-gateway.server-C06lV5S3.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./paystack.server-Bs-IoxkW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const getAdminMetrics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("9a345d9b77ded6c0e4a15a403859f5e83a0cbf24114b22bd1dfb7fadee1ae2ee"));
function fmt(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
function MetricCard({
  label,
  value,
  sub,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: sub })
  ] });
}
function AdminMetricsPanel() {
  const fetchMetrics = useServerFn(getAdminMetrics);
  const [metrics, setMetrics] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMetrics({});
      setMetrics(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load metrics.");
    } finally {
      setLoading(false);
    }
  }, [fetchMetrics]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  if (loading && !metrics) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
    " Loading metrics…"
  ] });
  if (!metrics) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Command Center" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: load, disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Total users", value: metrics.users.total.toLocaleString(), sub: `+${metrics.users.newLast30Days} this month`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Capital deployed", value: fmt(metrics.funding.capitalDeployed), sub: `${metrics.funding.approved} approved deals`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4 text-sage" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Verifications", value: metrics.verification.verified.toLocaleString(), sub: `${(metrics.verification.successRate * 100).toFixed(0)}% success rate`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-4 w-4 text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Approval rate", value: `${(metrics.funding.approvalRate * 100).toFixed(0)}%`, sub: `${metrics.funding.pending} pending review`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-sage" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Avg trust score", value: `${metrics.users.avgTrustScore}/100`, sub: `${metrics.users.verified} verified users`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Verifications (7d)", value: metrics.verification.newLast7Days.toLocaleString(), sub: `${metrics.verification.rejected} rejected total`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-4 w-4 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Funding requests", value: metrics.funding.totalRequests.toLocaleString(), sub: `${fmt(metrics.funding.capitalRequested)} total requested`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }),
    metrics.topSectors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-gold mb-3", children: "Top sectors by approved deals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: metrics.topSectors.map(({
        sector,
        count
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/40 text-gold", children: [
        sector,
        " · ",
        count
      ] }, sector)) })
    ] }),
    metrics.trustDistribution.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-gold mb-3", children: "Trust score distribution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-16", children: metrics.trustDistribution.map(({
        range,
        count
      }) => {
        const max = Math.max(...metrics.trustDistribution.map((b) => b.count), 1);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-t bg-gradient-gold opacity-80", style: {
            height: `${Math.max(count / max * 48, count > 0 ? 4 : 0)}px`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: range }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gold", children: count })
        ] }, range);
      }) })
    ] })
  ] });
}
function AdminRolesPage() {
  const {
    user
  } = useAuth();
  const isAdmin = useIsAdmin();
  const [profiles, setProfiles] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [query, setQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [pending, setPending] = reactExports.useState(null);
  const [roleToGrant, setRoleToGrant] = reactExports.useState({});
  const refresh = reactExports.useCallback(async () => {
    setLoading(true);
    const [{
      data: profs
    }, {
      data: roleRows
    }] = await Promise.all([supabase.from("profiles").select("user_id, display_name, region, trust_score").order("display_name"), supabase.from("user_roles").select("id, user_id, role")]);
    setProfiles(profs ?? []);
    setRoles(roleRows ?? []);
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Gate, { title: "Admin · Roles", body: "Sign in with an admin account to manage permissions." });
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(Gate, { title: "Admin only", body: "This sanctum is reserved for stewards bearing the admin glyph." });
  const filtered = profiles.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (p.display_name ?? "").toLowerCase().includes(q) || p.user_id.toLowerCase().includes(q);
  });
  async function grant(userId) {
    const role = roleToGrant[userId] ?? "reviewer";
    setPending(userId + ":" + role);
    const {
      error
    } = await supabase.from("user_roles").insert({
      user_id: userId,
      role
    });
    setPending(null);
    if (error) {
      if (error.code === "23505") toast.error("User already has that role");
      else toast.error(error.message);
      return;
    }
    toast.success(`Granted ${role}`);
    refresh();
  }
  async function revoke(rowId, role) {
    setPending(rowId);
    const {
      error
    } = await supabase.from("user_roles").delete().eq("id", rowId);
    setPending(null);
    if (error) toast.error(error.message);
    else {
      toast.success(`Revoked ${role}`);
      refresh();
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Stewardship" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 flex items-center gap-3 font-display text-4xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-7 w-7 text-gold" }),
        " Role administration"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: [
        "Grant or revoke ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "reviewer" }),
        " and ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "admin" }),
        " roles. All actions are recorded in the audit ledger and the subject is notified."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminMetricsPanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/60 pb-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Role Management" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search by display name or user id…", className: "pl-9" })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading members…"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
      !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No members match your search." }),
      filtered.map((p) => {
        const userRoles = roles.filter((r) => r.user_id === p.user_id);
        const next = roleToGrant[p.user_id] ?? "reviewer";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base truncate", children: p.display_name ?? "Unnamed Sanctum member" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: [
              p.user_id.slice(0, 8),
              "… · trust ",
              Math.round(p.trust_score),
              p.region ? ` · ${p.region}` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
              userRoles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "member" }),
              userRoles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/40 text-gold inline-flex items-center gap-1", children: [
                r.role,
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": `Revoke ${r.role}`, onClick: () => revoke(r.id, r.role), disabled: pending === r.id, className: "ml-1 hover:text-destructive", children: pending === r.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
              ] }, r.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: next, onValueChange: (v) => setRoleToGrant((m) => ({
              ...m,
              [p.user_id]: v
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "reviewer", children: "reviewer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "admin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "member", children: "member" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => grant(p.user_id), disabled: pending === p.user_id + ":" + next, children: pending === p.user_id + ":" + next ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "mr-2 h-4 w-4" }),
              " Grant"
            ] }) })
          ] })
        ] }) }, p.user_id);
      })
    ] })
  ] });
}
function Gate({
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: body }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-block rounded-md border border-border/60 px-5 py-2.5 text-sm hover:border-gold/60 hover:text-gold", children: "Return to the Sanctum" })
  ] });
}
export {
  AdminRolesPage as component
};
