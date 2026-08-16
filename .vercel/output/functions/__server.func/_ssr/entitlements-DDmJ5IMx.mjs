const PLAN_RANK = {
  free: 0,
  launch: 1,
  growth: 2,
  scale: 3,
  enterprise: 4
};
const PLAN_LABELS = {
  free: "Atlas Free",
  launch: "Atlas Launch",
  growth: "Atlas Growth",
  scale: "Atlas Scale",
  enterprise: "Atlas Enterprise"
};
const FEATURE_MIN_PLAN = {
  profile: "free",
  community: "free",
  trust_score: "free",
  verification_basic: "free",
  cfo: "launch",
  advisor: "launch",
  cashflow_insights: "launch",
  revenue_tracking: "launch",
  funding_eligibility: "launch",
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
  white_label: "scale"
};
const FEATURE_LABELS = {
  profile: "Business profile",
  community: "Community access",
  trust_score: "Atlas Trust Score",
  verification_basic: "Basic AI assessment",
  cfo: "Atlas AI CFO",
  advisor: "AI advisor",
  cashflow_insights: "Cashflow insights",
  revenue_tracking: "Revenue tracking",
  funding_eligibility: "Funding eligibility",
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
  white_label: "White-label options"
};
const PLAN_LIMITS = {
  free: { vaultDocuments: 0, aiRunsPerDay: 10, teamSeats: 1 },
  launch: { vaultDocuments: 10, aiRunsPerDay: 100, teamSeats: 1 },
  growth: { vaultDocuments: null, aiRunsPerDay: 500, teamSeats: 5 },
  scale: { vaultDocuments: null, aiRunsPerDay: null, teamSeats: 25 },
  enterprise: { vaultDocuments: null, aiRunsPerDay: null, teamSeats: 250 }
};
function planAllows(plan, feature) {
  const p = plan ?? "free";
  const rank = PLAN_RANK[p] ?? 0;
  return rank >= PLAN_RANK[FEATURE_MIN_PLAN[feature]];
}
function minPlanFor(feature) {
  return FEATURE_MIN_PLAN[feature];
}
function limitsFor(plan) {
  return PLAN_LIMITS[plan ?? "free"] ?? PLAN_LIMITS.free;
}
function featuresFor(plan) {
  return Object.keys(FEATURE_MIN_PLAN).filter((f) => planAllows(plan, f));
}
export {
  FEATURE_LABELS as F,
  PLAN_RANK as P,
  PLAN_LABELS as a,
  FEATURE_MIN_PLAN as b,
  featuresFor as f,
  limitsFor as l,
  minPlanFor as m,
  planAllows as p
};
