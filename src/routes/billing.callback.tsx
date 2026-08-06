import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { verifyPaystackPayment } from "@/lib/paystack.functions";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/billing/callback")({
  validateSearch: z.object({
    reference: z.string().optional(),
    trxref: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Confirming payment — Atlas Sanctum" },
      { name: "description", content: "Confirming your Atlas Sanctum subscription payment with Paystack." },
      { property: "og:title", content: "Confirming payment — Atlas Sanctum" },
      { property: "og:description", content: "Confirming your Atlas Sanctum subscription payment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BillingCallback,
});

function BillingCallback() {
  const { reference, trxref } = Route.useSearch();
  const ref = reference ?? trxref ?? null;
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const verify = useServerFn(verifyPaystackPayment);
  const [state, setState] = useState<"pending" | "ok" | "fail">("pending");
  const [message, setMessage] = useState<string>("");
  const ran = useRef(false);

  useEffect(() => {
    if (!user || !ref || ran.current) return;
    ran.current = true;
    (async () => {
      try {
        const res = await verify({ data: { reference: ref } });
        setState(res.success ? "ok" : "fail");
        setMessage(res.message ?? res.status);
        await refreshProfile();
        router.invalidate();
      } catch (e) {
        setState("fail");
        setMessage(e instanceof Error ? e.message : "Verification failed");
      }
    })();
  }, [user, ref, verify, refreshProfile, router]);

  return (
    <div className="mx-auto max-w-lg px-6 py-20">
      <Card className="glyph-border p-8 text-center">
        {!ref ? (
          <>
            <XCircle className="mx-auto h-9 w-9 text-destructive" />
            <h1 className="mt-4 font-display text-2xl">No payment reference</h1>
            <p className="mt-2 text-sm text-muted-foreground">This page expects a Paystack redirect.</p>
          </>
        ) : state === "pending" ? (
          <>
            <Loader2 className="mx-auto h-9 w-9 animate-spin text-gold" />
            <h1 className="mt-4 font-display text-2xl">Confirming your payment…</h1>
            <p className="mt-2 text-sm text-muted-foreground">Reference {ref}</p>
          </>
        ) : state === "ok" ? (
          <>
            <CheckCircle2 className="mx-auto h-9 w-9 text-sage" />
            <h1 className="mt-4 font-display text-2xl">Payment confirmed</h1>
            <p className="mt-2 text-sm text-muted-foreground">Your plan is active. Welcome deeper into the Sanctum.</p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-9 w-9 text-destructive" />
            <h1 className="mt-4 font-display text-2xl">Payment not completed</h1>
            <p className="mt-2 text-sm text-muted-foreground">{message || "Paystack did not confirm this transaction."}</p>
          </>
        )}
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild><Link to="/subscription">Go to subscription</Link></Button>
          <Button variant="outline" asChild><Link to="/pricing">Back to pricing</Link></Button>
        </div>
      </Card>
    </div>
  );
}
