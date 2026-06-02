import type { ModuleDef } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function EnginePage({ module: m }: { module: ModuleDef }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-start justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
            <span className="font-display">{m.glyph}</span>
            <span>Engine</span>
          </div>
          <h1 className="mt-3 font-display text-4xl text-foreground">{m.name}</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{m.tagline}</p>
        </div>
        <div className="hidden h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-gold-foreground shadow-glow md:flex">
          <m.icon className="h-9 w-9" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {m.metrics.map((k) => (
          <Card key={k.label} className="glyph-border p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{k.label}</div>
            <div className="mt-2 font-display text-3xl text-foreground">{k.value}</div>
            {k.delta && <div className="mt-1 text-xs text-sage">{k.delta}</div>}
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="glyph-border p-6 lg:col-span-2">
          <div className="text-xs uppercase tracking-widest text-gold">Purpose</div>
          <p className="mt-3 font-display text-xl leading-relaxed text-foreground">{m.purpose}</p>

          <div className="mt-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Outputs</div>
            <ul className="mt-3 space-y-2">
              {m.outputs.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="glyph-border p-6">
          <div className="text-xs uppercase tracking-widest text-gold">AI Agents</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {m.agents.map((a) => (
              <Badge key={a} variant="outline" className="border-gold/40 bg-secondary/40 text-foreground">
                {a}
              </Badge>
            ))}
          </div>

          <div className="mt-8 rounded-md bg-gradient-moss p-4 text-sm text-foreground/90">
            <div className="font-display text-gold">Status</div>
            <p className="mt-1 text-muted-foreground">
              Agents operating nominally. Continuous decisioning enabled.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
