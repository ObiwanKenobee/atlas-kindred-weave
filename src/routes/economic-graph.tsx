import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const m = SANCTUM_MODULES.find((x) => x.slug === "economic-graph")!;

export const Route = createFileRoute("/economic-graph")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: EconomicGraphPage,
});

type NodeKind = "business" | "investor" | "supplier" | "community" | "partnership";
type Node = {
  id: string;
  kind: NodeKind;
  name: string;
  description: string | null;
  region: string | null;
};
type Edge = {
  id: string;
  source_id: string;
  target_id: string;
  relationship: string;
  weight: number;
};

const KIND_META: Record<NodeKind, { color: string; ring: string; angle: number; label: string }> = {
  business:    { color: "oklch(0.78 0.13 88)", ring: "oklch(0.88 0.14 90)", angle: 0,    label: "Business" },
  investor:    { color: "oklch(0.55 0.10 145)", ring: "oklch(0.70 0.12 145)", angle: 72,   label: "Investor" },
  supplier:    { color: "oklch(0.65 0.09 60)",  ring: "oklch(0.80 0.10 65)",  angle: 144,  label: "Supplier" },
  community:   { color: "oklch(0.60 0.10 200)", ring: "oklch(0.78 0.12 200)", angle: 216,  label: "Community" },
  partnership: { color: "oklch(0.85 0.16 90)",  ring: "oklch(0.95 0.16 90)",  angle: 288,  label: "Partnership" },
};

function EconomicGraphPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: n }, { data: e }] = await Promise.all([
        supabase.from("economic_nodes").select("id,kind,name,description,region"),
        supabase.from("economic_edges").select("id,source_id,target_id,relationship,weight"),
      ]);
      setNodes((n as Node[]) ?? []);
      setEdges((e as Edge[]) ?? []);
      setLoading(false);
    })();
  }, []);

  // Cluster layout: each kind on its own ring spoke, nodes distributed along radial arcs
  const positions = useMemo(() => {
    const W = 900, H = 620, cx = W / 2, cy = H / 2;
    const byKind = new Map<NodeKind, Node[]>();
    nodes.forEach((n) => {
      const arr = byKind.get(n.kind) ?? [];
      arr.push(n);
      byKind.set(n.kind, arr);
    });
    const pos = new Map<string, { x: number; y: number }>();
    for (const [kind, group] of byKind) {
      const meta = KIND_META[kind];
      const baseAngle = (meta.angle * Math.PI) / 180;
      const spread = Math.PI / 3.2; // arc width per cluster
      const r = kind === "partnership" ? 130 : 250;
      group.forEach((n, i) => {
        const t = group.length === 1 ? 0 : (i / (group.length - 1) - 0.5) * spread;
        const a = baseAngle + t;
        pos.set(n.id, { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
      });
    }
    return { pos, W, H };
  }, [nodes]);

  const activeId = hover ?? selected?.id ?? null;
  const isEdgeActive = (e: Edge) => activeId && (e.source_id === activeId || e.target_id === activeId);
  const isNodeActive = (n: Node) =>
    !activeId
      ? true
      : n.id === activeId || edges.some((e) => isEdgeActive(e) && (e.source_id === n.id || e.target_id === n.id));

  const counts = useMemo(() => {
    const c: Record<NodeKind, number> = { business: 0, investor: 0, supplier: 0, community: 0, partnership: 0 };
    nodes.forEach((n) => c[n.kind]++);
    return c;
  }, [nodes]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Engine IX · Economic Graph</div>
        <h1 className="mt-3 font-display text-4xl">Economic Opportunity Map</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Businesses, investors, suppliers, communities, and AI-recommended partnerships — the living
          geometry of opportunity. Hover or tap a node to reveal its relationships.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {(Object.keys(KIND_META) as NodeKind[]).map((k) => (
          <Badge key={k} variant="outline" className="border-border/60">
            <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: KIND_META[k].color }} />
            {KIND_META[k].label} · {counts[k]}
          </Badge>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <Card className="glyph-border overflow-hidden p-2 lg:col-span-3">
          {loading ? (
            <div className="flex h-[620px] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>
          ) : (
            <svg viewBox={`0 0 ${positions.W} ${positions.H}`} className="h-[620px] w-full">
              <defs>
                <radialGradient id="bg" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="oklch(0.30 0.05 155 / 0.45)" />
                  <stop offset="100%" stopColor="oklch(0.18 0.018 155 / 0)" />
                </radialGradient>
              </defs>
              <rect width={positions.W} height={positions.H} fill="url(#bg)" />

              {edges.map((e) => {
                const a = positions.pos.get(e.source_id);
                const b = positions.pos.get(e.target_id);
                if (!a || !b) return null;
                const active = isEdgeActive(e);
                return (
                  <g key={e.id}>
                    <line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={active ? "oklch(0.85 0.16 90)" : "oklch(0.55 0.05 145 / 0.35)"}
                      strokeWidth={active ? 2 + e.weight * 0.5 : 1 + e.weight * 0.2}
                      strokeLinecap="round"
                    />
                    {active && (
                      <text
                        x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 4}
                        textAnchor="middle" fontSize="10"
                        fill="oklch(0.88 0.14 90)" fontFamily="Cinzel, serif"
                        style={{ textTransform: "uppercase", letterSpacing: "0.2em" }}
                      >
                        {e.relationship}
                      </text>
                    )}
                  </g>
                );
              })}

              {nodes.map((n) => {
                const p = positions.pos.get(n.id);
                if (!p) return null;
                const meta = KIND_META[n.kind];
                const active = isNodeActive(n);
                const isFocus = activeId === n.id;
                const r = n.kind === "partnership" ? 14 : 11;
                return (
                  <g
                    key={n.id}
                    transform={`translate(${p.x},${p.y})`}
                    style={{ cursor: "pointer", opacity: active ? 1 : 0.25, transition: "opacity 200ms" }}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelected(n)}
                  >
                    {isFocus && <circle r={r + 8} fill="none" stroke={meta.ring} strokeOpacity={0.5} strokeWidth={1.5} />}
                    <circle r={r} fill={meta.color} stroke={meta.ring} strokeWidth={1.5} />
                    <text
                      y={-r - 6} textAnchor="middle" fontSize="11"
                      fill="oklch(0.94 0.012 95)" fontFamily="Cinzel, serif"
                    >
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </Card>

        <Card className="glyph-border p-5">
          <div className="text-xs uppercase tracking-widest text-gold">Details</div>
          {!selected ? (
            <p className="mt-4 text-sm text-muted-foreground">Select a node to inspect its role, region, and relationships.</p>
          ) : (
            <NodeDetails node={selected} edges={edges} nodes={nodes} />
          )}
        </Card>
      </div>
    </div>
  );
}

function NodeDetails({ node, edges, nodes }: { node: Node; edges: Edge[]; nodes: Node[] }) {
  const meta = KIND_META[node.kind];
  const rels = edges.filter((e) => e.source_id === node.id || e.target_id === node.id);
  const nameOf = (id: string) => nodes.find((n) => n.id === id)?.name ?? "—";
  return (
    <div className="mt-4 space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{meta.label}</span>
        </div>
        <div className="mt-1 font-display text-xl">{node.name}</div>
        {node.region && <div className="text-xs text-muted-foreground">{node.region}</div>}
      </div>
      {node.description && <p className="text-sm text-foreground/90">{node.description}</p>}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-gold">Relationships ({rels.length})</div>
        <ul className="mt-2 space-y-1.5 text-sm">
          {rels.map((e) => {
            const otherId = e.source_id === node.id ? e.target_id : e.source_id;
            const dir = e.source_id === node.id ? "→" : "←";
            return (
              <li key={e.id} className="flex items-center justify-between gap-2 rounded bg-secondary/30 px-2 py-1">
                <span><span className="text-gold">{dir}</span> {nameOf(otherId)}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{e.relationship}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
