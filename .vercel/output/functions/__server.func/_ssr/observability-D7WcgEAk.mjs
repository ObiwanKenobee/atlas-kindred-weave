import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, B as Button } from "./router-m_YzkqUE.mjs";
import { g as getObservabilityMetrics } from "./observability.server-D5WP9btl.mjs";
import { C as Card } from "./card-Bc3CpL3p.mjs";
import { B as Badge } from "./badge-9pJdm6_1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { A as Activity, v as LoaderCircle, O as RefreshCw, o as Brain, a0 as Clock, ar as Zap, as as Layers, l as TriangleAlert, i as ShieldCheck, k as Coins, T as TrendingUp, C as ChartColumn } from "../_libs/lucide-react.mjs";
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
import "./server-BWHKBO2n.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
const AGENT_ICONS = {
  "Funding Agent": Coins,
  "Verification Agent": ShieldCheck,
  "Risk Agent": TriangleAlert,
  "CFO Agent": Brain,
  "Orchestrator": Zap,
  "Session Service": Layers,
  "Knowledge Agent": Brain
};
const PERIOD_OPTIONS = [{
  label: "24h",
  days: 1
}, {
  label: "7d",
  days: 7
}, {
  label: "30d",
  days: 30
}];
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 font-display text-2xl ${accent ? "text-gold" : "text-foreground"}`, children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 shrink-0 mt-1 ${accent ? "text-gold" : "text-muted-foreground"}` })
  ] }) });
}
function FunnelBar({
  label,
  value,
  max,
  color
}) {
  const pct = max > 0 ? Math.round(value / max * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-secondary/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${color} transition-all duration-500`, style: {
      width: `${pct}%`
    } }) })
  ] });
}
function OutcomeBadge({
  outcome
}) {
  if (!outcome) return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-border/40 text-muted-foreground text-[9px]", children: "—" });
  const map = {
    approve: "border-sage/60 text-sage",
    approve_with_conditions: "border-sage/40 text-sage",
    verified: "border-sage/60 text-sage",
    answered: "border-gold/40 text-gold",
    error: "border-destructive/60 text-destructive",
    decline: "border-destructive/40 text-destructive",
    needs_review: "border-gold/60 text-gold"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `${map[outcome] ?? "border-border/40"} text-[9px]`, children: outcome.replace(/_/g, " ") });
}
function ObservabilityPage() {
  const {
    user
  } = useAuth();
  const fetchMetrics = useServerFn(getObservabilityMetrics);
  const [metrics, setMetrics] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [days, setDays] = reactExports.useState(7);
  async function load(d = days) {
    if (!user) return;
    setLoading(true);
    try {
      const m = await fetchMetrics({
        data: {
          days: d
        }
      });
      setMetrics(m);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load metrics");
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, [user, days]);
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mx-auto h-10 w-10 text-gold/60 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Observability" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to view production metrics." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Production Layer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Observability" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-md border border-border/40 overflow-hidden", children: PERIOD_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setDays(o.days);
            load(o.days);
          }, className: `px-3 py-1.5 text-xs transition ${days === o.days ? "bg-gradient-gold text-gold-foreground" : "text-muted-foreground hover:text-foreground"}`, children: o.label }, o.days)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => load(), disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-2xl text-muted-foreground text-sm", children: [
        "AI performance, funding funnel, session security, and agent event feed.",
        metrics?.isElevated ? " Showing platform-wide data." : " Showing your activity."
      ] })
    ] }),
    loading && !metrics && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }) }),
    metrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "AI Performance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total AI Calls", value: metrics.ai.total_calls, icon: Brain, accent: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg Latency", value: `${metrics.ai.avg_latency_ms}ms`, sub: "mean response time", icon: Clock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "P95 Latency", value: `${metrics.ai.p95_latency_ms}ms`, sub: "95th percentile", icon: Clock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Tokens Used", value: metrics.ai.total_tokens.toLocaleString(), sub: "input + output", icon: Zap }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Avg Sources/Query", value: metrics.ai.avg_sources_retrieved, sub: "vault chunks", icon: Layers }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Error Rate", value: `${metrics.ai.error_rate_pct}%`, icon: TriangleAlert, accent: metrics.ai.error_rate_pct > 5 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5 lg:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Agent Breakdown" }),
          metrics.agents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No agent calls recorded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-left", children: "Agent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right", children: "Calls" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right", children: "Avg ms" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right", children: "Avg tokens" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right", children: "Confidence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right", children: "Errors" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/20", children: metrics.agents.map((a, i) => {
              const Icon = AGENT_ICONS[a.agent] ?? Activity;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/20 transition", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-gold/70 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: a.agent }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: a.action.replace(/_/g, " ") })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: Number(a.total_calls).toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: a.avg_latency_ms ?? "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: a.avg_tokens ?? "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: a.avg_confidence_pct != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: Number(a.avg_confidence_pct) >= 70 ? "text-sage" : "text-gold", children: [
                  a.avg_confidence_pct,
                  "%"
                ] }) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: Number(a.error_count) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: a.error_count }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sage", children: "0" }) })
              ] }, i);
            }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
              " Funding Funnel"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelBar, { label: "Submitted", value: metrics.funnel.submitted, max: metrics.funnel.submitted, color: "bg-gold/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelBar, { label: "Under review", value: metrics.funnel.under_review, max: metrics.funnel.submitted, color: "bg-gold/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelBar, { label: "Approved", value: metrics.funnel.approved, max: metrics.funnel.submitted, color: "bg-sage/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelBar, { label: "Declined", value: metrics.funnel.declined, max: metrics.funnel.submitted, color: "bg-destructive/50" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border/40 pt-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Capital approved: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-gold", children: [
                "$",
                metrics.funnel.total_capital.toLocaleString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5" }),
              " Ephemeral Sessions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sessions minted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: metrics.sessions.total })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sessions used" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sage", children: metrics.sessions.used })
              ] }),
              Object.entries(metrics.sessions.by_purpose).map(([purpose, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: purpose.replace(/_/g, " ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: count })
              ] }, purpose))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] text-muted-foreground", children: "Tokens expire after 5 min. Raw API keys never leave the server." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" }),
          " Recent Agent Events"
        ] }),
        metrics.recentEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No events recorded in this period." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: metrics.recentEvents.map((e, i) => {
          const Icon = AGENT_ICONS[e.agent] ?? Activity;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-3 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold/70 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.agent }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: e.action.replace(/_/g, " ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(OutcomeBadge, { outcome: e.outcome }),
              e.latency_ms != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-border/40 text-[9px]", children: [
                e.latency_ms,
                "ms"
              ] }),
              (e.input_tokens != null || e.output_tokens != null) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-border/40 text-[9px]", children: [
                ((e.input_tokens ?? 0) + (e.output_tokens ?? 0)).toLocaleString(),
                " tok"
              ] }),
              e.confidence != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/30 text-gold text-[9px]", children: [
                (e.confidence * 100).toFixed(0),
                "% conf"
              ] }),
              e.sources_retrieved > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-border/40 text-[9px]", children: [
                e.sources_retrieved,
                " src"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap shrink-0", children: new Date(e.created_at).toLocaleTimeString() })
          ] }, i);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 border-gold/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-3.5 w-3.5" }),
          " Production Architecture"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs text-muted-foreground", children: [{
          title: "Ephemeral Sessions",
          desc: "5-min signed tokens. Raw API keys never reach the client."
        }, {
          title: "Agent Observability",
          desc: "Every AI call logged with latency, tokens, confidence, and RAG sources."
        }, {
          title: "Grounded Responses",
          desc: "All funding decisions backed by vault retrieval. Zero hallucination policy."
        }, {
          title: "Human-in-the-Loop",
          desc: "No AI recommendation finalised without reviewer approval. Immutable audit trail."
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-border/30 bg-secondary/20 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground/90 mb-1", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.desc })
        ] }, item.title)) })
      ] })
    ] })
  ] });
}
export {
  ObservabilityPage as component
};
