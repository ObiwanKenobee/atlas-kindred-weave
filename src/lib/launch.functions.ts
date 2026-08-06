import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { requireFeature } from "@/lib/entitlements.server";
import { recordAgentEvent } from "@/lib/observability.server";

function getGateway() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  return createLovableAiGatewayProvider(key);
}

async function getUserContext(userId: string) {
  const [{ data: profile }, { data: funding }, { data: verEvents }] = await Promise.all([
    supabaseAdmin.from("profiles").select("display_name, trust_score, verified, region, bio").eq("user_id", userId).single(),
    supabaseAdmin.from("funding_requests").select("title, amount_requested, currency, sector, human_approval, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(20),
    supabaseAdmin.from("verification_events").select("kind, status, created_at").eq("user_id", userId).limit(30),
  ]);
  return { profile, funding: funding ?? [], verEvents: verEvents ?? [] };
}

// ── Cashflow Insights ─────────────────────────────────────────────────────────

const CashflowSchema = z.object({
  period: z.string(),
  health_grade: z.enum(["A", "B", "C", "D", "F"]),
  headline: z.string().max(200),
  estimated_monthly_inflow: z.number().nonnegative(),
  estimated_monthly_outflow: z.number().nonnegative(),
  net_cashflow: z.number(),
  runway_months: z.number().nonnegative(),
  cashflow_trend: z.enum(["improving", "stable", "declining", "unknown"]),
  key_observations: z.array(z.string()).min(2).max(6),
  risks: z.array(z.string()).min(1).max(4),
  recommendations: z.array(z.string()).min(2).max(5),
  next_30_days: z.string().max(300),
});

export type CashflowOutput = z.infer<typeof CashflowSchema>;

export const getCashflowInsights = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d))
  .handler(async ({ context }) => {
    await requireFeature(context.userId, "cashflow_insights");
    const { userId } = context;
    const { profile, funding, verEvents } = await getUserContext(userId);

    const approved = funding.filter((r) => r.human_approval === "approved");
    const totalCapital = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
    const sectors = [...new Set(funding.map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";
    const verifiedCount = verEvents.filter((e) => e.status === "verified").length;

    const cutoff30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const recent30 = funding.filter((r) => r.created_at >= cutoff30);

    const gateway = getGateway();
    const t0 = Date.now();

    const { object, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: CashflowSchema,
      prompt: `You are the Atlas Treasury Agent generating a cashflow analysis for an entrepreneur.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false} (${verifiedCount} verified proofs)
- Sectors: ${sectors}

Funding history:
- Total requests: ${funding.length}
- Approved deals: ${approved.length} totalling $${totalCapital.toLocaleString()}
- Requests in last 30 days: ${recent30.length}
- Recent: ${approved.slice(0, 3).map((r) => `${r.title} ($${r.amount_requested} ${r.currency})`).join("; ") || "none"}

Generate a realistic cashflow analysis. Since we don't have direct bank data, base estimates on:
- Approved funding amounts as capital inflows
- Typical operating costs for their sector and region
- Trust score as a proxy for business maturity
- Number of verified proofs as activity signal

Be honest about data limitations. If data is sparse, say so and give conservative estimates.
runway_months should reflect how long current capital can sustain operations.`,
    });

    void recordAgentEvent({
      userId,
      agent: "Treasury Agent",
      action: "cashflow_insights",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      outcome: object.health_grade,
      metadata: { trust_score: profile?.trust_score },
    });

    return object;
  });

// ── Revenue Tracking ──────────────────────────────────────────────────────────

const RevenueSchema = z.object({
  period: z.string(),
  estimated_mrr: z.number().nonnegative(),
  estimated_arr: z.number().nonnegative(),
  revenue_trend: z.enum(["growing", "stable", "declining", "early_stage", "unknown"]),
  growth_rate_pct: z.number(),
  top_revenue_sources: z.array(z.object({
    source: z.string(),
    estimated_contribution_pct: z.number().min(0).max(100),
    notes: z.string(),
  })).min(1).max(5),
  milestones: z.array(z.object({
    label: z.string(),
    target: z.string(),
    status: z.enum(["achieved", "in_progress", "not_started"]),
  })).min(2).max(6),
  forecast_next_quarter: z.string().max(300),
  recommendations: z.array(z.string()).min(2).max(5),
});

export type RevenueOutput = z.infer<typeof RevenueSchema>;

export const getRevenueTracking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d))
  .handler(async ({ context }) => {
    await requireFeature(context.userId, "revenue_tracking");
    const { userId } = context;
    const { profile, funding, verEvents } = await getUserContext(userId);

    const approved = funding.filter((r) => r.human_approval === "approved");
    const totalCapital = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
    const sectors = [...new Set(funding.map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";

    // Monthly breakdown from funding history
    const byMonth: Record<string, number> = {};
    for (const r of approved) {
      const month = r.created_at.slice(0, 7);
      byMonth[month] = (byMonth[month] ?? 0) + Number(r.amount_requested);
    }
    const monthlyData = Object.entries(byMonth).sort().slice(-6);

    const gateway = getGateway();
    const t0 = Date.now();

    const { object, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: RevenueSchema,
      prompt: `You are the Atlas Revenue Intelligence Agent tracking business revenue for an entrepreneur.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Sectors: ${sectors}
- Verified proofs: ${verEvents.filter((e) => e.status === "verified").length}

Capital history (approved funding by month):
${monthlyData.map(([m, v]) => `  ${m}: $${v.toLocaleString()}`).join("\n") || "  No approved funding yet"}
Total capital approved: $${totalCapital.toLocaleString()} across ${approved.length} deals

Generate a revenue tracking report. Use approved funding as a proxy for business revenue/capital deployment.
Identify revenue sources based on sector and funding patterns.
Set milestones appropriate for their stage (trust score ${profile?.trust_score ?? 50}/100).
Be realistic — early-stage businesses with low trust scores should have conservative estimates.`,
    });

    void recordAgentEvent({
      userId,
      agent: "Treasury Agent",
      action: "revenue_tracking",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      outcome: object.revenue_trend,
    });

    return object;
  });

// ── Funding Eligibility ───────────────────────────────────────────────────────

const EligibilitySchema = z.object({
  overall_score: z.number().min(0).max(100),
  readiness_level: z.enum(["not_ready", "building", "ready", "strong"]),
  headline: z.string().max(200),
  criteria: z.array(z.object({
    name: z.string(),
    status: z.enum(["met", "partial", "not_met"]),
    score: z.number().min(0).max(100),
    notes: z.string().max(200),
    action: z.string().max(150),
  })).min(4).max(8),
  eligible_instruments: z.array(z.object({
    type: z.enum(["grant", "loan", "revenue_share", "equity", "microfinance"]),
    max_amount: z.number().nonnegative(),
    currency: z.string(),
    conditions: z.array(z.string()).min(1).max(4),
  })).min(1).max(4),
  blocking_issues: z.array(z.string()).min(0).max(4),
  next_steps: z.array(z.string()).min(2).max(5),
  estimated_days_to_ready: z.number().int().nonnegative(),
});

export type EligibilityOutput = z.infer<typeof EligibilitySchema>;

export const getFundingEligibility = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d))
  .handler(async ({ context }) => {
    await requireFeature(context.userId, "funding_eligibility");
    const { userId } = context;
    const { profile, funding, verEvents } = await getUserContext(userId);

    const approved = funding.filter((r) => r.human_approval === "approved");
    const declined = funding.filter((r) => r.human_approval === "declined");
    const verifiedCount = verEvents.filter((e) => e.status === "verified").length;
    const rejectedCount = verEvents.filter((e) => e.status === "rejected").length;
    const totalFunded = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
    const sectors = [...new Set(funding.map((r) => r.sector).filter(Boolean))].join(", ") || "unspecified";

    const gateway = getGateway();
    const t0 = Date.now();

    const { object, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: EligibilitySchema,
      prompt: `You are the Atlas Funding Eligibility Agent assessing whether an entrepreneur qualifies for funding.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false}
- Sectors: ${sectors}

Evidence record:
- Verified proofs: ${verifiedCount}
- Rejected proofs: ${rejectedCount}
- Funding requests submitted: ${funding.length}
- Approved: ${approved.length} ($${totalFunded.toLocaleString()} total)
- Declined: ${declined.length}

Assess eligibility across these criteria:
1. Identity verification (verified flag + proof count)
2. Business activity evidence (verification events)
3. Trust score threshold (60+ = good, 75+ = strong)
4. Funding history (prior approvals = positive signal)
5. Sector viability (known sector = better)
6. Region coverage (known region = better)
7. Documentation quality (vault docs if any)
8. Repayment track record (no defaults = positive)

For eligible_instruments, base max_amount on trust score:
- Trust < 40: microfinance up to $500
- Trust 40-60: microfinance/loan up to $2,000
- Trust 60-75: loan/revenue_share up to $10,000
- Trust 75+: loan/grant up to $50,000

Be strict and honest. A trust score of ${profile?.trust_score ?? 50} with ${verifiedCount} verified proofs is the ground truth.`,
    });

    void recordAgentEvent({
      userId,
      agent: "Funding Agent",
      action: "eligibility_check",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      confidence: object.overall_score / 100,
      outcome: object.readiness_level,
    });

    return object;
  });
