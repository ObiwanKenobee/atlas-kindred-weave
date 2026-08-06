import { createFileRoute } from "@tanstack/react-router";
import { verifyPaystackSignature, BILLING_CURRENCY } from "@/lib/paystack.server";

export const Route = createFileRoute("/api/public/paystack-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-paystack-signature");

        if (!(await verifyPaystackSignature(raw, signature))) {
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: any;
        try {
          payload = JSON.parse(raw);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const event: string = payload?.event ?? "";
        const d = payload?.data ?? {};
        const customerCode: string | undefined = d?.customer?.customer_code;
        const metaUserId: string | undefined = d?.metadata?.user_id;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Resolve the member either by metadata or by stored customer code.
        let userId = metaUserId ?? null;
        if (!userId && customerCode) {
          const { data: p } = await supabaseAdmin
            .from("profiles")
            .select("user_id")
            .eq("paystack_customer_code", customerCode)
            .maybeSingle();
          userId = (p as any)?.user_id ?? null;
        }
        if (!userId) return new Response("ok");

        const planFromCode = (code?: string | null) => {
          if (!code) return null;
          if (code === "PLN_uyp6ozxms5p8arf") return "launch";
          if (code === "PLN_8wbpj7a1hbt2zqz") return "growth";
          if (code === "PLN_uvbpj21sxef67dv") return "scale";
          return null;
        };

        if (event === "charge.success") {
          const reference: string | undefined = d?.reference;
          const plan =
            d?.metadata?.plan ?? planFromCode(d?.plan?.plan_code ?? d?.plan_object?.plan_code) ?? null;

          if (reference) {
            await supabaseAdmin
              .from("payment_transactions" as any)
              .update({
                status: "success",
                channel: d?.channel ?? null,
                amount_minor: d?.amount ?? 0,
                currency: d?.currency ?? BILLING_CURRENCY,
                raw: d,
              } as any)
              .eq("reference", reference);
          }

          if (plan) {
            await supabaseAdmin
              .from("profiles")
              .update({
                subscription_plan: plan,
                subscription_status: "active",
                subscription_currency: d?.currency ?? BILLING_CURRENCY,
                subscription_amount_minor: d?.amount ?? 0,
                subscription_current_period_end: new Date(Date.now() + 30 * 864e5).toISOString(),
                updated_at: new Date().toISOString(),
              } as any)
              .eq("user_id", userId);
          }

          await supabaseAdmin.from("subscription_events").insert({
            user_id: userId,
            plan: plan ?? "free",
            event_type: "payment_succeeded",
            amount_cents: d?.amount ?? 0,
            currency: d?.currency ?? BILLING_CURRENCY,
            metadata: { provider: "paystack", reference: d?.reference ?? null, channel: d?.channel ?? null },
          } as any);
        }

        if (event === "subscription.create" || event === "subscription.enable") {
          const plan = planFromCode(d?.plan?.plan_code);
          await supabaseAdmin
            .from("profiles")
            .update({
              paystack_subscription_code: d?.subscription_code ?? null,
              paystack_email_token: d?.email_token ?? null,
              paystack_plan_code: d?.plan?.plan_code ?? null,
              subscription_status: "active",
              ...(plan ? { subscription_plan: plan } : {}),
              subscription_current_period_end: d?.next_payment_date ?? null,
              updated_at: new Date().toISOString(),
            } as any)
            .eq("user_id", userId);
        }

        if (event === "subscription.not_renew" || event === "subscription.disable") {
          await supabaseAdmin
            .from("profiles")
            .update({ subscription_status: "cancelled", updated_at: new Date().toISOString() } as any)
            .eq("user_id", userId);

          await supabaseAdmin.from("subscription_events").insert({
            user_id: userId,
            plan: planFromCode(d?.plan?.plan_code) ?? "free",
            event_type: "subscription_cancelled",
            amount_cents: 0,
            currency: BILLING_CURRENCY,
            metadata: { provider: "paystack", event },
          } as any);
        }

        if (event === "invoice.payment_failed") {
          await supabaseAdmin
            .from("profiles")
            .update({ subscription_status: "past_due", updated_at: new Date().toISOString() } as any)
            .eq("user_id", userId);

          await supabaseAdmin.from("subscription_events").insert({
            user_id: userId,
            plan: planFromCode(d?.subscription?.plan?.plan_code) ?? "free",
            event_type: "payment_failed",
            amount_cents: d?.amount ?? 0,
            currency: d?.currency ?? BILLING_CURRENCY,
            metadata: { provider: "paystack", event },
          } as any);
        }

        return new Response("ok");
      },
    },
  },
});
