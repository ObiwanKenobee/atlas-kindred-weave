import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { generateCampaign, type CampaignOutput } from "@/lib/growth.functions";
import { useAuth } from "@/lib/auth";
import { SANCTUM_MODULES } from "@/lib/modules";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Copy, CheckCheck, Mail, MessageSquare, Smartphone } from "lucide-react";
import { toast } from "sonner";

const m = SANCTUM_MODULES.find((x) => x.slug === "growth")!;

export const Route = createFileRoute("/growth")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: GrowthPage,
});

type Channel = "email" | "whatsapp" | "sms";
type Tone = "professional" | "friendly" | "urgent" | "inspirational";

const CHANNEL_ICONS: Record<Channel, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4" />,
  sms: <Smartphone className="h-4 w-4" />,
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button onClick={copy} className="text-muted-foreground hover:text-gold transition">
      {copied ? <CheckCheck className="h-3.5 w-3.5 text-sage" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function ResultPanel({ result, channel }: { result: CampaignOutput; channel: Channel }) {
  return (
    <div className="space-y-4">
      {channel === "email" && (
        <Card className="glyph-border p-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Subject line</div>
            <CopyButton text={result.subject_line} />
          </div>
          <p className="mt-1 font-medium text-foreground">{result.subject_line}</p>
        </Card>
      )}

      <Card className="glyph-border p-4">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Headline</div>
          <CopyButton text={result.headline} />
        </div>
        <p className="mt-1 font-display text-xl text-gold">{result.headline}</p>
      </Card>

      <Card className="glyph-border p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Campaign copy</div>
          <CopyButton text={result.body} />
        </div>
        <p className="whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed">{result.body}</p>
      </Card>

      <Card className="glyph-border border-gold/40 p-4">
        <div className="text-[10px] uppercase tracking-widest text-gold mb-1">Call to action</div>
        <p className="font-medium text-foreground">{result.call_to_action}</p>
      </Card>

      <Card className="glyph-border p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Follow-up (non-responders)</div>
          <CopyButton text={result.follow_up} />
        </div>
        <p className="text-sm text-foreground/80 whitespace-pre-wrap">{result.follow_up}</p>
      </Card>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-sage/60 text-sage">
          Est. open rate: {result.estimated_open_rate}
        </Badge>
      </div>

      {result.tips.length > 0 && (
        <Card className="glyph-border p-4">
          <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Pro tips</div>
          <ul className="space-y-1">
            {result.tips.map((tip, i) => (
              <li key={i} className="text-xs text-foreground/80">• {tip}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

function GrowthPage() {
  const { user } = useAuth();
  const generate = useServerFn(generateCampaign);

  const [businessType, setBusinessType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [channel, setChannel] = useState<Channel>("email");
  const [tone, setTone] = useState<Tone>("friendly");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CampaignOutput | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { toast.error("Sign in to generate campaigns."); return; }
    setBusy(true);
    setResult(null);
    try {
      const data = await generate({ data: { businessType, targetAudience, goal, channel, tone } });
      setResult(data);
      toast.success("Campaign generated.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-start gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
            <span className="font-display">{m.glyph}</span>
            <span>Engine</span>
          </div>
          <h1 className="mt-3 font-display text-4xl">{m.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{m.tagline}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <Card className="glyph-border p-6 lg:col-span-2">
          <div className="text-xs uppercase tracking-widest text-gold mb-4">Campaign builder</div>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Business type</label>
              <Input
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="e.g. Mobile hair salon, Agri-input shop"
                required
                minLength={3}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Target audience</label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Women in Nairobi aged 25-45"
                required
                minLength={3}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Campaign goal</label>
              <Textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Drive 20 new bookings this week"
                required
                minLength={3}
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Channel</label>
                <Select value={channel} onValueChange={(v) => setChannel(v as Channel)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Tone</label>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {CHANNEL_ICONS[channel]}
              <span className="text-xs text-muted-foreground capitalize">{channel} · {tone}</span>
            </div>

            <Button
              type="submit"
              disabled={busy || !user}
              className="w-full bg-gradient-gold text-gold-foreground shadow-glow"
            >
              {busy
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                : <><Sparkles className="h-4 w-4" /> Generate campaign</>}
            </Button>
          </form>
        </Card>

        {/* Result */}
        <div className="lg:col-span-3">
          {!result && !busy && (
            <div className="grid gap-4 md:grid-cols-3">
              {m.metrics.map((k) => (
                <Card key={k.label} className="glyph-border p-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{k.label}</div>
                  <div className="mt-2 font-display text-3xl">{k.value}</div>
                  {k.delta && <div className="mt-1 text-xs text-sage">{k.delta}</div>}
                </Card>
              ))}
            </div>
          )}
          {busy && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <span className="text-sm">Growth Agent is crafting your campaign…</span>
            </div>
          )}
          {result && <ResultPanel result={result} channel={channel} />}
        </div>
      </div>
    </div>
  );
}
