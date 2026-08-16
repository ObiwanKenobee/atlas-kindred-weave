import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as m$8, B as Button } from "./router-m_YzkqUE.mjs";
import { c as createSsrRpc } from "./observability.server-D5WP9btl.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { C as Card } from "./card-Bc3CpL3p.mjs";
import { B as Badge } from "./badge-9pJdm6_1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-Dw2Cl3xx.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, O as RefreshCw, T as TrendingUp, V as Vault, Q as TrendingDown } from "../_libs/lucide-react.mjs";
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
import "./auth-middleware-16OviFoD.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const getTreasuryMetrics = createServerFn({
  method: "GET"
}).handler(createSsrRpc("d34f10a19cad5e5fcf13cadda22a994445f52e5985ae995e17be642e77e8db0d"));
function fmt(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
function BarChart({
  items,
  total
}) {
  if (items.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No data yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item) => {
    const pct = total > 0 ? item.amount / total * 100 : 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground/80", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 shrink-0 text-gold", children: fmt(item.amount) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-gradient-gold transition-all duration-700", style: {
        width: `${Math.max(pct, 1)}%`
      } }) })
    ] }, item.label);
  }) });
}
function TreasuryPage() {
  const [metrics, setMetrics] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const fetch = useServerFn(getTreasuryMetrics);
  async function load() {
    setBusy(true);
    try {
      const data = await fetch({});
      setMetrics(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load treasury data.");
    } finally {
      setBusy(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6 border-b border-border/60 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m$8.glyph }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$8.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$8.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: load, disabled: busy, className: "mt-6", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        " Refresh"
      ] }) })
    ] }),
    busy && !metrics && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }) }),
    metrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Capital Deployed", value: fmt(metrics.capitalDeployed), sub: `${fmt(metrics.deployedLast30)} last 30d`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-sage" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Active Deals", value: metrics.activeDeals.toString(), sub: `${metrics.pendingDeals} pending review`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Vault, { className: "h-5 w-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Default Rate", value: `${(metrics.defaultRate * 100).toFixed(1)}%`, sub: `${metrics.declinedDeals} declined of ${metrics.activeDeals + metrics.declinedDeals} decided`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: `h-5 w-5 ${metrics.defaultRate > 0.1 ? "text-destructive" : "text-sage"}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Total Requested", value: fmt(metrics.totalRequested), sub: `${metrics.totalRequests} total submissions`, icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/40 text-gold", children: [
          metrics.totalRequests,
          " reqs"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Capital by Sector" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, { items: metrics.bySector, total: metrics.capitalDeployed }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Capital by Region" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, { items: metrics.byRegion, total: metrics.capitalDeployed }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Treasury Health" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthLine, { label: "Deployment efficiency", value: metrics.totalRequested > 0 ? metrics.capitalDeployed / metrics.totalRequested : 0, fmt: (v) => `${(v * 100).toFixed(1)}%`, good: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthLine, { label: "Portfolio quality", value: 1 - metrics.defaultRate, fmt: (v) => `${(v * 100).toFixed(1)}%`, good: 0.85 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthLine, { label: "30d deployment momentum", value: metrics.capitalDeployed > 0 ? metrics.deployedLast30 / metrics.capitalDeployed : 0, fmt: (v) => `${(v * 100).toFixed(1)}%`, good: 0.1 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: [
        "Live data from Sanctum ledger · ",
        (/* @__PURE__ */ new Date()).toLocaleString()
      ] })
    ] })
  ] });
}
function KPI({
  label,
  value,
  sub,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function HealthLine({
  label,
  value,
  fmt: fmtFn,
  good
}) {
  const healthy = value >= good;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: healthy ? "text-sage" : "text-gold", children: fmtFn(value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 w-full rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 rounded-full transition-all duration-700 ${healthy ? "bg-sage" : "bg-gold"}`, style: {
      width: `${Math.min(value * 100, 100)}%`
    } }) })
  ] });
}
function GatedTreasuryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "treasury_reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreasuryPage, {}) });
}
export {
  GatedTreasuryPage as component
};
