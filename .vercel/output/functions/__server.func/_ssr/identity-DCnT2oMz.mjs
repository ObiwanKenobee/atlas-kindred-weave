import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, h as m$4, B as Button } from "./router-m_YzkqUE.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as computeRiskScore } from "./risk.functions-B0Bx-er9.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { C as Card } from "./card-Bc3CpL3p.mjs";
import { B as Badge } from "./badge-9pJdm6_1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { at as Download, v as LoaderCircle, b as Sparkles, i as ShieldCheck, w as ShieldAlert, l as TriangleAlert, a as BadgeCheck, F as FileText, U as Users, T as TrendingUp } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./entitlements-DDmJ5IMx.mjs";
import "./observability.server-D5WP9btl.mjs";
import "./server-BWHKBO2n.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/isbot.mjs";
import "./auth-middleware-16OviFoD.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
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
function TrustGauge({
  score
}) {
  const r = 54, cx = 70, cy = 70;
  const circumference = Math.PI * r;
  const offset = circumference - score / 100 * circumference;
  const color = score >= 70 ? "text-sage" : score >= 40 ? "text-gold" : "text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "140", height: "84", viewBox: "0 0 140 84", className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`, fill: "none", stroke: "currentColor", strokeWidth: "10", className: "text-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`, fill: "none", stroke: "currentColor", strokeWidth: "10", strokeDasharray: circumference, strokeDashoffset: offset, strokeLinecap: "round", className: color, style: {
      transition: "stroke-dashoffset 1s ease"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: cx, y: cy - 2, textAnchor: "middle", className: "fill-foreground", fontSize: "24", fontWeight: "bold", children: Math.round(score) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: cx, y: cy + 16, textAnchor: "middle", className: "fill-muted-foreground", fontSize: "11", children: "/ 100" })
  ] });
}
function FundingReadiness({
  score
}) {
  const level = score >= 75 ? "High" : score >= 50 ? "Medium" : score >= 25 ? "Low" : "Building";
  const color = score >= 75 ? "text-sage border-sage/60" : score >= 50 ? "text-gold border-gold/60" : "text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${color}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
    "Funding Readiness: ",
    level
  ] });
}
function exportPassport(profile, risk, events, funding) {
  const lines = ["=== ATLAS REPUTATION PASSPORT ===", `Generated: ${(/* @__PURE__ */ new Date()).toISOString()}`, "", "IDENTITY", `Name: ${profile?.display_name ?? "—"}`, `Region: ${profile?.region ?? "—"}`, `Verified: ${profile?.verified ? "Yes" : "No"}`, "", "TRUST SCORE", `Score: ${profile?.trust_score ?? 0} / 100`, `Risk Level: ${risk?.risk_level?.replace("_", " ") ?? "Unknown"}`, `Funding Readiness: ${(profile?.trust_score ?? 0) >= 75 ? "High" : (profile?.trust_score ?? 0) >= 50 ? "Medium" : "Low"}`, "", "VERIFICATION HISTORY", ...events.map((e) => `  [${e.status.toUpperCase()}] ${e.kind} — ${new Date(e.created_at).toLocaleDateString()}`), "", "FUNDING HISTORY", ...funding.map((f) => `  [${f.human_approval.toUpperCase()}] ${f.title} — ${f.amount_requested} ${f.currency}`), "", risk ? ["AI RATIONALE", risk.rationale].join("\n") : "", "", "=== END OF PASSPORT ===", "This document is issued by Atlas Sanctum and represents verifiable trust signals."];
  const blob = new Blob([lines.join("\n")], {
    type: "text/plain"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `atlas-passport-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
function IdentityPage() {
  const {
    user,
    profile
  } = useAuth();
  const scoreRisk = useServerFn(computeRiskScore);
  const [events, setEvents] = reactExports.useState([]);
  const [funding, setFunding] = reactExports.useState([]);
  const [risk, setRisk] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [loadingData, setLoadingData] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!user) {
      setLoadingData(false);
      return;
    }
    Promise.all([supabase.from("verification_events").select("id,kind,status,notes,created_at").eq("user_id", user.id).order("created_at", {
      ascending: false
    }).limit(20), supabase.from("funding_requests").select("id,title,amount_requested,currency,sector,human_approval,created_at").eq("user_id", user.id).order("created_at", {
      ascending: false
    }).limit(10), supabase.from("risk_scores").select("trust_score,risk_level,recommendation,rationale,flags,signals").eq("user_id", user.id).order("computed_at", {
      ascending: false
    }).limit(1).maybeSingle()]).then(([{
      data: ev
    }, {
      data: fr
    }, {
      data: rs
    }]) => {
      setEvents(ev ?? []);
      setFunding(fr ?? []);
      if (rs) setRisk(rs);
      setLoadingData(false);
    });
  }, [user]);
  async function runRisk() {
    if (!user) return;
    setBusy(true);
    try {
      const res = await scoreRisk({
        data: {}
      });
      setRisk(res);
      toast.success("Trust score recomputed.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to compute score.");
    } finally {
      setBusy(false);
    }
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Identity & Trust" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to view your Atlas Trust Passport." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  const trust = profile?.trust_score ?? 0;
  const verified = events.filter((e) => e.status === "verified").length;
  const approvedFunding = funding.filter((f) => f.human_approval === "approved");
  const totalFunded = approvedFunding.reduce((s, f) => s + f.amount_requested, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: m$4.glyph }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$4.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$4.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => exportPassport(profile, risk, events, funding), className: "border-gold/40 text-gold hover:bg-secondary/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Export Passport"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: runRisk, disabled: busy, className: "bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-1.5" }),
          " Recompute"
        ] }) })
      ] })
    ] }),
    loadingData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Atlas Trust Passport" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Atlas Reputation Passport" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrustGauge, { score: trust }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Trust Score" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: profile?.display_name ?? user.email }),
              profile?.region && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: profile.region })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              profile?.verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-sage/60 text-sage", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mr-1 h-3 w-3" }),
                " Verified"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/60 text-gold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mr-1 h-3 w-3" }),
                " Probationary"
              ] }),
              risk && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: risk.risk_level === "low" || risk.risk_level === "very_low" ? "border-sage/60 text-sage" : risk.risk_level === "medium" ? "border-gold/60 text-gold" : "border-destructive/60 text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-1 h-3 w-3" }),
                "Risk: ",
                risk.risk_level.replace("_", " ")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FundingReadiness, { score: trust }),
            risk && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-relaxed max-w-lg", children: risk.rationale })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Trust Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 font-display text-3xl ${trust >= 70 ? "text-sage" : trust >= 40 ? "text-gold" : "text-destructive"}`, children: Math.round(trust) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "/ 100" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Verified Proofs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl text-sage", children: verified }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "of ",
            events.length,
            " total"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Capital Approved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-display text-3xl text-gold", children: [
            "$",
            totalFunded.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            approvedFunding.length,
            " deals"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Risk Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl", children: risk ? risk.risk_level.replace("_", " ") : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "AI assessment" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Risk signals" }),
      risk && risk.signals && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Behavioral Signals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6", children: [{
          label: "Verified proofs",
          value: risk.signals?.verified_events ?? "—"
        }, {
          label: "Rejected proofs",
          value: risk.signals?.rejected_events ?? "—"
        }, {
          label: "Funding requests",
          value: risk.signals?.funding_requests_count ?? "—"
        }, {
          label: "Approvals",
          value: risk.signals?.approvals_count ?? "—"
        }, {
          label: "Capital approved",
          value: `$${(risk.signals?.total_funded ?? 0).toLocaleString()}`
        }, {
          label: "Approval rate",
          value: `${((risk.signals?.repayment_rate ?? 0) * 100).toFixed(0)}%`
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl", children: s.value })
        ] }, s.label)) })
      ] }),
      risk && risk.flags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-2 inline h-3.5 w-3.5" }),
          "Active Flags"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: risk.flags.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-foreground/80", children: f }, f)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Verification history" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5" }),
            " Verification History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/verification", className: "text-xs text-gold/80 hover:text-gold", children: "Submit new proof →" })
        ] }),
        events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No verification events yet. Submit proof to build your trust score." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border flex items-center justify-between p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm capitalize", children: e.kind.replace("_", " ") }),
            e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground line-clamp-1", children: (() => {
              try {
                return JSON.parse(e.notes).summary ?? e.notes;
              } catch {
                return e.notes;
              }
            })() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: new Date(e.created_at).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: e.status === "verified" ? "border-sage/60 text-sage" : e.status === "rejected" ? "border-destructive/60 text-destructive" : "border-gold/60 text-gold", children: e.status })
        ] }, e.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Funding history" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
            " Funding History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/funding", className: "text-xs text-gold/80 hover:text-gold", children: "Submit request →" })
        ] }),
        funding.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No funding requests yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: funding.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border flex items-center justify-between p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              f.amount_requested.toLocaleString(),
              " ",
              f.currency,
              f.sector ? ` · ${f.sector}` : "",
              " · ",
              new Date(f.created_at).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: f.human_approval === "approved" ? "border-sage/60 text-sage" : f.human_approval === "declined" ? "border-destructive/60 text-destructive" : "border-gold/60 text-gold", children: f.human_approval })
        ] }, f.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border border-gold/20 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-gold shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: "Reputation Passport" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: 'Your Atlas Trust Score, verification history, and funding record are exportable for use with banks, investors, and employers. Click "Export Passport" above to download a signed plaintext report.' })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  IdentityPage as component
};
