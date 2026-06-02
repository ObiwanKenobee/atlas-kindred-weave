import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/orchestrator")({
  head: () => ({
    meta: [
      { title: "Atlas Orchestrator — Atlas Sanctum" },
      { name: "description", content: "The central intelligence coordinating every engine and agent." },
    ],
  }),
  component: OrchestratorPage,
});

const SUGGESTIONS = [
  "Allocate $250K to highest-impact funding requests this week.",
  "Audit trust scores in the Eastern Region — flag anomalies.",
  "Design a regenerative campaign to fund 1,000 new businesses.",
  "Forecast Sanctum treasury runway under a 20% revenue drop.",
];

function OrchestratorPage() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message || "The Orchestrator is unreachable."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function submit(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    setInput("");
    await sendMessage({ text: t });
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-6 py-8">
      <header className="border-b border-border/60 pb-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
          <Sparkles className="h-3.5 w-3.5" /> Central Intelligence
        </div>
        <h1 className="mt-3 font-display text-4xl">Atlas Orchestrator</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Convene the engines. Direct the agents. Every decision serves prosperity, trust, and human flourishing.
        </p>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="glyph-border rounded-md p-4 text-left text-sm text-foreground/90 transition hover:border-gold/60 hover:text-gold"
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
                  <Card
                    className={`max-w-[85%] p-4 text-sm whitespace-pre-wrap ${
                      isUser
                        ? "bg-secondary/60 border-secondary"
                        : "glyph-border border-gold/30"
                    }`}
                  >
                    {!isUser && (
                      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold">
                        <Sparkles className="h-3 w-3" /> Orchestrator
                      </div>
                    )}
                    {text || (busy && !isUser ? <Loader2 className="h-4 w-4 animate-spin" /> : null)}
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(input); }}
        className="glyph-border flex items-center gap-2 rounded-lg p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the Orchestrator…"
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-glow disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </button>
      </form>
    </div>
  );
}
