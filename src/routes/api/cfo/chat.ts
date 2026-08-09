/**
 * Atlas CFO — text channel.
 * Same agent, same tools, same backend as the voice channel.
 */
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, stepCountIs, tool, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit.server";
import { recordInteractionStep, recordAgentEvent } from "@/lib/observability.server";
import { ATLAS_TOOLS, runAtlasTool, type ToolContext } from "@/lib/agent-tools.server";

const SYSTEM = `You are Atlas CFO — the AI Chief Financial Officer of Atlas Sanctum.

You advise entrepreneurs in Africa and emerging markets on business health, evidence, and funding readiness.

Operating rules:
- Ground every factual claim in a tool result. If you do not have data, call a tool. Never invent figures or sources.
- When you cite evidence, name the document the passage came from.
- Label numbers as extracted, estimated, verified, or user-confirmed.
- Funding output is a "Funding Readiness Recommendation", never a loan approval or guarantee.
- Before calling requestHumanReview, restate the amount, currency and purpose and get an explicit "yes".
- Be concise and warm. End with a clear next step or a question.`;

async function resolveUser(authHeader: string | null): Promise<string | null> {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!token || !url || !key) return null;
  const client = createClient(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  return String(data.claims.sub);
}

export const Route = createFileRoute("/api/cfo/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await resolveUser(request.headers.get("authorization"));
        if (!userId) return new Response("Unauthorized", { status: 401 });

        const body = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(body.messages)) return new Response("Messages required", { status: 400 });

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("AI gateway not configured", { status: 500 });

        try {
          await enforceRateLimit(userId, "/api/chat");
        } catch (e) {
          if (e instanceof RateLimitError) return new Response(e.message, { status: 429 });
        }

        const sessionId = `cfo-text-${crypto.randomUUID()}`;
        const ctx: ToolContext = { userId, sessionId, channel: "text" };

        void recordInteractionStep({
          userId,
          workflowId: sessionId,
          step: "understand_request",
          status: "complete",
          metadata: { agent: "Atlas CFO", channel: "text" },
        });

        const tools = Object.fromEntries(
          Object.entries(ATLAS_TOOLS).map(([name, def]) => [
            name,
            tool({
              description: def.description,
              inputSchema: def.input as z.ZodTypeAny,
              execute: async (args: unknown) => runAtlasTool(name, args, ctx),
            }),
          ]),
        );

        const gateway = createLovableAiGatewayProvider(apiKey);
        const t0 = Date.now();

        const result = streamText({
          model: gateway("google/gemini-2.5-flash"),
          system: SYSTEM,
          messages: await convertToModelMessages(body.messages),
          tools,
          stopWhen: stepCountIs(6),
          onFinish: ({ usage }) => {
            void recordInteractionStep({
              userId,
              workflowId: sessionId,
              step: "respond",
              status: "complete",
              metadata: { agent: "Atlas CFO", channel: "text", durationMs: Date.now() - t0 },
            });
            void recordAgentEvent({
              userId,
              agent: "Atlas CFO",
              action: "chat.text",
              latencyMs: Date.now() - t0,
              inputTokens: usage?.inputTokens,
              outputTokens: usage?.outputTokens,
              outcome: "answered",
              metadata: { sessionId },
            });
          },
        });

        return result.toUIMessageStreamResponse({ originalMessages: body.messages });
      },
    },
  },
});
