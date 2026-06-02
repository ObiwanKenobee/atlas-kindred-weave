import { createFileRoute, Link } from "@tanstack/react-router";
import { SANCTUM_MODULES, ORCHESTRATOR } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Sanctum Overview" },
      { name: "description", content: "Ten engines and an orchestrator AI coordinating capital, trust, and opportunity." },
    ],
  }),
  component: Index,
});

const PRINCIPLES = [
  "Expand Financial Access",
  "Increase Human Prosperity",
  "Strengthen Economic Trust",
  "Improve Capital Allocation",
  "Accelerate Entrepreneurship",
  "Reward Verified Impact",
  "Create Sustainable Growth",
  "Preserve Human Agency",
];

function Index() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl glyph-border p-10 shadow-sanctum">
        <div className="absolute inset-0 bg-gradient-moss opacity-60" aria-hidden />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.4em] text-gold/80">A Regenerative Finance OS</div>
          <h1 className="mt-4 font-display text-5xl leading-tight text-foreground md:text-6xl">
            Atlas <span className="text-gold">Sanctum</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            An AI-operated economic civilization. Capital flows toward measurable outcomes,
            trust is earned through verified action, and every transaction grows the
            intelligence of the whole.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={ORCHESTRATOR.path}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow"
            >
              <Sparkles className="h-4 w-4" />
              Convene the Orchestrator
            </Link>
            <Link
              to="/funding"
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm text-foreground hover:bg-secondary/40"
            >
              Enter the Funding Engine <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mt-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Founding Principles</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <div key={p} className="glyph-border rounded-md px-4 py-3">
              <div className="font-display text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm text-foreground/90">{p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Engines */}
      <section className="mt-14">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold/80">The Ten Engines</div>
            <h2 className="mt-2 font-display text-3xl">An Operating Pantheon</h2>
          </div>
          <Link to={ORCHESTRATOR.path} className="hidden text-sm text-muted-foreground hover:text-gold md:inline">
            Orchestrator →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SANCTUM_MODULES.map((m) => (
            <Link key={m.slug} to={m.path} className="group">
              <Card className="glyph-border h-full p-6 transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/60 text-gold">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-xs text-gold/70">{m.glyph}</span>
                </div>
                <div className="mt-4 font-display text-lg text-foreground">{m.name}</div>
                <p className="mt-2 text-sm text-muted-foreground">{m.tagline}</p>
                <div className="mt-4 flex items-center text-xs text-gold/80 opacity-0 transition-opacity group-hover:opacity-100">
                  Enter <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-border/50 pt-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Built for centuries, not quarters.
      </footer>
    </div>
  );
}
