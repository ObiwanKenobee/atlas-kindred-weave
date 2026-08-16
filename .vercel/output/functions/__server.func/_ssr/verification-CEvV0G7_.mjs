import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useAuth, m as m$9, B as Button } from "./router-Dq4PHNk3.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7IUb7tBK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { u as Paperclip, X, v as LoaderCircle, b as Sparkles, a as BadgeCheck, w as ShieldAlert, i as ShieldCheck } from "../_libs/lucide-react.mjs";
import { g as objectType, i as stringType, k as enumType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./entitlements-DDmJ5IMx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const VerifyInput = objectType({
  storagePath: stringType().min(1),
  kind: enumType(["receipt", "inventory", "identity", "location", "delivery", "business_premise", "other"]),
  claimDescription: stringType().min(10).max(500),
  fundingRequestId: stringType().uuid().optional()
});
const analyzeProof = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => VerifyInput.parse(d)).handler(createSsrRpc("753b54bab55269d9850634e3d0319170003343a1be0f93ca2bca966430fddbdd"));
function GatedVerificationPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "verification_basic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VerificationPage, {}) });
}
const KIND_LABELS = {
  receipt: "Receipt",
  inventory: "Inventory",
  identity: "Identity document",
  location: "Location / premises",
  delivery: "Delivery proof",
  business_premise: "Business premise",
  other: "Other"
};
const VERDICT_CONFIG = {
  verified: {
    label: "Verified",
    icon: ShieldCheck,
    cls: "text-sage border-sage/60"
  },
  invalid: {
    label: "Invalid",
    icon: ShieldAlert,
    cls: "text-destructive border-destructive/60"
  },
  needs_review: {
    label: "Needs Review",
    icon: BadgeCheck,
    cls: "text-gold border-gold/60"
  }
};
function VerificationPage() {
  const {
    user
  } = useAuth();
  const analyze = useServerFn(analyzeProof);
  const [file, setFile] = reactExports.useState(null);
  const [kind, setKind] = reactExports.useState("receipt");
  const [claim, setClaim] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  async function submit(e) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to submit proof.");
    if (!file) return toast.error("Attach a proof document.");
    setBusy(true);
    try {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const {
        error: upErr
      } = await supabase.storage.from("funding-attachments").upload(path, file);
      if (upErr) throw upErr;
      const res = await analyze({
        data: {
          storagePath: path,
          kind,
          claimDescription: claim
        }
      });
      setResult(res);
      toast.success("Proof analysis complete.");
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Analysis failed.");
    } finally {
      setBusy(false);
    }
  }
  function reset() {
    setResult(null);
    setFile(null);
    setClaim("");
    setKind("receipt");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-6 border-b border-border/60 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m$9.glyph }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$9.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$9.tagline })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Submit proof" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: kind, onValueChange: (v) => setKind(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Proof type" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(KIND_LABELS).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: KIND_LABELS[k] }, k)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Describe what this proof shows — e.g. 'Receipt for $120 inventory purchase from Eastleigh market, 2 June 2025'", value: claim, onChange: (e) => setClaim(e.target.value), rows: 4, required: true, minLength: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "glyph-border flex cursor-pointer items-center justify-center gap-2 rounded-md p-4 text-sm text-muted-foreground hover:text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
            file ? file.name : "Attach document or image",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", accept: "image/*,.pdf", onChange: (e) => setFile(e.target.files?.[0] ?? null) })
          ] }),
          file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded bg-secondary/40 px-3 py-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Remove selected file", onClick: () => setFile(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy || !user || !file, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            " Analyze proof"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 lg:col-span-3", children: [
        !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: m$9.metrics.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: k.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: k.value }),
          k.delta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-sage", children: k.delta })
        ] }, k.label)) }),
        result && (() => {
          const cfg = VERDICT_CONFIG[result.verdict];
          const Icon = cfg.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `glyph-border p-6 ${cfg.cls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Verdict" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3 font-display text-3xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7" }),
                  cfg.label
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Confidence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-display text-3xl", children: [
                  (result.confidence * 100).toFixed(0),
                  "%"
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Analysis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/90", children: result.summary })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Findings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: result.findings.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-gold", children: String(i + 1).padStart(2, "0") }),
                " ",
                f
              ] }, i)) })
            ] }),
            result.fraud_signals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border border-destructive/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-destructive", children: "Fraud Signals" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1 text-sm text-foreground/90", children: result.fraud_signals.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "• ",
                s
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Recommended Action" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/90", children: result.recommended_action }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
                "Event ID: ",
                result.eventId,
                " · Trust score updated"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: reset, children: "Submit another proof" })
          ] });
        })()
      ] })
    ] })
  ] });
}
export {
  GatedVerificationPage as component
};
