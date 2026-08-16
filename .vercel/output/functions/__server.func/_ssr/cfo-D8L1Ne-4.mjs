import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, B as Button, I as Input } from "./router-m_YzkqUE.mjs";
import { c as createSsrRpc } from "./observability.server-D5WP9btl.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { C as Card } from "./card-Bc3CpL3p.mjs";
import { B as Badge } from "./badge-9pJdm6_1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-Dw2Cl3xx.mjs";
import { u as useChat } from "../_libs/ai-sdk__react.mjs";
import { D as DefaultChatTransport } from "../_libs/ai.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import "../_libs/seroval.mjs";
import { M as Mic, T as TrendingUp, ar as Zap, ap as CircleAlert, o as Brain, P as PhoneCall, v as LoaderCircle, aC as MicOff, aD as PhoneOff, C as ChartColumn, k as Coins, i as ShieldCheck, aE as Wrench, ac as Send } from "../_libs/lucide-react.mjs";
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
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "./paystack.server-Bs-IoxkW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/throttleit.mjs";
const SessionInput = objectType({
  // Optional: pass the public deployment URL so ElevenLabs knows where to call back
  webhookBaseUrl: stringType().url().optional()
});
const createCfoSession = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => SessionInput.parse(d)).handler(createSsrRpc("86c6e9d8075e8aa937e25372c4d85530599b0896158d51603755b0331b8b6cfd"));
const SUGGESTIONS = [
  "How is my business doing?",
  "What information do you have about my business?",
  "Am I ready for funding?",
  "I need $1,000 for inventory expansion."
];
function CfoChat() {
  const [input, setInput] = reactExports.useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/cfo/chat",
      fetch: async (input2, init) => {
        const { data } = await supabase.auth.getSession();
        const headers = new Headers(init?.headers);
        if (data.session?.access_token) {
          headers.set("Authorization", `Bearer ${data.session.access_token}`);
        }
        return fetch(input2, { ...init, headers });
      }
    })
  });
  const busy = status === "submitted" || status === "streaming";
  async function submit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-gold", children: "Atlas CFO · Text" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[24rem] space-y-3 overflow-y-auto rounded-lg border border-border/40 bg-secondary/10 p-4", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ask Atlas CFO anything about your business. Answers are grounded in your records." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full max-w-sm gap-2", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => sendMessage({ text: s }),
            className: "rounded border border-border/40 bg-background/40 px-3 py-2 text-left text-xs hover:border-gold/50",
            children: s
          },
          s
        )) })
      ] }) : messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${m.role === "user" ? "bg-secondary/60" : "glyph-border bg-background"}`,
          children: [
            m.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[9px] uppercase tracking-widest text-gold", children: "Atlas CFO" }),
            m.parts.map((part, i) => {
              if (part.type === "text") {
                return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap", children: part.text }, i);
              }
              if (part.type.startsWith("tool-")) {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-[10px] text-sage", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-3 w-3" }),
                  part.type.replace("tool-", "")
                ] }, i);
              }
              return null;
            })
          ]
        }
      ) }, m.id)),
      busy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-gold" }),
        " Atlas CFO is retrieving your records…"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-3 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "Ask Atlas CFO…",
          disabled: busy
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: busy || !input.trim(),
          className: "bg-gradient-gold text-gold-foreground",
          "aria-label": "Send message to Atlas CFO",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function detectSentiment(text) {
  const t = text.toLowerCase();
  if (/don't understand|what does|confused|not sure|explain|what is/i.test(t)) return "confused";
  if (/denied|rejected|unfair|frustrated|can't|never|always/i.test(t)) return "frustrated";
  if (/urgent|immediately|right now|this week|asap|emergency|need fast/i.test(t)) return "urgent";
  if (/great|thanks|wonderful|excellent|perfect|approve/i.test(t)) return "positive";
  return "neutral";
}
const SENTIMENT_CONFIG = {
  confused: {
    label: "Needs clarity",
    cls: "border-gold/60 text-gold",
    icon: Brain
  },
  frustrated: {
    label: "Needs empathy",
    cls: "border-destructive/60 text-destructive",
    icon: CircleAlert
  },
  urgent: {
    label: "Urgent",
    cls: "border-orange-500/60 text-orange-400",
    icon: Zap
  },
  positive: {
    label: "Positive",
    cls: "border-sage/60 text-sage",
    icon: TrendingUp
  },
  neutral: {
    label: "Listening",
    cls: "border-border/60 text-muted-foreground",
    icon: Mic
  }
};
const TOOL_ICONS = {
  get_trust_score: ShieldCheck,
  get_funding_status: Coins,
  create_funding_request: Coins,
  get_treasury_metrics: ChartColumn,
  update_trust_score: ShieldCheck,
  create_verification_record: ShieldCheck,
  find_funding_opportunities: Coins,
  generate_treasury_report: ChartColumn,
  send_notification: Zap
};
function useElevenLabsSDK() {
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (window.ElevenLabsConvAI) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@elevenlabs/convai-widget-embed@latest/dist/convai-widget-embed.min.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return loaded;
}
function CfoPage() {
  const {
    user
  } = useAuth();
  const sdkLoaded = useElevenLabsSDK();
  const getSession = useServerFn(createCfoSession);
  const widgetRef = reactExports.useRef(null);
  const [callState, setCallState] = reactExports.useState("idle");
  const [agentMode, setAgentMode] = reactExports.useState("listening");
  const [transcript, setTranscript] = reactExports.useState([]);
  const [toolEvents, setToolEvents] = reactExports.useState([]);
  const [sentiment, setSentiment] = reactExports.useState("neutral");
  const [sessionMeta, setSessionMeta] = reactExports.useState(null);
  const idRef = reactExports.useRef(0);
  const transcriptRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [transcript]);
  const startCall = reactExports.useCallback(async () => {
    if (!user) return toast.error("Sign in to talk to Atlas CFO.");
    if (!sdkLoaded || !window.ElevenLabsConvAI) return toast.error("Voice SDK still loading — try again in a moment.");
    setCallState("connecting");
    try {
      const session = await getSession({
        data: {}
      });
      setSessionMeta({
        displayName: session.displayName,
        trustScore: session.trustScore
      });
      const widget = window.ElevenLabsConvAI.create({
        signedUrl: session.signedUrl,
        overrides: session.overrides,
        dynamicVariables: session.dynamicVariables,
        onConnect: () => setCallState("active"),
        onDisconnect: () => {
          setCallState("idle");
          setAgentMode("listening");
        },
        onError: (err) => {
          console.error("[Atlas CFO]", err);
          toast.error("Voice connection error. Please try again.");
          setCallState("idle");
        },
        onModeChange: ({
          mode
        }) => setAgentMode(mode),
        onMessage: ({
          source,
          message
        }) => {
          const id = ++idRef.current;
          const s = source === "user" ? detectSentiment(message) : "neutral";
          if (source === "user") setSentiment(s);
          setTranscript((prev) => [...prev, {
            id,
            source,
            text: message,
            sentiment: s
          }]);
        },
        onAgentAction: (action) => {
          if (action.type === "tool_call" && action.tool_name) {
            const id = ++idRef.current;
            const ts = (/* @__PURE__ */ new Date()).toLocaleTimeString();
            setToolEvents((prev) => [...prev, {
              id,
              tool: action.tool_name,
              result: null,
              ts
            }]);
          }
          if (action.type === "tool_result" && action.tool_call_id) {
            setToolEvents((prev) => prev.map((e) => e.id === idRef.current ? {
              ...e,
              result: action.result ?? "done"
            } : e));
          }
        }
      });
      widgetRef.current = widget;
      await widget.startSession();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to start Atlas CFO session.");
      setCallState("idle");
    }
  }, [user, sdkLoaded, getSession]);
  async function endCall() {
    setCallState("ending");
    try {
      await widgetRef.current?.endSession();
    } catch {
    }
    widgetRef.current = null;
    setCallState("idle");
    setAgentMode("listening");
  }
  const SentimentIcon = SENTIMENT_CONFIG[sentiment].icon;
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "mx-auto h-10 w-10 text-gold/60 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Atlas CFO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to talk to your AI Chief Financial Officer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Atlas CFO · Voice Agent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Atlas CFO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "Your AI Chief Financial Officer. Talk naturally — Atlas CFO retrieves your records, calculates funding readiness, and can submit applications on your behalf." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-500 ${callState === "active" ? agentMode === "speaking" ? "bg-gradient-gold shadow-glow scale-110 animate-pulse" : agentMode === "thinking" ? "bg-secondary border-2 border-gold/40 animate-pulse" : "bg-secondary border-2 border-gold/60" : "bg-secondary border-2 border-border/40"}`, children: callState === "connecting" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 text-gold animate-spin" }) : callState === "active" ? agentMode === "speaking" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-10 w-10 text-gold-foreground" }) : agentMode === "thinking" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-10 w-10 text-gold animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-10 w-10 text-gold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "h-10 w-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: callState === "idle" ? "Ready" : callState === "connecting" ? "Connecting…" : callState === "ending" ? "Ending call…" : agentMode }),
          sessionMeta && callState === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground/80 mb-3", children: [
            sessionMeta.displayName,
            " · Trust ",
            sessionMeta.trustScore,
            "/100"
          ] }),
          callState === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `mb-4 ${SENTIMENT_CONFIG[sentiment].cls}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SentimentIcon, { className: "mr-1 h-3 w-3" }),
            SENTIMENT_CONFIG[sentiment].label
          ] }),
          callState === "idle" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: startCall, disabled: !sdkLoaded, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: !sdkLoaded ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "h-4 w-4" }),
            " Talk to Atlas CFO"
          ] }) }) : callState === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: endCall, variant: "outline", className: "w-full border-destructive/60 text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "h-4 w-4" }),
            " End conversation"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) })
        ] }),
        toolEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Live Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: toolEvents.slice(-6).map((e) => {
            const Icon = TOOL_ICONS[e.tool] ?? Zap;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mt-0.5 h-3.5 w-3.5 text-gold shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.tool.replace(/_/g, " ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-muted-foreground", children: e.ts }),
                e.result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sage truncate", children: (() => {
                  try {
                    return JSON.stringify(JSON.parse(e.result), null, 0).slice(0, 80);
                  } catch {
                    return e.result.slice(0, 80);
                  }
                })() })
              ] })
            ] }, e.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4 text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-gold mb-2", children: "Setup required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Set ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-gold", children: "ELEVENLABS_API_KEY" }),
            " and ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-gold", children: "ELEVENLABS_AGENT_ID" }),
            " in your environment."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
            "In your ElevenLabs agent, set the server tool webhook URL to: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-gold", children: "https://your-domain/api/cfo-tools" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CfoChat, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Conversation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: transcriptRef, className: "glyph-border rounded-xl p-4 h-[28rem] overflow-y-auto space-y-3", children: transcript.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center gap-4 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "h-8 w-8 text-gold/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            "Start a conversation with Atlas CFO.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: 'Try: "How is my business doing?" or "I need funding for inventory."' })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 w-full max-w-xs text-xs", children: ["How is my business doing?", "What's my trust score?", "I need $800 for inventory.", "What's the status of my application?"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-border/40 bg-secondary/20 px-3 py-2 text-left text-muted-foreground", children: [
            '"',
            s,
            '"'
          ] }, s)) })
        ] }) : transcript.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${line.source === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${line.source === "user" ? "bg-secondary/60 text-foreground" : "glyph-border bg-background text-foreground/90"}`, children: [
          line.source === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-gold mb-1", children: "Atlas CFO" }),
          line.text,
          line.source === "user" && line.sentiment && line.sentiment !== "neutral" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-[9px] uppercase tracking-widest ${SENTIMENT_CONFIG[line.sentiment].cls}`, children: SENTIMENT_CONFIG[line.sentiment].label })
        ] }) }, line.id)) })
      ] })
    ] })
  ] });
}
function GatedCfoPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "cfo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CfoPage, {}) });
}
export {
  GatedCfoPage as component
};
