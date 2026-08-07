import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getCommunityFeed,
  createCommunityPost,
  likeCommunityPost,
  getCommunityMembers,
  type CommunityPost,
  type CommunityMember,
} from "@/lib/community.functions";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Heart, MessageSquare, ShieldCheck, Users, MapPin, Loader2,
  Plus, Sparkles, TrendingUp, Trophy, HelpCircle, Globe2, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Atlas Sanctum" },
      { name: "description", content: "Connect with entrepreneurs, share milestones, ask questions, and discover opportunities across the Sanctum community." },
      { property: "og:title", content: "Community — Atlas Sanctum" },
      { property: "og:description", content: "Connect with entrepreneurs, share milestones, ask questions, and discover opportunities across the Sanctum community." },
    ],
  }),
  component: CommunityPage,
});

type Category = CommunityPost["category"] | "all";

const CATEGORY_META: Record<Category, { label: string; icon: typeof Sparkles; color: string }> = {
  all:         { label: "All",         icon: Globe2,        color: "border-border/60 text-muted-foreground" },
  milestone:   { label: "Milestone",   icon: Trophy,        color: "border-gold/60 text-gold" },
  success:     { label: "Success",     icon: TrendingUp,    color: "border-sage/60 text-sage" },
  question:    { label: "Question",    icon: HelpCircle,    color: "border-blue-400/60 text-blue-400" },
  opportunity: { label: "Opportunity", icon: Sparkles,      color: "border-purple-400/60 text-purple-400" },
  update:      { label: "Update",      icon: MessageSquare, color: "border-border/60 text-muted-foreground" },
};

function TrustPip({ score, verified }: { score: number; verified: boolean }) {
  const color = score >= 70 ? "text-sage" : score >= 40 ? "text-gold" : "text-muted-foreground";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest ${color}`}>
      {verified && <ShieldCheck className="h-2.5 w-2.5" />}
      {Math.round(score)}
    </span>
  );
}

function PostCard({ post, onLike }: { post: CommunityPost; onLike: (id: string) => void }) {
  const cat = CATEGORY_META[post.category];
  const Icon = cat.icon;
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) return;
    setLiked(true);
    onLike(post.id);
  }

  return (
    <Card className="glyph-border p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-gold text-[11px] font-bold text-gold-foreground shrink-0">
            {(post.author_name ?? "?").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">
              {post.author_name ?? "Anonymous member"}
            </div>
            <div className="flex items-center gap-2">
              <TrustPip score={post.author_trust} verified={post.author_verified} />
              {post.author_region && (
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <MapPin className="h-2.5 w-2.5" /> {post.author_region}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="outline" className={`text-[9px] ${cat.color}`}>
            <Icon className="mr-1 h-2.5 w-2.5" /> {cat.label}
          </Badge>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{post.content}</p>

      <div className="flex items-center gap-4 pt-1 border-t border-border/30">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs transition ${liked ? "text-gold" : "text-muted-foreground hover:text-gold"}`}
        >
          <Heart className={`h-3.5 w-3.5 ${liked ? "fill-gold" : ""}`} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MessageSquare className="h-3.5 w-3.5" />
          {post.replies}
        </div>
      </div>
    </Card>
  );
}

