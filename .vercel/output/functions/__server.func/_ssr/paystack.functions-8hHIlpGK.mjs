import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { P as PAYSTACK_PLAN_CODES, p as paystack, a as PLAN_AMOUNT_MINOR, B as BILLING_CURRENCY } from "./paystack.server-Bs-IoxkW.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { k as enumType, g as objectType, i as stringType } from "../_libs/zod.mjs";
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
const PaidPlan = enumType(["launch", "growth", "scale"]);
const startPaystackCheckout_createServerFn_handler = createServerRpc({
  id: "553bbf3791e2e755ae248b64fe29e75708490c0df7597006529cea3b3d1cea50",
  name: "startPaystackCheckout",
  filename: "src/lib/paystack.functions.ts"
}, (opts) => startPaystackCheckout.__executeServer(opts));
const startPaystackCheckout = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  plan: PaidPlan,
  callbackUrl: stringType().url().max(500)
}).parse(d)).handler(startPaystackCheckout_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId,
    claims
  } = context;
  const email = claims?.email;
  if (!email) throw new Error("Your account has no email address on file.");
  const planCode = PAYSTACK_PLAN_CODES[data.plan];
  if (!planCode) throw new Error(`No Paystack plan configured for ${data.plan}`);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: profile
  } = await supabaseAdmin.from("profiles").select("paystack_customer_code, display_name").eq("user_id", userId).maybeSingle();
  let customerCode = profile?.paystack_customer_code;
  if (!customerCode) {
    const created = await paystack("/customer", {
      method: "POST",
      body: {
        email,
        first_name: profile?.display_name ?? void 0,
        metadata: {
          user_id: userId
        }
      }
    });
    customerCode = created.data.customer_code;
    await supabaseAdmin.from("profiles").update({
      paystack_customer_code: customerCode
    }).eq("user_id", userId);
  }
  const reference = `atlas_${data.plan}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
  const amount = PLAN_AMOUNT_MINOR[data.plan] ?? 0;
  const init = await paystack("/transaction/initialize", {
    method: "POST",
    body: {
      email,
      amount,
      currency: BILLING_CURRENCY,
      plan: planCode,
      reference,
      callback_url: data.callbackUrl,
      metadata: {
        user_id: userId,
        plan: data.plan
      }
    }
  });
  await supabaseAdmin.from("payment_transactions").insert({
    user_id: userId,
    reference,
    plan: data.plan,
    plan_code: planCode,
    amount_minor: amount,
    currency: BILLING_CURRENCY,
    status: "pending",
    authorization_url: init.data.authorization_url
  });
  return {
    authorizationUrl: init.data.authorization_url,
    reference,
    amountMinor: amount,
    currency: BILLING_CURRENCY
  };
});
const verifyPaystackPayment_createServerFn_handler = createServerRpc({
  id: "96dad857295e20a210ef7c9272b0f4a9bfd1cf7ea85a7e8e43a094c4b30e83ef",
  name: "verifyPaystackPayment",
  filename: "src/lib/paystack.functions.ts"
}, (opts) => verifyPaystackPayment.__executeServer(opts));
const verifyPaystackPayment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  reference: stringType().min(6).max(120)
}).parse(d)).handler(verifyPaystackPayment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: row
  } = await supabaseAdmin.from("payment_transactions").select("id, user_id, plan, status").eq("reference", data.reference).maybeSingle();
  if (!row || row.user_id !== userId) {
    throw new Error("Transaction not found for your account.");
  }
  const res = await paystack(`/transaction/verify/${encodeURIComponent(data.reference)}`);
  const tx = res.data;
  const success = tx?.status === "success";
  const plan = row.plan;
  await supabaseAdmin.from("payment_transactions").update({
    status: tx?.status ?? "failed",
    channel: tx?.channel ?? null,
    amount_minor: tx?.amount ?? 0,
    currency: tx?.currency ?? BILLING_CURRENCY,
    raw: tx ?? {}
  }).eq("reference", data.reference);
  if (success) {
    const periodEnd = new Date(Date.now() + 30 * 864e5).toISOString();
    await supabaseAdmin.from("profiles").update({
      subscription_plan: plan,
      subscription_status: "active",
      subscription_currency: tx?.currency ?? BILLING_CURRENCY,
      subscription_amount_minor: tx?.amount ?? 0,
      paystack_plan_code: PAYSTACK_PLAN_CODES[plan] ?? null,
      subscription_current_period_end: periodEnd,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("user_id", userId);
    await supabaseAdmin.from("subscription_events").insert({
      user_id: userId,
      plan,
      event_type: "payment_succeeded",
      amount_cents: tx?.amount ?? 0,
      currency: tx?.currency ?? BILLING_CURRENCY,
      metadata: {
        provider: "paystack",
        reference: data.reference,
        channel: tx?.channel ?? null
      }
    });
  }
  return {
    success,
    status: tx?.status ?? "failed",
    plan,
    message: tx?.gateway_response ?? null
  };
});
const cancelPaystackSubscription_createServerFn_handler = createServerRpc({
  id: "88fddbc8eb6f6f2bd29ffabc57aa893ddaac3f0fb5e2039d10d5ae1cec368991",
  name: "cancelPaystackSubscription",
  filename: "src/lib/paystack.functions.ts"
}, (opts) => cancelPaystackSubscription.__executeServer(opts));
const cancelPaystackSubscription = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(cancelPaystackSubscription_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: profile
  } = await supabaseAdmin.from("profiles").select("paystack_subscription_code, paystack_email_token, subscription_plan").eq("user_id", userId).maybeSingle();
  const code = profile?.paystack_subscription_code;
  const token = profile?.paystack_email_token;
  if (code && token) {
    await paystack("/subscription/disable", {
      method: "POST",
      body: {
        code,
        token
      }
    });
  }
  await supabaseAdmin.from("profiles").update({
    subscription_status: "cancelled",
    paystack_subscription_code: null,
    paystack_email_token: null,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("user_id", userId);
  await supabaseAdmin.from("subscription_events").insert({
    user_id: userId,
    plan: profile?.subscription_plan ?? "free",
    event_type: "subscription_cancelled",
    amount_cents: 0,
    currency: BILLING_CURRENCY,
    metadata: {
      provider: "paystack",
      note: "Cancelled by member; access remains until period end."
    }
  });
  return {
    ok: true
  };
});
const listPaymentTransactions_createServerFn_handler = createServerRpc({
  id: "f88afaa6125b4a18ed203c9d77d893a7d07f95c4c1a7317cf70b4885125de731",
  name: "listPaymentTransactions",
  filename: "src/lib/paystack.functions.ts"
}, (opts) => listPaymentTransactions.__executeServer(opts));
const listPaymentTransactions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(listPaymentTransactions_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data
  } = await supabaseAdmin.from("payment_transactions").select("id, reference, plan, amount_minor, currency, status, channel, created_at").eq("user_id", context.userId).order("created_at", {
    ascending: false
  }).limit(50);
  return (data ?? []).map((t) => ({
    id: t.id,
    reference: t.reference,
    plan: t.plan,
    amountMinor: t.amount_minor ?? 0,
    currency: t.currency ?? BILLING_CURRENCY,
    status: t.status,
    channel: t.channel ?? null,
    createdAt: t.created_at
  }));
});
export {
  cancelPaystackSubscription_createServerFn_handler,
  listPaymentTransactions_createServerFn_handler,
  startPaystackCheckout_createServerFn_handler,
  verifyPaystackPayment_createServerFn_handler
};
