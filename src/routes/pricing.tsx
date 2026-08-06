import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import { changeSubscriptionPlan } from "@/lib/subscription.functions";
import { toast } from "sonner";
import {
  Check, Sparkles, Rocket, TrendingUp, Building2, Coins, ShieldCheck,
  Star, Briefcase, Globe2, Smartphone, CreditCard, Banknote, Wifi,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Atlas Sanctum" },
      { name: "description", content: "Transparent pricing for Atlas Sanctum. Pay in KES, NGN, GHS, UGX, ZAR or USD via M-Pesa, Flutterwave, MTN MoMo, Airtel, card, or bank transfer." },
    ],
  }),
  component: PricingPage,
});

// ── Currency config ───────────────────────────────────────────────────────────
type Currency = "USD" | "KES" | "NGN" | "GHS" | "UGX" | "ZAR" | "TZS" | "ETB";

const CURRENCY_META: Record<Currency, { flag: string; label: string; rate: number; symbol: string }> = {
  USD: { flag: "🇺🇸", label: "USD", rate: 1,      symbol: "$"  },
  KES: { flag: "🇰🇪", label: "KES", rate: 129,    symbol: "KES" },
  NGN: { flag: "🇳🇬", label: "NGN", rate: 1580,   symbol: "₦"  },
  GHS: { flag: "🇬🇭", label: "GHS", rate: 15.5,   symbol: "₵"  },
  UGX: { flag: "🇺🇬", label: "UGX", rate: 3760,   symbol: "USh" },
  ZAR: { flag: "🇿🇦", label: "ZAR", rate: 18.5,   symbol: "R"  },
  TZS: { flag: "🇹🇿", label: "TZS", rate: 2600,   symbol: "TSh" },
  ETB: { flag: "🇪🇹", label: "ETB", rate: 55,     symbol: "Br" },
};

function formatPrice(usd: number, currency: Currency): string {
  const { rate, symbol } = CURRENCY_META[currency];
  const val = usd * rate;
  if (val === 0) return `${symbol}0`;
  if (val >= 1000) return `${symbol}${Math.round(val).toLocaleString()}`;
  return `${symbol}${val % 1 === 0 ? val : val.toFixed(0)}`;
}

// ── Payment methods data ───────────────────────────────────────────────────────
type PayMethod = {
  id: string;
  name: string;
  type: "mobile_money" | "card" | "bank" | "crypto" | "ussd";
  regions: string[];
  currencies: Currency[];
  logo: string; // emoji placeholder
  description: string;
  fee: string;
  settle: string;
  popular?: boolean;
};

