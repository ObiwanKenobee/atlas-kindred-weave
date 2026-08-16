import { c as createSsrRpc } from "./observability.server-D5WP9btl.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { g as objectType, i as stringType } from "../_libs/zod.mjs";
const computeRiskScore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  targetUserId: stringType().uuid().optional()
}).parse(d)).handler(createSsrRpc("472104fcaf52938f2f1f9c0d54b42011f1672fdeb98c22ab936b7d6710ad5a65"));
export {
  computeRiskScore as c
};
