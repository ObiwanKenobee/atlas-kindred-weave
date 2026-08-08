import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type Business = {
  id: string;
  user_id: string;
  name: string;
  business_type: string | null;
  country: string | null;
  industry: string | null;
  stage: string | null;
  team_size: number | null;
  revenue_range: string | null;
  primary_objective: string | null;
  funding_requirement_minor: number | null;
  funding_currency: string | null;
  funding_purpose: string | null;
  description: string | null;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
};

const BusinessInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(120),
  business_type: z.string().max(60).optional().nullable(),
  country: z.string().max(60).optional().nullable(),
  industry: z.string().max(60).optional().nullable(),
  stage: z.string().max(40).optional().nullable(),
  team_size: z.number().int().min(0).max(100000).optional().nullable(),
  revenue_range: z.string().max(40).optional().nullable(),
  primary_objective: z.string().max(400).optional().nullable(),
  funding_requirement_minor: z.number().int().min(0).optional().nullable(),
  funding_currency: z.string().min(3).max(6).optional().nullable(),
  funding_purpose: z.string().max(600).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  onboarding_complete: z.boolean().optional(),
});

/** The signed-in entrepreneur's primary business, or null when onboarding has not started. */
export const getMyBusiness = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("businesses")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    return (data as Business | null) ?? null;
  });

/** Create or update the business profile owned by the signed-in user. */
export const saveBusiness = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => BusinessInput.parse(d))
  .handler(async ({ data, context }) => {
    const { id, ...fields } = data;

    if (id) {
      const { data: updated, error } = await supabaseAdmin
        .from("businesses")
        .update(fields)
        .eq("id", id)
        .eq("user_id", context.userId)
        .select("*")
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!updated) throw new Error("Business not found for this account.");
      return updated as Business;
    }

    const { data: created, error } = await supabaseAdmin
      .from("businesses")
      .insert({ ...fields, user_id: context.userId })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return created as Business;
  });
