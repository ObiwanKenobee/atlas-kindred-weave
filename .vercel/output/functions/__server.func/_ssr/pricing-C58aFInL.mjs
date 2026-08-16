import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { B as Button, u as useAuth, b as useEntitlements } from "./router-Dq4PHNk3.mjs";
import { c as changeSubscriptionPlan } from "./subscription.functions-CClB3Is_.mjs";
import { s as startPaystackCheckout } from "./paystack.functions-2IgaNBuq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-qT-IED0v.mjs";
import "../_libs/seroval.mjs";
import { b as Sparkles, ah as Rocket, T as TrendingUp, f as Building2, s as Check, i as ShieldCheck, ai as Star, a7 as Briefcase, aj as Earth, y as ChevronUp, x as ChevronDown, k as Coins, ak as Wifi, al as Banknote, _ as CreditCard, am as Smartphone } from "../_libs/lucide-react.mjs";
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
import "./entitlements-DDmJ5IMx.mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
const CURRENCY_META = {
  USD: {
    flag: "🇺🇸",
    label: "USD",
    rate: 1,
    symbol: "$"
  },
  KES: {
    flag: "🇰🇪",
    label: "KES",
    rate: 129,
    symbol: "KES"
  },
  NGN: {
    flag: "🇳🇬",
    label: "NGN",
    rate: 1580,
    symbol: "₦"
  },
  GHS: {
    flag: "🇬🇭",
    label: "GHS",
    rate: 15.5,
    symbol: "₵"
  },
  UGX: {
    flag: "🇺🇬",
    label: "UGX",
    rate: 3760,
    symbol: "USh"
  },
  ZAR: {
    flag: "🇿🇦",
    label: "ZAR",
    rate: 18.5,
    symbol: "R"
  },
  TZS: {
    flag: "🇹🇿",
    label: "TZS",
    rate: 2600,
    symbol: "TSh"
  },
  ETB: {
    flag: "🇪🇹",
    label: "ETB",
    rate: 55,
    symbol: "Br"
  }
};
function formatPrice(usd, currency) {
  const {
    rate,
    symbol
  } = CURRENCY_META[currency];
  const val = usd * rate;
  if (val === 0) return `${symbol}0`;
  if (val >= 1e3) return `${symbol}${Math.round(val).toLocaleString()}`;
  return `${symbol}${val % 1 === 0 ? val : val.toFixed(0)}`;
}
const PAYMENT_METHODS = [{
  id: "mpesa",
  name: "M-Pesa",
  type: "mobile_money",
  regions: ["Kenya", "Tanzania", "Ghana", "Mozambique", "Egypt"],
  currencies: ["KES", "TZS", "GHS"],
  logo: "📱",
  description: "Safaricom's mobile money — Kenya's default payment rail.",
  fee: "0% – 1%",
  settle: "Instant",
  popular: true
}, {
  id: "mtn_momo",
  name: "MTN MoMo",
  type: "mobile_money",
  regions: ["Nigeria", "Ghana", "Uganda", "Côte d'Ivoire", "Cameroon", "Rwanda"],
  currencies: ["NGN", "GHS", "UGX"],
  logo: "🟡",
  description: "MTN Mobile Money — 300M+ subscribers across 17 markets.",
  fee: "0.5% – 1.5%",
  settle: "Instant",
  popular: true
}, {
  id: "airtel_money",
  name: "Airtel Money",
  type: "mobile_money",
  regions: ["Uganda", "Kenya", "Tanzania", "Zambia", "Malawi", "Niger"],
  currencies: ["UGX", "KES", "TZS"],
  logo: "🔴",
  description: "Airtel Africa mobile money across 14 markets.",
  fee: "0.5% – 1%",
  settle: "Instant"
}, {
  id: "flutterwave",
  name: "Flutterwave",
  type: "card",
  regions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "Global"],
  currencies: ["NGN", "GHS", "KES", "ZAR", "USD"],
  logo: "🌊",
  description: "Pan-African payments gateway — cards, bank, mobile money in one API.",
  fee: "1.4% + $0.20",
  settle: "1–2 days",
  popular: true
}, {
  id: "paystack",
  name: "Paystack",
  type: "card",
  regions: ["Nigeria", "Ghana", "South Africa"],
  currencies: ["NGN", "GHS", "ZAR"],
  logo: "💚",
  description: "Stripe-backed gateway dominant in Nigeria and Ghana.",
  fee: "1.5% + ₦100",
  settle: "1 day"
}, {
  id: "pesapal",
  name: "PesaPal",
  type: "mobile_money",
  regions: ["Kenya", "Uganda", "Tanzania", "Rwanda", "Zambia"],
  currencies: ["KES", "UGX", "TZS"],
  logo: "🟢",
  description: "East African multi-channel checkout — mobile, card, bank.",
  fee: "2.5%",
  settle: "1–3 days"
}, {
  id: "ozow",
  name: "Ozow",
  type: "bank",
  regions: ["South Africa"],
  currencies: ["ZAR"],
  logo: "🟣",
  description: "South Africa instant EFT — no card needed, bank-direct.",
  fee: "0.5%",
  settle: "Instant"
}, {
  id: "tigopesa",
  name: "Tigo Pesa",
  type: "mobile_money",
  regions: ["Tanzania", "Ghana", "Rwanda"],
  currencies: ["TZS", "GHS"],
  logo: "🔵",
  description: "Millicom's mobile money strong in Tanzania.",
  fee: "1%",
  settle: "Instant"
}, {
  id: "telebirr",
  name: "Telebirr",
  type: "mobile_money",
  regions: ["Ethiopia"],
  currencies: ["ETB"],
  logo: "🇪🇹",
  description: "Ethio Telecom's mobile money — 40M+ users.",
  fee: "1%",
  settle: "Instant"
}, {
  id: "stripe",
  name: "Stripe",
  type: "card",
  regions: ["Global"],
  currencies: ["USD"],
  logo: "💳",
  description: "Global card & wallet — Visa, Mastercard, Apple Pay, Google Pay.",
  fee: "2.9% + $0.30",
  settle: "2 days",
  popular: true
}, {
  id: "bank_transfer",
  name: "Bank Transfer",
  type: "bank",
  regions: ["Global"],
  currencies: ["USD", "KES", "NGN", "ZAR"],
  logo: "🏦",
  description: "SWIFT, SEPA, and local bank wires for institutional clients.",
  fee: "Fixed: $15–25",
  settle: "1–5 days"
}, {
  id: "ussd",
  name: "USSD *384#",
  type: "ussd",
  regions: ["Nigeria", "Ghana", "Kenya"],
  currencies: ["NGN", "GHS", "KES"],
  logo: "📞",
  description: "No internet required. Works on any mobile phone.",
  fee: "Free",
  settle: "Instant"
}];
const TYPE_META = {
  mobile_money: {
    label: "Mobile Money",
    icon: Smartphone,
    color: "text-sage border-sage/60"
  },
  card: {
    label: "Card / Gateway",
    icon: CreditCard,
    color: "text-gold border-gold/60"
  },
  bank: {
    label: "Bank Transfer",
    icon: Banknote,
    color: "text-muted-foreground border-border"
  },
  ussd: {
    label: "USSD",
    icon: Wifi,
    color: "text-gold/70 border-gold/30"
  },
  crypto: {
    label: "Crypto",
    icon: Coins,
    color: "text-orange-400 border-orange-400/40"
  }
};
const TIERS = [{
  slug: "free",
  name: "Atlas Free",
  priceUSD: 0,
  cadence: "/month",
  tagline: "Build your economic identity — at zero cost.",
  icon: Sparkles,
  target: ["Students", "Early entrepreneurs", "Informal businesses"],
  features: ["Business profile", "Atlas Trust Score", "Basic AI assessment", "Funding readiness score", "Community access"],
  meta: "10–20% convert to paid",
  cta: "Start free"
}, {
  slug: "launch",
  name: "Atlas Launch",
  priceUSD: 5,
  cadence: "/month",
  tagline: "A part-time business coach in your pocket.",
  icon: Rocket,
  target: ["Solo entrepreneurs", "Micro-businesses"],
  features: ["Everything in Free", "AI Business Advisor", "Cashflow insights", "Revenue tracking", "Funding eligibility checker", "Funding matching", "Knowledge Vault (10 docs)"],
  cta: "Launch for"
}, {
  slug: "growth",
  name: "Atlas Growth",
  priceUSD: 15,
  cadence: "/month",
  tagline: "Your AI CFO for the next stage.",
  icon: TrendingUp,
  highlight: true,
  target: ["Growing SMEs — $500–$5,000/mo"],
  features: ["Everything in Launch", "Atlas AI CFO (voice)", "Unlimited Knowledge Vault", "AI Business OS agents", "Growth campaign studio", "Impact reporting", "Impact asset minting", "Multi-user (5 seats)"],
  cta: "Choose Growth"
}, {
  slug: "scale",
  name: "Atlas Scale",
  priceUSD: 49,
  cadence: "/month",
  tagline: "A full AI executive team.",
  icon: Building2,
  target: ["Businesses at $5,000+/mo"],
  features: ["Everything in Growth", "Atlas Orchestrator", "Treasury reports", "Advanced analytics", "Economic Graph access", "Multi-user (25 seats)", "White-label options", "Priority support"],
  cta: "Scale up"
}];
const CAPITAL_TABLE = [{
  range: "$100 – $1K",
  usd: [100, 1e3],
  fee: "5%",
  example: (c) => `e.g. ${formatPrice(50, c)} on ${formatPrice(1e3, c)}`
}, {
  range: "$1K – $10K",
  usd: [1e3, 1e4],
  fee: "3%",
  example: (c) => `e.g. ${formatPrice(150, c)} on ${formatPrice(5e3, c)}`
}, {
  range: "$10K+",
  usd: [1e4, Infinity],
  fee: "2%",
  example: (c) => `e.g. ${formatPrice(200, c)} on ${formatPrice(1e4, c)}`
}];
const VERIFICATION = [{
  service: "Receipt verification",
  priceUSD: 0.25
}, {
  service: "Inventory verification",
  priceUSD: 1
}, {
  service: "Milestone verification",
  priceUSD: 2
}, {
  service: "Site verification",
  priceUSD: 5
}];
const ENTERPRISE_TIERS = [{
  name: "Starter",
  priceUSD: 500,
  target: "Pilots & single-product MFIs"
}, {
  name: "Growth",
  priceUSD: 2e3,
  target: "SACCOs & regional NGOs",
  highlight: true
}, {
  name: "Enterprise",
  priceUSD: 1e4,
  target: "Banks & national institutions"
}];
function CurrencySelector({
  value,
  onChange
}) {
  const [open, setOpen] = reactExports.useState(false);
  const meta = CURRENCY_META[value];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen((o) => !o), className: "flex items-center gap-2 rounded-md border border-gold/40 bg-card px-3 py-1.5 text-sm hover:border-gold/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: meta.flag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gold", children: meta.label }),
      open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full z-20 mt-1 w-44 rounded-md border border-border/60 bg-card shadow-sanctum", children: Object.keys(CURRENCY_META).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      onChange(c);
      setOpen(false);
    }, className: `flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/40 ${c === value ? "text-gold" : "text-foreground/80"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CURRENCY_META[c].flag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CURRENCY_META[c].label })
    ] }, c)) })
  ] });
}
function TierCard({
  tier,
  currency
}) {
  const {
    user
  } = useAuth();
  const ent = useEntitlements();
  const selectPlan = useServerFn(changeSubscriptionPlan);
  const checkout = useServerFn(startPaystackCheckout);
  const [busy, setBusy] = reactExports.useState(false);
  const Icon = tier.icon;
  const priceStr = tier.priceUSD === 0 ? `${CURRENCY_META[currency].symbol}0` : formatPrice(tier.priceUSD, currency);
  const isCurrent = user ? ent.plan === tier.slug : false;
  async function handleSelectPlan() {
    if (!user) return;
    setBusy(true);
    try {
      if (tier.priceUSD === 0) {
        await selectPlan({
          data: {
            plan: "free"
          }
        });
        toast.success("Moved to Atlas Free.");
        setBusy(false);
        return;
      }
      const res = await checkout({
        data: {
          plan: tier.slug,
          callbackUrl: `${window.location.origin}/billing/callback`
        }
      });
      toast.success("Redirecting to Paystack…");
      window.location.href = res.authorizationUrl;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start checkout.");
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative flex flex-col ${tier.highlight ? "border-gold/60 shadow-glow" : ""}`, children: [
    tier.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-gold-foreground border-0 shadow-glow", children: "Most popular" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-md bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: tier.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "min-h-[2.5rem]", children: tier.tagline }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl", children: priceStr }),
        tier.cadence && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: tier.cadence })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm flex-1", children: tier.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold mt-0.5 shrink-0" }),
        f
      ] }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pt-2 border-t border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: tier.target.join(" • ") }),
        tier.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gold/70", children: tier.meta })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: tier.highlight ? "bg-gradient-gold text-gold-foreground shadow-glow hover:opacity-90" : "", variant: tier.highlight ? "default" : isCurrent ? "secondary" : "outline", disabled: busy || isCurrent, onClick: user ? handleSelectPlan : void 0, asChild: !user, children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isCurrent ? "Current plan" : busy ? "Opening checkout…" : tier.priceUSD === 0 ? tier.cta : `${tier.cta} ${priceStr}` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: tier.priceUSD === 0 ? "/" : "/login", children: tier.priceUSD === 0 ? tier.cta : `${tier.cta} ${priceStr}` }) }),
      user && tier.priceUSD > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center", children: "Billed monthly via Paystack in KES · card, M-Pesa, and bank transfer" })
    ] })
  ] });
}
function PaymentMethodCard({
  method
}) {
  const meta = TYPE_META[method.type];
  const Icon = meta.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `glyph-border p-4 ${method.popular ? "border-gold/40" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl leading-none", children: method.logo }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-foreground", children: method.name }),
            method.popular && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-gold text-gold-foreground border-0 px-1.5 py-0 text-[9px]", children: "Popular" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-[10px] uppercase tracking-widest mt-0.5 ${meta.color}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-2.5 w-2.5" }),
            meta.label
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gold font-medium", children: method.fee }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: method.settle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: method.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: method.regions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] text-foreground/70", children: r }, r)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: method.currencies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded border border-gold/20 px-1.5 py-0.5 text-[10px] text-gold/80", children: [
      CURRENCY_META[c].flag,
      " ",
      c
    ] }, c)) })
  ] });
}
function SectionHeader({
  eyebrow,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: subtitle })
  ] });
}
function PricingPage() {
  const [currency, setCurrency] = reactExports.useState("USD");
  const [payTab, setPayTab] = reactExports.useState("all");
  const filtered = payTab === "all" ? PAYMENT_METHODS : PAYMENT_METHODS.filter((m) => m.type === payTab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-12 space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center space-y-4 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold", children: "Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl tracking-tight", children: [
        "Capital, trust, and intelligence —",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-gold bg-clip-text text-transparent", children: "priced for every stage" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Start free. Grow with AI advisors. Unlock capital when ready. Pay via M-Pesa, MTN MoMo, Flutterwave, Stripe, or bank transfer — in your local currency." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Show prices in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencySelector, { value: currency, onChange: setCurrency })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Subscriptions", title: "Plans that grow with the business", subtitle: "Four tiers — from free trust-building to a full AI executive team." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: TIERS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TierCard, { tier: t, currency }, t.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Payment methods", title: "African-first. Globally ready.", subtitle: "We meet you where your money is — mobile money, cards, USSD, or bank transfer. No bank account required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: [["all", "All methods"], ["mobile_money", "Mobile Money"], ["card", "Card / Gateway"], ["bank", "Bank Transfer"], ["ussd", "USSD"]].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPayTab(key), className: `rounded-full border px-3 py-1 text-xs uppercase tracking-widest transition ${payTab === key ? "border-gold/60 bg-gradient-gold text-gold-foreground shadow-glow" : "border-border/60 text-muted-foreground hover:border-gold/40 hover:text-gold"}`, children: label }, key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentMethodCard, { method: m }, m.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border border-gold/30 p-6 max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Payment philosophy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/90 leading-relaxed", children: [
          "Atlas Sanctum processes payments through ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-gold", children: "Flutterwave" }),
          " (Africa), ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-gold", children: "Stripe" }),
          " (global), and direct mobile money integrations. All transactions are encrypted, PCI-DSS compliant, and audited in real time. Pricing is always shown in your local currency — no hidden FX markups."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground", children: ["PCI-DSS", "256-bit SSL", "Real-time fraud detection", "Instant receipts", "Multi-currency settlement"].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-sage" }),
          " ",
          badge
        ] }, badge)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Capital access", title: "Funding facilitation fee", subtitle: "Atlas earns when you receive capital — aligned incentives, transparent fees." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border", children: CAPITAL_TABLE.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Funding amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: row.range }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-gold", children: row.fee }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "fee" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: row.example(currency) })
      ] }, row.range)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Verification marketplace" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Pay per trust event. Recurring revenue independent of lending." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: VERIFICATION.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-2 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: v.service }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-gold", children: formatPrice(v.priceUSD, currency) })
        ] }, v.service)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Atlas Reputation Passport" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Exportable trust profile for banks, investors, and employers." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl text-gold", children: formatPrice(2, currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/month" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: ["Exportable trust score", "Reputation history", "Funding credibility profile"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold mt-0.5" }),
            f
          ] }, f)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Institutions", title: "For investors & enterprises", subtitle: "Power your deal flow, underwriting, and impact reporting with the Atlas stack." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "investor", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 max-w-md mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "investor", children: "Investors & Funders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "enterprise", children: "Enterprise" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "investor", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2 max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5 text-gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Investor Pro" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl text-gold", children: formatPrice(99, currency) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/month" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: ["Deal flow", "Portfolio analytics", "Risk scoring", "Impact reports"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold mt-0.5" }),
                f
              ] }, f)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mt-4", variant: "outline", children: "Talk to sales" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/30 border-dashed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Custom syndicates?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Bespoke deal-flow integrations for funds & family offices." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Contact us" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "enterprise", className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground mb-6", children: "For SACCOs, MFIs, NGOs and banks. AI underwriting, verification APIs, fraud detection, treasury analytics, impact reporting." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: ENTERPRISE_TIERS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: e.highlight ? "border-gold/60 shadow-glow" : "", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: e.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: e.target })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl text-gold", children: formatPrice(e.priceUSD, currency) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/month" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mt-4", variant: e.highlight ? "default" : "outline", children: "Request demo" })
            ] })
          ] }, e.name)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-background to-muted/40 border-gold/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold text-gold-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-1", children: "Future" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "Regenerative Value Exchange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-2xl", children: "A 1–2% transaction fee on impact credits, community projects, and outcome-backed assets. Designed to become the largest revenue stream as the Sanctum matures." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold whitespace-nowrap", children: "1–2% txn fee" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "Not sure where to start?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Begin with the free tier. Upgrade when capital, AI advisors, or institutional tools unlock real value." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-gradient-gold text-gold-foreground shadow-glow hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Start free" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/funding", children: "Explore funding" }) })
      ] })
    ] })
  ] });
}
export {
  PricingPage as component
};
