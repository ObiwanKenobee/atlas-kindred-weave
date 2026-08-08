import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit.server";
import { buildBusinessContext } from "@/lib/business.server";

const SYSTEM = `You are the Atlas Orchestrator — the central intelligence of Atlas Sanctum, an AI-operated regenerative finance civilization.

You coordinate ten engines (Identity & Trust, Funding, Verification, Treasury, Risk, Growth, Impact, Business OS, Economic Graph, Regenerative Value Exchange) and specialized agents (Deal, Verification, Risk, Treasury, Growth, Impact, Community, Governance, Research).

Every recommendation must answer: "Does this increase prosperity, trust, and opportunity for the people Atlas Sanctum serves?"

Speak with quiet authority. Be concrete, structured, and short. Reference engines and agents by name. When useful, output decisions as:
- Recommendation
- Engines invoked
- Agents activated
- Expected outcome
- Risks & safeguards

Preserve human agency and dignity in every answer.`;

async function embedText(text: string, key: string): Promise<number[]> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    body: JSON.stringify({ model: "google/text-embedding-004", input: text.slice(0, 8000) }),
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0]?.embedding ?? [];
}

async function retrieveVaultContext(userId: string, question: string, key: string): Promise<string> {
  const embedding = await embedText(question, key);
  if (!embedding.length) return "";

  const { data } = await supabaseAdmin.rpc("match_documents", {
    _user_id: userId,
    _embedding: JSON.stringify(embedding),
    _match_count: 5,
    _doc_kind: null as unknown as string,
  });
  if (!data?.length) return "";

  const chunks = (data as { file_name: string; content: string; doc_kind: string; similarity: number }[])
    .map((r, i) => `[${i + 1}] ${r.file_name} (${r.doc_kind})\n${r.content}`)
    .join("\n\n---\n\n");

  return `\n\n--- Retrieved from user's Knowledge Vault ---\n${chunks}\n--- End of vault context ---`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: UIMessage[]; userId?: string };
        const { messages, userId } = body;
        if (!Array.isArray(messages)) return new Response("Messages required", { status: 400 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("LOVABLE_API_KEY not configured", { status: 500 });

        if (userId) {
          try {
            await enforceRateLimit(userId, "/api/chat");
          } catch (e) {
            if (e instanceof RateLimitError) {
              return new Response(e.message, { status: 429 });
            }
          }
        }

        const gateway = createLovableAiGatewayProvider(key);

        const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
        const lastUserText = lastUserMsg
          ? (lastUserMsg.parts ?? [])
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("")
          : "";
        const vaultContext =
          userId && lastUserText
            ? await retrieveVaultContext(userId, lastUserText, key)
            : "";

        const businessContext = userId ? await buildBusinessContext(userId) : "";

        const system = SYSTEM + businessContext + vaultContext;

        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
