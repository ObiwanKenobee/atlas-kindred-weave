import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { requireFeature } from "@/lib/entitlements.server";

const CampaignInput = z.object({
  businessType: z.string().min(3).max(100),
  targetAudience: z.string().min(3).max(200),
  goal: z.string().min(3).max(200),
  channel: z.enum(["email", "whatsapp", "sms"]),
  tone: z.enum(["professional", "friendly", "urgent", "inspirational"]).optional(),
});

const CampaignOutputSchema = z.object({
  subject_line: z.string().max(100),
  headline: z.string().max(120),
  body: z.string().min(50).max(1200),
  call_to_action: z.string().max(80),
  follow_up: z.string().max(400),
  estimated_open_rate: z.string(),
  tips: z.array(z.string()).min(1).max(4),
});

export type CampaignOutput = z.infer<typeof CampaignOutputSchema>;

export const generateCampaign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CampaignInput.parse(d))
  .handler(async ({ data }) => {
    await requireFeature(context.userId, "growth_campaigns");
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const channelGuide = {
      email: "Write a full email with subject, greeting, body paragraphs, and sign-off. Max 250 words in body.",
      whatsapp: "Write a concise WhatsApp message. Use emojis sparingly. Max 150 words. Conversational tone.",
      sms: "Write a crisp SMS under 160 characters. Include CTA. No fluff.",
    };

    const prompt = `You are the Atlas Growth Agent. Generate a high-converting ${data.channel} campaign.

Business type: ${data.businessType}
Target audience: ${data.targetAudience}
Goal: ${data.goal}
Tone: ${data.tone ?? "friendly"}
Channel guidance: ${channelGuide[data.channel]}

Context: This is for an entrepreneur in an emerging market using Atlas Sanctum, a regenerative finance platform. The campaign should feel authentic and trust-building, not pushy.

Generate complete campaign copy with a compelling subject line, headline, body, and call-to-action. Include a follow-up message for non-responders and practical tips for maximising results.`;

    const { object } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: CampaignOutputSchema,
      prompt,
    });

    return object;
  });
