import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { g as generateObject } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as recordAgentEvent } from "./observability.server-D5WP9btl.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, i as stringType, k as enumType, j as arrayType, h as numberType } from "../_libs/zod.mjs";
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
const VerifyInput = objectType({
  storagePath: stringType().min(1),
  kind: enumType(["receipt", "inventory", "identity", "location", "delivery", "business_premise", "other"]),
  claimDescription: stringType().min(10).max(500),
  fundingRequestId: stringType().uuid().optional()
});
const VerifyOutputSchema = objectType({
  verdict: enumType(["verified", "invalid", "needs_review"]),
  confidence: numberType().min(0).max(1),
  summary: stringType().min(10).max(600),
  findings: arrayType(stringType()).min(1).max(8),
  fraud_signals: arrayType(stringType()).min(0).max(5),
  recommended_action: stringType().min(5).max(200)
});
const analyzeProof_createServerFn_handler = createServerRpc({
  id: "753b54bab55269d9850634e3d0319170003343a1be0f93ca2bca966430fddbdd",
  name: "analyzeProof",
  filename: "src/lib/verification.functions.ts"
}, (opts) => analyzeProof.__executeServer(opts));
const analyzeProof = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => VerifyInput.parse(d)).handler(analyzeProof_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: signed,
    error: signErr
  } = await supabaseAdmin.storage.from("funding-attachments").createSignedUrl(data.storagePath, 120);
  if (signErr || !signed?.signedUrl) throw new Error("Could not generate signed URL for proof.");
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const prompt = `You are the Atlas Verification Agent. Analyze this proof document/image.

Proof type: ${data.kind}
Applicant's claim: "${data.claimDescription}"
Image URL: ${signed.signedUrl}

Determine:
1. Does the image content match the claimed proof type and description?
2. Are there signs of tampering, screenshot artifacts, or reuse?
3. Is the document authentic and internally consistent (dates, amounts, logos, context)?
4. Does the visual evidence support the funding claim?

Be strict. Real-world finance depends on your accuracy. If you cannot view the image clearly, set verdict to needs_review.`;
  const t0 = Date.now();
  const {
    object,
    usage
  } = await generateObject({
    model: gateway("google/gemini-2.5-flash"),
    schema: VerifyOutputSchema,
    prompt
  });
  void recordAgentEvent({
    userId,
    agent: "Verification Agent",
    action: "proof_analysis",
    latencyMs: Date.now() - t0,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    confidence: object.confidence,
    outcome: object.verdict,
    metadata: {
      kind: data.kind,
      fundingRequestId: data.fundingRequestId ?? null
    }
  });
  const {
    data: event,
    error: evErr
  } = await supabaseAdmin.from("verification_events").insert({
    user_id: userId,
    kind: data.kind,
    status: object.verdict === "verified" ? "verified" : object.verdict === "invalid" ? "rejected" : "pending",
    evidence_url: signed.signedUrl,
    notes: JSON.stringify({
      confidence: object.confidence,
      summary: object.summary,
      findings: object.findings,
      fraud_signals: object.fraud_signals,
      funding_request_id: data.fundingRequestId ?? null
    })
  }).select().single();
  if (evErr) throw new Error(evErr.message);
  return {
    ...object,
    eventId: event.id
  };
});
export {
  analyzeProof_createServerFn_handler
};
