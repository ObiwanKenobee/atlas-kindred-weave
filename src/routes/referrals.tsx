import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  getMyReferralOverview,
  getReferralLeaderboard,
  generateInviteMessage,
} from "@/lib/referrals.functions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Loader2, Share2, Copy, Mail, MessageCircle, Trophy,
  Sparkles, Users, Gift, Link2, Send, ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      { title: "Referrals — Atlas Sanctum" },
      { name: "description", content: "Invite entrepreneurs to Atlas Sanctum and earn rewards for every signup." },
    ],
  }),
  component: ReferralsPage,
});

type Overview = Awaited<ReturnType<typeof getMyReferralOverview>>;
type Leaderboard = Awaited<ReturnType<typeof getReferralLeaderboard>>;

function ReferralsPage() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>([]);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<"email" | "whatsapp" | "sms">("email");
  const [message, setMessage] = useState("");
  const [busyMsg, setBusyMsg] = useState(false);

  const fetchOverview = useServerFn(getMyReferralOverview);
  const fetchLeaderboard = useServerFn(getReferralLeaderboard);
  const genMessage = useServerFn(generateInviteMessage);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !overview?.code) return "";
    return `${window.location.origin}/?ref=${overview.code}`;
  }, [overview?.code]);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [ov, lb] = await Promise.all([
        fetchOverview({ data: {} }),
        fetchLeaderboard({ data: { limit: 10 } }),
      ]);
      setOverview(ov);
      setLeaderboard(lb);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load referrals");
    } finally {
      setLoading(false);
    }
  }, [user, fetchOverview, fetchLeaderboard]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!shareUrl) return;
    setBusyMsg(true);
    genMessage({ data: { channel, shareUrl } })
      .then((r) => setMessage(r.message))
      .catch(() => setMessage(""))
      .finally(() => setBusyMsg(false));
  }, [channel, shareUrl, genMessage]);

  const copy = async (text: string, label: string) => {
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
        url: shareUrl,
      });
    } catch { /* user cancelled */ }
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <Gift className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-4 font-display text-3xl">Referrals</h1>
        <p className="mt-3 text-muted-foreground">Sign in to get your personal invite link and start earning rewards.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow">Enter</Link>
      </div>
    );
  }

  if (loading || !overview) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading referrals…
      </div>
    );
  }

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    "Join me on Atlas Sanctum",
  )}&body=${encodeURIComponent(message || shareUrl)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message || shareUrl)}`;
  const smsHref = `sms:?body=${encodeURIComponent(message || shareUrl)}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Growth</div>
          <h1 className="mt-3 font-display text-4xl">Referrals</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Invite entrepreneurs into the Sanctum. Earn credits for every signup.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/growth">Growth agent<ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
        </Button>
      </div>

      {/* Stat row */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Card className="glyph-border p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
            <Users className="h-3 w-3" /> Invited
          </div>
          <div className="mt-2 font-display text-3xl">{overview.totals.invitedCount}</div>
        </Card>
        <Card className="glyph-border p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
            <Sparkles className="h-3 w-3" /> Signups
          </div>
          <div className="mt-2 font-display text-3xl">{overview.totals.signedUpCount}</div>
        </Card>
        <Card className="glyph-border p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
            <Gift className="h-3 w-3" /> Rewards earned
          </div>
          <div className="mt-2 font-display text-3xl">
            ${(overview.totals.rewardCents / 100).toFixed(2)}
          </div>
        </Card>
      </div>

      {/* Link + share */}
      <Card className="glyph-border mt-6 p-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
          <Link2 className="h-3 w-3" /> Your invite link
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Input readOnly value={shareUrl} className="flex-1 min-w-[260px] font-mono text-sm" />
          <Button variant="secondary" onClick={() => copy(shareUrl, "Link")}>
            <Copy className="mr-2 h-3.5 w-3.5" /> Copy
          </Button>
          <Button onClick={nativeShare}>
            <Share2 className="mr-2 h-3.5 w-3.5" /> Share
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          Your code:
          <Badge variant="outline" className="border-gold/60 text-gold font-mono tracking-widest">
            {overview.code}
          </Badge>
          <span>Grants $5 in Sanctum credits per successful signup.</span>
        </div>
      </Card>

      {/* Compose */}
      <Card className="glyph-border mt-6 p-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
          <Send className="h-3 w-3" /> Compose invite
        </div>
        <Tabs value={channel} onValueChange={(v) => setChannel(v as any)} className="mt-3">
          <TabsList>
            <TabsTrigger value="email"><Mail className="mr-1.5 h-3.5 w-3.5" />Email</TabsTrigger>
            <TabsTrigger value="whatsapp"><MessageCircle className="mr-1.5 h-3.5 w-3.5" />WhatsApp</TabsTrigger>
            <TabsTrigger value="sms"><MessageCircle className="mr-1.5 h-3.5 w-3.5" />SMS</TabsTrigger>
          </TabsList>
          <TabsContent value={channel} className="mt-3 space-y-3">
            <textarea
              value={busyMsg ? "Generating…" : message}
              onChange={(e) => setMessage(e.target.value)}
              rows={channel === "sms" ? 3 : 8}
              className="w-full rounded-md border border-border/60 bg-background/50 p-3 text-sm font-mono"
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => copy(message, "Message")}>
                <Copy className="mr-2 h-3.5 w-3.5" /> Copy message
              </Button>
              {channel === "email" && (
                <Button asChild><a href={mailtoHref}><Mail className="mr-2 h-3.5 w-3.5" />Open email</a></Button>
              )}
              {channel === "whatsapp" && (
                <Button asChild><a href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-3.5 w-3.5" />Open WhatsApp</a></Button>
              )}
              {channel === "sms" && (
                <Button asChild><a href={smsHref}><MessageCircle className="mr-2 h-3.5 w-3.5" />Open SMS</a></Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent referrals */}
        <div>
          <div className="text-xs uppercase tracking-widest text-gold/80">Recent referrals</div>
          <Card className="glyph-border mt-3">
            {overview.recentReferrals.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No referrals yet. Share your link to get started.</div>
            ) : (
              <div className="divide-y divide-border/40">
                {overview.recentReferrals.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-4">
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })} · {r.status.replace(/_/g, " ")}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-sage border-sage/60">
                      +${(r.rewardCents / 100).toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Leaderboard */}
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold/80">
            <Trophy className="h-3 w-3" /> Top referrers
          </div>
          <Card className="glyph-border mt-3">
            {leaderboard.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No leaderboard data yet.</div>
            ) : (
              <div className="divide-y divide-border/40">
                {leaderboard.map((row) => (
                  <div key={row.userId} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-7 w-7 place-items-center rounded-full font-display text-xs ${row.rank <= 3 ? "bg-gradient-gold text-gold-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {row.rank}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {row.displayName}
                          {row.userId === user.id && <span className="ml-2 text-xs text-gold">(you)</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {row.region ?? "—"}{row.trustScore != null ? ` · Trust ${row.trustScore}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-sm">{row.referrals}</div>
                      <div className="text-xs text-muted-foreground">${(row.rewardCents / 100).toFixed(0)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Rewards ledger */}
      <div className="mt-8">
        <div className="text-xs uppercase tracking-widest text-gold/80">Rewards ledger</div>
        <Card className="glyph-border mt-3">
          {overview.recentRewards.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No rewards yet.</div>
          ) : (
            <div className="divide-y divide-border/40">
              {overview.recentRewards.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-sm font-medium capitalize">{r.kind.replace(/_/g, " ")}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.note ?? "—"} · {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="font-display text-lg">
                    +${(r.amountCents / 100).toFixed(2)} <span className="text-xs text-muted-foreground">{r.currency}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