const PAYMENT_METHODS: PayMethod[] = [
  {
    id: "mpesa",
    name: "M-Pesa",
    type: "mobile_money",
    regions: ["Kenya", "Tanzania", "Ghana", "Mozambique", "Egypt"],
    currencies: ["KES", "TZS", "GHS"],
    logo: "📱",
    description: "Safaricom's mobile money — Kenya's default payment rail.",
    fee: "0% – 1%",
    settle: "Instant",
    popular: true,
  },
  {
    id: "mtn_momo",
    name: "MTN MoMo",
    type: "mobile_money",
    regions: ["Nigeria", "Ghana", "Uganda", "Côte d'Ivoire", "Cameroon", "Rwanda"],
    currencies: ["NGN", "GHS", "UGX"],
    logo: "🟡",
    description: "MTN Mobile Money — 300M+ subscribers across 17 markets.",
    fee: "0.5% – 1.5%",
    settle: "Instant",
    popular: true,
  },
  {
    id: "airtel_money",
    name: "Airtel Money",
    type: "mobile_money",
    regions: ["Uganda", "Kenya", "Tanzania", "Zambia", "Malawi", "Niger"],
    currencies: ["UGX", "KES", "TZS"],
    logo: "🔴",
    description: "Airtel Africa mobile money across 14 markets.",
    fee: "0.5% – 1%",
    settle: "Instant",
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    type: "card",
    regions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "Global"],
    currencies: ["NGN", "GHS", "KES", "ZAR", "USD"],
    logo: "🌊",
    description: "Pan-African payments gateway — cards, bank, mobile money in one API.",
    fee: "1.4% + $0.20",
    settle: "1–2 days",
    popular: true,
  },
  {
    id: "paystack",
    name: "Paystack",
    type: "card",
    regions: ["Nigeria", "Ghana", "South Africa"],
    currencies: ["NGN", "GHS", "ZAR"],
    logo: "💚",
    description: "Stripe-backed gateway dominant in Nigeria and Ghana.",
    fee: "1.5% + ₦100",
    settle: "1 day",
  },
  {
    id: "pesapal",
    name: "PesaPal",
    type: "mobile_money",
    regions: ["Kenya", "Uganda", "Tanzania", "Rwanda", "Zambia"],
    currencies: ["KES", "UGX", "TZS"],
    logo: "🟢",
    description: "East African multi-channel checkout — mobile, card, bank.",
    fee: "2.5%",
    settle: "1–3 days",
  },
  {
    id: "ozow",
    name: "Ozow",
    type: "bank",
    regions: ["South Africa"],
    currencies: ["ZAR"],
    logo: "🟣",
    description: "South Africa instant EFT — no card needed, bank-direct.",
    fee: "0.5%",
    settle: "Instant",
  },
  {
    id: "tigopesa",
    name: "Tigo Pesa",
    type: "mobile_money",
    regions: ["Tanzania", "Ghana", "Rwanda"],
    currencies: ["TZS", "GHS"],
    logo: "🔵",
    description: "Millicom's mobile money strong in Tanzania.",
    fee: "1%",
    settle: "Instant",
  },
  {
    id: "telebirr",
    name: "Telebirr",
    type: "mobile_money",
    regions: ["Ethiopia"],
    currencies: ["ETB"],
    logo: "🇪🇹",
    description: "Ethio Telecom's mobile money — 40M+ users.",
    fee: "1%",
    settle: "Instant",
  },
  {
    id: "stripe",
    name: "Stripe",
    type: "card",
    regions: ["Global"],
    currencies: ["USD"],
    logo: "💳",
    description: "Global card & wallet — Visa, Mastercard, Apple Pay, Google Pay.",
    fee: "2.9% + $0.30",
    settle: "2 days",
    popular: true,
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    type: "bank",
    regions: ["Global"],
    currencies: ["USD", "KES", "NGN", "ZAR"],
    logo: "🏦",
    description: "SWIFT, SEPA, and local bank wires for institutional clients.",
    fee: "Fixed: $15–25",
    settle: "1–5 days",
  },
  {
    id: "ussd",
    name: "USSD *384#",
    type: "ussd",
    regions: ["Nigeria", "Ghana", "Kenya"],
    currencies: ["NGN", "GHS", "KES"],
    logo: "📞",
    description: "No internet required. Works on any mobile phone.",
    fee: "Free",
    settle: "Instant",
  },
];

const TYPE_META: Record<PayMethod["type"], { label: string; icon: React.ElementType; color: string }> = {
  mobile_money: { label: "Mobile Money", icon: Smartphone, color: "text-sage border-sage/60" },
  card:         { label: "Card / Gateway", icon: CreditCard, color: "text-gold border-gold/60" },
  bank:         { label: "Bank Transfer", icon: Banknote, color: "text-muted-foreground border-border" },
  ussd:         { label: "USSD", icon: Wifi, color: "text-gold/70 border-gold/30" },
  crypto:       { label: "Crypto", icon: Coins, color: "text-orange-400 border-orange-400/40" },
};

// ── Tier data ─────────────────────────────────────────────────────────────────
type Tier = {
  slug: string;
  name: string;
  priceUSD: number;
  cadence?: string;
  tagline: string;
  icon: typeof Sparkles;
  highlight?: boolean;
  target: string[];
  features: string[];
  meta?: string;
  cta: string;
};

