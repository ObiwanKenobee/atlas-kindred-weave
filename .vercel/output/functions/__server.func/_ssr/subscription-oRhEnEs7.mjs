import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, b as useEntitlements, B as Button } from "./router-Dq4PHNk3.mjs";
import { P as PLAN_PRICES, g as getSubscription, l as listBillingEvents, c as changeSubscriptionPlan } from "./subscription.functions-CClB3Is_.mjs";
import { l as listPaymentTransactions, c as cancelPaystackSubscription, s as startPaystackCheckout } from "./paystack.functions-2IgaNBuq.mjs";
import { f as featuresFor, F as FEATURE_LABELS } from "./entitlements-DDmJ5IMx.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { d as Crown, v as LoaderCircle, W as ArrowUpRight, b as Sparkles, Y as CalendarClock, s as Check, i as ShieldCheck, Z as Receipt, _ as CreditCard } from "../_libs/lucide-react.mjs";
import { a as addDays, f as formatDistanceToNow } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./client-ChmNSUU0.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./observability.server-CSo3iCeb.mjs";
import "./server-D6kup5O1.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-D86cXXU7.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/zod.mjs";
import "./ephemeral-session.server-DRewInbI.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "./ai-gateway.server-C06lV5S3.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./paystack.server-Bs-IoxkW.mjs";
const PLAN_META = {
  free: {
    name: "Atlas Free",
    tagline: "For students and early entrepreneurs",
    features: ["Business profile", "Atlas Trust Score", "Basic AI assessment", "Community access"]
  },
  launch: {
    name: "Atlas Launch",
    tagline: "For solo entrepreneurs finding traction",
    features: ["Everything in Free", "AI CFO conversations", "Funding matching", "Vault (10 documents)", "Priority support"]
  },
  growth: {
    name: "Atlas Growth",
    tagline: "For teams scaling operations",
    features: ["Everything in Launch", "Unlimited vault", "AI Business OS agents", "Impact reporting", "Multi-user"]
  },
  scale: {
    name: "Atlas Scale",
    tagline: "For established businesses",
    features: ["Everything in Growth", "Custom integrations", "Dedicated success", "Advanced analytics", "White-label options"]
  },
  enterprise: {
    name: "Atlas Enterprise",
    tagline: "For institutions and networks",
    features: ["AI underwriting", "Verification APIs", "Fraud detection", "Treasury analytics", "SLA"]
  }
};
const PLAN_ORDER = ["free", "launch", "growth", "scale", "enterprise"];
function SubscriptionPage() {
  const {
    user,
    profile,
    refreshProfile
  } = useAuth();
  const ent = useEntitlements();
  const [sub, setSub] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(null);
  const [cancelling, setCancelling] = reactExports.useState(false);
  const [timeline, setTimeline] = reactExports.useState(null);
  const [payments, setPayments] = reactExports.useState([]);
  const [range, setRange] = reactExports.useState("90d");
  const [typeFilter, setTypeFilter] = reactExports.useState([]);
  const [tlLoading, setTlLoading] = reactExports.useState(false);
  const fetchSub = useServerFn(getSubscription);
  const changePlan = useServerFn(changeSubscriptionPlan);
  const fetchTimeline = useServerFn(listBillingEvents);
  const checkout = useServerFn(startPaystackCheckout);
  const cancelSub = useServerFn(cancelPaystackSubscription);
  const fetchPayments = useServerFn(listPaymentTransactions);
  const load = reactExports.useCallback(async () => {
    if (!user) return;
    try {
      const [s, p] = await Promise.all([fetchSub({
        data: {}
      }), fetchPayments({
        data: {}
      })]);
      setSub(s);
      setPayments(p);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load subscription");
    }
  }, [user, fetchSub, fetchPayments]);
  const loadTimeline = reactExports.useCallback(async () => {
    if (!user) return;
    setTlLoading(true);
    try {
      const t = await fetchTimeline({
        data: {
          range,
          types: typeFilter.length ? typeFilter : void 0
        }
      });
      setTimeline(t);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load timeline");
    } finally {
      setTlLoading(false);
    }
  }, [user, fetchTimeline, range, typeFilter]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  reactExports.useEffect(() => {
    loadTimeline();
  }, [loadTimeline]);
  async function selectPlan(plan) {
    if (plan === sub?.plan) return;
    setBusy(plan);
    try {
      if (plan === "free" || plan === "enterprise") {
        await changePlan({
          data: {
            plan
          }
        });
        toast.success(`Switched to ${PLAN_META[plan].name}`);
        await refreshProfile();
        load();
        loadTimeline();
        setBusy(null);
        return;
      }
      const res = await checkout({
        data: {
          plan,
          callbackUrl: `${window.location.origin}/billing/callback`
        }
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
      await cancelSub({
        data: {}
      });
      toast.success("Subscription cancelled. Access continues until the period ends.");
      await refreshProfile();
      load();
      loadTimeline();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to cancel subscription");
    } finally {
      setCancelling(false);
    }
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "mx-auto h-10 w-10 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-3xl", children: "Subscription" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to manage your plan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow", children: "Enter" })
    ] });
  }
  if (!sub) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-16 flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading subscription…"
    ] });
  }
  const lastChange = sub.recentEvents.find((e) => e.event_type === "plan_changed");
  const periodEnd = profile?.subscription_current_period_end ? new Date(profile.subscription_current_period_end) : null;
  const renewalAt = periodEnd ?? (lastChange ? addDays(new Date(lastChange.created_at), 30) : addDays(/* @__PURE__ */ new Date(), 30));
  const isPaid = sub.priceMonthly > 0;
  const currentMeta = PLAN_META[sub.plan];
  const unlocked = featuresFor(sub.plan);
  const billingCurrency = profile?.subscription_currency ?? "KES";
  const billedMinor = profile?.subscription_amount_minor ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Billing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Subscription" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Manage your Sanctum plan, billing status, and renewal." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", children: [
        "See full pricing",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-1 h-3.5 w-3.5" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border mt-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " Current plan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-baseline gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl", children: currentMeta.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: sub.status === "active" ? "text-sage border-sage/60" : "text-orange-400 border-orange-400/60", children: sub.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: currentMeta.tagline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl", children: [
            sub.priceMonthly === 0 ? "Free" : `$${(sub.priceMonthly / 100).toFixed(0)}`,
            isPaid && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-sm text-muted-foreground", children: "/mo" })
          ] }),
          isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-3 w-3" }),
            "Renews ",
            formatDistanceToNow(renewalAt, {
              addSuffix: true
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-2", children: currentMeta.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 flex-shrink-0 text-sage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
      ] }, f)) }),
      isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-3 border-t border-border/50 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Charged ",
          billedMinor > 0 ? `${billingCurrency} ${(billedMinor / 100).toLocaleString()}` : `${billingCurrency}`,
          " monthly via Paystack."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: cancelling || ent.status === "cancelled", onClick: handleCancel, children: [
          cancelling && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3.5 w-3.5 animate-spin" }),
          ent.status === "cancelled" ? "Cancellation scheduled" : "Cancel subscription"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border mt-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
        " Unlocked capabilities"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: unlocked.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-sage/50 text-sage", children: FEATURE_LABELS[f] }, f)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border/40 p-4 text-[10px] uppercase tracking-widest text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-3 w-3" }),
        " Paystack payments"
      ] }),
      payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No Paystack payments yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children: payments.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium capitalize", children: [
            p.plan,
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: p.status === "success" ? "text-sage" : "text-muted-foreground", children: p.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            p.reference,
            p.channel ? ` · ${p.channel}` : "",
            " · ",
            new Date(p.createdAt).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg", children: [
          p.currency,
          " ",
          (p.amountMinor / 100).toLocaleString()
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold/80", children: "Change plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-5", children: PLAN_ORDER.map((p) => {
        const meta = PLAN_META[p];
        const active = p === sub.plan;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `glyph-border p-4 flex flex-col ${active ? "border-gold/60 bg-gold/5" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: meta.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground min-h-8", children: meta.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 font-display text-2xl", children: [
            PLAN_PRICES[p] === 0 ? p === "enterprise" ? "Custom" : "Free" : `$${(PLAN_PRICES[p] / 100).toFixed(0)}`,
            PLAN_PRICES[p] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-muted-foreground", children: "/mo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-xs text-muted-foreground flex-1", children: meta.features.slice(0, 4).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-3 w-3 flex-shrink-0 text-sage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4", size: "sm", variant: active ? "outline" : "default", disabled: active || busy !== null, onClick: () => selectPlan(p), children: [
            busy === p && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3.5 w-3.5 animate-spin" }),
            active ? "Current" : PLAN_PRICES[p] > 0 ? "Pay with Paystack" : "Switch"
          ] })
        ] }, p);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold/80", children: "Billing event timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2", children: ["7d", "30d", "90d", "365d", "all"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: range === r ? "default" : "outline", onClick: () => setRange(r), children: r === "all" ? "All time" : r.replace("d", " days") }, r)) })
      ] }),
      timeline && timeline.availableTypes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Type:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: typeFilter.length === 0 ? "default" : "outline", onClick: () => setTypeFilter([]), children: "All" }),
        timeline.availableTypes.map((t) => {
          const active = typeFilter.includes(t);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: active ? "default" : "outline", onClick: () => setTypeFilter((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]), children: t.replace(/_/g, " ") }, t);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border mt-3", children: tlLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Loading events…"
      ] }) : !timeline || timeline.events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No billing events in this range." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children: timeline.events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium capitalize", children: e.eventType.replace(/_/g, " ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Plan: ",
              e.plan,
              " · ",
              new Date(e.createdAt).toLocaleString(),
              e.note ? ` · ${e.note}` : ""
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: e.amountCents === 0 ? "—" : `$${(e.amountCents / 100).toFixed(2)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: e.currency })
        ] })
      ] }, e.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Sourced from Paystack charge, subscription, and invoice webhooks plus internal plan-change events." })
    ] })
  ] });
}
export {
  SubscriptionPage as component
};
