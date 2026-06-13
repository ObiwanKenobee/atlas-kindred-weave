import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useRef, useEffect } from "react";
import { askAdvisor, type AdvisorOutput } from "@/lib/advisor.functions";
import { useAuth } from "@/lib/auth";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Loader2, ChevronRight, AlertTriangle, Lightbulb, CheckSquare } from "lucide-react";
import { toast } from "sonner";

const m = SANCTUM_MODULES.find((x) => x.slug === "business-os")!;

export const Route = createFileRoute("/business-os")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: BusinessOSPage,
});

const STARTER_QUESTIONS = [
  "How can I increase my monthly revenue?",
  "Should I hire staff or use contractors?",
  "How much funding can I realistically afford to repay?",
  "What are my biggest business risks right now?",
  "How do I improve my trust score?",
  "What should I focus on to grow this quarter?",
];

type Message = {
  role: "user" | "advisor";
  text: string;
  output?: AdvisorOutput;
};

function ConfidenceBadge({ level }: { level: AdvisorOutput["confidence"] }) {
  const cls = { high: "text-sage border-sage/60", medium: "text-gold border-gold/60", low: "text-muted-foreground border-border" }[level];
  return <Badge variant="outline" className={cls}>{level} confidence</Badge>;
}

function AdvisorCard({ output }: { output: AdvisorOutput }) {
  return (
    <div className="mt-3 space-y-3">
      {output.recommendations.length > 0 && (
        <div className="rounded-md border border-border/60 p-3">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold">
            <Lightbulb className="h-3 w-3" /> Recommendations
          </div>
          <ul className="space-y-1">
            {output.recommendations.map((r, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground/90">
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-gold" /> {r}
              </li>
            ))}
          </ul>
        </div>
      )}
      {output.risks.length > 0 && (
        <div className="rounded-md border border-destructive/30 p-3">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-destructive">
            <AlertTriangle className="h-3 w-3" /> Risks to watch
          </div>
          <ul className="space-y-1">
            {output.risks.map((r, i) => (
              <li key={i} className="text-xs text-foreground/80">• {r}</li>
            ))}
          </ul>
        </div>
      )}
      {output.next_actions.length > 0 && (
        <div className="rounded-md border border-border/60 p-3">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-sage">
            <CheckSquare className="h-3 w-3" /> Next actions
          </div>
          <ol className="space-y-1">
            {output.next_actions.map((a, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground/90">
                <span className="font-display text-sage">{i + 1}.</span> {a}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function BusinessOSPage() {
  const { user } = useAuth();
  const ask = useServerFn(askAdvisor);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function submit(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    if (!user) { toast.error("Sign in to talk to your AI Advisor."); return; }
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    try {
      const result = await ask({ data: { question: q } });
      setMessages((m) => [...m, { role: "advisor", text: result.answer, output: result }]);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Advisor unavailable.");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-6 py-6">
      <div className="border-b border-border/60 pb-4">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
          <span className="font-display">{m.glyph}</span>
          <span>Engine</span>
        </div>
        <h1 className="mt-2 font-display text-4xl">{m.name}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{m.tagline}</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
        {messages.length === 0 ? (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">Ask your AI advisor anything about your business:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => submit(q)}
                  className="glyph-border rounded-md p-3 text-left text-sm text-foreground/80 transition hover:border-gold/60 hover:text-gold"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[85%] ${msg.role === "user" ? "" : "w-full"}`}>
                  {msg.role === "advisor" && (
                    <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold">
                      <Brain className="h-3 w-3" /> AI Advisor
                      {msg.output && <ConfidenceBadge level={msg.output.confidence} />}
                    </div>
                  )}
                  <Card className={`p-4 text-sm ${msg.role === "user" ? "bg-secondary/60 border-secondary" : "glyph-border border-gold/30"}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    {msg.output && <AdvisorCard output={msg.output} />}
                  </Card>
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <Card className="glyph-border border-gold/30 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-gold" /> Thinking…
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(input); }}
        className="glyph-border mt-2 flex items-center gap-2 rounded-lg p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI advisor…"
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          disabled={busy || !user}
        />
        <Button
          type="submit"
          disabled={busy || !input.trim() || !user}
          className="bg-gradient-gold text-gold-foreground shadow-glow"
          size="sm"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