const TIERS: Tier[] = [
  {
    slug: "free",
    name: "Atlas Free",
    priceUSD: 0,
    cadence: "/month",
    tagline: "Build your economic identity — at zero cost.",
    icon: Sparkles,
    target: ["Students", "Early entrepreneurs", "Informal businesses"],
    features: ["Business profile", "Atlas Trust Score", "Basic AI assessment", "Funding readiness score", "Community access"],
    meta: "10–20% convert to paid",
    cta: "Start free",
  },
  {
    slug: "launch",
    name: "Atlas Launch",
    priceUSD: 5,
    cadence: "/month",
    tagline: "A part-time business coach in your pocket.",
    icon: Rocket,
    target: ["Solo entrepreneurs", "Micro-businesses"],
    features: ["Everything in Free", "AI Business Advisor", "Cashflow insights", "Revenue tracking", "Basic funding eligibility"],
    cta: "Launch for",
  },
  {
    slug: "growth",
    name: "Atlas Growth",
    priceUSD: 15,
    cadence: "/month",
    tagline: "Your AI CFO for the next stage.",
    icon: TrendingUp,
    highlight: true,
    target: ["Growing SMEs — $500–$5,000/mo"],
    features: ["AI CFO", "Funding recommendations", "Forecasting", "Expense analysis", "Inventory insights", "Verification tools"],
    cta: "Choose Growth",
  },
  {
    slug: "scale",
    name: "Atlas Scale",
    priceUSD: 49,
    cadence: "/month",
    tagline: "A full AI executive team.",
    icon: Building2,
    target: ["Businesses at $5,000+/mo"],
    features: ["AI CEO, CFO, Sales Director", "Treasury dashboard", "Team management", "Funding marketplace", "Priority support"],
    cta: "Scale up",
  },
];

const CAPITAL_TABLE = [
  { range: "$100 – $1K", usd: [100, 1000], fee: "5%", example: (c: Currency) => `e.g. ${formatPrice(50, c)} on ${formatPrice(1000, c)}` },
  { range: "$1K – $10K", usd: [1000, 10000], fee: "3%", example: (c: Currency) => `e.g. ${formatPrice(150, c)} on ${formatPrice(5000, c)}` },
  { range: "$10K+",      usd: [10000, Infinity], fee: "2%", example: (c: Currency) => `e.g. ${formatPrice(200, c)} on ${formatPrice(10000, c)}` },
];

const VERIFICATION = [
  { service: "Receipt verification", priceUSD: 0.25 },
  { service: "Inventory verification", priceUSD: 1 },
  { service: "Milestone verification", priceUSD: 2 },
  { service: "Site verification", priceUSD: 5 },
];

const ENTERPRISE_TIERS = [
  { name: "Starter", priceUSD: 500, target: "Pilots & single-product MFIs" },
  { name: "Growth",  priceUSD: 2000, target: "SACCOs & regional NGOs", highlight: true },
  { name: "Enterprise", priceUSD: 10000, target: "Banks & national institutions" },
];

