import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/notifications")({
  head: () => ({ meta: [{ title: "Notification settings — Atlas Sanctum" }] }),
  component: SettingsNotifications,
});

type Prefs = {
  inapp_submission: boolean; email_submission: boolean;
  inapp_decision: boolean;   email_decision: boolean;
  inapp_review_needed: boolean; email_review_needed: boolean;
};

const DEFAULTS: Prefs = {
  inapp_submission: true,  email_submission: true,
  inapp_decision: true,    email_decision: true,
  inapp_review_needed: true, email_review_needed: false,
};

function SettingsNotifications() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setPrefs({
          inapp_submission: data.inapp_submission,
          email_submission: data.email_submission,
          inapp_decision: data.inapp_decision,
          email_decision: data.email_decision,
          inapp_review_needed: data.inapp_review_needed,
          email_review_needed: data.email_review_needed,
        });
        setLoading(false);
      });
  }, [user]);

  async function save() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("notification_preferences")
      .upsert({ user_id: user.id, ...prefs }, { onConflict: "user_id" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Preferences saved");
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Notification settings</h1>
        <p className="mt-3 text-muted-foreground">Sign in to manage delivery preferences.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm text-gold-foreground shadow-glow">Enter the Sanctum</Link>
      </div>
    );
  }

  const rows: { key: string; title: string; sub: string; inapp: keyof Prefs; email: keyof Prefs }[] = [
    { key: "submission", title: "Funding submitted", sub: "When the Council receives your pitch and starts deliberation.",
      inapp: "inapp_submission", email: "email_submission" },
    { key: "decision", title: "Reviewer decision", sub: "When a reviewer approves, declines, or requests revisions.",
      inapp: "inapp_decision", email: "email_decision" },
    { key: "review_needed", title: "Review queue (reviewers/admins)", sub: "When a new request lands awaiting review.",
      inapp: "inapp_review_needed", email: "email_review_needed" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Delivery</div>
        <h1 className="mt-3 font-display text-4xl">Notification settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose how the Sanctum reaches you for each event. Email delivery requires
          email infrastructure to be activated on the workspace.
        </p>
      </div>

      {loading ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div>Event</div>
            <div className="flex items-center gap-1"><Bell className="h-3 w-3" /> In-app</div>
            <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> Email</div>
          </div>
          {rows.map((row) => (
            <Card key={row.key} className="glyph-border p-4">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-6">
                <div>
                  <div className="font-display text-base">{row.title}</div>
                  <div className="text-xs text-muted-foreground">{row.sub}</div>
                </div>
                <Switch
                  checked={prefs[row.inapp] as boolean}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, [row.inapp]: v }))}
                />
                <Switch
                  checked={prefs[row.email] as boolean}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, [row.email]: v }))}
                />
              </div>
            </Card>
          ))}
          <div className="flex justify-end pt-4">
            <Button onClick={save} disabled={saving}>
              {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving</> : "Save preferences"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
