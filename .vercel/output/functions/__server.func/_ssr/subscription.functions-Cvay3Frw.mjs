import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, k as enumType, j as arrayType, i as stringType } from "../_libs/zod.mjs";
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
const PLAN_PRICES = {
  free: 0,
  launch: 500,
  growth: 1500,
  scale: 4900,
  enterprise: 0
};
const getSubscription_createServerFn_handler = createServerRpc({
  id: "0b8dc15daa97b9bfd025f974fbcaefe7de9b586ece8d5fb4f437fda43d28ed9e",
  name: "getSubscription",
  filename: "src/lib/subscription.functions.ts"
}, (opts) => getSubscription.__executeServer(opts));
const getSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getSubscription_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: profile
  } = await supabaseAdmin.from("profiles").select("subscription_plan, subscription_status, display_name").eq("user_id", userId).single();
  const plan = profile?.subscription_plan ?? "free";
  const {
    data: events
  } = await supabaseAdmin.from("subscription_events").select("plan, event_type, amount_cents, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(5);
  return {
    plan,
    status: profile?.subscription_status ?? "active",
    priceMonthly: PLAN_PRICES[plan] ?? 0,
    recentEvents: events ?? []
  };
});
const changeSubscriptionPlan_createServerFn_handler = createServerRpc({
  id: "57c91b7846ee863cd649bae8666ad3726b50ce0fcae1ccbfdf690025b2d8e5be",
  name: "changeSubscriptionPlan",
  filename: "src/lib/subscription.functions.ts"
}, (opts) => changeSubscriptionPlan.__executeServer(opts));
const changeSubscriptionPlan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  plan: enumType(["free", "launch", "growth", "scale", "enterprise"])
}).parse(d)).handler(changeSubscriptionPlan_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  await supabaseAdmin.from("profiles").update({
    subscription_plan: data.plan,
    subscription_status: "active",
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("user_id", userId);
  await supabaseAdmin.from("subscription_events").insert({
    user_id: userId,
    plan: data.plan,
    event_type: "plan_changed",
    amount_cents: PLAN_PRICES[data.plan],
    currency: "USD",
    metadata: {
      source: "self_service",
      note: "Payment integration pending — plan recorded for entitlement gating"
    }
  });
  return {
    plan: data.plan,
    priceMonthly: PLAN_PRICES[data.plan]
  };
});
const listBillingEvents_createServerFn_handler = createServerRpc({
  id: "afffdf511f3182b48c906a63ddf608b5315b0087847f316031dd1cc76f07a4b8",
  name: "listBillingEvents",
  filename: "src/lib/subscription.functions.ts"
}, (opts) => listBillingEvents.__executeServer(opts));
const listBillingEvents = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  range: enumType(["7d", "30d", "90d", "365d", "all"]).default("90d"),
  types: arrayType(stringType().min(1).max(64)).optional()
}).parse(d)).handler(listBillingEvents_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const nowMs = Date.now();
  const rangeMs = {
    "7d": 7 * 864e5,
    "30d": 30 * 864e5,
    "90d": 90 * 864e5,
    "365d": 365 * 864e5,
    all: null
  };
  const since = rangeMs[data.range];
  let q = supabaseAdmin.from("subscription_events").select("id, plan, event_type, amount_cents, currency, created_at, metadata").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(200);
  if (since !== null) {
    q = q.gte("created_at", new Date(nowMs - since).toISOString());
  }
  if (data.types && data.types.length > 0) {
    q = q.in("event_type", data.types);
  }
  const {
    data: events
  } = await q;
  const {
    data: allTypes
  } = await supabaseAdmin.from("subscription_events").select("event_type").eq("user_id", userId).limit(500);
  const types = Array.from(new Set((allTypes ?? []).map((r) => String(r.event_type)))).sort();
  return {
    events: (events ?? []).map((e) => ({
      id: e.id,
      plan: e.plan,
      eventType: e.event_type,
      amountCents: e.amount_cents ?? 0,
      currency: e.currency ?? "USD",
      createdAt: e.created_at,
      note: e.metadata?.note ?? null
    })),
    availableTypes: types
  };
});
export {
  changeSubscriptionPlan_createServerFn_handler,
  getSubscription_createServerFn_handler,
  listBillingEvents_createServerFn_handler
};
