import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, h as numberType, i as stringType, k as enumType } from "../_libs/zod.mjs";
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
const SIGNUP_REWARD_CENTS = 500;
function makeCode(len = 8) {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}
async function ensureCode(userId, displayName) {
  const admin = supabaseAdmin;
  const {
    data: existing
  } = await admin.from("referral_codes").select("code").eq("user_id", userId).maybeSingle();
  if (existing?.code) return existing.code;
  const base = (displayName ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4) || "ATLAS";
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = attempt === 0 ? `${base}${makeCode(4)}` : makeCode(8);
    const {
      error
    } = await admin.from("referral_codes").insert({
      user_id: userId,
      code
    });
    if (!error) return code;
  }
  throw new Error("Could not generate a unique referral code");
}
const getMyReferralOverview_createServerFn_handler = createServerRpc({
  id: "6dfe8318a40e90896a43ad3cde69713b7758ff6aa8eba2a055fb607881f65c0b",
  name: "getMyReferralOverview",
  filename: "src/lib/referrals.functions.ts"
}, (opts) => getMyReferralOverview.__executeServer(opts));
const getMyReferralOverview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getMyReferralOverview_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const admin = supabaseAdmin;
  const {
    data: profile
  } = await admin.from("profiles").select("display_name").eq("user_id", userId).maybeSingle();
  const code = await ensureCode(userId, profile?.display_name ?? null);
  const {
    data: referrals
  } = await admin.from("referrals").select("id, referred_user_id, status, reward_cents, created_at").eq("referrer_user_id", userId).order("created_at", {
    ascending: false
  });
  const referredIds = (referrals ?? []).map((r) => r.referred_user_id);
  let namesById = {};
  if (referredIds.length > 0) {
    const {
      data: names
    } = await admin.from("profiles").select("user_id, display_name").in("user_id", referredIds);
    namesById = Object.fromEntries((names ?? []).map((p) => [p.user_id, p.display_name ?? "Sanctum member"]));
  }
  const {
    data: rewards
  } = await admin.from("referral_rewards").select("id, amount_cents, currency, kind, note, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(50);
  const totalCents = (rewards ?? []).reduce((sum, r) => sum + (r.amount_cents ?? 0), 0);
  return {
    code,
    totals: {
      invitedCount: referrals?.length ?? 0,
      signedUpCount: (referrals ?? []).filter((r) => r.status === "signed_up").length,
      rewardCents: totalCents
    },
    recentReferrals: (referrals ?? []).slice(0, 20).map((r) => ({
      id: r.id,
      name: namesById[r.referred_user_id] ?? "Sanctum member",
      status: r.status,
      rewardCents: r.reward_cents,
      createdAt: r.created_at
    })),
    recentRewards: (rewards ?? []).map((r) => ({
      id: r.id,
      amountCents: r.amount_cents,
      currency: r.currency,
      kind: r.kind,
      note: r.note ?? null,
      createdAt: r.created_at
    }))
  };
});
const getReferralLeaderboard_createServerFn_handler = createServerRpc({
  id: "4baeea9f310f289c816e77fcb309aa79ac0354f9775c669c93e6787d14c795ca",
  name: "getReferralLeaderboard",
  filename: "src/lib/referrals.functions.ts"
}, (opts) => getReferralLeaderboard.__executeServer(opts));
const getReferralLeaderboard = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  limit: numberType().min(1).max(50).optional()
}).parse(d)).handler(getReferralLeaderboard_createServerFn_handler, async ({
  data
}) => {
  const admin = supabaseAdmin;
  const {
    data: rows
  } = await admin.from("referrals").select("referrer_user_id, reward_cents").order("created_at", {
    ascending: false
  }).limit(1e3);
  const agg = /* @__PURE__ */ new Map();
  for (const r of rows ?? []) {
    const cur = agg.get(r.referrer_user_id) ?? {
      count: 0,
      cents: 0
    };
    cur.count += 1;
    cur.cents += r.reward_cents ?? 0;
    agg.set(r.referrer_user_id, cur);
  }
  const top = [...agg.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, data.limit ?? 10);
  if (top.length === 0) return [];
  const ids = top.map(([id]) => id);
  const {
    data: profs
  } = await admin.from("profiles").select("user_id, display_name, region, trust_score").in("user_id", ids);
  const byId = new Map((profs ?? []).map((p) => [p.user_id, p]));
  return top.map(([id, v], i) => {
    const p = byId.get(id);
    return {
      rank: i + 1,
      userId: id,
      displayName: p?.display_name ?? "Sanctum member",
      region: p?.region ?? null,
      trustScore: p?.trust_score ?? null,
      referrals: v.count,
      rewardCents: v.cents
    };
  });
});
const attachReferralCode_createServerFn_handler = createServerRpc({
  id: "b17cea2c904ee321cedcb968b06020282e9915fbaa2c961ccfee8935f8bfc569",
  name: "attachReferralCode",
  filename: "src/lib/referrals.functions.ts"
}, (opts) => attachReferralCode.__executeServer(opts));
const attachReferralCode = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  code: stringType().min(4).max(24)
}).parse(d)).handler(attachReferralCode_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const admin = supabaseAdmin;
  const normalized = data.code.trim().toUpperCase();
  const {
    data: existingRef
  } = await admin.from("referrals").select("id").eq("referred_user_id", userId).maybeSingle();
  if (existingRef?.id) return {
    ok: true,
    alreadyAttributed: true
  };
  const {
    data: owner
  } = await admin.from("referral_codes").select("user_id, code").eq("code", normalized).maybeSingle();
  if (!owner?.user_id) return {
    ok: false,
    reason: "unknown_code"
  };
  if (owner.user_id === userId) return {
    ok: false,
    reason: "self_referral"
  };
  const {
    data: inserted,
    error: insErr
  } = await admin.from("referrals").insert({
    referrer_user_id: owner.user_id,
    referred_user_id: userId,
    code: normalized,
    status: "signed_up",
    reward_cents: SIGNUP_REWARD_CENTS
  }).select("id").single();
  if (insErr || !inserted) return {
    ok: false,
    reason: "insert_failed"
  };
  await admin.from("referral_rewards").insert({
    user_id: owner.user_id,
    referral_id: inserted.id,
    amount_cents: SIGNUP_REWARD_CENTS,
    currency: "USD",
    kind: "referral_signup",
    note: `Referral signup credit (code ${normalized})`
  });
  return {
    ok: true,
    alreadyAttributed: false
  };
});
function buildInviteMessage(params) {
  const {
    channel,
    referrerName,
    shareUrl
  } = params;
  if (channel === "sms") {
    return `${referrerName} invited you to Atlas Sanctum — an AI-run regenerative finance OS. Join: ${shareUrl}`;
  }
  if (channel === "whatsapp") {
    return `Hey — ${referrerName} here 👋

I'm using Atlas Sanctum, an AI-run operating system for entrepreneurs building trust, funding, and impact. Signing up with my link gives you an instant Trust Score and credits me too.

Join here: ${shareUrl}`;
  }
  return `Subject: You'd love Atlas Sanctum

Hi,

I've been using Atlas Sanctum — an AI-operated economic OS that helps entrepreneurs get funding, verify identity, and prove impact. It's changed how I think about capital.

Sign up with my link and you'll get onboarded with a Trust Score and free access to the Atlas CFO:
${shareUrl}

— ${referrerName}`;
}
const generateInviteMessage_createServerFn_handler = createServerRpc({
  id: "489e198573047336314580990ca6a53cce30a3f292f15210d631df0b41176ccd",
  name: "generateInviteMessage",
  filename: "src/lib/referrals.functions.ts"
}, (opts) => generateInviteMessage.__executeServer(opts));
const generateInviteMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  channel: enumType(["email", "whatsapp", "sms"]),
  shareUrl: stringType().url()
}).parse(d)).handler(generateInviteMessage_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = supabaseAdmin;
  const {
    data: profile
  } = await admin.from("profiles").select("display_name").eq("user_id", context.userId).maybeSingle();
  const referrerName = profile?.display_name ?? "A Sanctum member";
  return {
    channel: data.channel,
    message: buildInviteMessage({
      channel: data.channel,
      referrerName,
      shareUrl: data.shareUrl
    })
  };
});
export {
  attachReferralCode_createServerFn_handler,
  generateInviteMessage_createServerFn_handler,
  getMyReferralOverview_createServerFn_handler,
  getReferralLeaderboard_createServerFn_handler
};
