import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const PLAN_PRICES = {
  free: 0,
  launch: 500,
  growth: 1500,
  scale: 4900,
  enterprise: 0,
} as const;

export type SubscriptionPlan = keyof typeof PLAN_PRICES;

export const getSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d))
  .handler(async ({ context }) => {
    const { userId } = context;
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("subscription_plan, subscription_status, display_name")
      .eq("user_id", userId)
      .single();

    const plan = (profile?.subscription_plan ?? "free") as SubscriptionPlan;

    const { data: events } = await supabaseAdmin
      .from("subscription_events")
      .select("plan, event_type, amount_cents, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    return {
      plan,
      status: profile?.subscription_status ?? "active",
      priceMonthly: PLAN_PRICES[plan] ?? 0,
      recentEvents: events ?? [],
    };
  });

export const changeSubscriptionPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ plan: z.enum(["free", "launch", "growth", "scale", "enterprise"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;

    await supabaseAdmin
      .from("profiles")
      .update({
        subscription_plan: data.plan,
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    await supabaseAdmin.from("subscription_events").insert({
      user_id: userId,
      plan: data.plan,
      event_type: "plan_changed",
      amount_cents: PLAN_PRICES[data.plan],
      currency: "USD",
      metadata: { source: "self_service", note: "Payment integration pending — plan recorded for entitlement gating" },
    });

    return { plan: data.plan, priceMonthly: PLAN_PRICES[data.plan] };
  });
