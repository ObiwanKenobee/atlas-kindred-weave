import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, i as stringType, k as enumType, h as numberType } from "../_libs/zod.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
const getMyReferralOverview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("6dfe8318a40e90896a43ad3cde69713b7758ff6aa8eba2a055fb607881f65c0b"));
const getReferralLeaderboard = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  limit: numberType().min(1).max(50).optional()
}).parse(d)).handler(createSsrRpc("4baeea9f310f289c816e77fcb309aa79ac0354f9775c669c93e6787d14c795ca"));
const attachReferralCode = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  code: stringType().min(4).max(24)
}).parse(d)).handler(createSsrRpc("b17cea2c904ee321cedcb968b06020282e9915fbaa2c961ccfee8935f8bfc569"));
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
const generateInviteMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  channel: enumType(["email", "whatsapp", "sms"]),
  shareUrl: stringType().url()
}).parse(d)).handler(createSsrRpc("489e198573047336314580990ca6a53cce30a3f292f15210d631df0b41176ccd"));
export {
  attachReferralCode,
  buildInviteMessage,
  generateInviteMessage,
  getMyReferralOverview,
  getReferralLeaderboard
};
