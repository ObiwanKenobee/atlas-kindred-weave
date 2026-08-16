import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { S as Search, v as LoaderCircle, b as Sparkles, T as TrendingUp, F as FileText, C as ChartColumn, aq as ArrowRight, a1 as CircleCheck, ar as Zap, t as Circle, E as ExternalLink } from "../_libs/lucide-react.mjs";
import { g as objectType, i as stringType } from "../_libs/zod.mjs";
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
import "./client.server-D5ro3rAQ.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const ResearchInput = objectType({
  focus: stringType().max(300).optional()
});
const findFundingOpportunities = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ResearchInput.parse(d)).handler(createSsrRpc("a3a74cc9c2345b53123bbe206d2577b7259572fef2d53b07f8cfd30937822baf"));
const generateTreasuryReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("2ec8701abfcd04814ab0d2747f90b7ec351de6e3d87f4f67e3d4784fcfb25cf3"));
function GatedOpportunitiesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "funding_match", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OpportunitiesPage, {}) });
}
const TYPE_COLORS = {
  grant: "border-sage/60 text-sage",
  loan: "border-gold/60 text-gold",
  equity: "border-gold/40 text-gold",
  accelerator: "border-blue-400/60 text-blue-400",
  government: "border-purple-400/60 text-purple-400",
  ngo: "border-sage/40 text-sage",
  cooperative: "border-orange-400/60 text-orange-400"
};
const WORKFLOW_STEPS = [{
  key: "observe",
  label: "Observe",
  desc: "Scan profile, vault, and history"
}, {
  key: "understand",
  label: "Understand",
  desc: "Parse sector, region, trust score"
}, {
  key: "verify",
  label: "Verify",
  desc: "Check verification evidence"
}, {
  key: "reason",
  label: "Reason",
  desc: "Research Agent matches opportunities"
}, {
  key: "act",
  label: "Act",
  desc: "Generate ranked opportunity list"
}, {
  key: "record",
  label: "Record",
  desc: "Log agent event to observability"
}, {
  key: "learn",
  label: "Learn",
  desc: "Refine fit scores over time"
}];
function WorkflowStepper({
  activeStep
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 flex-wrap", children: WORKFLOW_STEPS.map((step, i) => {
    const done = i < activeStep;
    const active = i === activeStep;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { title: step.desc, className: `flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest transition-all ${done ? "bg-sage/20 text-sage border border-sage/40" : active ? "bg-gold/20 text-gold border border-gold/60 animate-pulse" : "bg-secondary/40 text-muted-foreground border border-border/30"}`, children: [
        done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5" }) : active ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2.5 w-2.5" }),
        step.label
      ] }),
      i < WORKFLOW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-2.5 w-2.5 text-border/60 shrink-0" })
    ] }, step.key);
  }) });
}
function FitBar({
  score
}) {
  const color = score >= 70 ? "bg-sage" : score >= 45 ? "bg-gold" : "bg-destructive/60";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 rounded-full ${color} transition-all`, style: {
      width: `${score}%`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-medium tabular-nums ${score >= 70 ? "text-sage" : score >= 45 ? "text-gold" : "text-destructive"}`, children: [
      score,
      "%"
    ] })
  ] });
}
function OpportunityCard({
  opp,
  rank
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[10px] text-gold/60", children: [
            "#",
            rank
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `${TYPE_COLORS[opp.type] ?? "border-border/40"} text-[9px]`, children: opp.type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base leading-snug", children: opp.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: opp.provider })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm text-gold", children: opp.estimated_amount }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed", children: opp.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mb-1.5", children: "Fit score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FitBar, { score: opp.fit_score }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: opp.fit_rationale })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mb-1", children: "Eligibility" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: opp.eligibility.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-foreground/70 flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold shrink-0", children: "·" }),
        " ",
        e
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-1 border-t border-border/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-sage", children: opp.next_step }),
      opp.url_hint && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: opp.url_hint.startsWith("http") ? opp.url_hint : `https://${opp.url_hint}`, target: "_blank", rel: "noopener noreferrer", className: "shrink-0 text-muted-foreground hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) })
    ] })
  ] });
}
function TreasuryReportPanel({
  report
}) {
  const healthColor = {
    "A+": "text-sage",
    "A": "text-sage",
    "B+": "text-gold",
    "B": "text-gold",
    "C": "text-orange-400",
    "D": "text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-3.5 w-3.5" }),
          " Treasury Report · ",
          report.period
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-4xl ${healthColor[report.health_score] ?? "text-foreground"}`, children: report.health_score })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Runway" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm text-foreground", children: report.runway_estimate })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: report.headline }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: report.cashflow_assessment }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mb-1", children: "Capital approved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
          "$",
          report.kpis.total_capital_approved.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mb-1", children: "Approval rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
          report.kpis.approval_rate_pct.toFixed(1),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mb-1", children: "Avg deal size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
          "$",
          report.kpis.avg_deal_size.toFixed(0)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground mb-1", children: "Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: report.kpis.portfolio_health })
      ] })
    ] }),
    report.top_risks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-gold mb-1.5", children: "Risks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: report.top_risks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-foreground/80 flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive shrink-0", children: "·" }),
        " ",
        r
      ] }, i)) })
    ] }),
    report.recommendations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-gold mb-1.5", children: "Recommendations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: report.recommendations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-foreground/80 flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sage shrink-0", children: [
          i + 1,
          "."
        ] }),
        " ",
        r
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/30 pt-3 text-xs text-sage", children: [
      "Next milestone: ",
      report.next_milestone
    ] })
  ] });
}
function OpportunitiesPage() {
  const {
    user
  } = useAuth();
  const searchOpps = useServerFn(findFundingOpportunities);
  const genReport = useServerFn(generateTreasuryReport);
  const [focus, setFocus] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [treasury, setTreasury] = reactExports.useState(null);
  const [searching, setSearching] = reactExports.useState(false);
  const [reportBusy, setReportBusy] = reactExports.useState(false);
  const [activeStep, setActiveStep] = reactExports.useState(-1);
  async function search(e) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to find opportunities.");
    setSearching(true);
    setResult(null);
    setActiveStep(0);
    try {
      const stepInterval = setInterval(() => {
        setActiveStep((s) => s < 4 ? s + 1 : s);
      }, 600);
      const data = await searchOpps({
        data: {
          focus: focus || void 0
        }
      });
      clearInterval(stepInterval);
      setActiveStep(5);
      setTimeout(() => setActiveStep(6), 400);
      setTimeout(() => setActiveStep(-1), 1200);
      setResult(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Research failed");
      setActiveStep(-1);
    } finally {
      setSearching(false);
    }
  }
  async function loadReport() {
    if (!user) return toast.error("Sign in to generate a treasury report.");
    setReportBusy(true);
    try {
      const data = await genReport({
        data: {}
      });
      setTreasury(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Report failed");
    } finally {
      setReportBusy(false);
    }
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mx-auto h-10 w-10 text-gold/60 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Opportunity Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to discover grants, investors, and accelerators matched to your business." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Research Agent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Opportunity Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "AI-matched grants, loans, accelerators, and investors. Every result is grounded in your profile, region, and trust score." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      activeStep >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowStepper, { activeStep }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: search, className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: focus, onChange: (e) => setFocus(e.target.value), placeholder: "Optional focus — e.g. 'women-owned agri business in Kenya' or 'tech startup'", className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: searching, className: "bg-gradient-gold text-gold-foreground shadow-glow shrink-0", children: searching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          " Find Opportunities"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 space-y-4", children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold", children: [
          result.opportunities.length,
          " opportunities matched"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4 border-gold/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: result.summary }),
          result.readiness_gap && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-gold", children: result.readiness_gap }),
          result.recommended_priority && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-sage", children: result.recommended_priority })
        ] }),
        result.opportunities.sort((a, b) => b.fit_score - a.fit_score).map((opp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OpportunityCard, { opp, rank: i + 1 }, i))
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-20 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-10 w-10 text-gold/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm max-w-xs", children: "The Research Agent scans grants, investors, accelerators, and government programs to find opportunities matched to your profile." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid gap-2 w-full max-w-xs text-xs text-left", children: ["Tony Elumelu Foundation grant", "IFC SME financing", "Mastercard Foundation programs", "Government SME fund"].map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-border/30 bg-secondary/20 px-3 py-2 text-muted-foreground", children: ex }, ex)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        treasury ? /* @__PURE__ */ jsxRuntimeExports.jsx(TreasuryReportPanel, { report: treasury }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
            " Treasury Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Generate an AI treasury health report for your business — cashflow assessment, runway estimate, risks, and recommendations." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: loadReport, disabled: reportBusy, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: reportBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
            " Generate Report"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Related" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [{
            to: "/funding",
            label: "Submit funding request",
            icon: Sparkles
          }, {
            to: "/vault",
            label: "Upload business documents",
            icon: FileText
          }, {
            to: "/identity",
            label: "Improve your trust score",
            icon: TrendingUp
          }, {
            to: "/cfo",
            label: "Talk to Atlas CFO",
            icon: Search
          }].map(({
            to,
            label,
            icon: Icon
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition p-2 rounded hover:bg-secondary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0" }),
            label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 ml-auto" })
          ] }, to)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  GatedOpportunitiesPage as component
};
