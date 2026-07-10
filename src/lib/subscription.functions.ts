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

// Plan hierarchy — higher index = higher tier
const PLAN_RANK: Record<SubscriptionPlan, number> = {
  free: 0,
  launch: 1,
  growth: 2,
  scale: 3,
  enterprise: 4,
};

// Throw if the user's plan is below the required minimum.
// Usage: await requirePlan(userId, "growth")
export async function requirePlan(userId: string, minPlan: SubscriptionPlan): Promise<void> {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("subscription_plan, subscription_status")
    .eq("user_id", userId)
    .single();

  const plan = (profile?.subscription_plan ?? "free") as SubscriptionPlan;
  const status = profile?.subscription_status ?? "active";

  if (status !== "active" && status !== "trialing") {
    throw new Error(`Subscription is ${status}. Please update your billing to continue.`);
  }

  if (PLAN_RANK[plan] < PLAN_RANK[minPlan]) {
    throw new Error(`This feature requires the ${minPlan} plan or higher. You are on the ${plan} plan.`);
  }
}

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

export const listBillingEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        range: z.enum(["7d", "30d", "90d", "365d", "all"]).default("90d"),
        types: z.array(z.string().min(1).max(64)).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const nowMs = Date.now();
    const rangeMs: Record<string, number | null> = {
      "7d": 7 * 864e5,
      "30d": 30 * 864e5,
      "90d": 90 * 864e5,
      "365d": 365 * 864e5,
      all: null,
    };
    const since = rangeMs[data.range];

    let q = supabaseAdmin
      .from("subscription_events")
      .select("id, plan, event_type, amount_cents, currency, created_at, metadata")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);

    if (since !== null) {
      q = q.gte("created_at", new Date(nowMs - since).toISOString());
    }
    if (data.types && data.types.length > 0) {
      q = q.in("event_type", data.types);
    }

    const { data: events } = await q;

    // distinct event types (for filter chips) — separate cheap query, ignores filters
    const { data: allTypes } = await supabaseAdmin
      .from("subscription_events")
      .select("event_type")
      .eq("user_id", userId)
      .limit(500);
    const types = Array.from(
      new Set((allTypes ?? []).map((r: any) => String(r.event_type))),
    ).sort();

    return {
      events: (events ?? []).map((e: any) => ({
        id: e.id as string,
        plan: e.plan as string,
        eventType: e.event_type as string,
        amountCents: (e.amount_cents as number | null) ?? 0,
        currency: (e.currency as string | null) ?? "USD",
        createdAt: e.created_at as string,
        note: ((e.metadata as any)?.note as string | undefined) ?? null,
      })),
      availableTypes: types,
    };
  });
