import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import { createCfoSession } from "@/lib/cfo-agent.server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mic, MicOff, PhoneCall, PhoneOff, Loader2, Brain, Zap,
  TrendingUp, ShieldCheck, Coins, BarChart3, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

export const Route = createFileRoute("/cfo")({
  head: () => ({
    meta: [
      { title: "Atlas CFO — Atlas Sanctum" },
      { name: "description", content: "Your AI Chief Financial Officer. Talk to Atlas CFO to get funding guidance, business coaching, and treasury insights." },
    ],
  }),
  component: GatedCfoPage,
});

// ─── ElevenLabs Web SDK types (loaded via CDN script) ────────────────────────
declare global {
  interface Window {
    ElevenLabsConvAI?: {
      create: (config: ElevenLabsConfig) => ElevenLabsWidget;
    };
  }
}

type ElevenLabsConfig = {
  signedUrl: string;
  overrides?: unknown;
  dynamicVariables?: Record<string, string>;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (msg: ConvMessage) => void;
  onError?: (err: unknown) => void;
  onModeChange?: (mode: { mode: "listening" | "speaking" | "thinking" }) => void;
  onStatusChange?: (status: { status: string }) => void;
  onAgentAction?: (action: AgentAction) => void;
};

type ElevenLabsWidget = {
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
  setVolume: (v: { volume: number }) => void;
};

type ConvMessage = {
  source: "user" | "ai";
  message: string;
};

type AgentAction = {
  type: string;
  tool_name?: string;
  tool_call_id?: string;
  result?: string;
};

