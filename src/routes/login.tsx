import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Enter the Sanctum — Atlas Sanctum" },
      { name: "description", content: "Sign in to your Atlas Sanctum identity." },
      { property: "og:title", content: "Enter the Sanctum — Atlas Sanctum" },
      { property: "og:description", content: "Sign in to your Atlas Sanctum identity." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/profile" });
  }, [user, loading, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Check your inbox to verify your identity.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back to the Sanctum.");
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Unable to authenticate");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-gold/80">
          <Sparkles className="h-3.5 w-3.5" /> Atlas Sanctum
        </div>
        <h1 className="mt-4 font-display text-4xl text-foreground">
          {mode === "signin" ? "Enter the Sanctum" : "Inscribe your identity"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your trust score, verification history, and deliberations live in your account.
        </p>
      </div>

      <Card className="glyph-border p-6">
        <Button
          type="button"
          variant="outline"
          className="w-full border-gold/40"
          onClick={google}
          disabled={busy}
        >
          Continue with Google
        </Button>
        <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <Input
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <Button type="submit" className="w-full bg-gradient-gold text-gold-foreground shadow-glow" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Sign in" : "Create identity"}
          </Button>
        </form>

        <div className="mt-5 text-center text-xs text-muted-foreground">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button onClick={() => setMode("signup")} className="text-gold hover:underline">
                Inscribe a new identity
              </button>
            </>
          ) : (
            <>
              Already inscribed?{" "}
              <button onClick={() => setMode("signin")} className="text-gold hover:underline">
                Enter the Sanctum
              </button>
            </>
          )}
        </div>
      </Card>

      <Link to="/" className="mt-6 text-center text-xs text-muted-foreground hover:text-gold">
        ← Return to overview
      </Link>
    </div>
  );
}
