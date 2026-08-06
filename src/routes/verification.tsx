import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { analyzeProof, type VerifyOutput } from "@/lib/verification.functions";
import { useAuth } from "@/lib/auth";
import { SANCTUM_MODULES } from "@/lib/modules";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BadgeCheck, Loader2, Paperclip, ShieldAlert, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

const m = SANCTUM_MODULES.find((x) => x.slug === "verification")!;

export const Route = createFileRoute("/verification")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: GatedVerificationPage,
});

function GatedVerificationPage() {
  return (
    <PlanGate feature="verification_basic">
      <VerificationPage />
    </PlanGate>
  );
}

type ProofKind = "receipt" | "inventory" | "identity" | "location" | "delivery" | "business_premise" | "other";

const KIND_LABELS: Record<ProofKind, string> = {
  receipt: "Receipt",
  inventory: "Inventory",
  identity: "Identity document",
  location: "Location / premises",
  delivery: "Delivery proof",
  business_premise: "Business premise",
  other: "Other",
};

const VERDICT_CONFIG = {
  verified: { label: "Verified", icon: ShieldCheck, cls: "text-sage border-sage/60" },
  invalid: { label: "Invalid", icon: ShieldAlert, cls: "text-destructive border-destructive/60" },
  needs_review: { label: "Needs Review", icon: BadgeCheck, cls: "text-gold border-gold/60" },
};

function VerificationPage() {
  const { user } = useAuth();
  const analyze = useServerFn(analyzeProof);

  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<ProofKind>("receipt");
  const [claim, setClaim] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<(VerifyOutput & { eventId: string }) | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to submit proof.");
    if (!file) return toast.error("Attach a proof document.");
    setBusy(true);
    try {
      // Upload to Supabase storage first
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("funding-attachments").upload(path, file);
      if (upErr) throw upErr;

      const res = await analyze({ data: { storagePath: path, kind, claimDescription: claim } });
      setResult(res);
      toast.success("Proof analysis complete.");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setResult(null);
    setFile(null);
    setClaim("");
    setKind("receipt");
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

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Upload form */}
        <Card className="glyph-border p-6 lg:col-span-2">
          <div className="text-xs uppercase tracking-widest text-gold">Submit proof</div>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <Select value={kind} onValueChange={(v) => setKind(v as ProofKind)}>
              <SelectTrigger>
                <SelectValue placeholder="Proof type" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(KIND_LABELS) as ProofKind[]).map((k) => (
                  <SelectItem key={k} value={k}>{KIND_LABELS[k]}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Describe what this proof shows — e.g. 'Receipt for $120 inventory purchase from Eastleigh market, 2 June 2025'"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              rows={4}
              required
              minLength={10}
            />

            <label className="glyph-border flex cursor-pointer items-center justify-center gap-2 rounded-md p-4 text-sm text-muted-foreground hover:text-gold">
              <Paperclip className="h-4 w-4" />
              {file ? file.name : "Attach document or image"}
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {file && (
              <div className="flex items-center justify-between rounded bg-secondary/40 px-3 py-1.5 text-xs">
                <span className="truncate">{file.name}</span>
                <button type="button" onClick={() => setFile(null)}><X className="h-3.5 w-3.5" /></button>
              </div>
            )}

            <Button
              type="submit"
              disabled={busy || !user || !file}
              className="w-full bg-gradient-gold text-gold-foreground shadow-glow"
            >
              {busy
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <><Sparkles className="h-4 w-4" /> Analyze proof</>}
            </Button>
          </form>
        </Card>

        {/* Result panel */}
        <div className="space-y-4 lg:col-span-3">
          {!result && (
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

          {result && (() => {
            const cfg = VERDICT_CONFIG[result.verdict];
            const Icon = cfg.icon;
            return (
              <div className="space-y-4">
                {/* Verdict */}
                <Card className={`glyph-border p-6 ${cfg.cls}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Verdict</div>
                      <div className="mt-2 flex items-center gap-3 font-display text-3xl">
                        <Icon className="h-7 w-7" />
                        {cfg.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Confidence</div>
                      <div className="mt-1 font-display text-3xl">
                        {(result.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Summary */}
                <Card className="glyph-border p-5">
                  <div className="text-xs uppercase tracking-widest text-gold">Analysis</div>
                  <p className="mt-2 text-sm text-foreground/90">{result.summary}</p>
                </Card>

                {/* Findings */}
                <Card className="glyph-border p-5">
                  <div className="text-xs uppercase tracking-widest text-gold">Findings</div>
                  <ul className="mt-3 space-y-1.5">
                    {result.findings.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="font-display text-gold">{String(i + 1).padStart(2, "0")}</span> {f}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Fraud signals */}
                {result.fraud_signals.length > 0 && (
                  <Card className="glyph-border border-destructive/40 p-5">
                    <div className="text-xs uppercase tracking-widest text-destructive">Fraud Signals</div>
                    <ul className="mt-3 space-y-1 text-sm text-foreground/90">
                      {result.fraud_signals.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </Card>
                )}

                {/* Recommended action */}
                <Card className="glyph-border p-5">
                  <div className="text-xs uppercase tracking-widest text-gold">Recommended Action</div>
                  <p className="mt-2 text-sm text-foreground/90">{result.recommended_action}</p>
                  <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Event ID: {result.eventId} · Trust score updated
                  </div>
                </Card>

                <Button variant="outline" size="sm" onClick={reset}>
                  Submit another proof
                </Button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
