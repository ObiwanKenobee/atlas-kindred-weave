import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./router-Dq4PHNk3.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function GatedEconomicGraphPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "advanced_analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EconomicGraphPage, {}) });
}
const KIND_META = {
  business: {
    color: "oklch(0.78 0.13 88)",
    ring: "oklch(0.88 0.14 90)",
    angle: 0,
    label: "Business"
  },
  investor: {
    color: "oklch(0.55 0.10 145)",
    ring: "oklch(0.70 0.12 145)",
    angle: 72,
    label: "Investor"
  },
  supplier: {
    color: "oklch(0.65 0.09 60)",
    ring: "oklch(0.80 0.10 65)",
    angle: 144,
    label: "Supplier"
  },
  community: {
    color: "oklch(0.60 0.10 200)",
    ring: "oklch(0.78 0.12 200)",
    angle: 216,
    label: "Community"
  },
  partnership: {
    color: "oklch(0.85 0.16 90)",
    ring: "oklch(0.95 0.16 90)",
    angle: 288,
    label: "Partnership"
  }
};
function EconomicGraphPage() {
  const [nodes, setNodes] = reactExports.useState([]);
  const [edges, setEdges] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [hover, setHover] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  async function load() {
    const [{
      data: n
    }, {
      data: e
    }] = await Promise.all([supabase.from("economic_nodes").select("id,kind,name,description,region").order("created_at", {
      ascending: true
    }), supabase.from("economic_edges").select("id,source_id,target_id,relationship,weight")]);
    setNodes(n ?? []);
    setEdges(e ?? []);
    setLoading(false);
  }
  reactExports.useEffect(() => {
    load();
    const channel = supabase.channel("economic-graph").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "economic_nodes"
    }, () => load()).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "economic_edges"
    }, () => load()).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const positions = reactExports.useMemo(() => {
    const W = 900, H = 620, cx = W / 2, cy = H / 2;
    const byKind = /* @__PURE__ */ new Map();
    nodes.forEach((n) => {
      const arr = byKind.get(n.kind) ?? [];
      arr.push(n);
      byKind.set(n.kind, arr);
    });
    const pos = /* @__PURE__ */ new Map();
    for (const [kind, group] of byKind) {
      const meta = KIND_META[kind];
      const baseAngle = meta.angle * Math.PI / 180;
      const spread = Math.PI / 3.2;
      const r = kind === "partnership" ? 130 : 250;
      group.forEach((n, i) => {
        const t = group.length === 1 ? 0 : (i / (group.length - 1) - 0.5) * spread;
        const a = baseAngle + t;
        pos.set(n.id, {
          x: cx + r * Math.cos(a),
          y: cy + r * Math.sin(a)
        });
      });
    }
    return {
      pos,
      W,
      H
    };
  }, [nodes]);
  const activeId = hover ?? selected?.id ?? null;
  const isEdgeActive = (e) => activeId && (e.source_id === activeId || e.target_id === activeId);
  const isNodeActive = (n) => !activeId ? true : n.id === activeId || edges.some((e) => isEdgeActive(e) && (e.source_id === n.id || e.target_id === n.id));
  const counts = reactExports.useMemo(() => {
    const c = {
      business: 0,
      investor: 0,
      supplier: 0,
      community: 0,
      partnership: 0
    };
    nodes.forEach((n) => c[n.kind]++);
    return c;
  }, [nodes]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Engine IX · Economic Graph" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Economic Opportunity Map" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "A live mirror of the Sanctum's real entities. Verified profiles become business nodes, submitted funding requests become partnerships, and relationships are streamed in as they are recorded. Hover or tap a node to reveal its connections." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] uppercase tracking-widest text-sage", children: "● Live · streaming from your database" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: Object.keys(KIND_META).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 inline-block h-2 w-2 rounded-full", style: {
        background: KIND_META[k].color
      } }),
      KIND_META[k].label,
      " · ",
      counts[k]
    ] }, k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border overflow-hidden p-2 lg:col-span-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[620px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${positions.W} ${positions.H}`, className: "h-[620px] w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "bg", cx: "50%", cy: "50%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.30 0.05 155 / 0.45)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.18 0.018 155 / 0)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: positions.W, height: positions.H, fill: "url(#bg)" }),
        edges.map((e) => {
          const a = positions.pos.get(e.source_id);
          const b = positions.pos.get(e.target_id);
          if (!a || !b) return null;
          const active = isEdgeActive(e);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: active ? "oklch(0.85 0.16 90)" : "oklch(0.55 0.05 145 / 0.35)", strokeWidth: active ? 2 + e.weight * 0.5 : 1 + e.weight * 0.2, strokeLinecap: "round" }),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 4, textAnchor: "middle", fontSize: "10", fill: "oklch(0.88 0.14 90)", fontFamily: "Cinzel, serif", style: {
              textTransform: "uppercase",
              letterSpacing: "0.2em"
            }, children: e.relationship })
          ] }, e.id);
        }),
        nodes.map((n) => {
          const p = positions.pos.get(n.id);
          if (!p) return null;
          const meta = KIND_META[n.kind];
          const active = isNodeActive(n);
          const isFocus = activeId === n.id;
          const r = n.kind === "partnership" ? 14 : 11;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(${p.x},${p.y})`, style: {
            cursor: "pointer",
            opacity: active ? 1 : 0.25,
            transition: "opacity 200ms"
          }, onMouseEnter: () => setHover(n.id), onMouseLeave: () => setHover(null), onClick: () => setSelected(n), children: [
            isFocus && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: r + 8, fill: "none", stroke: meta.ring, strokeOpacity: 0.5, strokeWidth: 1.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r, fill: meta.color, stroke: meta.ring, strokeWidth: 1.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { y: -r - 6, textAnchor: "middle", fontSize: "11", fill: "oklch(0.94 0.012 95)", fontFamily: "Cinzel, serif", children: n.name })
          ] }, n.id);
        })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Details" }),
        !selected ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Select a node to inspect its role, region, and relationships." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(NodeDetails, { node: selected, edges, nodes })
      ] })
    ] })
  ] });
}
function NodeDetails({
  node,
  edges,
  nodes
}) {
  const meta = KIND_META[node.kind];
  const rels = edges.filter((e) => e.source_id === node.id || e.target_id === node.id);
  const nameOf = (id) => nodes.find((n) => n.id === id)?.name ?? "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-2.5 w-2.5 rounded-full", style: {
          background: meta.color
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: meta.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl", children: node.name }),
      node.region && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: node.region })
    ] }),
    node.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: node.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-widest text-gold", children: [
        "Relationships (",
        rels.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5 text-sm", children: rels.map((e) => {
        const otherId = e.source_id === node.id ? e.target_id : e.source_id;
        const dir = e.source_id === node.id ? "→" : "←";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2 rounded bg-secondary/30 px-2 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: dir }),
            " ",
            nameOf(otherId)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: e.relationship })
        ] }, e.id);
      }) })
    ] })
  ] });
}
export {
  GatedEconomicGraphPage as component
};
