import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, B as booleanType, i as stringType, h as numberType } from "../_libs/zod.mjs";
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
const BusinessInput = objectType({
  id: stringType().uuid().optional(),
  name: stringType().min(2).max(120),
  business_type: stringType().max(60).optional().nullable(),
  country: stringType().max(60).optional().nullable(),
  industry: stringType().max(60).optional().nullable(),
  stage: stringType().max(40).optional().nullable(),
  team_size: numberType().int().min(0).max(1e5).optional().nullable(),
  revenue_range: stringType().max(40).optional().nullable(),
  primary_objective: stringType().max(400).optional().nullable(),
  funding_requirement_minor: numberType().int().min(0).optional().nullable(),
  funding_currency: stringType().min(3).max(6).optional().nullable(),
  funding_purpose: stringType().max(600).optional().nullable(),
  description: stringType().max(2e3).optional().nullable(),
  onboarding_complete: booleanType().optional()
});
const getMyBusiness_createServerFn_handler = createServerRpc({
  id: "16cab928ed6919a0f4a3cf21b193a85a8a58ac7077afa414264cf39e7c5961a7",
  name: "getMyBusiness",
  filename: "src/lib/business.functions.ts"
}, (opts) => getMyBusiness.__executeServer(opts));
const getMyBusiness = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getMyBusiness_createServerFn_handler, async ({
  context
}) => {
  const {
    data
  } = await supabaseAdmin.from("businesses").select("*").eq("user_id", context.userId).order("created_at", {
    ascending: true
  }).limit(1).maybeSingle();
  return data ?? null;
});
const saveBusiness_createServerFn_handler = createServerRpc({
  id: "60abb804344719ecb4b1ffb3a4d820e64ea242ef54fe7947902e730930dc1565",
  name: "saveBusiness",
  filename: "src/lib/business.functions.ts"
}, (opts) => saveBusiness.__executeServer(opts));
const saveBusiness = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => BusinessInput.parse(d)).handler(saveBusiness_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    id,
    ...fields
  } = data;
  if (id) {
    const {
      data: updated,
      error: error2
    } = await supabaseAdmin.from("businesses").update(fields).eq("id", id).eq("user_id", context.userId).select("*").maybeSingle();
    if (error2) throw new Error(error2.message);
    if (!updated) throw new Error("Business not found for this account.");
    return updated;
  }
  const {
    data: created,
    error
  } = await supabaseAdmin.from("businesses").insert({
    ...fields,
    user_id: context.userId
  }).select("*").single();
  if (error) throw new Error(error.message);
  return created;
});
export {
  getMyBusiness_createServerFn_handler,
  saveBusiness_createServerFn_handler
};
