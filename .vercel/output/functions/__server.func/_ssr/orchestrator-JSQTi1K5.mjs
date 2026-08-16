import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useChat } from "../_libs/ai-sdk__react.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { D as DefaultChatTransport } from "../_libs/ai.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { u as useAuth, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { ag as Plus, an as MessageSquare, b as Sparkles, v as LoaderCircle, ac as Send, ao as GitBranch, a1 as CircleCheck, ap as CircleAlert, t as Circle } from "../_libs/lucide-react.mjs";
import { g as objectType, i as stringType, j as arrayType, h as numberType, k as enumType } from "../_libs/zod.mjs";
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
import "../_libs/throttleit.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
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
import "./ai-gateway.server-C06lV5S3.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./paystack.server-Bs-IoxkW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const WorkflowInput = objectType({
  requestId: stringType().uuid()
});
objectType({
  recommendation: enumType(["approve", "approve_with_conditions", "decline", "needs_more_info"]),
  summary: stringType().min(20).max(800),
  recommended_amount: numberType().min(0),
  recommended_currency: stringType().min(3).max(6),
  recommended_terms: objectType({
    instrument: stringType(),
    duration_months: numberType().int().positive().max(120),
    revenue_share_pct: numberType().min(0).max(50).optional(),
    interest_rate_pct: numberType().min(0).max(40).optional(),
    milestones: arrayType(stringType()).min(1).max(8)
  }),
  trust_assessment: objectType({
    score: numberType().min(0).max(100),
    rationale: stringType()
  }),
  risk_assessment: objectType({
    score: numberType().min(0).max(100),
    flags: arrayType(stringType())
  }),
  impact_forecast: objectType({
    jobs_created: numberType().int().min(0),
    households_reached: numberType().int().min(0),
    prosperity_index_delta: numberType(),
    notes: stringType()
  }),
  agents_invoked: arrayType(stringType()).min(1),
  safeguards: arrayType(stringType()).min(1)
});
const runOrchestratorWorkflow = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => WorkflowInput.parse(d)).handler(createSsrRpc("5c1f198297bc2606523b85ef88dd1cf980e21e20f00d62bfa82ab2a0e4b4a131"));
const SUGGESTIONS = ["Allocate $250K to highest-impact funding requests this week.", "Audit trust scores in the Eastern Region — flag anomalies.", "Design a regenerative campaign to fund 1,000 new businesses.", "Forecast Sanctum treasury runway under a 20% revenue drop."];
function WorkflowStepRow({
  step
}) {
  const Icon = step.status === "complete" ? CircleCheck : step.status === "error" ? CircleAlert : Circle;
  const cls = step.status === "complete" ? "text-sage" : step.status === "error" ? "text-destructive" : "text-gold";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `mt-0.5 h-4 w-4 shrink-0 ${cls} ${step.status === "running" ? "animate-pulse" : ""}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: step.engine }),
      step.result && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: step.result })
    ] })
  ] });
}
function WorkflowPanel() {
  const {
    user
  } = useAuth();
  const runWorkflow = useServerFn(runOrchestratorWorkflow);
  const [requestId, setRequestId] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  async function run(e) {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to run the orchestrator.");
      return;
    }
    const id = requestId.trim();
    if (!id) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await runWorkflow({
        data: {
          requestId: id
        }
      });
      setResult(res);
      toast.success("Orchestrator workflow complete.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Workflow failed.");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-gold mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-3.5 w-3.5" }),
      " Workflow Runner"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Trigger the full orchestrated pipeline on a funding request: Underwriting → Risk → Trust → Treasury → Notification." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: run, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: requestId, onChange: (e) => setRequestId(e.target.value), placeholder: "Funding request UUID", className: "flex-1 font-mono text-xs", disabled: busy }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy || !requestId.trim(), size: "sm", className: "bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Run" })
    ] }),
    (busy || result) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-2", children: "Pipeline status" }),
      result?.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowStepRow, { step }, i)),
      busy && !result && /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowStepRow, { step: {
        engine: "Initializing…",
        status: "running"
      } })
    ] }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Decision" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold capitalize", children: result.decision.recommendation.replace(/_/g, " ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-sage/60 text-sage", children: [
          "Trust ",
          result.trustScore,
          "/100"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
          "v",
          result.version
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 mt-2", children: result.decision.summary })
    ] })
  ] });
}
function OrchestratorPage() {
  const {
    user
  } = useAuth();
  const [input, setInput] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  const [convs, setConvs] = reactExports.useState([]);
  const [convId, setConvId] = reactExports.useState(null);
  const [initialMessages, setInitialMessages] = reactExports.useState([]);
  const {
    messages,
    sendMessage,
    status,
    setMessages
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat"
    }),
    onError: (e) => toast.error(e.message || "The Orchestrator is unreachable."),
    onFinish: async ({
      message
    }) => {
      if (!user || !convId) return;
      const last = messages[messages.length - 1];
      const userText = last?.role === "user" ? last.parts.map((p) => p.type === "text" ? p.text : "").join("") : "";
      const assistantText = message.parts.map((p) => p.type === "text" ? p.text : "").join("");
      if (userText) {
        await supabase.from("chat_messages").insert({
          conversation_id: convId,
          user_id: user.id,
          role: "user",
          content: userText
        });
      }
      await supabase.from("chat_messages").insert({
        conversation_id: convId,
        user_id: user.id,
        role: "assistant",
        content: assistantText
      });
      await supabase.from("chat_conversations").update({
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", convId);
      refreshConvs();
    }
  });
  const busy = status === "submitted" || status === "streaming";
  const refreshConvs = reactExports.useCallback(async () => {
    if (!user) return;
    const {
      data
    } = await supabase.from("chat_conversations").select("id,title,updated_at").eq("user_id", user.id).order("updated_at", {
      ascending: false
    });
    setConvs(data ?? []);
  }, [user]);
  reactExports.useEffect(() => {
    refreshConvs();
  }, [refreshConvs]);
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);
  reactExports.useEffect(() => {
    if (initialMessages.length === 0) return;
    setMessages(initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      parts: [{
        type: "text",
        text: m.content
      }]
    })));
  }, [initialMessages, setMessages]);
  async function newConversation() {
    if (!user) {
      toast.error("Sign in to save deliberations.");
      return null;
    }
    const {
      data,
      error
    } = await supabase.from("chat_conversations").insert({
      user_id: user.id,
      title: "New deliberation"
    }).select().single();
    if (error) {
      toast.error(error.message);
      return null;
    }
    setConvId(data.id);
    setMessages([]);
    setInitialMessages([]);
    refreshConvs();
    return data.id;
  }
  async function openConversation(id) {
    setConvId(id);
    const {
      data
    } = await supabase.from("chat_messages").select("id,role,content").eq("conversation_id", id).order("created_at", {
      ascending: true
    });
    setInitialMessages(data ?? []);
  }
  async function submit(text) {
    const t = text.trim();
    if (!t || busy) return;
    let id = convId;
    if (user && !id) {
      id = await newConversation();
      if (!id) return;
      await supabase.from("chat_conversations").update({
        title: t.slice(0, 80)
      }).eq("id", id);
    }
    setInput("");
    await sendMessage({
      text: t
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-[calc(100vh-3.5rem)] max-w-7xl gap-4 px-6 py-6", children: [
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-64 shrink-0 flex-col gap-2 lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: newConversation, className: "glyph-border flex items-center justify-center gap-2 rounded-md p-2 text-sm hover:border-gold/60 hover:text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New deliberation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: "History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1 overflow-y-auto", children: [
        convs.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openConversation(c.id), className: `flex w-full items-start gap-2 rounded p-2 text-left text-xs hover:bg-secondary/40 ${convId === c.id ? "bg-secondary/60 text-gold" : "text-foreground/80"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "mt-0.5 h-3 w-3 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 truncate", children: c.title })
        ] }, c.id)),
        convs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 text-xs text-muted-foreground", children: "Your past deliberations will appear here." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border/60 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Central Intelligence"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-3xl", children: "Atlas Orchestrator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-sm text-muted-foreground", children: "Convene the engines. Every deliberation is saved to your audit trail." }),
        !user && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-2 inline-block text-xs text-gold hover:underline", children: "Sign in to save your deliberations →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowPanel, {}),
        messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => submit(s), className: "glyph-border rounded-md p-4 text-left text-sm transition hover:border-gold/60 hover:text-gold", children: s }, s)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: messages.map((m) => {
          const text = m.parts.map((p) => p.type === "text" ? p.text : "").join("");
          const isUser = m.role === "user";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: isUser ? "flex justify-end" : "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `max-w-[85%] p-4 text-sm whitespace-pre-wrap ${isUser ? "bg-secondary/60 border-secondary" : "glyph-border border-gold/30"}`, children: [
            !isUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
              " Orchestrator"
            ] }),
            text || (busy && !isUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null)
          ] }) }, m.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        submit(input);
      }, className: "glyph-border flex items-center gap-2 rounded-lg p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Ask the Orchestrator…", className: "flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground", disabled: busy }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: busy || !input.trim(), className: "inline-flex items-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-glow disabled:opacity-50", children: [
          busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
          " Send"
        ] })
      ] })
    ] })
  ] });
}
function GatedOrchestratorPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "orchestrator", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrchestratorPage, {}) });
}
export {
  GatedOrchestratorPage as component
};
