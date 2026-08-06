import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  getSubscription, changeSubscriptionPlan, listBillingEvents, PLAN_PRICES,
  type SubscriptionPlan,
} from "@/lib/subscription.functions";
import {
  startPaystackCheckout, cancelPaystackSubscription, listPaymentTransactions,
} from "@/lib/paystack.functions";
import { useEntitlements } from "@/lib/use-entitlements";
import { featuresFor, FEATURE_LABELS, type PlanId } from "@/lib/entitlements";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2, Crown, Check, ArrowUpRight, CalendarClock, CreditCard,
  Sparkles, ShieldCheck, Receipt,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow, addDays } from "date-fns";


export const Route = createFileRoute("/subscription")({
  head: () => ({
    meta: [
      { title: "Subscription — Atlas Sanctum" },
      { name: "description", content: "Manage your Sanctum plan, billing status, and renewal." },
    ],
  }),
  component: SubscriptionPage,
});

type Sub = Awaited<ReturnType<typeof getSubscription>>;

const PLAN_META: Record<SubscriptionPlan, { name: string; tagline: string; features: string[] }> = {
  free: {
    name: "Atlas Free",
    tagline: "For students and early entrepreneurs",
    features: ["Business profile", "Atlas Trust Score", "Basic AI assessment", "Community access"],
  },
  launch: {
    name: "Atlas Launch",
    tagline: "For solo entrepreneurs finding traction",
    features: ["Everything in Free", "AI CFO conversations", "Funding matching", "Vault (10 documents)", "Priority support"],
  },
  growth: {
    name: "Atlas Growth",
    tagline: "For teams scaling operations",
    features: ["Everything in Launch", "Unlimited vault", "AI Business OS agents", "Impact reporting", "Multi-user"],
  },
  scale: {
    name: "Atlas Scale",
    tagline: "For established businesses",
    features: ["Everything in Growth", "Custom integrations", "Dedicated success", "Advanced analytics", "White-label options"],
  },
  enterprise: {
    name: "Atlas Enterprise",
    tagline: "For institutions and networks",
    features: ["AI underwriting", "Verification APIs", "Fraud detection", "Treasury analytics", "SLA"],
  },
};

const PLAN_ORDER: SubscriptionPlan[] = ["free", "launch", "growth", "scale", "enterprise"];

type Timeline = Awaited<ReturnType<typeof listBillingEvents>>;
type TimelineRange = "7d" | "30d" | "90d" | "365d" | "all";

type Payments = Awaited<ReturnType<typeof listPaymentTransactions>>;

