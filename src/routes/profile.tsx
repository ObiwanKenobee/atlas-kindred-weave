import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import { getSubscription, type SubscriptionPlan } from "@/lib/subscription.functions";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, ShieldAlert, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Identity — Atlas Sanctum" },
      { name: "description", content: "Your Atlas reputation, trust score, and verification history." },
      { property: "og:title", content: "Your Identity — Atlas Sanctum" },
      { property: "og:description", content: "Your Atlas reputation, trust score, and verification history." },
    ],
  }),
  component: ProfilePage,
});

type Vev = {
  id: string;
  kind: string;
  status: "pending" | "verified" | "rejected";
  notes: string | null;
  evidence_url: string | null;
  created_at: string;
};

function ProfilePage() {
  const { user, profile, loading, refreshProfile, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [region, setRegion] = useState("");
  const [events, setEvents] = useState<Vev[]>([]);
  const [newKind, setNewKind] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newEvidence, setNewEvidence] = useState("");
  const [subscription, setSubscription] = useState<{ plan: SubscriptionPlan; priceMonthly: number } | null>(null);
  const fetchSubscription = useServerFn(getSubscription);

  useEffect(() => {
    if (!user) return;
    fetchSubscription({}).then(setSubscription).catch(() => {});
  }, [user, fetchSubscription]);

  useEffect(() => {
    if (profile) {
      setName(profile.display_name ?? "");
      setBio(profile.bio ?? "");
      setRegion(profile.region ?? "");
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("verification_events")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setEvents((data as Vev[]) ?? []));
  }, [user]);

  if (loading) return <div className="p-10"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl text-foreground">Identity required</h1>
        <p className="mt-3 text-muted-foreground">Sign in to inscribe your trust history.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: name, bio, region })
      .eq("user_id", user!.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Identity updated.");
    refreshProfile();
  }

  async function addEvent() {
    if (!newKind.trim()) return;
    const { data, error } = await supabase
      .from("verification_events")
      .insert({ user_id: user!.id, kind: newKind, notes: newNotes || null, evidence_url: newEvidence || null })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setEvents([data as Vev, ...events]);
    setNewKind("");
    setNewNotes("");
    setNewEvidence("");
    toast.success("Verification request submitted.");
  }

  const trust = profile?.trust_score ?? 0;
  const trustHue = trust >= 70 ? "text-sage" : trust >= 40 ? "text-gold" : "text-destructive";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-start justify-between border-b border-border/60 pb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Your Identity</div>
          <h1 className="mt-3 font-display text-4xl">{profile?.display_name ?? user.email}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="glyph-border p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Atlas Reputation</div>
          <div className={`mt-2 font-display text-4xl ${trustHue}`}>{trust.toFixed(1)}</div>
          <div className="mt-1 text-xs text-muted-foreground">of 100</div>
        </Card>
        <Card className="glyph-border p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Status</div>
          <div className="mt-2 flex items-center gap-2 font-display text-xl">
            {profile?.verified ? (
              <><ShieldCheck className="h-5 w-5 text-sage" /> Verified</>
            ) : (
              <><ShieldAlert className="h-5 w-5 text-gold" /> Probationary</>
            )}
          </div>
        </Card>
        <Card className="glyph-border p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Subscription</div>
          <div className="mt-2 font-display text-xl capitalize">{subscription?.plan ?? "free"}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {subscription?.priceMonthly ? `$${(subscription.priceMonthly / 100).toFixed(0)}/mo` : "Free tier"}
          </div>
          <Link to="/pricing" className="mt-2 inline-block text-xs text-gold hover:underline">Upgrade plan →</Link>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="glyph-border p-6">
          <div className="text-xs uppercase tracking-widest text-gold">Profile</div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Display name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Region</label>
              <Input value={region} onChange={(e) => setRegion(e.target.value)} className="mt-1" placeholder="West Africa, Andes, ..." />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Bio</label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1" rows={4} />
            </div>
            <Button onClick={save} disabled={saving} className="bg-gradient-gold text-gold-foreground">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </Card>

        <Card className="glyph-border p-6">
          <div className="text-xs uppercase tracking-widest text-gold">Submit verification evidence</div>
          <div className="mt-4 space-y-3">
            <Input value={newKind} onChange={(e) => setNewKind(e.target.value)} placeholder="Kind (e.g. ID, business registration, milestone)" />
            <Input value={newEvidence} onChange={(e) => setNewEvidence(e.target.value)} placeholder="Evidence URL (optional)" />
            <Textarea value={newNotes} onChange={(e) => setNewNotes(e.target.value)} placeholder="Notes" rows={3} />
            <Button onClick={addEvent} variant="outline" className="border-gold/40">
              <Plus className="h-4 w-4" /> Submit
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-10">
        <div className="text-xs uppercase tracking-widest text-gold">Verification history</div>
        <div className="mt-4 space-y-2">
          {events.length === 0 && <p className="text-sm text-muted-foreground">No verification events yet.</p>}
          {events.map((e) => (
            <Card key={e.id} className="glyph-border flex items-center justify-between p-4">
              <div>
                <div className="font-display text-foreground">{e.kind}</div>
                {e.notes && <div className="mt-1 text-xs text-muted-foreground">{e.notes}</div>}
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {new Date(e.created_at).toLocaleString()}
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  e.status === "verified"
                    ? "border-sage/60 text-sage"
                    : e.status === "rejected"
                    ? "border-destructive/60 text-destructive"
                    : "border-gold/60 text-gold"
                }
              >
                {e.status}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