// ── Components ────────────────────────────────────────────────────────────────
function CurrencySelector({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  const [open, setOpen] = useState(false);
  const meta = CURRENCY_META[value];
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-gold/40 bg-card px-3 py-1.5 text-sm hover:border-gold/70"
      >
        <span>{meta.flag}</span>
        <span className="font-medium text-gold">{meta.label}</span>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-md border border-border/60 bg-card shadow-sanctum">
          {(Object.keys(CURRENCY_META) as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => { onChange(c); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/40 ${c === value ? "text-gold" : "text-foreground/80"}`}
            >
              <span>{CURRENCY_META[c].flag}</span>
              <span>{CURRENCY_META[c].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TierCard({ tier, currency }: { tier: Tier; currency: Currency }) {
  const { user } = useAuth();
  const ent = useEntitlements();
  const selectPlan = useServerFn(changeSubscriptionPlan);
  const checkout = useServerFn(startPaystackCheckout);
  const [busy, setBusy] = useState(false);
  const Icon = tier.icon;
  const priceStr = tier.priceUSD === 0 ? `${CURRENCY_META[currency].symbol}0` : formatPrice(tier.priceUSD, currency);
  const isCurrent = user ? ent.plan === tier.slug : false;

  async function handleSelectPlan() {
    if (!user) return;
    setBusy(true);
    try {
      if (tier.priceUSD === 0) {
        await selectPlan({ data: { plan: "free" } });
        toast.success("Moved to Atlas Free.");
        setBusy(false);
        return;
      }
      const res = await checkout({
        data: {
          plan: tier.slug as "launch" | "growth" | "scale",
          callbackUrl: `${window.location.origin}/billing/callback`,
        },
      });
      toast.success("Redirecting to Paystack…");
      window.location.href = res.authorizationUrl;
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not start checkout.");
      setBusy(false);
    }
  }


  return (
    <Card className={`relative flex flex-col ${tier.highlight ? "border-gold/60 shadow-glow" : ""}`}>
      {tier.highlight && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-gold-foreground border-0 shadow-glow">
          Most popular
        </Badge>
      )}
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
            <Icon className="h-4 w-4 text-gold" />
          </div>
          <CardTitle>{tier.name}</CardTitle>
        </div>
        <CardDescription className="min-h-[2.5rem]">{tier.tagline}</CardDescription>
        <div className="flex items-baseline gap-1 pt-2">
          <span className="font-display text-4xl">{priceStr}</span>
          {tier.cadence && <span className="text-muted-foreground text-sm">{tier.cadence}</span>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4">
        <ul className="space-y-2 text-sm flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />{f}</li>
          ))}
        </ul>
        <div className="space-y-1 pt-2 border-t border-border/60">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">For</div>
          <div className="text-xs text-muted-foreground">{tier.target.join(" • ")}</div>
          {tier.meta && <div className="text-[10px] text-gold/70">{tier.meta}</div>}
        </div>
        <Button
          className={tier.highlight ? "bg-gradient-gold text-gold-foreground shadow-glow hover:opacity-90" : ""}
          variant={tier.highlight ? "default" : "outline"}
          disabled={busy}
          onClick={user ? handleSelectPlan : undefined}
          asChild={!user}
        >
          {user ? (
            <span>{busy ? "Updating…" : tier.priceUSD === 0 ? tier.cta : `${tier.cta} ${priceStr}`}</span>
          ) : (
            <Link to={tier.priceUSD === 0 ? "/" : "/login"}>
              {tier.priceUSD === 0 ? tier.cta : `${tier.cta} ${priceStr}`}
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function PaymentMethodCard({ method }: { method: PayMethod }) {
  const meta = TYPE_META[method.type];
  const Icon = meta.icon;
  return (
    <Card className={`glyph-border p-4 ${method.popular ? "border-gold/40" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{method.logo}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm text-foreground">{method.name}</span>
              {method.popular && (
                <Badge className="bg-gradient-gold text-gold-foreground border-0 px-1.5 py-0 text-[9px]">Popular</Badge>
              )}
            </div>
            <div className={`flex items-center gap-1 text-[10px] uppercase tracking-widest mt-0.5 ${meta.color}`}>
              <Icon className="h-2.5 w-2.5" />
              {meta.label}
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-gold font-medium">{method.fee}</div>
          <div className="text-[10px] text-muted-foreground">{method.settle}</div>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{method.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {method.regions.map((r) => (
          <span key={r} className="rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] text-foreground/70">{r}</span>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {method.currencies.map((c) => (
          <span key={c} className="rounded border border-gold/20 px-1.5 py-0.5 text-[10px] text-gold/80">
            {CURRENCY_META[c].flag} {c}
          </span>
        ))}
      </div>
    </Card>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-2 max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-widest text-gold">{eyebrow}</div>
      <h2 className="font-display text-3xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [payTab, setPayTab] = useState<"all" | PayMethod["type"]>("all");

  const filtered = payTab === "all" ? PAYMENT_METHODS : PAYMENT_METHODS.filter((m) => m.type === payTab);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-20">

      {/* Header */}
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-gold/40 text-gold">Pricing</Badge>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight">
          Capital, trust, and intelligence —{" "}
          <span className="bg-gradient-gold bg-clip-text text-transparent">priced for every stage</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Start free. Grow with AI advisors. Unlock capital when ready.
          Pay via M-Pesa, MTN MoMo, Flutterwave, Stripe, or bank transfer — in your local currency.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="text-sm text-muted-foreground">Show prices in</span>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      </header>

      {/* Subscription tiers */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="Subscriptions"
          title="Plans that grow with the business"
          subtitle="Four tiers — from free trust-building to a full AI executive team."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => <TierCard key={t.slug} tier={t} currency={currency} />)}
        </div>
      </section>

      {/* ── African + Global Payment Methods ── */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Payment methods"
          title="African-first. Globally ready."
          subtitle="We meet you where your money is — mobile money, cards, USSD, or bank transfer. No bank account required."
        />

        {/* Type filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {([
            ["all", "All methods"],
            ["mobile_money", "Mobile Money"],
            ["card", "Card / Gateway"],
            ["bank", "Bank Transfer"],
            ["ussd", "USSD"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPayTab(key as typeof payTab)}
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-widest transition ${
                payTab === key
                  ? "border-gold/60 bg-gradient-gold text-gold-foreground shadow-glow"
                  : "border-border/60 text-muted-foreground hover:border-gold/40 hover:text-gold"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => <PaymentMethodCard key={m.id} method={m} />)}
        </div>

        {/* Trust statement */}
        <Card className="glyph-border border-gold/30 p-6 max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-gold mb-3">Payment philosophy</div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Atlas Sanctum processes payments through <strong className="text-gold">Flutterwave</strong> (Africa), <strong className="text-gold">Stripe</strong> (global),
            and direct mobile money integrations. All transactions are encrypted, PCI-DSS compliant, and audited in real time.
            Pricing is always shown in your local currency — no hidden FX markups.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            {["PCI-DSS", "256-bit SSL", "Real-time fraud detection", "Instant receipts", "Multi-currency settlement"].map((badge) => (
              <span key={badge} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-sage" /> {badge}
              </span>
            ))}
          </div>
        </Card>
      </section>

      {/* Capital access fees */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Capital access"
          title="Funding facilitation fee"
          subtitle="Atlas earns when you receive capital — aligned incentives, transparent fees."
        />
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {CAPITAL_TABLE.map((row) => (
              <div key={row.range} className="p-6 space-y-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Funding amount</div>
                <div className="font-display text-xl">{row.range}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gold">{row.fee}</span>
                  <span className="text-sm text-muted-foreground">fee</span>
                </div>
                <div className="text-xs text-muted-foreground">{row.example(currency)}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Verification + Reputation */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <CardTitle>Verification marketplace</CardTitle>
            </div>
            <CardDescription>Pay per trust event. Recurring revenue independent of lending.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {VERIFICATION.map((v) => (
              <div key={v.service} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                <span className="text-sm">{v.service}</span>
                <span className="font-display text-gold">{formatPrice(v.priceUSD, currency)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-gold" />
              <CardTitle>Atlas Reputation Passport</CardTitle>
            </div>
            <CardDescription>Exportable trust profile for banks, investors, and employers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-gold">{formatPrice(2, currency)}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              {["Exportable trust score", "Reputation history", "Funding credibility profile"].map((f) => (
                <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold mt-0.5" />{f}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Investor + Enterprise */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Institutions"
          title="For investors & enterprises"
          subtitle="Power your deal flow, underwriting, and impact reporting with the Atlas stack."
        />
        <Tabs defaultValue="investor" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="investor">Investors & Funders</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>

          <TabsContent value="investor" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gold" />
                    <CardTitle>Investor Pro</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="font-display text-4xl text-gold">{formatPrice(99, currency)}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {["Deal flow", "Portfolio analytics", "Risk scoring", "Impact reports"].map((f) => (
                      <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold mt-0.5" />{f}</li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" variant="outline">Talk to sales</Button>
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-dashed">
                <CardHeader>
                  <CardTitle className="text-base">Custom syndicates?</CardTitle>
                  <CardDescription>Bespoke deal-flow integrations for funds & family offices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Contact us</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="enterprise" className="mt-6">
            <p className="text-center text-sm text-muted-foreground mb-6">
              For SACCOs, MFIs, NGOs and banks. AI underwriting, verification APIs, fraud detection, treasury analytics, impact reporting.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {ENTERPRISE_TIERS.map((e) => (
                <Card key={e.name} className={e.highlight ? "border-gold/60 shadow-glow" : ""}>
                  <CardHeader>
                    <CardTitle>{e.name}</CardTitle>
                    <CardDescription>{e.target}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl text-gold">{formatPrice(e.priceUSD, currency)}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <Button className="w-full mt-4" variant={e.highlight ? "default" : "outline"}>Request demo</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Regenerative future */}
      <section>
        <Card className="bg-gradient-to-br from-background to-muted/40 border-gold/30">
          <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold text-gold-foreground shadow-glow">
              <Globe2 className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-gold mb-1">Future</div>
              <h3 className="font-display text-2xl">Regenerative Value Exchange</h3>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                A 1–2% transaction fee on impact credits, community projects, and outcome-backed assets.
                Designed to become the largest revenue stream as the Sanctum matures.
              </p>
            </div>
            <Badge variant="outline" className="border-gold/40 text-gold whitespace-nowrap">1–2% txn fee</Badge>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h3 className="font-display text-2xl">Not sure where to start?</h3>
        <p className="text-muted-foreground">Begin with the free tier. Upgrade when capital, AI advisors, or institutional tools unlock real value.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg" className="bg-gradient-gold text-gold-foreground shadow-glow hover:opacity-90">
            <Link to="/">Start free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/funding">Explore funding</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
