import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useAuth, l as m, B as Button } from "./router-Dq4PHNk3.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { o as Brain, v as LoaderCircle, ac as Send, aF as Lightbulb, r as ChevronRight, l as TriangleAlert, aG as SquareCheckBig } from "../_libs/lucide-react.mjs";
import { g as objectType, i as stringType } from "../_libs/zod.mjs";
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
const AdvisorInput = objectType({
  question: stringType().min(5).max(1e3)
});
const askAdvisor = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AdvisorInput.parse(d)).handler(createSsrRpc("0fce52ea9259f34e91391d84816711a82b4e5df89d72a9e92824198da2acda20"));
const STARTER_QUESTIONS = ["How can I increase my monthly revenue?", "Should I hire staff or use contractors?", "How much funding can I realistically afford to repay?", "What are my biggest business risks right now?", "How do I improve my trust score?", "What should I focus on to grow this quarter?"];
function ConfidenceBadge({
  level
}) {
  const cls = {
    high: "text-sage border-sage/60",
    medium: "text-gold border-gold/60",
    low: "text-muted-foreground border-border"
  }[level];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: cls, children: [
    level,
    " confidence"
  ] });
}
function AdvisorCard({
  output
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
    output.recommendations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/60 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-3 w-3" }),
        " Recommendations"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: output.recommendations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-xs text-foreground/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "mt-0.5 h-3 w-3 shrink-0 text-gold" }),
        " ",
        r
      ] }, i)) })
    ] }),
    output.risks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-destructive/30 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
        " Risks to watch"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: output.risks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-foreground/80", children: [
        "• ",
        r
      ] }, i)) })
    ] }),
    output.next_actions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/60 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-sage", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-3 w-3" }),
        " Next actions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1", children: output.next_actions.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-xs text-foreground/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sage", children: [
          i + 1,
          "."
        ] }),
        " ",
        a
      ] }, i)) })
    ] })
  ] });
}
function BusinessOSPage() {
  const {
    user
  } = useAuth();
  const ask = useServerFn(askAdvisor);
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);
  async function submit(question) {
    const q = question.trim();
    if (!q || busy) return;
    if (!user) {
      toast.error("Sign in to talk to your AI Advisor.");
      return;
    }
    setMessages((m2) => [...m2, {
      role: "user",
      text: q
    }]);
    setInput("");
    setBusy(true);
    try {
      const result = await ask({
        data: {
          question: q
        }
      });
      setMessages((m2) => [...m2, {
        role: "advisor",
        text: result.answer,
        output: result
      }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Advisor unavailable.");
      setMessages((m2) => m2.slice(0, -1));
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-6 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m.glyph }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl", children: m.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-sm text-muted-foreground", children: m.tagline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "flex-1 overflow-y-auto py-4", children: messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm text-muted-foreground", children: "Ask your AI advisor anything about your business:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: STARTER_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => submit(q), className: "glyph-border rounded-md p-3 text-left text-sm text-foreground/80 transition hover:border-gold/60 hover:text-gold", children: q }, q)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: msg.role === "user" ? "flex justify-end" : "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[85%] ${msg.role === "user" ? "" : "w-full"}`, children: [
        msg.role === "advisor" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3 w-3" }),
          " AI Advisor",
          msg.output && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBadge, { level: msg.output.confidence })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-4 text-sm ${msg.role === "user" ? "bg-secondary/60 border-secondary" : "glyph-border border-gold/30"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap leading-relaxed", children: msg.text }),
          msg.output && /* @__PURE__ */ jsxRuntimeExports.jsx(AdvisorCard, { output: msg.output })
        ] })
      ] }) }, i)),
      busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border border-gold/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-gold" }),
        " Thinking…"
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      submit(input);
    }, className: "glyph-border mt-2 flex items-center gap-2 rounded-lg p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Ask your AI advisor…", className: "flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground", disabled: busy || !user }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy || !input.trim() || !user, className: "bg-gradient-gold text-gold-foreground shadow-glow", size: "sm", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function GatedBusinessOSPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "business_os", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessOSPage, {}) });
}
export {
  GatedBusinessOSPage as component
};
