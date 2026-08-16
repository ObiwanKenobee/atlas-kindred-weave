import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { u as useAuth, B as Button, d as cn } from "./router-Dq4PHNk3.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { v as LoaderCircle, q as Bell, ad as Mail } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/radix-ui__react-use-previous.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
const DEFAULTS = {
  inapp_submission: true,
  email_submission: true,
  inapp_decision: true,
  email_decision: true,
  inapp_review_needed: true,
  email_review_needed: false
};
function SettingsNotifications() {
  const {
    user
  } = useAuth();
  const [prefs, setPrefs] = reactExports.useState(DEFAULTS);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    supabase.from("notification_preferences").select("*").eq("user_id", user.id).maybeSingle().then(({
      data
    }) => {
      if (data) setPrefs({
        inapp_submission: data.inapp_submission,
        email_submission: data.email_submission,
        inapp_decision: data.inapp_decision,
        email_decision: data.email_decision,
        inapp_review_needed: data.inapp_review_needed,
        email_review_needed: data.email_review_needed
      });
      setLoading(false);
    });
  }, [user]);
  async function save() {
    if (!user) return;
    setSaving(true);
    const {
      error
    } = await supabase.from("notification_preferences").upsert({
      user_id: user.id,
      ...prefs
    }, {
      onConflict: "user_id"
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Preferences saved");
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Notification settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to manage delivery preferences." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  const rows = [{
    key: "submission",
    title: "Funding submitted",
    sub: "When the Council receives your pitch and starts deliberation.",
    inapp: "inapp_submission",
    email: "email_submission"
  }, {
    key: "decision",
    title: "Reviewer decision",
    sub: "When a reviewer approves, declines, or requests revisions.",
    inapp: "inapp_decision",
    email: "email_decision"
  }, {
    key: "review_needed",
    title: "Review queue (reviewers/admins)",
    sub: "When a new request lands awaiting review.",
    inapp: "inapp_review_needed",
    email: "email_review_needed"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Delivery" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Notification settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Choose how the Sanctum reaches you for each event. Email delivery requires email infrastructure to be activated on the workspace." })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading…"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
          " In-app"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
          " Email"
        ] })
      ] }),
      rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto] items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base", children: row.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: row.sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: prefs[row.inapp], onCheckedChange: (v) => setPrefs((p) => ({
          ...p,
          [row.inapp]: v
        })) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: prefs[row.email], onCheckedChange: (v) => setPrefs((p) => ({
          ...p,
          [row.email]: v
        })) })
      ] }) }, row.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: saving, children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        " Saving"
      ] }) : "Save preferences" }) })
    ] })
  ] });
}
export {
  SettingsNotifications as component
};
