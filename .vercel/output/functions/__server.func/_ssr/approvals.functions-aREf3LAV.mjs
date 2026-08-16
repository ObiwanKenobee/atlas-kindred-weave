import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { k as enumType, g as objectType, z as recordType, A as unknownType, i as stringType } from "../_libs/zod.mjs";
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
const KIND = enumType(["risk_override", "vault_release"]);
const submitApproval_createServerFn_handler = createServerRpc({
  id: "e1a61deb5ce49820a794c113e60116988f36ca4923f1d9431db637c95184b29a",
  name: "submitApproval",
  filename: "src/lib/approvals.functions.ts"
}, (opts) => submitApproval.__executeServer(opts));
const submitApproval = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  kind: KIND,
  title: stringType().min(3).max(240),
  rationale: stringType().max(4e3).optional(),
  subject_user_id: stringType().uuid().optional(),
  entity_type: stringType().max(80).optional(),
  entity_id: stringType().uuid().optional(),
  proposed_change: recordType(unknownType()).default({})
}).parse(d)).handler(submitApproval_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: row,
    error
  } = await supabase.from("approval_requests").insert({
    kind: data.kind,
    title: data.title,
    rationale: data.rationale ?? null,
    requester_id: userId,
    subject_user_id: data.subject_user_id ?? userId,
    entity_type: data.entity_type ?? null,
    entity_id: data.entity_id ?? null,
    proposed_change: data.proposed_change
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: row.id
  };
});
const listApprovals_createServerFn_handler = createServerRpc({
  id: "7e2aa47f156d16facdc7168baf462ab2af7a2175c4ed77a61e4986d8a3d3d3b4",
  name: "listApprovals",
  filename: "src/lib/approvals.functions.ts"
}, (opts) => listApprovals.__executeServer(opts));
const listApprovals = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  scope: enumType(["all", "mine", "assigned", "pending", "decided"]).default("pending"),
  kind: KIND.optional()
}).parse(d)).handler(listApprovals_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  let q = supabase.from("approval_requests").select("id,kind,title,rationale,requester_id,subject_user_id,entity_type,entity_id,proposed_change,status,assigned_reviewer_id,decided_by,decision_notes,decided_at,created_at,updated_at").order("created_at", {
    ascending: false
  }).limit(200);
  if (data.kind) q = q.eq("kind", data.kind);
  if (data.scope === "mine") q = q.eq("requester_id", userId);
  else if (data.scope === "assigned") q = q.eq("assigned_reviewer_id", userId);
  else if (data.scope === "pending") q = q.eq("status", "pending");
  else if (data.scope === "decided") q = q.in("status", ["approved", "rejected", "cancelled"]);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const assignApprovalReviewer_createServerFn_handler = createServerRpc({
  id: "00d43f5c21dc78ea1f0766feba4034fe4b07915e233570fd575b8847696acf15",
  name: "assignApprovalReviewer",
  filename: "src/lib/approvals.functions.ts"
}, (opts) => assignApprovalReviewer.__executeServer(opts));
const assignApprovalReviewer = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  approval_id: stringType().uuid(),
  reviewer_id: stringType().uuid().nullable()
}).parse(d)).handler(assignApprovalReviewer_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: isReviewer
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "reviewer"
  });
  const {
    data: isAdmin
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin"
  });
  if (!isReviewer && !isAdmin) throw new Error("Only reviewers can assign approvals");
  const {
    error
  } = await supabase.from("approval_requests").update({
    assigned_reviewer_id: data.reviewer_id
  }).eq("id", data.approval_id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const decideApproval_createServerFn_handler = createServerRpc({
  id: "827c83219dbcb6101f0df47ef14cfaaf4e8aefb46887fb72390bd06debb5e3cd",
  name: "decideApproval",
  filename: "src/lib/approvals.functions.ts"
}, (opts) => decideApproval.__executeServer(opts));
const decideApproval = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  approval_id: stringType().uuid(),
  decision: enumType(["approved", "rejected"]),
  notes: stringType().max(4e3).optional()
}).parse(d)).handler(decideApproval_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: isReviewer
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "reviewer"
  });
  const {
    data: isAdmin
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin"
  });
  if (!isReviewer && !isAdmin) throw new Error("Only reviewers can decide approvals");
  const {
    error
  } = await supabase.from("approval_requests").update({
    status: data.decision,
    decided_by: userId,
    decision_notes: data.notes ?? null,
    decided_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", data.approval_id).eq("status", "pending");
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const cancelApproval_createServerFn_handler = createServerRpc({
  id: "91a1d9d52a0afdae11a12f2e4b49063deb096b51ad1338c8f7cc89e3b2529a11",
  name: "cancelApproval",
  filename: "src/lib/approvals.functions.ts"
}, (opts) => cancelApproval.__executeServer(opts));
const cancelApproval = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  approval_id: stringType().uuid()
}).parse(d)).handler(cancelApproval_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("approval_requests").update({
    status: "cancelled",
    decided_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", data.approval_id).eq("requester_id", userId).eq("status", "pending");
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listReviewers_createServerFn_handler = createServerRpc({
  id: "53e5880d4921edb2a3979f7881a3672690a9f6cb3c7071078798b89f3822c228",
  name: "listReviewers",
  filename: "src/lib/approvals.functions.ts"
}, (opts) => listReviewers.__executeServer(opts));
const listReviewers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(listReviewers_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase
  } = context;
  const {
    data: roles
  } = await supabase.from("user_roles").select("user_id, role").in("role", ["reviewer", "admin"]);
  const ids = Array.from(new Set((roles ?? []).map((r) => r.user_id)));
  if (ids.length === 0) return [];
  const {
    data: profiles
  } = await supabase.from("profiles").select("user_id, display_name").in("user_id", ids);
  return (profiles ?? []).map((p) => ({
    user_id: p.user_id,
    display_name: p.display_name ?? "Sanctum Member",
    role: (roles ?? []).find((r) => r.user_id === p.user_id)?.role ?? "reviewer"
  }));
});
export {
  assignApprovalReviewer_createServerFn_handler,
  cancelApproval_createServerFn_handler,
  decideApproval_createServerFn_handler,
  listApprovals_createServerFn_handler,
  listReviewers_createServerFn_handler,
  submitApproval_createServerFn_handler
};
