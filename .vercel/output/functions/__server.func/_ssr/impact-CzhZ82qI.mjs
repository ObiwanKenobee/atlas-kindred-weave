import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { g as m$5, B as Button } from "./router-m_YzkqUE.mjs";
import { c as createSsrRpc } from "./observability.server-D5WP9btl.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { C as Card } from "./card-Bc3CpL3p.mjs";
import { B as Badge } from "./badge-9pJdm6_1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-Dw2Cl3xx.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, O as RefreshCw, T as TrendingUp, b as Sparkles, U as Users, aj as Earth, i as ShieldCheck, n as Leaf } from "../_libs/lucide-react.mjs";
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
const getImpactMetrics = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3feabf02468349556e0da7080d34df8ef89466386569f5373a3671ffc8e4b149"));
function fmtMoney(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
function ImpactKPI({
  label,
  value,
  sub,
  delta,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: sub }),
    delta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-sage", children: delta })
  ] });
}
function BarRow({
  label,
  value,
  max
}) {
  const pct = max > 0 ? value / max * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 shrink-0 text-gold", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-gradient-gold transition-all duration-700", style: {
      width: `${Math.max(pct, 1)}%`
    } }) })
  ] });
}
function ImpactPage() {
  const [metrics, setMetrics] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const fetchMetrics = useServerFn(getImpactMetrics);
  async function load() {
    setBusy(true);
    try {
      const data = await fetchMetrics({});
      setMetrics(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load impact data.");
    } finally {
      setBusy(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  const maxSector = Math.max(...metrics?.topSectors.map((s) => s.count) ?? [1], 1);
  const maxRegion = Math.max(...metrics?.topRegions.map((r) => r.count) ?? [1], 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6 border-b border-border/60 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m$5.glyph }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$5.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$5.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: load, disabled: busy, className: "mt-6", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        " Refresh"
      ] }) })
    ] }),
    busy && !metrics && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }) }),
    metrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Businesses Funded", value: metrics.businessesFunded.toLocaleString(), sub: `${metrics.momentum.newFunded30} this month`, delta: `+${metrics.momentum.newFunded30} (30d)`, icon: TrendingUp }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Capital Deployed", value: fmtMoney(metrics.capitalDeployed), sub: "to entrepreneurs", icon: Sparkles }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Jobs Forecast", value: metrics.totalJobs.toLocaleString(), sub: "from AI impact models", icon: Users }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Households Reached", value: metrics.totalHouseholds.toLocaleString(), sub: "projected impact", icon: Earth })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Users Served", value: metrics.totalUsersServed.toLocaleString(), sub: `${metrics.verifiedUsers} verified`, delta: `+${metrics.momentum.newUsers30} (30d)`, icon: Users }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Verification Rate", value: `${metrics.verificationSuccessRate}%`, sub: `${metrics.verifiedProofs} of ${metrics.totalVerifications}`, delta: `+${metrics.momentum.newVerified30} (7d)`, icon: ShieldCheck }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Avg Trust Score", value: `${metrics.avgTrustScore}/100`, sub: `${metrics.verifiedUsers} trusted members`, icon: ShieldCheck }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactKPI, { label: "Prosperity Index", value: metrics.totalProsperity >= 0 ? `+${metrics.totalProsperity}` : `${metrics.totalProsperity}`, sub: "cumulative AI forecast", icon: Leaf })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Impact by Sector" }),
          metrics.topSectors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No funded deals yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: metrics.topSectors.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 truncate", children: s.sector }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 shrink-0 text-muted-foreground", children: [
                s.count,
                " deals · ",
                fmtMoney(s.capital)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-gradient-gold transition-all duration-700", style: {
              width: `${Math.max(s.count / maxSector * 100, 1)}%`
            } }) })
          ] }, s.sector)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Impact by Region" }),
          metrics.topRegions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No regional data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: metrics.topRegions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(BarRow, { label: r.region, value: r.count, max: maxRegion }, r.region)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "30-Day Momentum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl text-gold", children: [
              "+",
              metrics.momentum.newFunded30
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground", children: "New businesses funded" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl text-sage", children: [
              "+",
              metrics.momentum.newVerified30
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground", children: "New verifications" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl text-gold", children: [
              "+",
              metrics.momentum.newUsers30
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground", children: "New community members" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Aligned SDGs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["SDG 1 · No Poverty", "SDG 8 · Decent Work", "SDG 9 · Industry & Innovation", "SDG 10 · Reduced Inequality", "SDG 11 · Sustainable Communities", "SDG 17 · Partnerships"].map((sdg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-sage/40 text-sage/90 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "mr-1 h-2.5 w-2.5" }),
          " ",
          sdg
        ] }, sdg)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground text-right", children: [
        "Live data from Sanctum ledger · ",
        (/* @__PURE__ */ new Date()).toLocaleString()
      ] })
    ] })
  ] });
}
function GatedImpactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "impact_reporting", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactPage, {}) });
}
export {
  GatedImpactPage as component
};
