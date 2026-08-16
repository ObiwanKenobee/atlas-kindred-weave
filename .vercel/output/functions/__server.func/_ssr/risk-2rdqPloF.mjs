import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useAuth, d as m$7, B as Button } from "./router-m_YzkqUE.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as computeRiskScore } from "./risk.functions-B0Bx-er9.mjs";
import { s as submitApproval } from "./approvals.functions-B3kyCQm8.mjs";
import { C as Card } from "./card-Bc3CpL3p.mjs";
import { B as Badge } from "./badge-9pJdm6_1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-Dw2Cl3xx.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, b as Sparkles, l as TriangleAlert, i as ShieldCheck, T as TrendingUp, G as Gavel } from "../_libs/lucide-react.mjs";
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
import "./observability.server-D5WP9btl.mjs";
import "./server-BWHKBO2n.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-16OviFoD.mjs";
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
function GatedRiskPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "trust_score", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskPage, {}) });
}
const RISK_COLORS = {
  very_low: "text-sage border-sage/60",
  low: "text-sage border-sage/40",
  medium: "text-gold border-gold/60",
  high: "text-orange-400 border-orange-400/60",
  very_high: "text-destructive border-destructive/60"
};
const RISK_LABELS = {
  very_low: "Very Low",
  low: "Low",
  medium: "Medium",
  high: "High",
  very_high: "Very High"
};
function ScoreArc({
  score
}) {
  const r = 54;
  const cx = 70;
  const cy = 70;
  const circumference = Math.PI * r;
  const offset = circumference - score / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "140", height: "80", viewBox: "0 0 140 80", className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`, fill: "none", stroke: "currentColor", strokeWidth: "8", className: "text-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`, fill: "none", stroke: "currentColor", strokeWidth: "8", strokeDasharray: circumference, strokeDashoffset: offset, strokeLinecap: "round", className: score >= 70 ? "text-sage" : score >= 40 ? "text-gold" : "text-destructive", style: {
      transition: "stroke-dashoffset 0.8s ease"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: cx, y: cy - 4, textAnchor: "middle", className: "fill-foreground font-bold", fontSize: "22", children: score }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: cx, y: cy + 14, textAnchor: "middle", className: "fill-muted-foreground", fontSize: "10", children: "/ 100" })
  ] });
}
function RiskPage() {
  const {
    user
  } = useAuth();
  const [result, setResult] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [reviewBusy, setReviewBusy] = reactExports.useState(false);
  const score = useServerFn(computeRiskScore);
  const submit = useServerFn(submitApproval);
  async function run() {
    if (!user) return toast.error("Sign in to run the Risk Engine.");
    setBusy(true);
    try {
      const res = await score({
        data: {}
      });
      setResult(res);
      toast.success("Risk profile updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Risk computation failed.");
    } finally {
      setBusy(false);
    }
  }
  async function requestOverride() {
    if (!user || !result) return;
    setReviewBusy(true);
    try {
      await submit({
        data: {
          kind: "risk_override",
          title: `Request risk override — currently ${result.risk_level.replace("_", " ")}`,
          rationale: `Auto risk score ${result.trust_score}/100. Requesting reviewer to override this classification.`,
          entity_type: "profile",
          proposed_change: {
            current_risk_level: result.risk_level,
            current_trust_score: result.trust_score,
            flags: result.flags
          }
        }
      });
      toast.success("Sent to the approval queue");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to submit");
    } finally {
      setReviewBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6 border-b border-border/60 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m$7.glyph }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$7.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$7.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: run, disabled: busy || !user, className: "mt-6 bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Compute my risk profile"
      ] }) })
    ] }),
    !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-3", children: m$7.metrics.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: k.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: k.value }),
      k.delta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-sage", children: k.delta })
    ] }, k.label)) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border flex flex-col items-center justify-center p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Trust Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreArc, { score: result.trust_score }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `glyph-border p-6 ${RISK_COLORS[result.risk_level]}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Risk Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl", children: RISK_LABELS[result.risk_level] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `mt-3 ${RISK_COLORS[result.risk_level]}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-1 h-3 w-3" }),
            " ",
            result.risk_level.replace("_", " ")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Recommendation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-lg leading-snug", children: result.recommendation.replace(/_/g, " ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs text-sage", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
            " AI Risk Agent"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Behavioral Signals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6", children: [{
          label: "Verified proofs",
          value: result.signals.verified_events
        }, {
          label: "Rejected proofs",
          value: result.signals.rejected_events
        }, {
          label: "Funding requests",
          value: result.signals.funding_requests_count
        }, {
          label: "Approvals",
          value: result.signals.approvals_count
        }, {
          label: "Capital approved",
          value: `$${result.signals.total_funded.toLocaleString()}`
        }, {
          label: "Approval rate",
          value: `${(result.signals.repayment_rate * 100).toFixed(0)}%`
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl", children: s.value })
        ] }, s.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "AI Rationale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/90", children: result.rationale })
      ] }),
      result.flags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-2 inline h-3.5 w-3.5" }),
          "Active Flags"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: result.flags.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-foreground/80", children: f }, f)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
        "Trust score written back to your profile. Re-run after submitting new proofs.",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: requestOverride, disabled: reviewBusy, className: "ml-auto text-xs", children: reviewBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "mr-1 h-3 w-3" }),
          "Request override"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: run, disabled: busy, className: "text-xs text-gold", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : "Re-run" })
      ] })
    ] })
  ] });
}
export {
  GatedRiskPage as component
};
