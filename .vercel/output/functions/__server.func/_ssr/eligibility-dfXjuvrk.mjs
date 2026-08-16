import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as getFundingEligibility } from "./launch.functions-BFvhYg-L.mjs";
import { u as useAuth, B as Button } from "./router-Dq4PHNk3.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, b as Sparkles, i as ShieldCheck, ay as CircleX, a0 as Clock, ap as CircleAlert, a1 as CircleCheck, aq as ArrowRight } from "../_libs/lucide-react.mjs";
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
function GatedEligibilityPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "funding_eligibility", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EligibilityPage, {}) });
}
const READINESS_META = {
  not_ready: {
    label: "Not Ready",
    color: "text-destructive border-destructive/60",
    bg: "bg-destructive/10"
  },
  building: {
    label: "Building",
    color: "text-gold border-gold/60",
    bg: "bg-gold/5"
  },
  ready: {
    label: "Ready",
    color: "text-sage border-sage/60",
    bg: "bg-sage/5"
  },
  strong: {
    label: "Strong",
    color: "text-sage border-sage/80",
    bg: "bg-sage/10"
  }
};
const STATUS_META = {
  met: {
    icon: CircleCheck,
    color: "text-sage"
  },
  partial: {
    icon: CircleAlert,
    color: "text-gold"
  },
  not_met: {
    icon: CircleX,
    color: "text-destructive"
  }
};
const INSTRUMENT_LABELS = {
  grant: "Grant",
  loan: "Loan",
  revenue_share: "Revenue Share",
  equity: "Equity",
  microfinance: "Microfinance"
};
function fmt(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}
function EligibilityPage() {
  const {
    user
  } = useAuth();
  const [result, setResult] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const fetch = useServerFn(getFundingEligibility);
  async function load() {
    if (!user) return;
    setBusy(true);
    try {
      const data = await fetch({
        data: {}
      });
      setResult(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to check eligibility.");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Atlas Launch · Funding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Funding Eligibility" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "AI assessment of your funding readiness — what you qualify for, what's blocking you, and how to get ready." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: load, disabled: busy, className: "mt-4 bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Re-check"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
        " Check Eligibility"
      ] }) })
    ] }),
    !result && !busy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-center gap-4 text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-gold/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-xs", children: "Click Check Eligibility to get an AI assessment of your funding readiness based on your trust score, verification history, and business activity." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 w-full max-w-xs text-xs text-left", children: ["Identity verification", "Business activity evidence", "Trust score threshold", "Prior funding history"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded border border-border/30 bg-secondary/20 px-3 py-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 text-gold shrink-0" }),
        " ",
        c
      ] }, c)) })
    ] }),
    busy && !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }) }),
    result && (() => {
      const readiness = READINESS_META[result.readiness_level];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `glyph-border p-6 col-span-1 flex flex-col items-center justify-center text-center ${readiness.bg}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Eligibility Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 font-display text-6xl ${readiness.color.split(" ")[0]}`, children: result.overall_score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: "/ 100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `mt-3 ${readiness.color}`, children: readiness.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-2", children: "Assessment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: result.headline }),
            result.blocking_issues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-destructive mb-2", children: "Blocking Issues" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: result.blocking_issues.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm text-foreground/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" }),
                " ",
                b
              ] }, i)) })
            ] }),
            result.estimated_days_to_ready > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              "Estimated ",
              result.estimated_days_to_ready,
              " days to reach funding readiness"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Eligibility Criteria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: result.criteria.map((c, i) => {
            const meta = STATUS_META[c.status];
            const Icon = meta.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 shrink-0 ${meta.color}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: c.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-medium ${meta.color}`, children: [
                    c.score,
                    "/100"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-[9px] ${meta.color} border-current/40`, children: c.status.replace("_", " ") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-secondary mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 rounded-full transition-all duration-700 ${c.status === "met" ? "bg-sage" : c.status === "partial" ? "bg-gold" : "bg-destructive/60"}`, style: {
                  width: `${c.score}%`
                } }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.notes }),
                c.status !== "met" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gold mt-0.5", children: [
                  "→ ",
                  c.action
                ] })
              ] })
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "You May Qualify For" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: result.eligible_instruments.map((inst, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/40 bg-secondary/20 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold text-xs", children: INSTRUMENT_LABELS[inst.type] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg text-gold", children: [
                "up to ",
                fmt(inst.max_amount),
                " ",
                inst.currency
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: inst.conditions.map((cond, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold shrink-0", children: "·" }),
              " ",
              cond
            ] }, j)) })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: result.next_steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-gold shrink-0", children: [
              i + 1,
              "."
            ] }),
            " ",
            s
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "bg-gradient-gold text-gold-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/funding", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              " Apply for Funding"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/verification", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
              " Submit Proof ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground text-right", children: [
          "AI assessment · ",
          (/* @__PURE__ */ new Date()).toLocaleString()
        ] })
      ] });
    })()
  ] });
}
export {
  GatedEligibilityPage as component
};
