import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Rocket, TrendingUp, Building2, Coins, ShieldCheck, Star, Briefcase, Globe2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Atlas Sanctum" },
      { name: "description", content: "Transparent pricing for Atlas Sanctum: free profiles, AI advisors for SMEs, capital access, verification marketplace, and enterprise APIs." },
      { property: "og:title", content: "Pricing — Atlas Sanctum" },
      { property: "og:description", content: "From $0 free profiles to enterprise underwriting APIs — pick the tier that grows with you." },
    ],
  }),
  component: PricingPage,
});

type Tier = {
  slug: string;
  name: string;
  price: string;
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
    price: "$0",
    cadence: "/month",
    tagline: "Build your economic identity — at zero cost.",
    icon: Sparkles,
    target: ["Students", "Early entrepreneurs", "Informal businesses"],
    features: [
      "Business profile",
      "Atlas Trust Score",
      "Basic AI business assessment",
      "Funding readiness score",
      "Community access",
    ],
    meta: "10–20% convert to paid",
    cta: "Start free",
  },
  {
    slug: "launch",
    name: "Atlas Launch",
    price: "$5",
    cadence: "/month",
    tagline: "A part-time business coach in your pocket.",
    icon: Rocket,
    target: ["Solo entrepreneurs", "Micro-businesses"],
    features: [
      "Everything in Free",
      "AI Business Advisor",
      "Cashflow insights",
      "Revenue tracking",
      "Basic funding eligibility",
    ],
    cta: "Launch for $5",
  },
  {
    slug: "growth",
    name: "Atlas Growth",
    price: "$15",
    cadence: "/month",
    tagline: "Your AI CFO for the next stage.",
    icon: TrendingUp,
    highlight: true,
    target: ["Growing SMEs generating $500–$5,000/mo"],
    features: [
      "AI CFO",
      "Funding recommendations",
      "Forecasting",
      "Expense analysis",
      "Inventory insights",
      "Verification tools",
    ],
    cta: "Choose Growth",
  },
  {
    slug: "scale",
    name: "Atlas Scale",
    price: "$49",
    cadence: "/month",
    tagline: "A full AI executive team for established SMEs.",
    icon: Building2,
    target: ["Businesses generating $5,000+/mo"],
    features: [
      "AI CEO, CFO, Sales Manager",
      "Treasury dashboard",
      "Team management",
      "Funding marketplace access",
      "Priority support",
    ],
    cta: "Scale up",
  },
];

const CAPITAL_TABLE = [
  { range: "$100 – $1,000", fee: "5%", example: "$50 on $1,000" },
  { range: "$1,000 – $10,000", fee: "3%", example: "$150 on $5,000" },
  { range: "$10,000+", fee: "2%", example: "$200 on $10,000" },
];

const VERIFICATION = [
  { service: "Receipt verification", price: "$0.25" },
  { service: "Inventory verification", price: "$1" },
  { service: "Milestone verification", price: "$2" },
  { service: "Site verification", price: "$5" },
];

const INVESTOR_TIERS = [
  {
    name: "Investor Pro",
    price: "$99",
    icon: Briefcase,
    features: ["Deal flow", "Portfolio analytics", "Risk scoring", "Impact reports"],
  },
];

const ENTERPRISE_TIERS = [
  { name: "Starter", price: "$500", target: "Pilots & single-product MFIs" },
  { name: "Growth", price: "$2,000", target: "SACCOs & regional NGOs", highlight: true },
  { name: "Enterprise", price: "$10,000+", target: "Banks & national institutions" },
];

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-16">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-gold/40 text-gold">Pricing</Badge>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight">
          Capital, trust, and intelligence —{" "}
          <span className="bg-gradient-gold bg-clip-text text-transparent">priced for every stage</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Start free. Grow with AI advisors. Unlock capital when you're ready. Atlas Sanctum scales from the first
          informal hustle to national lenders.
        </p>
      </header>

      {/* Subscription tiers */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Subscriptions"
          title="Plans that grow with the business"
          subtitle="Four tiers — from free trust-building to a full AI executive team."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <TierCard key={t.slug} tier={t} />
          ))}
        </div>
      </section>

      {/* Capital access */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Capital access"
          title="Funding facilitation fee"
          subtitle="Instead of charging high subscriptions, Atlas earns when you receive capital. Aligned incentives, transparent fees."
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
                <div className="text-xs text-muted-foreground">e.g. {row.example}</div>
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
                <span className="font-display text-gold">{v.price}</span>
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
            <CardDescription>An exportable trust profile for banks, investors, and employers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-gold">$2</span>
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

      {/* Investor / Enterprise tabs */}
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
              {INVESTOR_TIERS.map((i) => (
                <Card key={i.name}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <i.icon className="h-5 w-5 text-gold" />
                      <CardTitle>{i.name}</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="font-display text-4xl text-gold">{i.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {i.features.map((f) => (
                        <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold mt-0.5" />{f}</li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">Talk to sales</Button>
                  </CardContent>
                </Card>
              ))}
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
            <p className="text-center text-sm text-muted-foreground mb-4">
              For SACCOs, MFIs, NGOs and banks. Includes AI underwriting, verification APIs, fraud detection, treasury
              analytics, and impact reporting.
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
                      <span className="font-display text-4xl text-gold">{e.price}</span>
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
                A 1–2% transaction fee on impact credits, community projects, and outcome-backed assets. Designed to
                eventually become the largest revenue stream as the Sanctum matures.
              </p>
            </div>
            <Badge variant="outline" className="border-gold/40 text-gold whitespace-nowrap">1–2% txn fee</Badge>
          </CardContent>
        </Card>
      </section>

      {/* FAQ / CTA */}
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

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-2 max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-widest text-gold">{eyebrow}</div>
      <h2 className="font-display text-3xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const Icon = tier.icon;
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
          <span className="font-display text-4xl">{tier.price}</span>
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
        >
          {tier.cta}
        </Button>
      </CardContent>
    </Card>
  );
}
