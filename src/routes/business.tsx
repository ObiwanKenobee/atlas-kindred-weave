import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import { getMyBusiness, saveBusiness, type Business } from "@/lib/business.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Building2, CheckCircle2, Sparkles } from "lucide-react";
import { seedDemoBusiness } from "@/lib/demo.functions";

import { toast } from "sonner";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Your Business Profile — Atlas Sanctum" },
      {
        name: "description",
        content:
          "Create your business profile so Atlas CFO, the Funding Engine, and the Opportunity Hub can reason about your real operations, evidence, and funding needs.",
      },
      { property: "og:title", content: "Your Business Profile — Atlas Sanctum" },
      {
        property: "og:description",
        content:
          "Create your business profile so Atlas CFO, the Funding Engine, and the Opportunity Hub can reason about your real operations and funding needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BusinessPage,
});

const STAGES = ["idea", "pre-revenue", "early revenue", "growing", "established"];
const REVENUE = ["none", "< 100k / yr", "100k – 1M / yr", "1M – 10M / yr", "> 10M / yr"];

function BusinessPage() {
  const { user, loading } = useAuth();
  const load = useServerFn(getMyBusiness);
  const save = useServerFn(saveBusiness);

  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [b, setB] = useState<Partial<Business>>({ funding_currency: "KES" });

  useEffect(() => {
    if (loading || !user) return;
    load({ data: undefined })
      .then((res) => {
        if (res) setB(res);
      })
      .catch(() => toast.error("Could not load your business profile."))
      .finally(() => setBusy(false));
  }, [user, loading, load]);

  function set<K extends keyof Business>(k: K, v: Business[K]) {
    setB((prev) => ({ ...prev, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!b.name || b.name.trim().length < 2) {
      toast.error("A business name is required.");
      return;
    }
    setSaving(true);
    try {
      const saved = await save({
        data: {
          id: b.id,
          name: b.name.trim(),
          business_type: b.business_type ?? null,
          country: b.country ?? null,
          industry: b.industry ?? null,
          stage: b.stage ?? null,
          team_size: b.team_size ?? null,
          revenue_range: b.revenue_range ?? null,
          primary_objective: b.primary_objective ?? null,
          funding_requirement_minor: b.funding_requirement_minor ?? null,
          funding_currency: b.funding_currency ?? "KES",
          funding_purpose: b.funding_purpose ?? null,
          description: b.description ?? null,
          onboarding_complete: true,
        },
      });
      setB(saved);
      toast.success("Business profile saved. Atlas CFO now reasons with this context.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your business.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || busy) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Your Business Profile</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Sign in to create the business profile that Atlas reasons with.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold/80">
          <Building2 className="h-3.5 w-3.5" /> Onboarding
        </div>
        <h1 className="mt-3 font-display text-4xl">Your Business Profile</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This is the long-term context every Atlas agent reads before answering. Only your account can see
          it. Optional fields can be left blank and completed later.
        </p>
        {b.onboarding_complete && (
          <Badge className="mt-4 gap-1 border-gold/40 bg-gold/10 text-gold">
            <CheckCircle2 className="h-3 w-3" /> Onboarding complete
          </Badge>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-4">
          <Sparkles className="h-4 w-4 text-gold" />
          <p className="flex-1 text-xs text-muted-foreground">
            Want to walk the economic loop first? Load a demo cooperative with financials, an expansion plan,
            and compliance records already in your vault.
          </p>
          <Button type="button" variant="outline" className="border-gold/40" onClick={loadDemo} disabled={seeding}>
            {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load demo business"}
          </Button>
        </div>
      </header>


      <Card className="glyph-border p-6">
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Business name *</span>
            <Input value={b.name ?? ""} onChange={(e) => set("name", e.target.value)} required />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Business type</span>
            <Input
              placeholder="Retail, services, agriculture…"
              value={b.business_type ?? ""}
              onChange={(e) => set("business_type", e.target.value)}
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Industry</span>
            <Input value={b.industry ?? ""} onChange={(e) => set("industry", e.target.value)} />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Country</span>
            <Input value={b.country ?? ""} onChange={(e) => set("country", e.target.value)} />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Stage</span>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={b.stage ?? ""}
              onChange={(e) => set("stage", e.target.value)}
            >
              <option value="">Not specified</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Team size</span>
            <Input
              type="number"
              min={0}
              value={b.team_size ?? ""}
              onChange={(e) => set("team_size", e.target.value === "" ? null : Number(e.target.value))}
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Revenue range</span>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={b.revenue_range ?? ""}
              onChange={(e) => set("revenue_range", e.target.value)}
            >
              <option value="">Not specified</option>
              {REVENUE.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Funding requirement (major units)
            </span>
            <Input
              type="number"
              min={0}
              value={b.funding_requirement_minor != null ? b.funding_requirement_minor / 100 : ""}
              onChange={(e) =>
                set(
                  "funding_requirement_minor",
                  e.target.value === "" ? null : Math.round(Number(e.target.value) * 100),
                )
              }
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Currency</span>
            <Input
              value={b.funding_currency ?? "KES"}
              onChange={(e) => set("funding_currency", e.target.value.toUpperCase())}
            />
          </label>

          <label className="sm:col-span-2 space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Primary objective</span>
            <Input
              placeholder="What are you trying to accomplish in the next 6 months?"
              value={b.primary_objective ?? ""}
              onChange={(e) => set("primary_objective", e.target.value)}
            />
          </label>

          <label className="sm:col-span-2 space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Funding purpose</span>
            <Textarea
              rows={2}
              placeholder="Restock inventory, hire staff, buy equipment…"
              value={b.funding_purpose ?? ""}
              onChange={(e) => set("funding_purpose", e.target.value)}
            />
          </label>

          <label className="sm:col-span-2 space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Business description</span>
            <Textarea
              rows={4}
              value={b.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
            />
          </label>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-gold text-gold-foreground shadow-glow"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save business profile"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
