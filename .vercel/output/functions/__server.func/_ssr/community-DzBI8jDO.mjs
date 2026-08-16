import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { u as useAuth, B as Button } from "./router-Dq4PHNk3.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7IUb7tBK.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { U as Users, i as ShieldCheck, an as MessageSquare, b as Sparkles, az as CircleQuestionMark, T as TrendingUp, af as Trophy, aj as Earth, O as RefreshCw, v as LoaderCircle, ag as Plus, aA as MapPin, aB as Heart } from "../_libs/lucide-react.mjs";
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
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const getCommunityFeed = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("4b664f35cb234d9bf31df7814f41597079a0cd5070a34c813d6bd032861a1fcd"));
const createCommunityPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("6142a0706f7116286937c964079522c3e9b06a18f8d353be57cba5fe165ed4a2"));
const likeCommunityPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("6866875bd38c2a0b4abd2b1d12bbd6901138376265e10c8c77f43a511c9619fb"));
const getCommunityMembers = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("d14ea0ab5270d89c28f65310cc04d093fb5189b1a84003cc41ce42b91c774045"));
const CATEGORY_META = {
  all: {
    label: "All",
    icon: Earth,
    color: "border-border/60 text-muted-foreground"
  },
  milestone: {
    label: "Milestone",
    icon: Trophy,
    color: "border-gold/60 text-gold"
  },
  success: {
    label: "Success",
    icon: TrendingUp,
    color: "border-sage/60 text-sage"
  },
  question: {
    label: "Question",
    icon: CircleQuestionMark,
    color: "border-blue-400/60 text-blue-400"
  },
  opportunity: {
    label: "Opportunity",
    icon: Sparkles,
    color: "border-purple-400/60 text-purple-400"
  },
  update: {
    label: "Update",
    icon: MessageSquare,
    color: "border-border/60 text-muted-foreground"
  }
};
function TrustPip({
  score,
  verified
}) {
  const color = score >= 70 ? "text-sage" : score >= 40 ? "text-gold" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 text-[10px] uppercase tracking-widest ${color}`, children: [
    verified && /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-2.5 w-2.5" }),
    Math.round(score)
  ] });
}
function PostCard({
  post,
  onLike
}) {
  const cat = CATEGORY_META[post.category];
  const Icon = cat.icon;
  const [liked, setLiked] = reactExports.useState(false);
  function handleLike() {
    if (liked) return;
    setLiked(true);
    onLike(post.id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-gold text-[11px] font-bold text-gold-foreground shrink-0", children: (post.author_name ?? "?").charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: post.author_name ?? "Anonymous member" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrustPip, { score: post.author_trust, verified: post.author_verified }),
            post.author_region && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5" }),
              " ",
              post.author_region
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `text-[9px] ${cat.color}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mr-1 h-2.5 w-2.5" }),
          " ",
          cat.label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap", children: new Date(post.created_at).toLocaleDateString() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap", children: post.content }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-1 border-t border-border/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLike, className: `flex items-center gap-1.5 text-xs transition ${liked ? "text-gold" : "text-muted-foreground hover:text-gold"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-3.5 w-3.5 ${liked ? "fill-gold" : ""}` }),
        post.likes + (liked ? 1 : 0)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" }),
        post.replies
      ] })
    ] })
  ] });
}
function MemberCard({
  member
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glyph-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-gold-foreground shrink-0", children: (member.display_name ?? "?").charAt(0).toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm truncate", children: member.display_name ?? "Member" }),
        member.verified && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-sage/60 text-sage text-[9px] px-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mr-0.5 h-2.5 w-2.5" }),
          " Verified"
        ] })
      ] }),
      member.region && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5" }),
        " ",
        member.region
      ] }),
      member.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground line-clamp-2", children: member.bio }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold", children: [
          "Trust ",
          Math.round(member.trust_score)
        ] }),
        member.business_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          member.business_count,
          " deal",
          member.business_count !== 1 ? "s" : ""
        ] }),
        member.capital_accessed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sage", children: [
          "$",
          member.capital_accessed.toLocaleString(),
          " raised"
        ] })
      ] })
    ] })
  ] }) });
}
function PostComposer({
  onPosted
}) {
  const {
    user
  } = useAuth();
  const post = useServerFn(createCommunityPost);
  const [content, setContent] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("update");
  const [busy, setBusy] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  if (!user) return null;
  async function submit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setBusy(true);
    try {
      await post({
        data: {
          content: content.trim(),
          category
        }
      });
      toast.success("Posted to the community.");
      setContent("");
      setOpen(false);
      onPosted();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Post failed.");
    } finally {
      setBusy(false);
    }
  }
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(true), className: "glyph-border w-full rounded-xl p-4 text-left text-sm text-muted-foreground hover:border-gold/60 hover:text-gold transition flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-gold text-[11px] font-bold text-gold-foreground", children: (user.email ?? "?").charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Share a milestone, ask a question, or post an opportunity…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "ml-auto h-4 w-4 shrink-0" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "New post" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: (v) => setCategory(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["milestone", "success", "question", "opportunity", "update"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: CATEGORY_META[c].label }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: "What's on your mind? Share a milestone, ask for help, or post an opportunity…", rows: 4, required: true, minLength: 10, maxLength: 2e3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => setOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "sm", disabled: busy || !content.trim(), className: "bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          " Post"
        ] }) })
      ] })
    ] })
  ] });
}
function CommunityPage() {
  const {
    user
  } = useAuth();
  const fetchFeed = useServerFn(getCommunityFeed);
  const fetchMembers = useServerFn(getCommunityMembers);
  const likePost = useServerFn(likeCommunityPost);
  const [feed, setFeed] = reactExports.useState([]);
  const [members, setMembers] = reactExports.useState([]);
  const [category, setCategory] = reactExports.useState("all");
  const [feedBusy, setFeedBusy] = reactExports.useState(true);
  const [membersBusy, setMembersBusy] = reactExports.useState(true);
  const loadFeed = reactExports.useCallback(async (cat) => {
    setFeedBusy(true);
    try {
      const data = await fetchFeed({
        data: {
          category: cat === "all" ? void 0 : cat,
          limit: 30
        }
      });
      setFeed(data);
    } catch {
      setFeed([]);
    } finally {
      setFeedBusy(false);
    }
  }, [fetchFeed]);
  const loadMembers = reactExports.useCallback(async () => {
    setMembersBusy(true);
    try {
      const data = await fetchMembers({
        data: {
          limit: 12
        }
      });
      setMembers(data);
    } catch {
      setMembers([]);
    } finally {
      setMembersBusy(false);
    }
  }, [fetchMembers]);
  reactExports.useEffect(() => {
    loadFeed(category);
  }, [category, loadFeed]);
  reactExports.useEffect(() => {
    loadMembers();
  }, [loadMembers]);
  reactExports.useEffect(() => {
    const ch = supabase.channel("community-feed").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "community_posts"
    }, () => {
      loadFeed(category);
    }).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [category, loadFeed]);
  async function handleLike(postId) {
    try {
      await likePost({
        data: {
          postId
        }
      });
    } catch {
    }
  }
  const stats = [{
    label: "Members",
    value: members.length.toString(),
    icon: Users
  }, {
    label: "Verified",
    value: members.filter((m) => m.verified).length.toString(),
    icon: ShieldCheck
  }, {
    label: "Posts",
    value: feed.length.toString(),
    icon: MessageSquare
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Sanctum Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "Connect with entrepreneurs, share milestones, ask questions, and build economic relationships across the Sanctum." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Community activity" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-4", children: [
      stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border border-border/40 bg-secondary/20 px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-gold", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-widest", children: s.label })
      ] }, s.label)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center", children: !user && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-glow", children: "Join the community" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PostComposer, { onPosted: () => loadFeed(category) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          Object.keys(CATEGORY_META).map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCategory(cat), className: `flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs uppercase tracking-widest transition ${category === cat ? `${meta.color} bg-secondary/40` : "border-border/40 text-muted-foreground hover:border-gold/40 hover:text-gold"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
              " ",
              meta.label
            ] }, cat);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => loadFeed(category), className: "ml-auto text-muted-foreground hover:text-gold transition", title: "Refresh feed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }) })
        ] }),
        feedBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-7 w-7 animate-spin text-gold" }) }) : feed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "mx-auto h-8 w-8 text-gold/30 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: category === "all" ? "No posts yet. Be the first to share a milestone or ask a question." : `No ${CATEGORY_META[category].label.toLowerCase()} posts yet.` }),
          user && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          }, className: "mt-4 text-xs text-gold hover:underline", children: "Write the first post →" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: feed.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, onLike: handleLike }, post.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
          " Top Members"
        ] }),
        membersBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-gold" }) }) : members.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No members yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCard, { member: m }, m.user_id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Build your reputation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [{
            to: "/verification",
            label: "Submit proof",
            sub: "Earn verified status"
          }, {
            to: "/vault",
            label: "Upload documents",
            sub: "Strengthen your profile"
          }, {
            to: "/funding",
            label: "Apply for capital",
            sub: "Access funding"
          }, {
            to: "/identity",
            label: "Your trust passport",
            sub: "Export your reputation"
          }].map(({
            to,
            label,
            sub
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex items-start gap-2 p-2 rounded hover:bg-secondary/30 transition group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium group-hover:text-gold transition", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: sub })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground group-hover:text-gold transition text-xs", children: "→" })
          ] }, to)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Community Values" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-xs text-muted-foreground", children: ["Support each other's growth", "Share verified milestones", "Ask honest questions", "Respect economic dignity", "Report fraud or abuse"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold shrink-0", children: "·" }),
            " ",
            v
          ] }, v)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CommunityPage as component
};
