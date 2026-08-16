import { T as TSS_SERVER_FUNCTION, b as getServerFnById, c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { g as objectType, h as numberType } from "../_libs/zod.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function recordAgentEvent(params) {
  try {
    await supabaseAdmin.from("agent_events").insert({
      user_id: params.userId ?? void 0,
      agent: params.agent,
      action: params.action,
      latency_ms: params.latencyMs ?? null,
      input_tokens: params.inputTokens ?? null,
      output_tokens: params.outputTokens ?? null,
      confidence: params.confidence ?? null,
      outcome: params.outcome ?? null,
      sources_retrieved: params.sourcesRetrieved ?? 0,
      metadata: params.metadata ?? {}
    });
  } catch {
  }
}
async function recordInteractionStep(params) {
  try {
    await supabaseAdmin.from("interaction_steps").insert({
      user_id: params.userId ?? void 0,
      workflow_id: params.workflowId,
      step: params.step,
      status: params.status ?? "complete",
      metadata: params.metadata ?? {}
    });
  } catch {
  }
}
const getObservabilityMetrics = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  days: numberType().int().min(1).max(90).default(7)
}).parse(d)).handler(createSsrRpc("741594ab2472aa9463e4cf8d90ef701b740ecaf5cbddb205376cd6b5f3ecce2e"));
export {
  recordInteractionStep as a,
  createSsrRpc as c,
  getObservabilityMetrics as g,
  recordAgentEvent as r
};
