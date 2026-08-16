import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useAuth, i as m$3, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7IUb7tBK.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, b as Sparkles, am as Smartphone, an as MessageSquare, ad as Mail, au as CheckCheck, aa as Copy } from "../_libs/lucide-react.mjs";
import { g as objectType, k as enumType, i as stringType } from "../_libs/zod.mjs";
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
const CampaignInput = objectType({
  businessType: stringType().min(3).max(100),
  targetAudience: stringType().min(3).max(200),
  goal: stringType().min(3).max(200),
  channel: enumType(["email", "whatsapp", "sms"]),
  tone: enumType(["professional", "friendly", "urgent", "inspirational"]).optional()
});
const generateCampaign = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => CampaignInput.parse(d)).handler(createSsrRpc("d015ffeb67350349d7754220cbad8875f93d9bc10939102e0d960f28283e5579"));
const CHANNEL_ICONS = {
  email: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
  whatsapp: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
  sms: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" })
};
function CopyButton({
  text
}) {
  const [copied, setCopied] = reactExports.useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copy, className: "text-muted-foreground hover:text-gold transition", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5 text-sage" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }) });
}
function ResultPanel({
  result,
  channel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    channel === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Subject line" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: result.subject_line })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium text-foreground", children: result.subject_line })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Headline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: result.headline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-xl text-gold", children: result.headline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Campaign copy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: result.body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed", children: result.body })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border border-gold/40 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-gold mb-1", children: "Call to action" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: result.call_to_action })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Follow-up (non-responders)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: result.follow_up })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 whitespace-pre-wrap", children: result.follow_up })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-sage/60 text-sage", children: [
      "Est. open rate: ",
      result.estimated_open_rate
    ] }) }),
    result.tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-gold mb-2", children: "Pro tips" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: result.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-foreground/80", children: [
        "• ",
        tip
      ] }, i)) })
    ] })
  ] });
}
function GrowthPage() {
  const {
    user
  } = useAuth();
  const generate = useServerFn(generateCampaign);
  const [businessType, setBusinessType] = reactExports.useState("");
  const [targetAudience, setTargetAudience] = reactExports.useState("");
  const [goal, setGoal] = reactExports.useState("");
  const [channel, setChannel] = reactExports.useState("email");
  const [tone, setTone] = reactExports.useState("friendly");
  const [busy, setBusy] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  async function submit(e) {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to generate campaigns.");
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const data = await generate({
        data: {
          businessType,
          targetAudience,
          goal,
          channel,
          tone
        }
      });
      setResult(data);
      toast.success("Campaign generated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-6 border-b border-border/60 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m$3.glyph }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$3.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$3.tagline })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Campaign builder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Business type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: businessType, onChange: (e) => setBusinessType(e.target.value), placeholder: "e.g. Mobile hair salon, Agri-input shop", required: true, minLength: 3, className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Target audience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: targetAudience, onChange: (e) => setTargetAudience(e.target.value), placeholder: "e.g. Women in Nairobi aged 25-45", required: true, minLength: 3, className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Campaign goal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: goal, onChange: (e) => setGoal(e.target.value), placeholder: "e.g. Drive 20 new bookings this week", required: true, minLength: 3, rows: 2, className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Channel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: channel, onValueChange: (v) => setChannel(v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "email", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "whatsapp", children: "WhatsApp" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sms", children: "SMS" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Tone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tone, onValueChange: (v) => setTone(v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "friendly", children: "Friendly" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "professional", children: "Professional" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inspirational", children: "Inspirational" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
            CHANNEL_ICONS[channel],
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground capitalize", children: [
              channel,
              " · ",
              tone
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy || !user, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Generating…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            " Generate campaign"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        !result && !busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: m$3.metrics.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: k.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: k.value }),
          k.delta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-sage", children: k.delta })
        ] }, k.label)) }),
        busy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Growth Agent is crafting your campaign…" })
        ] }),
        result && /* @__PURE__ */ jsxRuntimeExports.jsx(ResultPanel, { result, channel })
      ] })
    ] })
  ] });
}
function GatedGrowthPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "growth_campaigns", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthPage, {}) });
}
export {
  GatedGrowthPage as component
};
