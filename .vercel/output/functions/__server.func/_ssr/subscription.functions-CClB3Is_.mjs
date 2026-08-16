import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { g as objectType, j as arrayType, i as stringType, k as enumType } from "../_libs/zod.mjs";
const PLAN_PRICES = {
  free: 0,
  launch: 500,
  growth: 1500,
  scale: 4900,
  enterprise: 0
};
const getSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("0b8dc15daa97b9bfd025f974fbcaefe7de9b586ece8d5fb4f437fda43d28ed9e"));
const changeSubscriptionPlan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  plan: enumType(["free", "launch", "growth", "scale", "enterprise"])
}).parse(d)).handler(createSsrRpc("57c91b7846ee863cd649bae8666ad3726b50ce0fcae1ccbfdf690025b2d8e5be"));
const listBillingEvents = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  range: enumType(["7d", "30d", "90d", "365d", "all"]).default("90d"),
  types: arrayType(stringType().min(1).max(64)).optional()
}).parse(d)).handler(createSsrRpc("afffdf511f3182b48c906a63ddf608b5315b0087847f316031dd1cc76f07a4b8"));
export {
  PLAN_PRICES as P,
  changeSubscriptionPlan as c,
  getSubscription as g,
  listBillingEvents as l
};
