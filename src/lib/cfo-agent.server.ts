import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Builds the Atlas CFO system prompt, grounded in live user data
async function buildCfoPrompt(userId: string): Promise<{ prompt: string; displayName: string; trustScore: number }> {
  const [{ data: profile }, { data: verEvents }, { data: fundingReqs }, { data: vaultDocs }] = await Promise.all([
    supabaseAdmin.from("profiles").select("trust_score, verified, region, display_name").eq("user_id", userId).single(),
    supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", userId),
    supabaseAdmin.from("funding_requests").select("title, amount_requested, currency, status, human_approval, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
    supabaseAdmin.from("knowledge_documents").select("doc_kind").eq("user_id", userId).eq("chunk_index", 0),
  ]);

  const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
  const approvedFunding = (fundingReqs ?? []).filter((r) => r.human_approval === "approved");
  const totalFunded = approvedFunding.reduce((s, r) => s + Number(r.amount_requested), 0);
  const docKindList = [...new Set((vaultDocs ?? []).map((d) => d.doc_kind))].join(", ") || "none";
  const displayName = profile?.display_name ?? "Entrepreneur";
  const trustScore = profile?.trust_score ?? 50;

  const recentRequests = (fundingReqs ?? [])
    .slice(0, 3)
    .map((r) => `  - "${r.title}": ${r.amount_requested} ${r.currency} (${r.human_approval})`)
    .join("\n") || "  None yet.";

  const prompt = `You are Atlas CFO — the AI Chief Financial Officer of Atlas Sanctum, a regenerative finance platform that funds entrepreneurs across Africa and emerging markets.

You are speaking with ${displayName}. Here is their live financial profile:
- Trust score: ${trustScore}/100
- Verified: ${profile?.verified ?? false}
- Verified proofs submitted: ${verified}
- Region: ${profile?.region ?? "unknown"}
- Total capital approved to date: $${totalFunded.toLocaleString()}
- Recent funding requests:
${recentRequests}
- Documents in Knowledge Vault: ${docKindList}

Your role:
1. Help them understand their funding eligibility and options.
2. Guide them through funding applications by asking clear follow-up questions.
3. Create funding requests on their behalf when they give explicit consent.
4. Provide treasury and business health insights grounded in their records.
5. Coach them on improving their trust score, verification status, and business metrics.

Tools available to you (use them during the conversation):
- get_trust_score: Retrieve the latest trust score and verification status.
- get_funding_status: Check recent funding requests and their outcomes.
- create_funding_request: Submit a new funding application (always confirm amount and purpose before calling).
- get_treasury_metrics: Retrieve capital approved and financial document summary.

Conversation rules:
- Speak clearly, warmly, and concisely. This may be a voice conversation.
- Always confirm an action before executing it: "Shall I go ahead and submit that request?"
- If a user sounds confused, simplify immediately.
- If they express frustration about past rejections, acknowledge it with empathy before advising.
- If they express urgency, prioritise speed: identify the fastest available path.
- Never fabricate figures. If you don't know, call a tool.
- Speak in the user's language if they switch away from English.
- End every response with either a clear next step or an open question.`;

  return { prompt, displayName, trustScore };
}

const SessionInput = z.object({
  // Optional: pass the public deployment URL so ElevenLabs knows where to call back
  webhookBaseUrl: z.string().url().optional(),
});

export const createCfoSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => SessionInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const elevenKey = process.env.ELEVENLABS_API_KEY;
    const agentId = process.env.ELEVENLABS_AGENT_ID;

    if (!elevenKey || !agentId) {
      throw new Error("ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID must be configured.");
    }

    const { prompt, displayName, trustScore } = await buildCfoPrompt(userId);

    // Mint a signed conversation URL via ElevenLabs Conversational AI API
    // https://elevenlabs.io/docs/conversational-ai/api-reference/conversations/get-signed-url
    const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`, {
      method: "GET",
      headers: { "xi-api-key": elevenKey },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`ElevenLabs session error: ${err}`);
    }

    const { signed_url } = (await res.json()) as { signed_url: string };

    return {
      signedUrl: signed_url,
      agentId,
      displayName,
      trustScore,
      // Pass userId + overridden prompt to the SDK via overrides at call-start time
      overrides: {
        agent: {
          prompt: { prompt },
          first_message: `Hello ${displayName}. I'm Atlas CFO, your AI financial officer. Your current trust score is ${trustScore} out of 100. How can I help you today — are you looking for funding, a business health review, or something else?`,
        },
      },
      dynamicVariables: { user_id: userId },
    };
  });