// ─── Sentiment detection (lightweight, no extra API call) ────────────────────
function detectSentiment(text: string): "confused" | "frustrated" | "urgent" | "positive" | "neutral" {
  const t = text.toLowerCase();
  if (/don't understand|what does|confused|not sure|explain|what is/i.test(t)) return "confused";
  if (/denied|rejected|unfair|frustrated|can't|never|always/i.test(t)) return "frustrated";
  if (/urgent|immediately|right now|this week|asap|emergency|need fast/i.test(t)) return "urgent";
  if (/great|thanks|wonderful|excellent|perfect|approve/i.test(t)) return "positive";
  return "neutral";
}

const SENTIMENT_CONFIG = {
  confused:   { label: "Needs clarity",    cls: "border-gold/60 text-gold",          icon: Brain },
  frustrated: { label: "Needs empathy",     cls: "border-destructive/60 text-destructive", icon: AlertCircle },
  urgent:     { label: "Urgent",            cls: "border-orange-500/60 text-orange-400",   icon: Zap },
  positive:   { label: "Positive",          cls: "border-sage/60 text-sage",              icon: TrendingUp },
  neutral:    { label: "Listening",         cls: "border-border/60 text-muted-foreground", icon: Mic },
};

const TOOL_ICONS: Record<string, typeof Mic> = {
  get_trust_score: ShieldCheck,
  get_funding_status: Coins,
  create_funding_request: Coins,
  get_treasury_metrics: BarChart3,
  update_trust_score: ShieldCheck,
  create_verification_record: ShieldCheck,
  find_funding_opportunities: Coins,
  generate_treasury_report: BarChart3,
  send_notification: Zap,
};

type TranscriptLine = { id: number; source: "user" | "ai"; text: string; sentiment?: ReturnType<typeof detectSentiment> };
type ToolEvent = { id: number; tool: string; result: string | null; ts: string };

// ─── SDK loader ──────────────────────────────────────────────────────────────
function useElevenLabsSDK() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.ElevenLabsConvAI) { setLoaded(true); return; }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@elevenlabs/convai-widget-embed@latest/dist/convai-widget-embed.min.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return loaded;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function CfoPage() {
  const { user } = useAuth();
  const sdkLoaded = useElevenLabsSDK();
  const getSession = useServerFn(createCfoSession);
  const widgetRef = useRef<ElevenLabsWidget | null>(null);

  const [callState, setCallState] = useState<"idle" | "connecting" | "active" | "ending">("idle");
  const [agentMode, setAgentMode] = useState<"listening" | "speaking" | "thinking">("listening");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [toolEvents, setToolEvents] = useState<ToolEvent[]>([]);
  const [sentiment, setSentiment] = useState<ReturnType<typeof detectSentiment>>("neutral");
  const [sessionMeta, setSessionMeta] = useState<{ displayName: string; trustScore: number } | null>(null);
  const idRef = useRef(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript]);

  const startCall = useCallback(async () => {
    if (!user) return toast.error("Sign in to talk to Atlas CFO.");
    if (!sdkLoaded || !window.ElevenLabsConvAI) return toast.error("Voice SDK still loading — try again in a moment.");

    setCallState("connecting");
    try {
      const session = await getSession({ data: {} });
      setSessionMeta({ displayName: session.displayName, trustScore: session.trustScore });

      const widget = window.ElevenLabsConvAI.create({
        signedUrl: session.signedUrl,
        overrides: session.overrides,
        dynamicVariables: session.dynamicVariables,

        onConnect: () => setCallState("active"),
        onDisconnect: () => { setCallState("idle"); setAgentMode("listening"); },
        onError: (err) => {
          console.error("[Atlas CFO]", err);
          toast.error("Voice connection error. Please try again.");
          setCallState("idle");
        },
        onModeChange: ({ mode }) => setAgentMode(mode),

        onMessage: ({ source, message }) => {
          const id = ++idRef.current;
          const s = source === "user" ? detectSentiment(message) : "neutral";
          if (source === "user") setSentiment(s);
          setTranscript((prev) => [...prev, { id, source, text: message, sentiment: s }]);
        },

        onAgentAction: (action) => {
          if (action.type === "tool_call" && action.tool_name) {
            const id = ++idRef.current;
            const ts = new Date().toLocaleTimeString();
            setToolEvents((prev) => [...prev, { id, tool: action.tool_name!, result: null, ts }]);
          }
          if (action.type === "tool_result" && action.tool_call_id) {
            setToolEvents((prev) =>
              prev.map((e) =>
                e.id === idRef.current ? { ...e, result: action.result ?? "done" } : e,
              ),
            );
          }
        },
      });

      widgetRef.current = widget;
      await widget.startSession();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to start Atlas CFO session.");
      setCallState("idle");
    }
  }, [user, sdkLoaded, getSession]);

  async function endCall() {
    setCallState("ending");
    try { await widgetRef.current?.endSession(); } catch { /* ignore */ }
    widgetRef.current = null;
    setCallState("idle");
    setAgentMode("listening");
  }

  const SentimentIcon = SENTIMENT_CONFIG[sentiment].icon;

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <PhoneCall className="mx-auto h-10 w-10 text-gold/60 mb-4" />
        <h1 className="font-display text-3xl">Atlas CFO</h1>
        <p className="mt-3 text-muted-foreground">Sign in to talk to your AI Chief Financial Officer.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Atlas CFO · Voice Agent</div>
        <h1 className="mt-3 font-display text-4xl">Atlas CFO</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Your AI Chief Financial Officer. Talk naturally — Atlas CFO retrieves your records, calculates funding readiness, and can submit applications on your behalf.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Left: Voice control */}
        <div className="lg:col-span-2 space-y-4">
          {/* Call card */}
          <Card className="glyph-border p-6 text-center">
            {/* Animated orb */}
            <div className={`mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-500 ${
              callState === "active"
                ? agentMode === "speaking"
                  ? "bg-gradient-gold shadow-glow scale-110 animate-pulse"
                  : agentMode === "thinking"
                  ? "bg-secondary border-2 border-gold/40 animate-pulse"
                  : "bg-secondary border-2 border-gold/60"
                : "bg-secondary border-2 border-border/40"
            }`}>
              {callState === "connecting" ? (
                <Loader2 className="h-10 w-10 text-gold animate-spin" />
              ) : callState === "active" ? (
                agentMode === "speaking" ? (
                  <Mic className="h-10 w-10 text-gold-foreground" />
                ) : agentMode === "thinking" ? (
                  <Brain className="h-10 w-10 text-gold animate-spin" />
                ) : (
                  <Mic className="h-10 w-10 text-gold" />
                )
              ) : (
                <MicOff className="h-10 w-10 text-muted-foreground" />
              )}
            </div>

            {/* Status */}
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              {callState === "idle" ? "Ready" : callState === "connecting" ? "Connecting…" : callState === "ending" ? "Ending call…" : agentMode}
            </div>

            {sessionMeta && callState === "active" && (
              <div className="text-sm text-foreground/80 mb-3">
                {sessionMeta.displayName} · Trust {sessionMeta.trustScore}/100
              </div>
            )}

            {/* Sentiment */}
            {callState === "active" && (
              <Badge variant="outline" className={`mb-4 ${SENTIMENT_CONFIG[sentiment].cls}`}>
                <SentimentIcon className="mr-1 h-3 w-3" />
                {SENTIMENT_CONFIG[sentiment].label}
              </Badge>
            )}

            {/* Call button */}
            {callState === "idle" ? (
              <Button
                onClick={startCall}
                disabled={!sdkLoaded}
                className="w-full bg-gradient-gold text-gold-foreground shadow-glow"
              >
                {!sdkLoaded ? <Loader2 className="h-4 w-4 animate-spin" /> : <><PhoneCall className="h-4 w-4" /> Talk to Atlas CFO</>}
              </Button>
            ) : callState === "active" ? (
              <Button
                onClick={endCall}
                variant="outline"
                className="w-full border-destructive/60 text-destructive"
              >
                <PhoneOff className="h-4 w-4" /> End conversation
              </Button>
            ) : (
              <Button disabled className="w-full">
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </Card>

          {/* Tool function call feed */}
          {toolEvents.length > 0 && (
            <Card className="glyph-border p-4">
              <div className="text-xs uppercase tracking-widest text-gold mb-3">Live Actions</div>
              <div className="space-y-2">
                {toolEvents.slice(-6).map((e) => {
                  const Icon = TOOL_ICONS[e.tool] ?? Zap;
                  return (
                    <div key={e.id} className="flex items-start gap-2 text-xs">
                      <Icon className="mt-0.5 h-3.5 w-3.5 text-gold shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium">{e.tool.replace(/_/g, " ")}</span>
                        <span className="ml-2 text-muted-foreground">{e.ts}</span>
                        {e.result && (
                          <div className="mt-0.5 text-sage truncate">
                            {(() => {
                              try { return JSON.stringify(JSON.parse(e.result), null, 0).slice(0, 80); }
                              catch { return e.result.slice(0, 80); }
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Setup notice when no env keys */}
          <Card className="glyph-border p-4 text-xs text-muted-foreground space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Setup required</div>
            <p>Set <code className="text-gold">ELEVENLABS_API_KEY</code> and <code className="text-gold">ELEVENLABS_AGENT_ID</code> in your environment.</p>
            <p className="mt-1">In your ElevenLabs agent, set the server tool webhook URL to: <code className="text-gold">https://your-domain/api/cfo-tools</code></p>
          </Card>
        </div>

        {/* Right: Transcript */}
        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-widest text-gold mb-3">Conversation</div>
          <div
            ref={transcriptRef}
            className="glyph-border rounded-xl p-4 h-[28rem] overflow-y-auto space-y-3"
          >
            {transcript.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center gap-4 text-muted-foreground">
                <PhoneCall className="h-8 w-8 text-gold/30" />
                <div className="text-sm">
                  Start a conversation with Atlas CFO.<br />
                  <span className="text-xs">Try: "How is my business doing?" or "I need funding for inventory."</span>
                </div>
                <div className="mt-4 grid gap-2 w-full max-w-xs text-xs">
                  {[
                    "How is my business doing?",
                    "What's my trust score?",
                    "I need $800 for inventory.",
                    "What's the status of my application?",
                  ].map((s) => (
                    <div key={s} className="rounded border border-border/40 bg-secondary/20 px-3 py-2 text-left text-muted-foreground">
                      "{s}"
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              transcript.map((line) => (
                <div key={line.id} className={`flex ${line.source === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
                    line.source === "user"
                      ? "bg-secondary/60 text-foreground"
                      : "glyph-border bg-background text-foreground/90"
                  }`}>
                    {line.source === "ai" && (
                      <div className="text-[9px] uppercase tracking-widest text-gold mb-1">Atlas CFO</div>
                    )}
                    {line.text}
                    {line.source === "user" && line.sentiment && line.sentiment !== "neutral" && (
                      <div className={`mt-1 text-[9px] uppercase tracking-widest ${SENTIMENT_CONFIG[line.sentiment].cls}`}>
                        {SENTIMENT_CONFIG[line.sentiment].label}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function GatedCfoPage() {
  return (
    <PlanGate feature="cfo">
      <CfoPage />
    </PlanGate>
  );
}
