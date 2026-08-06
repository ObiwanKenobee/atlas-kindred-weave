import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEntitlements } from "@/lib/use-entitlements";
import { FEATURE_LABELS, type FeatureKey } from "@/lib/entitlements";

/**
 * Wraps a plan-gated surface. Renders children when the member's plan
 * covers `feature`, otherwise an upgrade prompt.
 */
export function PlanGate({
  feature,
  children,
  compact = false,
}: {
  feature: FeatureKey;
  children: ReactNode;
  compact?: boolean;
}) {
  const ent = useEntitlements();
  if (ent.can(feature)) return <>{children}</>;

  const needed = ent.requiredPlanLabel(feature);
  const label = FEATURE_LABELS[feature];

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md border border-gold/30 bg-gold/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Lock className="h-3.5 w-3.5 text-gold" />
          <span>{label} needs {needed}</span>
        </div>
        <Button size="sm" asChild><Link to="/pricing">Upgrade</Link></Button>
      </div>
    );
  }

  return (
    <Card className="glyph-border border-gold/30 bg-gold/5 p-8 text-center">
      <Lock className="mx-auto h-8 w-8 text-gold" />
      <h2 className="mt-4 font-display text-2xl">{label} is locked</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {ent.billingOk
          ? `This capability opens on ${needed} and above. You are currently on ${ent.planLabel}.`
          : `Your subscription is ${ent.status}. Restore billing to regain access.`}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button asChild><Link to="/pricing"><Sparkles className="mr-1.5 h-3.5 w-3.5" />See plans</Link></Button>
        <Button variant="outline" asChild><Link to="/subscription">Manage subscription</Link></Button>
      </div>
    </Card>
  );
}
