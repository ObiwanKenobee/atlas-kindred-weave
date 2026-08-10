import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  paystack,
  PAYSTACK_PLAN_CODES,
  PLAN_AMOUNT_MINOR,
  BILLING_CURRENCY,
} from "@/lib/paystack.server";

const PaidPlan = z.enum(["launch", "growth", "scale"]);

export const startPaystackCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ plan: PaidPlan, callbackUrl: z.string().url().max(500) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { userId, claims } = context;
    const email = (claims as any)?.email as string | undefined;
    if (!email) throw new Error("Your account has no email address on file.");

    const planCode = PAYSTACK_PLAN_CODES[data.plan];
    if (!planCode) throw new Error(`No Paystack plan configured for ${data.plan}`);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Ensure a Paystack customer exists for this member.
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("paystack_customer_code, display_name")
      .eq("user_id", userId)
      .maybeSingle();

    let customerCode = (profile as any)?.paystack_customer_code as string | null;
    if (!customerCode) {
      const created = await paystack<any>("/customer", {
        method: "POST",
        body: { email, first_name: (profile as any)?.display_name ?? undefined, metadata: { user_id: userId } },
      });
      customerCode = created.data.customer_code as string;
      await supabaseAdmin
        .from("profiles")
        .update({ paystack_customer_code: customerCode } as any)
        .eq("user_id", userId);
    }

    const reference = `atlas_${data.plan}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
    const amount = PLAN_AMOUNT_MINOR[data.plan] ?? 0;

    const init = await paystack<any>("/transaction/initialize", {
      method: "POST",
      body: {
        email,
        amount,
        currency: BILLING_CURRENCY,
        plan: planCode,
        reference,
        callback_url: data.callbackUrl,
        metadata: { user_id: userId, plan: data.plan },
      },
    });

    await supabaseAdmin.from("payment_transactions" as any).insert({
      user_id: userId,
      reference,
      plan: data.plan,
      plan_code: planCode,
      amount_minor: amount,
      currency: BILLING_CURRENCY,
      status: "pending",
      authorization_url: init.data.authorization_url,
    } as any);

    return {
      authorizationUrl: init.data.authorization_url as string,
      reference,
      amountMinor: amount,
      currency: BILLING_CURRENCY,
    };
  });

export const verifyPaystackPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ reference: z.string().min(6).max(120) }).parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row } = await supabaseAdmin
      .from("payment_transactions" as any)
      .select("id, user_id, plan, status")
      .eq("reference", data.reference)
      .maybeSingle();

    if (!row || (row as any).user_id !== userId) {
      throw new Error("Transaction not found for your account.");
    }

    const res = await paystack<any>(`/transaction/verify/${encodeURIComponent(data.reference)}`);
    const tx = res.data;
    const success = tx?.status === "success";
    const plan = (row as any).plan as string;

    await supabaseAdmin
      .from("payment_transactions" as any)
      .update({
        status: tx?.status ?? "failed",
        channel: tx?.channel ?? null,
        amount_minor: tx?.amount ?? 0,
        currency: tx?.currency ?? BILLING_CURRENCY,
        raw: tx ?? {},
      } as any)
      .eq("reference", data.reference);

    if (success) {
      const periodEnd = new Date(Date.now() + 30 * 864e5).toISOString();
      await supabaseAdmin
        .from("profiles")
        .update({
          subscription_plan: plan,
          subscription_status: "active",
          subscription_currency: tx?.currency ?? BILLING_CURRENCY,
          subscription_amount_minor: tx?.amount ?? 0,
          paystack_plan_code: PAYSTACK_PLAN_CODES[plan as "launch"] ?? null,
          subscription_current_period_end: periodEnd,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("user_id", userId);

      await supabaseAdmin.from("subscription_events").insert({
        user_id: userId,
        plan,
        event_type: "payment_succeeded",
        amount_cents: tx?.amount ?? 0,
        currency: tx?.currency ?? BILLING_CURRENCY,
        metadata: { provider: "paystack", reference: data.reference, channel: tx?.channel ?? null },
      } as any);
    }

    return { success, status: tx?.status ?? "failed", plan, message: tx?.gateway_response ?? null };
  });

export const cancelPaystackSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d ?? {}))
  .handler(async ({ context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("paystack_subscription_code, paystack_email_token, subscription_plan")
      .eq("user_id", userId)
      .maybeSingle();

    const code = (profile as any)?.paystack_subscription_code as string | null;
    const token = (profile as any)?.paystack_email_token as string | null;

    if (code && token) {
      await paystack("/subscription/disable", { method: "POST", body: { code, token } });
    }

    await supabaseAdmin
      .from("profiles")
      .update({
        subscription_status: "cancelled",
        paystack_subscription_code: null,
        paystack_email_token: null,
        updated_at: new Date().toISOString(),
      } as any)
      .eq("user_id", userId);

    await supabaseAdmin.from("subscription_events").insert({
      user_id: userId,
      plan: (profile as any)?.subscription_plan ?? "free",
      event_type: "subscription_cancelled",
      amount_cents: 0,
      currency: BILLING_CURRENCY,
      metadata: { provider: "paystack", note: "Cancelled by member; access remains until period end." },
    } as any);

    return { ok: true };
  });

export const listPaymentTransactions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d ?? {}))
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("payment_transactions" as any)
      .select("id, reference, plan, amount_minor, currency, status, channel, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    return (data ?? []).map((t: any) => ({
      id: t.id as string,
      reference: t.reference as string,
      plan: t.plan as string,
      amountMinor: (t.amount_minor as number) ?? 0,
      currency: (t.currency as string) ?? BILLING_CURRENCY,
      status: t.status as string,
      channel: (t.channel as string | null) ?? null,
      createdAt: t.created_at as string,
    }));
  });
