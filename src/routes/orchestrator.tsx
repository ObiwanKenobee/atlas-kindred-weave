import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Send, Loader2, Plus, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/orchestrator")({
  head: () => ({
    meta: [
      { title: "Atlas Orchestrator — Atlas Sanctum" },
      { name: "description", content: "Coordinate every engine and agent. Audit every decision." },
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

type Conv = { id: string; title: string; updated_at: string };
type Msg = { id: string; role: "user" | "assistant" | "system"; content: string };

function OrchestratorPage() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [convs, setConvs] = useState<Conv[]>([]);
  const [convId, setConvId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<Msg[]>([]);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message || "The Orchestrator is unreachable."),
    onFinish: async ({ message }) => {
      if (!user || !convId) return;
      const last = messages[messages.length - 1];
      const userText = last?.role === "user"
        ? last.parts.map((p) => (p.type === "text" ? p.text : "")).join("")
        : "";
      const assistantText = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
      if (userText) {
        await supabase.from("chat_messages").insert({
          conversation_id: convId, user_id: user.id, role: "user", content: userText,
        });
      }
      await supabase.from("chat_messages").insert({
        conversation_id: convId, user_id: user.id, role: "assistant", content: assistantText,
      });
      await supabase.from("chat_conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);
      refreshConvs();
    },
  });
  const busy = status === "submitted" || status === "streaming";

  const refreshConvs = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("chat_conversations")
      .select("id,title,updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    setConvs((data as Conv[]) ?? []);
  }, [user]);

  useEffect(() => { refreshConvs(); }, [refreshConvs]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Seed messages when initialMessages changes
  useEffect(() => {
    if (initialMessages.length === 0) return;
    setMessages(
      initialMessages.map((m) => ({
        id: m.id,
        role: m.role,
        parts: [{ type: "text", text: m.content }],
      })) as never,
    );
  }, [initialMessages, setMessages]);

  async function newConversation(): Promise<string | null> {
    if (!user) { toast.error("Sign in to save deliberations."); return null; }
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({ user_id: user.id, title: "New deliberation" })
      .select()
      .single();
    if (error) { toast.error(error.message); return null; }
    setConvId(data.id);
    setMessages([]);
    setInitialMessages([]);
    refreshConvs();
    return data.id;
  }

  async function openConversation(id: string) {
    setConvId(id);
    const { data } = await supabase
      .from("chat_messages")
      .select("id,role,content")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });
    setInitialMessages((data as Msg[]) ?? []);
  }

  async function submit(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    let id = convId;
    if (user && !id) {
      id = await newConversation();
      if (!id) return;
      // Use first user message as title
      await supabase.from("chat_conversations").update({ title: t.slice(0, 80) }).eq("id", id);
    }
    setInput("");
    await sendMessage({ text: t });
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-7xl gap-4 px-6 py-6">
      {user && (
        <aside className="hidden w-64 shrink-0 flex-col gap-2 lg:flex">
          <button
            onClick={newConversation}
            className="glyph-border flex items-center justify-center gap-2 rounded-md p-2 text-sm hover:border-gold/60 hover:text-gold"
          >
            <Plus className="h-4 w-4" /> New deliberation
          </button>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">History</div>
          <div className="flex-1 space-y-1 overflow-y-auto">
            {convs.map((c) => (
              <button
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`flex w-full items-start gap-2 rounded p-2 text-left text-xs hover:bg-secondary/40 ${
                  convId === c.id ? "bg-secondary/60 text-gold" : "text-foreground/80"
                }`}
              >
                <MessageSquare className="mt-0.5 h-3 w-3 shrink-0" />
                <div className="flex-1 truncate">{c.title}</div>
              </button>
            ))}
            {convs.length === 0 && (
              <p className="px-2 text-xs text-muted-foreground">Your past deliberations will appear here.</p>
            )}
          </div>
        </aside>
      )}

      <div className="flex flex-1 flex-col">
        <header className="border-b border-border/60 pb-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
            <Sparkles className="h-3.5 w-3.5" /> Central Intelligence
          </div>
          <h1 className="mt-2 font-display text-3xl">Atlas Orchestrator</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Convene the engines. Every deliberation is saved to your audit trail.
          </p>
          {!user && (
            <Link to="/login" className="mt-2 inline-block text-xs text-gold hover:underline">
              Sign in to save your deliberations →
            </Link>
          )}
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
          {messages.length === 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => submit(s)}
                  className="glyph-border rounded-md p-4 text-left text-sm transition hover:border-gold/60 hover:text-gold">
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
                    <Card className={`max-w-[85%] p-4 text-sm whitespace-pre-wrap ${
                      isUser ? "bg-secondary/60 border-secondary" : "glyph-border border-gold/30"
                    }`}>
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

        <form onSubmit={(e) => { e.preventDefault(); submit(input); }}
          className="glyph-border flex items-center gap-2 rounded-lg p-2">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the Orchestrator…"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            disabled={busy} />
          <button type="submit" disabled={busy || !input.trim()}
            className="inline-flex items-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-glow disabled:opacity-50">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send
          </button>
        </form>
      </div>
    </div>
  );
}
