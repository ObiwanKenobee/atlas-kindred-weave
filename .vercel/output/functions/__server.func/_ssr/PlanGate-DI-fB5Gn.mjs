import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { b as useEntitlements, B as Button } from "./router-Dq4PHNk3.mjs";
import { F as FEATURE_LABELS } from "./entitlements-DDmJ5IMx.mjs";
import { L as Lock, b as Sparkles } from "../_libs/lucide-react.mjs";
function PlanGate({
  feature,
  children,
  compact = false
}) {
  const ent = useEntitlements();
  if (ent.can(feature)) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  const needed = ent.requiredPlanLabel(feature);
  const label = FEATURE_LABELS[feature];
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-md border border-gold/30 bg-gold/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          label,
          " needs ",
          needed
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "Upgrade" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border border-gold/30 bg-gold/5 p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mx-auto h-8 w-8 text-gold" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-2xl", children: [
      label,
      " is locked"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground", children: ent.billingOk ? `This capability opens on ${needed} and above. You are currently on ${ent.planLabel}.` : `Your subscription is ${ent.status}. Restore billing to regain access.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }),
        "See plans"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subscription", children: "Manage subscription" }) })
    ] })
  ] });
}
export {
  PlanGate as P
};
