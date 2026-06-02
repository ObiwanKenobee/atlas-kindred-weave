import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

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

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) return new Response("Messages required", { status: 400 });
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("LOVABLE_API_KEY not configured", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
