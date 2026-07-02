import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { recordAgentEvent } from "@/lib/observability.server";

const OpportunitySchema = z.object({
  opportunities: z
    .array(
      z.object({
        title: z.string(),
        type: z.enum(["grant", "loan", "equity", "accelerator", "government", "ngo", "cooperative"]),
        provider: z.string(),
        description: z.string().max(300),
        eligibility: z.array(z.string()).min(1).max(5),
        estimated_amount: z.string(),
        fit_score: z.number().min(0).max(100),
        fit_rationale: z.string().max(200),
        next_step: z.string().max(150),
        url_hint: z.string().optional(),
      }),
    )
    .min(1)
    .max(8),
  summary: z.string().max(400),
  readiness_gap: z.string().max(300),
  recommended_priority: z.string().max(200),
});

export type OpportunityOutput = z.infer<typeof OpportunitySchema>;

const ResearchInput = z.object({
  focus: z.string().max(300).optional(),
});

export const findFundingOpportunities = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const [{ data: profile }, { data: funding }, { data: verEvents }, { data: vaultDocs }] =
      await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("display_name, trust_score, verified, region, bio")
          .eq("user_id", userId)
          .single(),
        supabaseAdmin
          .from("funding_requests")
          .select("sector, amount_requested, currency, human_approval, decision_report")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5),
        supabaseAdmin
          .from("verification_events")
          .select("kind, status")
          .eq("user_id", userId),
        supabaseAdmin
          .from("knowledge_documents")
          .select("doc_kind, file_name")
          .eq("user_id", userId)
          .eq("chunk_index", 0),
      ]);

    const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
    const sectors = [
      ...new Set((funding ?? []).map((r) => r.sector).filter(Boolean)),
    ].join(", ") || "unspecified";
    const totalFunded = (funding ?? [])
      .filter((r) => r.human_approval === "approved")
      .reduce((s, r) => s + Number(r.amount_requested), 0);
    const docKinds = [...new Set((vaultDocs ?? []).map((d) => d.doc_kind))].join(", ") || "none";

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas Research Agent — a specialist in finding funding opportunities for entrepreneurs in emerging markets, Africa, and the Global South.

Entrepreneur profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false} (${verified} verified proofs)
- Business sectors: ${sectors}
- Capital previously approved: $${totalFunded.toLocaleString()}
- Documents in vault: ${docKinds}
${data.focus ? `\nFocus area: "${data.focus}"` : ""}

Find 4–8 real, actionable funding opportunities that this entrepreneur could realistically pursue. Include:
- Grants from development banks, NGOs, and foundations (e.g. IFC, USAID, Tony Elumelu Foundation, Mastercard Foundation)
- Revenue-based financing and microfinance options
- Accelerators and incubators active in their region
- Government programs relevant to their sector
- Impact investors and cooperative capital

For each opportunity, score fit (0-100) based on their trust score, verification status, sector, and region.
Be realistic: a trust score of ${profile?.trust_score ?? 50} with ${verified} verified proofs will not qualify for large institutional grants.
Identify what they need to close the readiness gap.`;

    const t0 = Date.now();
    const { object, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: OpportunitySchema,
      prompt,
    });

    void recordAgentEvent({
      userId,
      agent: "Research Agent",
      action: "find_opportunities",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      confidence: object.opportunities[0]?.fit_score ? object.opportunities[0].fit_score / 100 : undefined,
      outcome: "answered",
      metadata: { region: profile?.region, sectors },
    });

    return object;
  });

// ── Treasury Report ───────────────────────────────────────────────────────────

const TreasuryReportSchema = z.object({
  period: z.string(),
  health_score: z.enum(["A+", "A", "B+", "B", "C", "D"]),
  headline: z.string().max(200),
  cashflow_assessment: z.string().max(400),
  runway_estimate: z.string().max(150),
  top_risks: z.array(z.string()).min(1).max(5),
  recommendations: z.array(z.string()).min(1).max(6),
  next_milestone: z.string().max(200),
  kpis: z.object({
    total_capital_approved: z.number(),
    approval_rate_pct: z.number(),
    avg_deal_size: z.number(),
    portfolio_health: z.string(),
  }),
});

export type TreasuryReportOutput = z.infer<typeof TreasuryReportSchema>;

export const generateTreasuryReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d))
  .handler(async ({ context }) => {
    const { userId } = context;

    const [{ data: profile }, { data: funding }, { data: vaultDocs }] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("display_name, trust_score, region, bio")
        .eq("user_id", userId)
        .single(),
      supabaseAdmin
        .from("funding_requests")
        .select("title, amount_requested, currency, status, human_approval, sector, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20),
      supabaseAdmin
        .from("knowledge_documents")
        .select("doc_kind, file_name, created_at")
        .eq("user_id", userId)
        .eq("chunk_index", 0),
    ]);

    const allFunding = funding ?? [];
    const approved = allFunding.filter((r) => r.human_approval === "approved");
    const declined = allFunding.filter((r) => r.human_approval === "declined");
    const pending = allFunding.filter((r) => r.human_approval === "pending");
    const totalCapital = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
    const avgDeal = approved.length ? totalCapital / approved.length : 0;
    const approvalRate = allFunding.length
      ? (approved.length / allFunding.length) * 100
      : 0;
    const docKindCounts = (vaultDocs ?? []).reduce<Record<string, number>>((acc, d) => {
      acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
      return acc;
    }, {});

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas Treasury Agent generating a comprehensive treasury health report.

Business profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unknown"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Bio: ${profile?.bio ?? "not provided"}

Funding portfolio:
- Total requests: ${allFunding.length}
- Approved: ${approved.length} (${totalCapital.toLocaleString()} USD total)
- Declined: ${declined.length}
- Pending: ${pending.length}
- Approval rate: ${approvalRate.toFixed(1)}%
- Average deal size: $${avgDeal.toFixed(0)}
- Recent deals: ${approved
      .slice(0, 3)
      .map((r) => `${r.title} ($${r.amount_requested})`)
      .join("; ") || "none"}

Knowledge Vault documents: ${JSON.stringify(docKindCounts)}

Generate a treasury health report for the current period. Be concrete and actionable. 
If the user has no approved funding, focus on what they need to do to reach their first approval.
runway_estimate should reflect ability to sustain business operations based on available capital.`;

    const t0 = Date.now();
    const { object, usage } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: TreasuryReportSchema,
      prompt,
    });

    void recordAgentEvent({
      userId,
      agent: "Treasury Agent",
      action: "treasury_report",
      latencyMs: Date.now() - t0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      outcome: object.health_score,
      metadata: { health_score: object.health_score, total_capital: totalCapital },
    });

    return object;
  });
