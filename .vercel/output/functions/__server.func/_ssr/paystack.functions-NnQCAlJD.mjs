import { c as createSsrRpc } from "./observability.server-D5WP9btl.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { g as objectType, i as stringType, k as enumType } from "../_libs/zod.mjs";
const PaidPlan = enumType(["launch", "growth", "scale"]);
const startPaystackCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  plan: PaidPlan,
  callbackUrl: stringType().url().max(500)
}).parse(d)).handler(createSsrRpc("553bbf3791e2e755ae248b64fe29e75708490c0df7597006529cea3b3d1cea50"));
const verifyPaystackPayment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  reference: stringType().min(6).max(120)
}).parse(d)).handler(createSsrRpc("96dad857295e20a210ef7c9272b0f4a9bfd1cf7ea85a7e8e43a094c4b30e83ef"));
const cancelPaystackSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("88fddbc8eb6f6f2bd29ffabc57aa893ddaac3f0fb5e2039d10d5ae1cec368991"));
const listPaymentTransactions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("f88afaa6125b4a18ed203c9d77d893a7d07f95c4c1a7317cf70b4885125de731"));
export {
  cancelPaystackSubscription as c,
  listPaymentTransactions as l,
  startPaystackCheckout as s,
  verifyPaystackPayment as v
};