function SubscriptionPage() {
  const { user, profile, refreshProfile } = useAuth();
  const ent = useEntitlements();
  const [sub, setSub] = useState<Sub | null>(null);
  const [busy, setBusy] = useState<SubscriptionPlan | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [payments, setPayments] = useState<Payments>([]);
  const [range, setRange] = useState<TimelineRange>("90d");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [tlLoading, setTlLoading] = useState(false);

  const fetchSub = useServerFn(getSubscription);
  const changePlan = useServerFn(changeSubscriptionPlan);
  const fetchTimeline = useServerFn(listBillingEvents);
  const checkout = useServerFn(startPaystackCheckout);
  const cancelSub = useServerFn(cancelPaystackSubscription);
  const fetchPayments = useServerFn(listPaymentTransactions);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const [s, p] = await Promise.all([fetchSub({ data: {} }), fetchPayments({ data: {} })]);
      setSub(s);
      setPayments(p);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load subscription");
    }
  }, [user, fetchSub, fetchPayments]);

  const loadTimeline = useCallback(async () => {
    if (!user) return;
    setTlLoading(true);
    try {
      const t = await fetchTimeline({ data: { range, types: typeFilter.length ? typeFilter : undefined } });
      setTimeline(t);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load timeline");
    } finally { setTlLoading(false); }
  }, [user, fetchTimeline, range, typeFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadTimeline(); }, [loadTimeline]);

  async function selectPlan(plan: SubscriptionPlan) {
    if (plan === sub?.plan) return;
    setBusy(plan);
    try {
      if (plan === "free" || plan === "enterprise") {
        await changePlan({ data: { plan } });
        toast.success(`Switched to ${PLAN_META[plan].name}`);
        await refreshProfile();
        load();
        loadTimeline();
        setBusy(null);
        return;
      }
      const res = await checkout({
        data: { plan, callbackUrl: `${window.location.origin}/billing/callback` },
      });
      toast.success("Redirecting to Paystack…");
      window.location.href = res.authorizationUrl;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to change plan");
      setBusy(null);
    }
  }

  async function handleCancel() {
    setCancelling(true);
    try {
      await cancelSub({ data: {} });
      toast.success("Subscription cancelled. Access continues until the period ends.");
      await refreshProfile();
      load();
      loadTimeline();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to cancel subscription");
    } finally { setCancelling(false); }
  }


  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <Crown className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-4 font-display text-3xl">Subscription</h1>
        <p className="mt-3 text-muted-foreground">Sign in to manage your plan.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow">Enter</Link>
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading subscription…
      </div>
    );
  }

  const lastChange = sub.recentEvents.find((e) => e.event_type === "plan_changed");
  const periodEnd = profile?.subscription_current_period_end
    ? new Date(profile.subscription_current_period_end)
    : null;
  const renewalAt = periodEnd
    ?? (lastChange
      ? addDays(new Date(lastChange.created_at as string), 30)
      : addDays(new Date(), 30));
  const isPaid = sub.priceMonthly > 0;
  const currentMeta = PLAN_META[sub.plan];
  const unlocked = featuresFor(sub.plan as PlanId);
  const billingCurrency = profile?.subscription_currency ?? "KES";
  const billedMinor = profile?.subscription_amount_minor ?? 0;


  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Billing</div>
          <h1 className="mt-3 font-display text-4xl">Subscription</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your Sanctum plan, billing status, and renewal.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/pricing">See full pricing<ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
        </Button>
      </div>

      {/* Current plan card */}
      <Card className="glyph-border mt-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
              <Sparkles className="h-3 w-3" /> Current plan
            </div>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <div className="font-display text-3xl">{currentMeta.name}</div>
              <Badge variant="outline" className={sub.status === "active" ? "text-sage border-sage/60" : "text-orange-400 border-orange-400/60"}>
                {sub.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{currentMeta.tagline}</p>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl">
              {sub.priceMonthly === 0 ? "Free" : `$${(sub.priceMonthly / 100).toFixed(0)}`}
              {isPaid && <span className="ml-1 text-sm text-muted-foreground">/mo</span>}
            </div>
            {isPaid && (
              <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                <CalendarClock className="h-3 w-3" />
                Renews {formatDistanceToNow(renewalAt, { addSuffix: true })}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {currentMeta.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage" />
              <span>{f}</span>
            </div>
          ))}
        </div>
        {isPaid && (
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/50 pt-4">
            <div className="text-xs text-muted-foreground">
              Charged {billedMinor > 0 ? `${billingCurrency} ${(billedMinor / 100).toLocaleString()}` : `${billingCurrency}`} monthly via Paystack.
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={cancelling || ent.status === "cancelled"}
              onClick={handleCancel}
            >
              {cancelling && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
              {ent.status === "cancelled" ? "Cancellation scheduled" : "Cancel subscription"}
            </Button>
          </div>
        )}
      </Card>

      {/* Unlocked capabilities */}
      <Card className="glyph-border mt-4 p-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
          <ShieldCheck className="h-3 w-3" /> Unlocked capabilities
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {unlocked.map((f) => (
            <Badge key={f} variant="outline" className="border-sage/50 text-sage">
              {FEATURE_LABELS[f]}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Paystack payment history */}
      <Card className="glyph-border mt-4">
        <div className="flex items-center gap-2 border-b border-border/40 p-4 text-[10px] uppercase tracking-widest text-gold/80">
          <Receipt className="h-3 w-3" /> Paystack payments
        </div>
        {payments.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No Paystack payments yet.</div>
        ) : (
          <div className="divide-y divide-border/40">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="text-sm font-medium capitalize">
                    {p.plan} · <span className={p.status === "success" ? "text-sage" : "text-muted-foreground"}>{p.status}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {p.reference}{p.channel ? ` · ${p.channel}` : ""} · {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="font-display text-lg">
                  {p.currency} {(p.amountMinor / 100).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>


      {/* Plan grid */}
      <div className="mt-8">
        <div className="text-xs uppercase tracking-widest text-gold/80">Change plan</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {PLAN_ORDER.map((p) => {
            const meta = PLAN_META[p];
            const active = p === sub.plan;
            return (
              <Card key={p} className={`glyph-border p-4 flex flex-col ${active ? "border-gold/60 bg-gold/5" : ""}`}>
                <div className="font-display text-lg">{meta.name}</div>
                <div className="mt-1 text-xs text-muted-foreground min-h-8">{meta.tagline}</div>
                <div className="mt-3 font-display text-2xl">
                  {PLAN_PRICES[p] === 0 ? (p === "enterprise" ? "Custom" : "Free") : `$${(PLAN_PRICES[p] / 100).toFixed(0)}`}
                  {PLAN_PRICES[p] > 0 && <span className="ml-1 text-xs text-muted-foreground">/mo</span>}
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground flex-1">
                  {meta.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-1.5"><Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-sage" /><span>{f}</span></li>
                  ))}
                </ul>
                <Button
                  className="mt-4"
                  size="sm"
                  variant={active ? "outline" : "default"}
                  disabled={active || busy !== null}
                  onClick={() => selectPlan(p)}
                >
                  {busy === p && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                  {active ? "Current" : "Switch"}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Billing event timeline */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-widest text-gold/80">Billing event timeline</div>
          <div className="flex flex-wrap items-center gap-2">
            {(["7d","30d","90d","365d","all"] as TimelineRange[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={range === r ? "default" : "outline"}
                onClick={() => setRange(r)}
              >
                {r === "all" ? "All time" : r.replace("d"," days")}
              </Button>
            ))}
          </div>
        </div>

        {timeline && timeline.availableTypes.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Type:</span>
            <Button
              size="sm"
              variant={typeFilter.length === 0 ? "default" : "outline"}
              onClick={() => setTypeFilter([])}
            >All</Button>
            {timeline.availableTypes.map((t) => {
              const active = typeFilter.includes(t);
              return (
                <Button
                  key={t}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() =>
                    setTypeFilter((prev) =>
                      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
                    )
                  }
                >
                  {t.replace(/_/g, " ")}
                </Button>
              );
            })}
          </div>
        )}

        <Card className="glyph-border mt-3">
          {tlLoading ? (
            <div className="p-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading events…
            </div>
          ) : !timeline || timeline.events.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No billing events in this range.
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {timeline.events.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-gold" />
                    <div>
                      <div className="text-sm font-medium capitalize">{e.eventType.replace(/_/g, " ")}</div>
                      <div className="text-xs text-muted-foreground">
                        Plan: {e.plan} · {new Date(e.createdAt).toLocaleString()}
                        {e.note ? ` · ${e.note}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg">
                      {e.amountCents === 0 ? "—" : `$${(e.amountCents / 100).toFixed(2)}`}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{e.currency}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">
          Sourced from internal plan-change events. Real Stripe subscription data and renewal dates activate automatically once Stripe checkout is connected.
        </p>
      </div>
    </div>
  );
}