function MemberCard({ member }: { member: CommunityMember }) {
  return (
    <Card className="glyph-border p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-gold-foreground shrink-0">
          {(member.display_name ?? "?").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-sm truncate">
              {member.display_name ?? "Member"}
            </span>
            {member.verified && (
              <Badge variant="outline" className="border-sage/60 text-sage text-[9px] px-1.5">
                <ShieldCheck className="mr-0.5 h-2.5 w-2.5" /> Verified
              </Badge>
            )}
          </div>
          {member.region && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
              <MapPin className="h-2.5 w-2.5" /> {member.region}
            </div>
          )}
          {member.bio && (
            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
            <span className="text-gold">Trust {Math.round(member.trust_score)}</span>
            {member.business_count > 0 && (
              <span className="text-muted-foreground">{member.business_count} deal{member.business_count !== 1 ? "s" : ""}</span>
            )}
            {member.capital_accessed > 0 && (
              <span className="text-sage">${member.capital_accessed.toLocaleString()} raised</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function PostComposer({ onPosted }: { onPosted: () => void }) {
  const { user } = useAuth();
  const post = useServerFn(createCommunityPost);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CommunityPost["category"]>("update");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  if (!user) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setBusy(true);
    try {
      await post({ data: { content: content.trim(), category } });
      toast.success("Posted to the community.");
      setContent("");
      setOpen(false);
      onPosted();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Post failed.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="glyph-border w-full rounded-xl p-4 text-left text-sm text-muted-foreground hover:border-gold/60 hover:text-gold transition flex items-center gap-3"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-gold text-[11px] font-bold text-gold-foreground">
          {(user.email ?? "?").charAt(0).toUpperCase()}
        </div>
        <span>Share a milestone, ask a question, or post an opportunity…</span>
        <Plus className="ml-auto h-4 w-4 shrink-0" />
      </button>
    );
  }

  return (
    <Card className="glyph-border p-5">
      <div className="text-xs uppercase tracking-widest text-gold mb-3">New post</div>
      <form onSubmit={submit} className="space-y-3">
        <Select value={category} onValueChange={(v) => setCategory(v as CommunityPost["category"])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(["milestone", "success", "question", "opportunity", "update"] as const).map((c) => (
              <SelectItem key={c} value={c}>{CATEGORY_META[c].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Share a milestone, ask for help, or post an opportunity…"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
        />
        <div className="flex items-center gap-2 justify-end">
          <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={busy || !content.trim()}
            className="bg-gradient-gold text-gold-foreground shadow-glow"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Post</>}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function CommunityPage() {
  const { user } = useAuth();
  const fetchFeed = useServerFn(getCommunityFeed);
  const fetchMembers = useServerFn(getCommunityMembers);
  const likePost = useServerFn(likeCommunityPost);

  const [feed, setFeed] = useState<CommunityPost[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [category, setCategory] = useState<Category>("all");
  const [feedBusy, setFeedBusy] = useState(true);
  const [membersBusy, setMembersBusy] = useState(true);

  const loadFeed = useCallback(async (cat: Category) => {
    setFeedBusy(true);
    try {
      const data = await fetchFeed({
        data: { category: cat === "all" ? undefined : cat, limit: 30 },
      });
      setFeed(data);
    } catch {
      // table may not exist yet — show empty state gracefully
      setFeed([]);
    } finally {
      setFeedBusy(false);
    }
  }, [fetchFeed]);

  const loadMembers = useCallback(async () => {
    setMembersBusy(true);
    try {
      const data = await fetchMembers({ data: { limit: 12 } });
      setMembers(data);
    } catch {
      setMembers([]);
    } finally {
      setMembersBusy(false);
    }
  }, [fetchMembers]);

  useEffect(() => { loadFeed(category); }, [category, loadFeed]);
  useEffect(() => { loadMembers(); }, [loadMembers]);

  // Real-time feed via Supabase channel
  useEffect(() => {
    const ch = supabase
      .channel("community-feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "community_posts" }, () => {
        loadFeed(category);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [category, loadFeed]);

  async function handleLike(postId: string) {
    try {
      await likePost({ data: { postId } });
    } catch {
      // best-effort
    }
  }

  const stats = [
    { label: "Members", value: members.length.toString(), icon: Users },
    { label: "Verified", value: members.filter((m) => m.verified).length.toString(), icon: ShieldCheck },
    { label: "Posts", value: feed.length.toString(), icon: MessageSquare },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Sanctum Community</div>
        <h1 className="mt-3 font-display text-4xl">Community</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Connect with entrepreneurs, share milestones, ask questions, and build economic relationships across the Sanctum.
        </p>
      </div>

      {/* Stats row */}
      <h2 className="sr-only">Community activity</h2>
      <div className="mt-6 flex flex-wrap gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-md border border-border/40 bg-secondary/20 px-3 py-2 text-sm">
            <s.icon className="h-4 w-4 text-gold" />
            <span className="font-display text-gold">{s.value}</span>
            <span className="text-muted-foreground text-xs uppercase tracking-widest">{s.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center">
          {!user && (
            <Link
              to="/login"
              className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-glow"
            >
              Join the community
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Feed column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Composer */}
          <PostComposer onPosted={() => loadFeed(category)} />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
              const meta = CATEGORY_META[cat];
              const Icon = meta.icon;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs uppercase tracking-widest transition ${
                    category === cat
                      ? `${meta.color} bg-secondary/40`
                      : "border-border/40 text-muted-foreground hover:border-gold/40 hover:text-gold"
                  }`}
                >
                  <Icon className="h-3 w-3" /> {meta.label}
                </button>
              );
            })}
            <button
              onClick={() => loadFeed(category)}
              className="ml-auto text-muted-foreground hover:text-gold transition"
              title="Refresh feed"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Feed */}
          {feedBusy ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-gold" />
            </div>
          ) : feed.length === 0 ? (
            <Card className="glyph-border p-10 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-gold/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                {category === "all"
                  ? "No posts yet. Be the first to share a milestone or ask a question."
                  : `No ${CATEGORY_META[category].label.toLowerCase()} posts yet.`}
              </p>
              {user && (
                <button
                  onClick={() => {}}
                  className="mt-4 text-xs text-gold hover:underline"
                >
                  Write the first post →
                </button>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {feed.map((post) => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
              ))}
            </div>
          )}
        </div>

        {/* Members sidebar */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-gold flex items-center gap-2">
            <Users className="h-3.5 w-3.5" /> Top Members
          </div>

          {membersBusy ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-sm text-muted-foreground">No members yet.</p>
          ) : (
            <div className="space-y-3">
              {members.map((m) => (
                <MemberCard key={m.user_id} member={m} />
              ))}
            </div>
          )}

          {/* Quick links */}
          <Card className="glyph-border p-4 mt-4">
            <div className="text-xs uppercase tracking-widest text-gold mb-3">Build your reputation</div>
            <div className="space-y-2">
              {[
                { to: "/verification", label: "Submit proof", sub: "Earn verified status" },
                { to: "/vault", label: "Upload documents", sub: "Strengthen your profile" },
                { to: "/funding", label: "Apply for capital", sub: "Access funding" },
                { to: "/identity", label: "Your trust passport", sub: "Export your reputation" },
              ].map(({ to, label, sub }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-start gap-2 p-2 rounded hover:bg-secondary/30 transition group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium group-hover:text-gold transition">{label}</div>
                    <div className="text-[10px] text-muted-foreground">{sub}</div>
                  </div>
                  <span className="text-muted-foreground group-hover:text-gold transition text-xs">→</span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Community values */}
          <Card className="glyph-border p-4">
            <div className="text-xs uppercase tracking-widest text-gold mb-3">Community Values</div>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {[
                "Support each other's growth",
                "Share verified milestones",
                "Ask honest questions",
                "Respect economic dignity",
                "Report fraud or abuse",
              ].map((v) => (
                <li key={v} className="flex gap-2">
                  <span className="text-gold shrink-0">·</span> {v}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
