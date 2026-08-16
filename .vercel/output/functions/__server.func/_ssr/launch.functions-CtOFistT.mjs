import { c as createSsrRpc } from "./observability.server-D5WP9btl.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { g as objectType } from "../_libs/zod.mjs";
const getCashflowInsights = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("731695e246aa2740a9576377a2b249cde85a6adb6ed614be51d7574acfa42454"));
const getRevenueTracking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("2d1585c7df8fd273dc761630b8adafe09502889930716e504036290e26579f18"));
const getFundingEligibility = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("460938fc2efe034fa532b12d67bf7dd1c43bd1dbb3faee7f8951d8ed7402da0f"));
export {
  getFundingEligibility as a,
  getCashflowInsights as b,
  getRevenueTracking as g
};
