import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
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
const getImpactMetrics_createServerFn_handler = createServerRpc({
  id: "3feabf02468349556e0da7080d34df8ef89466386569f5373a3671ffc8e4b149",
  name: "getImpactMetrics",
  filename: "src/routes/impact.tsx"
}, (opts) => getImpactMetrics.__executeServer(opts));
const getImpactMetrics = createServerFn({
  method: "GET"
}).handler(getImpactMetrics_createServerFn_handler, async () => {
  const [{
    data: profiles
  }, {
    data: funding
  }, {
    data: verEvents
  }, {
    data: decisionVersions
  }] = await Promise.all([supabaseAdmin.from("profiles").select("user_id, verified, trust_score, region, created_at"), supabaseAdmin.from("funding_requests").select("id, user_id, amount_requested, currency, sector, region, human_approval, decision_report, created_at"), supabaseAdmin.from("verification_events").select("id, status, kind, user_id, created_at"), supabaseAdmin.from("decision_report_versions").select("report, generated_at").eq("human_approval", "approved")]);
  const allProfiles = profiles ?? [];
  const allFunding = funding ?? [];
  const allVer = verEvents ?? [];
  const approved = allFunding.filter((r) => r.human_approval === "approved");
  const capitalDeployed = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  let totalJobs = 0;
  let totalHouseholds = 0;
  let totalProsperity = 0;
  for (const v of decisionVersions ?? []) {
    const report = v.report;
    const forecast = report?.impact_forecast;
    if (forecast) {
      totalJobs += forecast.jobs_created ?? 0;
      totalHouseholds += forecast.households_reached ?? 0;
      totalProsperity += forecast.prosperity_index_delta ?? 0;
    }
  }
  const verifiedUsers = allProfiles.filter((p) => p.verified || p.trust_score >= 60).length;
  const avgTrust = allProfiles.length > 0 ? allProfiles.reduce((s, p) => s + p.trust_score, 0) / allProfiles.length : 0;
  const bySector = {};
  for (const r of approved) {
    const sec = r.sector ?? "Unspecified";
    if (!bySector[sec]) bySector[sec] = {
      count: 0,
      capital: 0
    };
    bySector[sec].count++;
    bySector[sec].capital += Number(r.amount_requested);
  }
  const byRegion = {};
  for (const r of approved) {
    const reg = r.region ?? "Unknown";
    byRegion[reg] = (byRegion[reg] ?? 0) + 1;
  }
  const verifiedProofs = allVer.filter((e) => e.status === "verified").length;
  const verSuccessRate = allVer.length > 0 ? verifiedProofs / allVer.length : 0;
  const fundedUsers = new Set(approved.map((r) => r.user_id ?? "")).size;
  const verifiedUserIds = new Set(allVer.filter((e) => e.status === "verified").map((e) => e.user_id)).size;
  const totalUsersServed = (/* @__PURE__ */ new Set([...approved.map((r) => r.user_id ?? ""), ...allVer.map((e) => e.user_id)])).size;
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString();
  const newFunded30 = approved.filter((r) => r.created_at >= cutoff).length;
  const newVerified30 = allVer.filter((e) => e.status === "verified" && e.created_at >= cutoff).length;
  const newUsers30 = allProfiles.filter((p) => p.created_at >= cutoff).length;
  return {
    capitalDeployed,
    businessesFunded: approved.length,
    totalUsers: allProfiles.length,
    verifiedUsers,
    avgTrustScore: Math.round(avgTrust),
    totalJobs,
    totalHouseholds,
    totalProsperity: Math.round(totalProsperity * 100) / 100,
    verificationSuccessRate: Math.round(verSuccessRate * 100),
    totalVerifications: allVer.length,
    verifiedProofs,
    totalUsersServed,
    fundedUsers,
    verifiedUserIds,
    momentum: {
      newFunded30,
      newVerified30,
      newUsers30
    },
    topSectors: Object.entries(bySector).sort((a, b) => b[1].capital - a[1].capital).slice(0, 6).map(([sector, data]) => ({
      sector,
      ...data
    })),
    topRegions: Object.entries(byRegion).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([region, count]) => ({
      region,
      count
    }))
  };
});
export {
  getImpactMetrics_createServerFn_handler
};
