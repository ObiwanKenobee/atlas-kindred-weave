import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as requireFeature } from "./entitlements.server-Dp7K62E0.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, k as enumType, i as stringType, j as arrayType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "./entitlements-DDmJ5IMx.mjs";
const CampaignInput = objectType({
  businessType: stringType().min(3).max(100),
  targetAudience: stringType().min(3).max(200),
  goal: stringType().min(3).max(200),
  channel: enumType(["email", "whatsapp", "sms"]),
  tone: enumType(["professional", "friendly", "urgent", "inspirational"]).optional()
});
const CampaignOutputSchema = objectType({
  subject_line: stringType().max(100),
  headline: stringType().max(120),
  body: stringType().min(50).max(1200),
  call_to_action: stringType().max(80),
  follow_up: stringType().max(400),
  estimated_open_rate: stringType(),
  tips: arrayType(stringType()).min(1).max(4)
});
const generateCampaign_createServerFn_handler = createServerRpc({
  id: "d015ffeb67350349d7754220cbad8875f93d9bc10939102e0d960f28283e5579",
  name: "generateCampaign",
  filename: "src/lib/growth.functions.ts"
}, (opts) => generateCampaign.__executeServer(opts));
const generateCampaign = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => CampaignInput.parse(d)).handler(generateCampaign_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "growth_campaigns");
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const channelGuide = {
    email: "Write a full email with subject, greeting, body paragraphs, and sign-off. Max 250 words in body.",
    whatsapp: "Write a concise WhatsApp message. Use emojis sparingly. Max 150 words. Conversational tone.",
    sms: "Write a crisp SMS under 160 characters. Include CTA. No fluff."
  };
  const prompt = `You are the Atlas Growth Agent. Generate a high-converting ${data.channel} campaign.

Business type: ${data.businessType}
Target audience: ${data.targetAudience}
Goal: ${data.goal}
Tone: ${data.tone ?? "friendly"}
Channel guidance: ${channelGuide[data.channel]}

Context: This is for an entrepreneur in an emerging market using Atlas Sanctum, a regenerative finance platform. The campaign should feel authentic and trust-building, not pushy.

Generate complete campaign copy with a compelling subject line, headline, body, and call-to-action. Include a follow-up message for non-responders and practical tips for maximising results.`;
  const {
    object
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: CampaignOutputSchema,
    prompt
  });
  return object;
});
export {
  generateCampaign_createServerFn_handler
};
