import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Wrench, Brain } from "lucide-react";

const SUGGESTIONS = [
  "How is my business doing?",
  "What information do you have about my business?",
  "Am I ready for funding?",
  "I need $1,000 for inventory expansion.",
];

/** Atlas CFO text channel — calls the same tool registry as the voice agent. */
export function CfoChat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/cfo/chat",
      fetch: async (input, init) => {
        const { data } = await supabase.auth.getSession();
        const headers = new Headers(init?.headers);
        if (data.session?.access_token) {
          headers.set("Authorization", `Bearer ${data.session.access_token}`);
        }
        return fetch(input as RequestInfo, { ...init, headers });
      },
    }),
  });

  const busy = status === "submitted" || status === "streaming";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <Card className="glyph-border p-5">
      <div className="mb-3 flex items-center gap-2">
        <Brain className="h-4 w-4 text-gold" />
        <h2 className="text-xs uppercase tracking-widest text-gold">Atlas CFO · Text</h2>
      </div>

      <div className="h-[24rem] space-y-3 overflow-y-auto rounded-lg border border-border/40 bg-secondary/10 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
            <p>Ask Atlas CFO anything about your business. Answers are grounded in your records.</p>
            <div className="grid w-full max-w-sm gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage({ text: s })}
                  className="rounded border border-border/40 bg-background/40 px-3 py-2 text-left text-xs hover:border-gold/50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
                  m.role === "user" ? "bg-secondary/60" : "glyph-border bg-background"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="mb-1 text-[9px] uppercase tracking-widest text-gold">Atlas CFO</div>
                )}
                {m.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <p key={i} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    );
                  }
                  if (part.type.startsWith("tool-")) {
                    return (
                      <div key={i} className="mt-1 flex items-center gap-1.5 text-[10px] text-sage">
                        <Wrench className="h-3 w-3" />
                        {part.type.replace("tool-", "")}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))
        )}
        {busy && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" /> Atlas CFO is retrieving your records…
          </div>
        )}
      </div>

      <form onSubmit={submit} className="mt-3 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Atlas CFO…"
          disabled={busy}
        />
        <Button
          type="submit"
          disabled={busy || !input.trim()}
          className="bg-gradient-gold text-gold-foreground"
          aria-label="Send message to Atlas CFO"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
