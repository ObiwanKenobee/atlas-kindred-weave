import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, f as Building2, a1 as CircleCheck } from "../_libs/lucide-react.mjs";
import { g as objectType, B as booleanType, i as stringType, h as numberType } from "../_libs/zod.mjs";
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
const BusinessInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(2).max(120),
  business_type: stringType().max(60).optional().nullable(),
  country: stringType().max(60).optional().nullable(),
  industry: stringType().max(60).optional().nullable(),
  stage: stringType().max(40).optional().nullable(),
  team_size: numberType().int().min(0).max(1e5).optional().nullable(),
  revenue_range: stringType().max(40).optional().nullable(),
  primary_objective: stringType().max(400).optional().nullable(),
  funding_requirement_minor: numberType().int().min(0).optional().nullable(),
  funding_currency: stringType().min(3).max(6).optional().nullable(),
  funding_purpose: stringType().max(600).optional().nullable(),
  description: stringType().max(2e3).optional().nullable(),
  onboarding_complete: booleanType().optional()
});
const getMyBusiness = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("16cab928ed6919a0f4a3cf21b193a85a8a58ac7077afa414264cf39e7c5961a7"));
const saveBusiness = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => BusinessInput.parse(d)).handler(createSsrRpc("60abb804344719ecb4b1ffb3a4d820e64ea242ef54fe7947902e730930dc1565"));
const STAGES = ["idea", "pre-revenue", "early revenue", "growing", "established"];
const REVENUE = ["none", "< 100k / yr", "100k – 1M / yr", "1M – 10M / yr", "> 10M / yr"];
function BusinessPage() {
  const {
    user,
    loading
  } = useAuth();
  const load = useServerFn(getMyBusiness);
  const save = useServerFn(saveBusiness);
  const [busy, setBusy] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [b, setB] = reactExports.useState({
    funding_currency: "KES"
  });
  reactExports.useEffect(() => {
    if (loading || !user) return;
    load({
      data: void 0
    }).then((res) => {
      if (res) setB(res);
    }).catch(() => toast.error("Could not load your business profile.")).finally(() => setBusy(false));
  }, [user, loading, load]);
  function set(k, v) {
    setB((prev) => ({
      ...prev,
      [k]: v
    }));
  }
  async function submit(e) {
    e.preventDefault();
    if (!b.name || b.name.trim().length < 2) {
      toast.error("A business name is required.");
      return;
    }
    setSaving(true);
    try {
      const saved = await save({
        data: {
          id: b.id,
          name: b.name.trim(),
          business_type: b.business_type ?? null,
          country: b.country ?? null,
          industry: b.industry ?? null,
          stage: b.stage ?? null,
          team_size: b.team_size ?? null,
          revenue_range: b.revenue_range ?? null,
          primary_objective: b.primary_objective ?? null,
          funding_requirement_minor: b.funding_requirement_minor ?? null,
          funding_currency: b.funding_currency ?? "KES",
          funding_purpose: b.funding_purpose ?? null,
          description: b.description ?? null,
          onboarding_complete: true
        }
      });
      setB(saved);
      toast.success("Business profile saved. Atlas CFO now reasons with this context.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your business.");
    } finally {
      setSaving(false);
    }
  }
  if (loading || busy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[50vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-gold" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Your Business Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Sign in to create the business profile that Atlas reasons with." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5" }),
        " Onboarding"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Your Business Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: "This is the long-term context every Atlas agent reads before answering. Only your account can see it. Optional fields can be left blank and completed later." }),
      b.onboarding_complete && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mt-4 gap-1 border-gold/40 bg-gold/10 text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
        " Onboarding complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Business name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: b.name ?? "", onChange: (e) => set("name", e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Business type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Retail, services, agriculture…", value: b.business_type ?? "", onChange: (e) => set("business_type", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Industry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: b.industry ?? "", onChange: (e) => set("industry", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Country" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: b.country ?? "", onChange: (e) => set("country", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Stage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", value: b.stage ?? "", onChange: (e) => set("stage", e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Not specified" }),
          STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Team size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: b.team_size ?? "", onChange: (e) => set("team_size", e.target.value === "" ? null : Number(e.target.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Revenue range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", value: b.revenue_range ?? "", onChange: (e) => set("revenue_range", e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Not specified" }),
          REVENUE.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Funding requirement (major units)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: b.funding_requirement_minor != null ? b.funding_requirement_minor / 100 : "", onChange: (e) => set("funding_requirement_minor", e.target.value === "" ? null : Math.round(Number(e.target.value) * 100)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Currency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: b.funding_currency ?? "KES", onChange: (e) => set("funding_currency", e.target.value.toUpperCase()) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Primary objective" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "What are you trying to accomplish in the next 6 months?", value: b.primary_objective ?? "", onChange: (e) => set("primary_objective", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Funding purpose" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, placeholder: "Restock inventory, hire staff, buy equipment…", value: b.funding_purpose ?? "", onChange: (e) => set("funding_purpose", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Business description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: b.description ?? "", onChange: (e) => set("description", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "bg-gradient-gold text-gold-foreground shadow-glow", children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Save business profile" }) })
    ] }) })
  ] });
}
export {
  BusinessPage as component
};
