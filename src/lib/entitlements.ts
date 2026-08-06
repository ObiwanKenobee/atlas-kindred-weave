// Client-safe entitlement matrix. No server imports — safe to use in UI.

export const PLAN_IDS = ["free", "launch", "growth", "scale", "enterprise"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const PLAN_RANK: Record<PlanId, number> = {
  free: 0,
  launch: 1,
  growth: 2,
  scale: 3,
  enterprise: 4,
};

export const PLAN_LABELS: Record<PlanId, string> = {
  free: "Atlas Free",
  launch: "Atlas Launch",
  growth: "Atlas Growth",
  scale: "Atlas Scale",
  enterprise: "Atlas Enterprise",
};

/** Monthly price in USD cents (reference currency). */
export const PLAN_PRICE_USD_CENTS: Record<PlanId, number> = {
  free: 0,
  launch: 500,
  growth: 1500,
  scale: 4900,
  enterprise: 0,
};

export type FeatureKey =
  | "profile"
  | "community"
  | "trust_score"
  | "verification_basic"
  | "cfo"
  | "advisor"
  | "funding_match"
  | "vault"
  | "orchestrator"
  | "business_os"
  | "growth_campaigns"
  | "impact_reporting"
  | "rve_mint"
  | "advanced_analytics"
  | "treasury_reports"
  | "multi_user"
  | "white_label";

/** Minimum plan required for each feature. */
export const FEATURE_MIN_PLAN: Record<FeatureKey, PlanId> = {
  profile: "free",
  community: "free",
  trust_score: "free",
  verification_basic: "free",
  cfo: "launch",
  advisor: "launch",
  funding_match: "launch",
  vault: "launch",
  orchestrator: "growth",
  business_os: "growth",
  growth_campaigns: "growth",
  impact_reporting: "growth",
  rve_mint: "growth",
  advanced_analytics: "scale",
  treasury_reports: "scale",
  multi_user: "growth",
  white_label: "scale",
};

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  profile: "Business profile",
  community: "Community access",
  trust_score: "Atlas Trust Score",
  verification_basic: "Basic AI assessment",
  cfo: "Atlas AI CFO",
  advisor: "AI advisor",
  funding_match: "Funding matching",
  vault: "Knowledge Vault",
  orchestrator: "Atlas Orchestrator",
  business_os: "AI Business OS agents",
  growth_campaigns: "Growth campaign studio",
  impact_reporting: "Impact reporting",
  rve_mint: "Impact asset minting",
  advanced_analytics: "Advanced analytics",
  treasury_reports: "Treasury reports",
  multi_user: "Multi-user teams",
  white_label: "White-label options",
};

/** Hard usage limits per plan. null = unlimited. */
export const PLAN_LIMITS: Record<PlanId, { vaultDocuments: number | null; aiRunsPerDay: number | null; teamSeats: number }> = {
  free: { vaultDocuments: 0, aiRunsPerDay: 10, teamSeats: 1 },
  launch: { vaultDocuments: 10, aiRunsPerDay: 100, teamSeats: 1 },
  growth: { vaultDocuments: null, aiRunsPerDay: 500, teamSeats: 5 },
  scale: { vaultDocuments: null, aiRunsPerDay: null, teamSeats: 25 },
  enterprise: { vaultDocuments: null, aiRunsPerDay: null, teamSeats: 250 },
};

export function planAllows(plan: PlanId | string | null | undefined, feature: FeatureKey): boolean {
  const p = (plan ?? "free") as PlanId;
  const rank = PLAN_RANK[p] ?? 0;
  return rank >= PLAN_RANK[FEATURE_MIN_PLAN[feature]];
}

export function minPlanFor(feature: FeatureKey): PlanId {
  return FEATURE_MIN_PLAN[feature];
}

export function limitsFor(plan: PlanId | string | null | undefined) {
  return PLAN_LIMITS[((plan ?? "free") as PlanId)] ?? PLAN_LIMITS.free;
}

/** Features unlocked by a plan, in display order. */
export function featuresFor(plan: PlanId): FeatureKey[] {
  return (Object.keys(FEATURE_MIN_PLAN) as FeatureKey[]).filter((f) => planAllows(plan, f));
}
