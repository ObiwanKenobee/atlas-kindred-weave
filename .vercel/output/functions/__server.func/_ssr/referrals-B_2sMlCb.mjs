import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, B as Button, I as Input } from "./router-Dq4PHNk3.mjs";
import { getMyReferralOverview, getReferralLeaderboard, generateInviteMessage } from "./referrals.functions-BJpvHj3w.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-qT-IED0v.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { e as Gift, v as LoaderCircle, W as ArrowUpRight, U as Users, b as Sparkles, a9 as Link2, aa as Copy, ab as Share2, ac as Send, ad as Mail, ae as MessageCircle, af as Trophy } from "../_libs/lucide-react.mjs";
import { f as formatDistanceToNow } from "../_libs/date-fns.mjs";
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
import "./client-ChmNSUU0.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
function ReferralsPage() {
  const {
    user
  } = useAuth();
  const [overview, setOverview] = reactExports.useState(null);
  const [leaderboard, setLeaderboard] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [channel, setChannel] = reactExports.useState("email");
  const [message, setMessage] = reactExports.useState("");
  const [busyMsg, setBusyMsg] = reactExports.useState(false);
  const fetchOverview = useServerFn(getMyReferralOverview);
  const fetchLeaderboard = useServerFn(getReferralLeaderboard);
  const genMessage = useServerFn(generateInviteMessage);
  const shareUrl = reactExports.useMemo(() => {
    if (typeof window === "undefined" || !overview?.code) return "";
    return `${window.location.origin}/?ref=${overview.code}`;
  }, [overview?.code]);
  const load = reactExports.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [ov, lb] = await Promise.all([fetchOverview({
        data: {}
      }), fetchLeaderboard({
        data: {
          limit: 10
        }
      })]);
      setOverview(ov);
      setLeaderboard(lb);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load referrals");
    } finally {
      setLoading(false);
    }
  }, [user, fetchOverview, fetchLeaderboard]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  reactExports.useEffect(() => {
    if (!shareUrl) return;
    setBusyMsg(true);
    genMessage({
      data: {
        channel,
        shareUrl
      }
    }).then((r) => setMessage(r.message)).catch(() => setMessage("")).finally(() => setBusyMsg(false));
  }, [channel, shareUrl, genMessage]);
  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Copy failed");
    }
  };
  const nativeShare = async () => {
    if (typeof navigator === "undefined" || !navigator.share) {
      copy(shareUrl, "Link");
      return;
    }
    try {
      await navigator.share({
        title: "Atlas Sanctum",
        text: "Join me on Atlas Sanctum — an AI-run regenerative finance OS.",
        url: shareUrl
      });
    } catch {
    }
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "mx-auto h-10 w-10 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-3xl", children: "Referrals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to get your personal invite link and start earning rewards." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow", children: "Enter" })
    ] });
  }
  if (loading || !overview) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-16 flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading referrals…"
    ] });
  }
  const mailtoHref = `mailto:?subject=${encodeURIComponent("Join me on Atlas Sanctum")}&body=${encodeURIComponent(message || shareUrl)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message || shareUrl)}`;
  const smsHref = `sms:?body=${encodeURIComponent(message || shareUrl)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Growth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Referrals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Invite entrepreneurs into the Sanctum. Earn credits for every signup." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/growth", children: [
        "Growth agent",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-1 h-3.5 w-3.5" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Referral performance" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
          " Invited"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: overview.totals.invitedCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " Signups"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl", children: overview.totals.signedUpCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3 w-3" }),
          " Rewards earned"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-display text-3xl", children: [
          "$",
          (overview.totals.rewardCents / 100).toFixed(2)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Your invite link" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border mt-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-3 w-3" }),
        " Your invite link"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { readOnly: true, value: shareUrl, className: "flex-1 min-w-[260px] font-mono text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: () => copy(shareUrl, "Link"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-2 h-3.5 w-3.5" }),
          " Copy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: nativeShare, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "mr-2 h-3.5 w-3.5" }),
          " Share"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
        "Your code:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/60 text-gold font-mono tracking-widest", children: overview.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grants $5 in Sanctum credits per successful signup." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border mt-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3 w-3" }),
        " Compose invite"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: channel, onValueChange: (v) => setChannel(v), className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "email", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-1.5 h-3.5 w-3.5" }),
            "Email"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "whatsapp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-1.5 h-3.5 w-3.5" }),
            "WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "sms", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-1.5 h-3.5 w-3.5" }),
            "SMS"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: channel, className: "mt-3 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: busyMsg ? "Generating…" : message, onChange: (e) => setMessage(e.target.value), rows: channel === "sms" ? 3 : 8, className: "w-full rounded-md border border-border/60 bg-background/50 p-3 text-sm font-mono" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: () => copy(message, "Message"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-2 h-3.5 w-3.5" }),
              " Copy message"
            ] }),
            channel === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: mailtoHref, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-2 h-3.5 w-3.5" }),
              "Open email"
            ] }) }),
            channel === "whatsapp" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-3.5 w-3.5" }),
              "Open WhatsApp"
            ] }) }),
            channel === "sms" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: smsHref, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-3.5 w-3.5" }),
              "Open SMS"
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold/80", children: "Recent referrals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border mt-3", children: overview.recentReferrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No referrals yet. Share your link to get started." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children: overview.recentReferrals.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              formatDistanceToNow(new Date(r.createdAt), {
                addSuffix: true
              }),
              " · ",
              r.status.replace(/_/g, " ")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sage border-sage/60", children: [
            "+$",
            (r.rewardCents / 100).toFixed(2)
          ] })
        ] }, r.id)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-gold/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3 w-3" }),
          " Top referrers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border mt-3", children: leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No leaderboard data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children: leaderboard.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-7 w-7 place-items-center rounded-full font-display text-xs ${row.rank <= 3 ? "bg-gradient-gold text-gold-foreground" : "bg-secondary text-muted-foreground"}`, children: row.rank }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
                row.displayName,
                row.userId === user.id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-gold", children: "(you)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                row.region ?? "—",
                row.trustScore != null ? ` · Trust ${row.trustScore}` : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm", children: row.referrals }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "$",
              (row.rewardCents / 100).toFixed(0)
            ] })
          ] })
        ] }, row.userId)) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold/80", children: "Rewards ledger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border mt-3", children: overview.recentRewards.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No rewards yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children: overview.recentRewards.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium capitalize", children: r.kind.replace(/_/g, " ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            r.note ?? "—",
            " · ",
            new Date(r.createdAt).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg", children: [
          "+$",
          (r.amountCents / 100).toFixed(2),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.currency })
        ] })
      ] }, r.id)) }) })
    ] })
  ] });
}
export {
  ReferralsPage as component
};
