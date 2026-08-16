import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const getAdminMetrics_createServerFn_handler = createServerRpc({
  id: "9a345d9b77ded6c0e4a15a403859f5e83a0cbf24114b22bd1dfb7fadee1ae2ee",
  name: "getAdminMetrics",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminMetrics.__executeServer(opts));
const getAdminMetrics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAdminMetrics_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: roles
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
  const isAdmin = (roles ?? []).some((r) => r.role === "admin");
  if (!isAdmin) throw new Error("Forbidden: admin role required");
  const now = /* @__PURE__ */ new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString();
  const [{
    data: profiles
  }, {
    data: fundingReqs
  }, {
    data: verEvents
  }, {
    data: riskScores
  }, {
    data: recentProfiles
  }] = await Promise.all([supabaseAdmin.from("profiles").select("user_id, trust_score, verified, created_at"), supabaseAdmin.from("funding_requests").select("id, amount_requested, currency, status, human_approval, sector, region, created_at"), supabaseAdmin.from("verification_events").select("id, status, kind, created_at"), supabaseAdmin.from("risk_scores").select("trust_score, risk_level, computed_at").order("computed_at", {
    ascending: false
  }).limit(500), supabaseAdmin.from("profiles").select("user_id, created_at").gte("created_at", thirtyDaysAgo)]);
  const allProfiles = profiles ?? [];
  const allFunding = fundingReqs ?? [];
  const allVerEvents = verEvents ?? [];
  const totalUsers = allProfiles.length;
  const newUsersLast30 = (recentProfiles ?? []).length;
  const verifiedUsers = allProfiles.filter((p) => p.verified).length;
  const approved = allFunding.filter((r) => r.human_approval === "approved");
  const pending = allFunding.filter((r) => r.human_approval === "pending");
  const declined = allFunding.filter((r) => r.human_approval === "declined");
  const capitalDeployed = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const capitalRequested = allFunding.reduce((s, r) => s + Number(r.amount_requested), 0);
  const recentFunding = allFunding.filter((r) => r.created_at >= thirtyDaysAgo);
  const verifiedProofs = allVerEvents.filter((e) => e.status === "verified").length;
  const rejectedProofs = allVerEvents.filter((e) => e.status === "rejected").length;
  const recentVerEvents = allVerEvents.filter((e) => e.created_at >= sevenDaysAgo).length;
  const trustBuckets = {
    "0-20": 0,
    "21-40": 0,
    "41-60": 0,
    "61-80": 0,
    "81-100": 0
  };
  for (const p of allProfiles) {
    const s = p.trust_score;
    if (s <= 20) trustBuckets["0-20"]++;
    else if (s <= 40) trustBuckets["21-40"]++;
    else if (s <= 60) trustBuckets["41-60"]++;
    else if (s <= 80) trustBuckets["61-80"]++;
    else trustBuckets["81-100"]++;
  }
  const riskDist = {};
  const seen = /* @__PURE__ */ new Set();
  for (const r of riskScores ?? []) {
    if (!seen.has(r.risk_level)) {
      riskDist[r.risk_level] = (riskDist[r.risk_level] ?? 0) + 1;
      seen.add(r.risk_level);
    }
  }
  const bySector = {};
  for (const r of approved) {
    const sec = r.sector ?? "Unspecified";
    bySector[sec] = (bySector[sec] ?? 0) + 1;
  }
  const avgTrust = allProfiles.length > 0 ? allProfiles.reduce((s, p) => s + p.trust_score, 0) / allProfiles.length : 0;
  return {
    users: {
      total: totalUsers,
      newLast30Days: newUsersLast30,
      verified: verifiedUsers,
      avgTrustScore: Math.round(avgTrust)
    },
    funding: {
      totalRequests: allFunding.length,
      approved: approved.length,
      pending: pending.length,
      declined: declined.length,
      capitalDeployed,
      capitalRequested,
      newLast30Days: recentFunding.length,
      approvalRate: allFunding.length > 0 ? approved.length / allFunding.length : 0
    },
    verification: {
      totalEvents: allVerEvents.length,
      verified: verifiedProofs,
      rejected: rejectedProofs,
      newLast7Days: recentVerEvents,
      successRate: allVerEvents.length > 0 ? verifiedProofs / allVerEvents.length : 0
    },
    trustDistribution: Object.entries(trustBuckets).map(([range, count]) => ({
      range,
      count
    })),
    riskDistribution: Object.entries(riskDist).map(([level, count]) => ({
      level,
      count
    })),
    topSectors: Object.entries(bySector).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([sector, count]) => ({
      sector,
      count
    }))
  };
});
export {
  getAdminMetrics_createServerFn_handler
};
