import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { P as PLAN_RANK, F as FEATURE_LABELS, a as PLAN_LABELS, b as FEATURE_MIN_PLAN, l as limitsFor } from "./entitlements-DDmJ5IMx.mjs";
async function getPlanState(userId) {
  const { data } = await supabaseAdmin.from("profiles").select("subscription_plan, subscription_status").eq("user_id", userId).maybeSingle();
  return {
    plan: data?.subscription_plan ?? "free",
    status: data?.subscription_status ?? "active"
  };
}
async function requireFeature(userId, feature) {
  const { plan, status } = await getPlanState(userId);
  if (status !== "active" && status !== "trialing") {
    throw new Error(`Your subscription is ${status}. Update billing to continue.`);
  }
  const needed = FEATURE_MIN_PLAN[feature];
  if ((PLAN_RANK[plan] ?? 0) < PLAN_RANK[needed]) {
    throw new Error(
      `${FEATURE_LABELS[feature]} requires ${PLAN_LABELS[needed]} or higher. You are on ${PLAN_LABELS[plan]}.`
    );
  }
  return plan;
}
async function requireVaultCapacity(userId) {
  const plan = await requireFeature(userId, "vault");
  const max = limitsFor(plan).vaultDocuments;
  if (max === null) return;
  const { data } = await supabaseAdmin.from("knowledge_documents").select("file_name").eq("user_id", userId).limit(5e3);
  const distinct = new Set((data ?? []).map((d) => String(d.file_name))).size;
  if (distinct >= max) {
    throw new Error(
      `${PLAN_LABELS[plan]} includes ${max} vault documents. Upgrade to Atlas Growth for unlimited storage.`
    );
  }
}
export {
  requireVaultCapacity as a,
  requireFeature as r
};
