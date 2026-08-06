import { useAuth } from "@/lib/auth";
import {
  planAllows, limitsFor, minPlanFor, PLAN_LABELS, PLAN_RANK,
  type FeatureKey, type PlanId,
} from "@/lib/entitlements";

/**
 * Client-side entitlement checks. UI gating only — every gated server
 * function re-checks the plan server-side via requirePlan().
 */
export function useEntitlements() {
  const { profile, loading } = useAuth();
  const plan = ((profile?.subscription_plan ?? "free") as PlanId);
  const status = profile?.subscription_status ?? "active";
  const billingOk = status === "active" || status === "trialing";

  return {
    loading,
    plan,
    planLabel: PLAN_LABELS[plan] ?? PLAN_LABELS.free,
    status,
    billingOk,
    rank: PLAN_RANK[plan] ?? 0,
    limits: limitsFor(plan),
    can: (feature: FeatureKey) => billingOk && planAllows(plan, feature),
    requiredPlan: (feature: FeatureKey) => minPlanFor(feature),
    requiredPlanLabel: (feature: FeatureKey) => PLAN_LABELS[minPlanFor(feature)],
  };
}
