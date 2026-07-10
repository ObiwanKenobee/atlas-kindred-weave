import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  getSubscription, changeSubscriptionPlan, listBillingEvents, PLAN_PRICES,
  type SubscriptionPlan,
} from "@/lib/subscription.functions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2, Crown, Check, ArrowUpRight, CalendarClock, CreditCard,
  Sparkles, Info,
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

function SubscriptionPage() {
  const { user } = useAuth();
  const [sub, setSub] = useState<Sub | null>(null);
  const [busy, setBusy] = useState<SubscriptionPlan | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [range, setRange] = useState<TimelineRange>("90d");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [tlLoading, setTlLoading] = useState(false);

  const fetchSub = useServerFn(getSubscription);
  const changePlan = useServerFn(changeSubscriptionPlan);
  const fetchTimeline = useServerFn(listBillingEvents);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const s = await fetchSub({ data: {} });
      setSub(s);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load subscription");
    }
  }, [user, fetchSub]);

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
      await changePlan({ data: { plan } });
      toast.success(`Switched to ${PLAN_META[plan].name}`);
      load();
      loadTimeline();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to change plan");
    } finally { setBusy(null); }
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
  const renewalAt = lastChange
    ? addDays(new Date(lastChange.created_at as string), 30)
    : addDays(new Date(), 30);
  const isPaid = sub.priceMonthly > 0;
  const currentMeta = PLAN_META[sub.plan];

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
      </Card>

      {/* Payments-not-connected banner */}
      <Card className="glyph-border mt-4 border-gold/30 bg-gold/5 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
          <div className="text-sm">
            <div className="font-medium text-gold">Payments integration pending</div>
            <p className="mt-1 text-muted-foreground">
              Plan changes are recorded for feature entitlement, but no card is charged yet.
              Enabling Lovable's built-in Stripe will wire real checkout, automatic renewals, and refunds — ask in chat to enable it.
            </p>
          </div>
        </div>
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

      {/* Recent events */}
      <div className="mt-8">
        <div className="text-xs uppercase tracking-widest text-gold/80">Recent billing activity</div>
        <Card className="glyph-border mt-3">
          {sub.recentEvents.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No billing events yet.</div>
          ) : (
            <div className="divide-y divide-border/40">
              {sub.recentEvents.map((e, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-gold" />
                    <div>
                      <div className="text-sm font-medium capitalize">{String(e.event_type).replace(/_/g, " ")}</div>
                      <div className="text-xs text-muted-foreground">
                        Plan: {String(e.plan)} · {new Date(String(e.created_at)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg">
                      {e.amount_cents === 0 ? "—" : `$${(Number(e.amount_cents) / 100).toFixed(2)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
