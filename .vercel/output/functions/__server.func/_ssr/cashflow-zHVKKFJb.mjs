import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { b as getCashflowInsights } from "./launch.functions-BFvhYg-L.mjs";
import { u as useAuth, B as Button } from "./router-Dq4PHNk3.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, O as RefreshCw, b as Sparkles, T as TrendingUp, $ as Minus, Q as TrendingDown, a1 as CircleCheck, l as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "./observability.server-CSo3iCeb.mjs";
import "./server-D6kup5O1.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-D86cXXU7.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/zod.mjs";
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
import "./client-ChmNSUU0.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./entitlements-DDmJ5IMx.mjs";
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
function GatedCashflowPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "cashflow_insights", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CashflowPage, {}) });
}
const GRADE_COLOR = {
  A: "text-sage border-sage/60",
  B: "text-gold border-gold/60",
  C: "text-orange-400 border-orange-400/60",
  D: "text-destructive border-destructive/60",
  F: "text-destructive border-destructive/80"
};
const TREND_ICON = {
  improving: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
  unknown: Minus
};
const TREND_COLOR = {
  improving: "text-sage",
  stable: "text-gold",
  declining: "text-destructive",
  unknown: "text-muted-foreground"
};
function fmt(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
function CashflowPage() {
  const {
    user
  } = useAuth();
  const [result, setResult] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const fetch = useServerFn(getCashflowInsights);
  async function load() {
    if (!user) return;
    setBusy(true);
    try {
      const data = await fetch({
        data: {}
      });
      setResult(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load cashflow insights.");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Atlas Launch · Treasury" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Cashflow Insights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "AI-powered cashflow analysis grounded in your funding history and business activity." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: load, disabled: busy, className: "mt-4 bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        " Refresh"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Analyse"
      ] }) })
    ] }),
    !result && !busy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-center gap-4 text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-10 w-10 text-gold/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-xs", children: "Click Analyse to generate your AI cashflow report based on your funding history and business profile." })
    ] }),
    busy && !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `glyph-border p-5 ${GRADE_COLOR[result.health_grade]}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Health Grade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-5xl", children: result.health_grade }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: result.period })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Monthly Inflow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl text-sage", children: fmt(result.estimated_monthly_inflow) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Monthly Outflow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl text-gold", children: fmt(result.estimated_monthly_outflow) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Net Cashflow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-2 font-display text-3xl ${result.net_cashflow >= 0 ? "text-sage" : "text-destructive"}`, children: [
            result.net_cashflow >= 0 ? "+" : "",
            fmt(result.net_cashflow)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
            result.runway_months.toFixed(1),
            " mo runway"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        (() => {
          const Icon = TREND_ICON[result.cashflow_trend];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${TREND_COLOR[result.cashflow_trend]}` });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs uppercase tracking-widest ${TREND_COLOR[result.cashflow_trend]}`, children: result.cashflow_trend.replace("_", " ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/90", children: result.headline })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Key Observations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: result.key_observations.map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-sage" }),
            " ",
            o
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Risks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: result.risks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" }),
            " ",
            r
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Recommendations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: result.recommendations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-gold shrink-0", children: [
            i + 1,
            "."
          ] }),
          " ",
          r
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border border-gold/30 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-2", children: "Next 30 Days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: result.next_30_days })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground text-right", children: [
        "AI estimate · ",
        (/* @__PURE__ */ new Date()).toLocaleString()
      ] })
    ] })
  ] });
}
export {
  GatedCashflowPage as component
};
