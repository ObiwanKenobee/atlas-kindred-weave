import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { g as objectType, z as recordType, A as unknownType, i as stringType, k as enumType } from "../_libs/zod.mjs";
const KIND = enumType(["risk_override", "vault_release"]);
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
}).parse(d)).handler(createSsrRpc("e1a61deb5ce49820a794c113e60116988f36ca4923f1d9431db637c95184b29a"));
const listApprovals = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  scope: enumType(["all", "mine", "assigned", "pending", "decided"]).default("pending"),
  kind: KIND.optional()
}).parse(d)).handler(createSsrRpc("7e2aa47f156d16facdc7168baf462ab2af7a2175c4ed77a61e4986d8a3d3d3b4"));
const assignApprovalReviewer = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  approval_id: stringType().uuid(),
  reviewer_id: stringType().uuid().nullable()
}).parse(d)).handler(createSsrRpc("00d43f5c21dc78ea1f0766feba4034fe4b07915e233570fd575b8847696acf15"));
const decideApproval = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  approval_id: stringType().uuid(),
  decision: enumType(["approved", "rejected"]),
  notes: stringType().max(4e3).optional()
}).parse(d)).handler(createSsrRpc("827c83219dbcb6101f0df47ef14cfaaf4e8aefb46887fb72390bd06debb5e3cd"));
const cancelApproval = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  approval_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("91a1d9d52a0afdae11a12f2e4b49063deb096b51ad1338c8f7cc89e3b2529a11"));
const listReviewers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(createSsrRpc("53e5880d4921edb2a3979f7881a3672690a9f6cb3c7071078798b89f3822c228"));
export {
  listReviewers as a,
  assignApprovalReviewer as b,
  cancelApproval as c,
  decideApproval as d,
  listApprovals as l,
  submitApproval as s
};
