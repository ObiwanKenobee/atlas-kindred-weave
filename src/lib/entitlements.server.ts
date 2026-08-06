// Server-only entitlement enforcement. UI gating is never sufficient.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  PLAN_RANK, FEATURE_MIN_PLAN, FEATURE_LABELS, PLAN_LABELS, limitsFor,
  type FeatureKey, type PlanId,
} from "@/lib/entitlements";

export async function getPlanState(userId: string): Promise<{ plan: PlanId; status: string }> {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("subscription_plan, subscription_status")
    .eq("user_id", userId)
    .maybeSingle();
  return {
    plan: ((data?.subscription_plan ?? "free") as PlanId),
    status: data?.subscription_status ?? "active",
  };
}

/** Throws unless the member's plan covers `feature` and billing is in good standing. */
export async function requireFeature(userId: string, feature: FeatureKey): Promise<PlanId> {
  const { plan, status } = await getPlanState(userId);

  if (status !== "active" && status !== "trialing") {
    throw new Error(`Your subscription is ${status}. Update billing to continue.`);
  }

  const needed = FEATURE_MIN_PLAN[feature];
  if ((PLAN_RANK[plan] ?? 0) < PLAN_RANK[needed]) {
    throw new Error(
      `${FEATURE_LABELS[feature]} requires ${PLAN_LABELS[needed]} or higher. You are on ${PLAN_LABELS[plan]}.`,
    );
  }
  return plan;
}

/** Throws when the member has reached their plan's vault document allowance. */
export async function requireVaultCapacity(userId: string): Promise<void> {
  const plan = await requireFeature(userId, "vault");
  const max = limitsFor(plan).vaultDocuments;
  if (max === null) return;

  const { data } = await supabaseAdmin
    .from("knowledge_documents")
    .select("file_name")
    .eq("user_id", userId)
    .limit(5000);

  const distinct = new Set((data ?? []).map((d: any) => String(d.file_name))).size;
  if (distinct >= max) {
    throw new Error(
      `${PLAN_LABELS[plan]} includes ${max} vault documents. Upgrade to Atlas Growth for unlimited storage.`,
    );
  }
}
