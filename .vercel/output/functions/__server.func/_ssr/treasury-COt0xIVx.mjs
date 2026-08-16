import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
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
const getTreasuryMetrics_createServerFn_handler = createServerRpc({
  id: "d34f10a19cad5e5fcf13cadda22a994445f52e5985ae995e17be642e77e8db0d",
  name: "getTreasuryMetrics",
  filename: "src/routes/treasury.tsx"
}, (opts) => getTreasuryMetrics.__executeServer(opts));
const getTreasuryMetrics = createServerFn({
  method: "GET"
}).handler(getTreasuryMetrics_createServerFn_handler, async () => {
  const {
    data: requests
  } = await supabaseAdmin.from("funding_requests").select("amount_requested, currency, status, human_approval, sector, region, created_at");
  const all = requests ?? [];
  const approved = all.filter((r) => r.human_approval === "approved");
  const declined = all.filter((r) => r.human_approval === "declined");
  const pending = all.filter((r) => r.human_approval === "pending");
  const capitalDeployed = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
  const totalRequested = all.reduce((s, r) => s + Number(r.amount_requested), 0);
  const bySector = {};
  for (const r of approved) {
    const sec = r.sector ?? "Unspecified";
    bySector[sec] = (bySector[sec] ?? 0) + Number(r.amount_requested);
  }
  const byRegion = {};
  for (const r of approved) {
    const reg = r.region ?? "Unknown";
    byRegion[reg] = (byRegion[reg] ?? 0) + Number(r.amount_requested);
  }
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString();
  const recent = approved.filter((r) => r.created_at >= cutoff);
  const deployedLast30 = recent.reduce((s, r) => s + Number(r.amount_requested), 0);
  const decided = approved.length + declined.length;
  const defaultRate = decided > 0 ? declined.length / decided : 0;
  return {
    capitalDeployed,
    totalRequested,
    activeDeals: approved.length,
    pendingDeals: pending.length,
    declinedDeals: declined.length,
    totalRequests: all.length,
    defaultRate,
    deployedLast30,
    bySector: Object.entries(bySector).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, amount]) => ({
      label,
      amount
    })),
    byRegion: Object.entries(byRegion).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, amount]) => ({
      label,
      amount
    }))
  };
});
export {
  getTreasuryMetrics_createServerFn_handler
};
