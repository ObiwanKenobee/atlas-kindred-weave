import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const KIND = z.enum(["risk_override", "vault_release"]);

export const submitApproval = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      kind: KIND,
      title: z.string().min(3).max(240),
      rationale: z.string().max(4000).optional(),
      subject_user_id: z.string().uuid().optional(),
      entity_type: z.string().max(80).optional(),
      entity_id: z.string().uuid().optional(),
      proposed_change: z.record(z.unknown()).default({}),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("approval_requests")
      .insert({
        kind: data.kind,
        title: data.title,
        rationale: data.rationale ?? null,
        requester_id: userId,
        subject_user_id: data.subject_user_id ?? userId,
        entity_type: data.entity_type ?? null,
        entity_id: data.entity_id ?? null,
        proposed_change: data.proposed_change as never,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const listApprovals = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      scope: z.enum(["all", "mine", "assigned", "pending", "decided"]).default("pending"),
      kind: KIND.optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let q = supabase
      .from("approval_requests")
      .select("id,kind,title,rationale,requester_id,subject_user_id,entity_type,entity_id,proposed_change,status,assigned_reviewer_id,decided_by,decision_notes,decided_at,created_at,updated_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data.kind) q = q.eq("kind", data.kind);
    if (data.scope === "mine") q = q.eq("requester_id", userId);
    else if (data.scope === "assigned") q = q.eq("assigned_reviewer_id", userId);
    else if (data.scope === "pending") q = q.eq("status", "pending");
    else if (data.scope === "decided") q = q.in("status", ["approved", "rejected", "cancelled"]);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const assignApprovalReviewer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      approval_id: z.string().uuid(),
      reviewer_id: z.string().uuid().nullable(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isReviewer } = await supabase.rpc("has_role", {
      _user_id: userId, _role: "reviewer",
    });
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId, _role: "admin",
    });
    if (!isReviewer && !isAdmin) throw new Error("Only reviewers can assign approvals");
    const { error } = await supabase
      .from("approval_requests")
      .update({ assigned_reviewer_id: data.reviewer_id })
      .eq("id", data.approval_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const decideApproval = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      approval_id: z.string().uuid(),
      decision: z.enum(["approved", "rejected"]),
      notes: z.string().max(4000).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isReviewer } = await supabase.rpc("has_role", {
      _user_id: userId, _role: "reviewer",
    });
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId, _role: "admin",
    });
    if (!isReviewer && !isAdmin) throw new Error("Only reviewers can decide approvals");

    const { error } = await supabase
      .from("approval_requests")
      .update({
        status: data.decision,
        decided_by: userId,
        decision_notes: data.notes ?? null,
        decided_at: new Date().toISOString(),
      })
      .eq("id", data.approval_id)
      .eq("status", "pending");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const cancelApproval = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ approval_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("approval_requests")
      .update({ status: "cancelled", decided_at: new Date().toISOString() })
      .eq("id", data.approval_id)
      .eq("requester_id", userId)
      .eq("status", "pending");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listReviewers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d ?? {}))
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role")
      .in("role", ["reviewer", "admin"]);
    const ids = Array.from(new Set((roles ?? []).map((r) => r.user_id)));
    if (ids.length === 0) return [];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, display_name")
      .in("user_id", ids);
    return (profiles ?? []).map((p) => ({
      user_id: p.user_id,
      display_name: p.display_name ?? "Sanctum Member",
      role: (roles ?? []).find((r) => r.user_id === p.user_id)?.role ?? "reviewer",
    }));
  });
