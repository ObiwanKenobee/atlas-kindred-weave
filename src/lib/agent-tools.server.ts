/**
 * Atlas Agent Tool Registry — the ONLY way an agent touches the database.
 *
 * Every tool declares a strict Zod input schema, runs under an explicit userId
 * (never a caller-supplied one), returns structured output, and writes both an
 * operational step (`interaction_steps`) and an audit event (`audit_log`).
 *
 * Voice (ElevenLabs webhook) and text (/api/cfo/chat) call the SAME registry.
 * There is no second financial-logic implementation anywhere.
 */
import { z } from "zod";
import { generateObject } from "ai";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { recordInteractionStep, recordAgentEvent } from "@/lib/observability.server";

export type ToolContext = { userId: string; sessionId: string; channel: "text" | "voice" };

type ToolDef<S extends z.ZodTypeAny> = {
  description: string;
  input: S;
  /** true = mutates state; audited at a higher level and always logged */
  mutating?: boolean;
  run: (args: z.infer<S>, ctx: ToolContext) => Promise<Record<string, unknown>>;
};

// ─── helpers ──────────────────────────────────────────────────────────────────

async function embedText(text: string): Promise<number[]> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return [];
  const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    body: JSON.stringify({ model: "google/text-embedding-004", input: text.slice(0, 8000) }),
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0]?.embedding ?? [];
}

async function loadBusiness(userId: string) {
  const { data } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data;
}

type ToolOut = Record<string, unknown>;

async function businessProfileImpl(ctx: ToolContext): Promise<ToolOut> {
  const b = await loadBusiness(ctx.userId);
  if (!b) {
    return {
      found: false,
      provenance: "USER_CONFIRMED",
      message: "No business profile yet. Ask the user to complete onboarding at /business.",
    };
  }
  return {
    found: true,
    provenance: "USER_CONFIRMED",
    business: {
      id: b.id,
      name: b.name,
      industry: b.industry,
      country: b.country,
      stage: b.stage,
      team_size: b.team_size,
      revenue_range: b.revenue_range,
      primary_objective: b.primary_objective,
      funding_requirement:
        b.funding_requirement_minor != null ? Number(b.funding_requirement_minor) / 100 : null,
      funding_currency: b.funding_currency,
      funding_purpose: b.funding_purpose,
      onboarding_complete: b.onboarding_complete,
    },
  };
}

async function financialSummaryImpl(ctx: ToolContext): Promise<ToolOut> {
  const [{ data: funding }, { data: docs }, { data: payments }] = await Promise.all([
    supabaseAdmin
      .from("funding_requests")
      .select("id, title, amount_requested, currency, status, human_approval, created_at")
      .eq("user_id", ctx.userId)
      .order("created_at", { ascending: false })
      .limit(10),
    supabaseAdmin
      .from("knowledge_documents")
      .select("doc_kind, file_name, created_at")
      .eq("user_id", ctx.userId)
      .eq("chunk_index", 0),
    supabaseAdmin
      .from("payment_transactions")
      .select("amount_minor, currency, status, plan, created_at")
      .eq("user_id", ctx.userId)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const requests = funding ?? [];
  const approved = requests.filter((r) => r.human_approval === "approved");
  const evidence = (docs ?? []).reduce<Record<string, number>>((acc, d) => {
    acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
    return acc;
  }, {});

  return {
    provenance: "EXTRACTED",
    funding_requests: requests.length,
    pending_review: requests.filter((r) => r.human_approval === "pending").length,
    approved_requests: approved.length,
    approved_capital: approved.reduce((s, r) => s + Number(r.amount_requested), 0),
    evidence_documents: (docs ?? []).length,
    evidence_by_kind: evidence,
    recent_payments: (payments ?? []).map((p) => ({
      amount: p.amount_minor / 100,
      currency: p.currency,
      status: p.status,
      plan: p.plan,
    })),
  };
}

async function trustProfileImpl(ctx: ToolContext): Promise<ToolOut> {
  const [{ data: profile }, { data: events }] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("trust_score, verified, region, display_name")
      .eq("user_id", ctx.userId)
      .maybeSingle(),
    supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", ctx.userId),
  ]);
  const list = events ?? [];
  return {
    provenance: "VERIFIED",
    trust_score: profile?.trust_score ?? 50,
    verified: profile?.verified ?? false,
    region: profile?.region ?? null,
    display_name: profile?.display_name ?? "Entrepreneur",
    verifications: {
      verified: list.filter((e) => e.status === "verified").length,
      pending: list.filter((e) => e.status === "pending").length,
      rejected: list.filter((e) => e.status === "rejected").length,
    },
  };
}

async function knowledgeImpl(ctx: ToolContext, query: string, topK: number): Promise<ToolOut> {
  const embedding = await embedText(query);
  const { data } = await supabaseAdmin.rpc("match_documents", {
    _user_id: ctx.userId,
    _embedding: JSON.stringify(embedding),
    _match_count: topK,
    _doc_kind: null as unknown as string,
  });
  const rows = (data ?? []) as { file_name: string; content: string; doc_kind: string }[];
  return {
    provenance: "EXTRACTED",
    source_count: rows.length,
    sources: rows.map((r) => ({ file_name: r.file_name, doc_kind: r.doc_kind })),
    passages: rows.map((r) => ({ file_name: r.file_name, excerpt: r.content.slice(0, 1200) })),
  };
}

// ─── tools ────────────────────────────────────────────────────────────────────

const Empty = z.object({});

export const ATLAS_TOOLS = {
  getBusinessProfile: {
    description:
      "Retrieve the entrepreneur's confirmed business profile (name, industry, country, stage, team size, revenue range, objective, funding requirement).",
    input: Empty,
    run: async (_a, ctx) => {
      const b = await loadBusiness(ctx.userId);
      if (!b) {
        return {
          found: false,
          provenance: "USER_CONFIRMED",
          message: "No business profile yet. Ask the user to complete onboarding at /business.",
        };
      }
      return {
        found: true,
        provenance: "USER_CONFIRMED",
        business: {
          id: b.id,
          name: b.name,
          industry: b.industry,
          country: b.country,
          stage: b.stage,
          team_size: b.team_size,
          revenue_range: b.revenue_range,
          primary_objective: b.primary_objective,
          funding_requirement:
            b.funding_requirement_minor != null ? Number(b.funding_requirement_minor) / 100 : null,
          funding_currency: b.funding_currency,
          funding_purpose: b.funding_purpose,
          onboarding_complete: b.onboarding_complete,
        },
      };
    },
  } satisfies ToolDef<typeof Empty>,

  getFinancialSummary: {
    description:
      "Summarise the business's recorded financial activity: funding requests, approved capital, payments, and the evidence held in the Knowledge Vault.",
    input: Empty,
    run: async (_a, ctx) => {
      const [{ data: funding }, { data: docs }, { data: payments }] = await Promise.all([
        supabaseAdmin
          .from("funding_requests")
          .select("id, title, amount_requested, currency, status, human_approval, created_at")
          .eq("user_id", ctx.userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabaseAdmin
          .from("knowledge_documents")
          .select("doc_kind, file_name, created_at")
          .eq("user_id", ctx.userId)
          .eq("chunk_index", 0),
        supabaseAdmin
          .from("payment_transactions")
          .select("amount_minor, currency, status, plan, created_at")
          .eq("user_id", ctx.userId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      const requests = funding ?? [];
      const approved = requests.filter((r) => r.human_approval === "approved");
      const evidence = (docs ?? []).reduce<Record<string, number>>((acc, d) => {
        acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
        return acc;
      }, {});

      return {
        provenance: "EXTRACTED",
        funding_requests: requests.length,
        pending_review: requests.filter((r) => r.human_approval === "pending").length,
        approved_requests: approved.length,
        approved_capital: approved.reduce((s, r) => s + Number(r.amount_requested), 0),
        evidence_documents: (docs ?? []).length,
        evidence_by_kind: evidence,
        recent_payments: (payments ?? []).map((p) => ({
          amount: p.amount_minor / 100,
          currency: p.currency,
          status: p.status,
          plan: p.plan,
        })),
      };
    },
  } satisfies ToolDef<typeof Empty>,

  getTrustProfile: {
    description: "Retrieve the Atlas trust score, verification status and verification history counts.",
    input: Empty,
    run: async (_a, ctx) => {
      const [{ data: profile }, { data: events }] = await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("trust_score, verified, region, display_name")
          .eq("user_id", ctx.userId)
          .maybeSingle(),
        supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", ctx.userId),
      ]);
      const list = events ?? [];
      return {
        provenance: "VERIFIED",
        trust_score: profile?.trust_score ?? 50,
        verified: profile?.verified ?? false,
        region: profile?.region ?? null,
        display_name: profile?.display_name ?? "Entrepreneur",
        verifications: {
          verified: list.filter((e) => e.status === "verified").length,
          pending: list.filter((e) => e.status === "pending").length,
          rejected: list.filter((e) => e.status === "rejected").length,
        },
      };
    },
  } satisfies ToolDef<typeof Empty>,

  searchBusinessKnowledge: {
    description:
      "Retrieve passages from the entrepreneur's uploaded evidence (receipts, statements, plans) in the Knowledge Vault. Always cite the returned sources; never invent one.",
    input: z.object({
      query: z.string().min(3).max(500),
      topK: z.number().int().min(1).max(8).default(5),
    }),
    run: async (args, ctx) => {
      const embedding = await embedText(args.query);
      const { data } = await supabaseAdmin.rpc("match_documents", {
        _user_id: ctx.userId,
        _embedding: JSON.stringify(embedding),
        _match_count: args.topK,
        _doc_kind: null as unknown as string,
      });
      const rows = (data ?? []) as { file_name: string; content: string; doc_kind: string }[];
      return {
        provenance: "EXTRACTED",
        source_count: rows.length,
        sources: rows.map((r) => ({ file_name: r.file_name, doc_kind: r.doc_kind })),
        passages: rows.map((r) => ({ file_name: r.file_name, excerpt: r.content.slice(0, 1200) })),
      };
    },
  } satisfies ToolDef<z.ZodObject<{ query: z.ZodString; topK: z.ZodDefault<z.ZodNumber> }>>,

  generateTreasurySummary: {
    description: "Produce a short treasury health summary grounded in recorded capital and evidence.",
    input: Empty,
    run: async (_a, ctx) => {
      const financial = await ATLAS_TOOLS.getFinancialSummary.run({}, ctx);
      const trust = await ATLAS_TOOLS.getTrustProfile.run({}, ctx);
      const capital = Number(financial.approved_capital ?? 0);
      const docs = Number(financial.evidence_documents ?? 0);
      const score = Number(trust.trust_score ?? 50);

      const grade = capital > 0 && docs >= 3 && score >= 70 ? "A" : docs >= 1 && score >= 50 ? "B" : "C";
      return {
        provenance: "ESTIMATED",
        health_grade: grade,
        approved_capital: capital,
        evidence_documents: docs,
        trust_score: score,
        recommendations: [
          docs < 3 ? "Upload at least three financial documents to strengthen evidence." : "Evidence base is adequate; keep it current.",
          score < 70 ? "Complete verifications to lift your trust score above 70." : "Maintain your verification cadence.",
          capital === 0 ? "No approved capital recorded yet — generate a funding readiness recommendation." : "Track deployment of approved capital.",
        ],
      };
    },
  } satisfies ToolDef<typeof Empty>,

  generateFundingReadiness: {
    description:
      "Generate a Funding Readiness Recommendation from the business profile, financial summary, trust profile and vault evidence. This is NOT a loan approval.",
    input: z.object({
      requestedAmount: z.number().positive().max(10_000_000).optional(),
      purpose: z.string().max(500).optional(),
    }),
    run: async (args, ctx) => {
      const [profile, financial, trust, knowledge] = await Promise.all([
        ATLAS_TOOLS.getBusinessProfile.run({}, ctx),
        ATLAS_TOOLS.getFinancialSummary.run({}, ctx),
        ATLAS_TOOLS.getTrustProfile.run({}, ctx),
        ATLAS_TOOLS.searchBusinessKnowledge.run(
          { query: args.purpose ?? "revenue, expenses, inventory, cash flow", topK: 5 },
          ctx,
        ),
      ]);

      const key = process.env.LOVABLE_API_KEY;
      if (!key) return { error: "AI gateway not configured." };
      const gateway = createLovableAiGatewayProvider(key);

      const schema = z.object({
        readiness_score: z.number().min(0).max(100),
        recommended_range: z.object({ min: z.number(), max: z.number(), currency: z.string() }),
        evidence: z.array(z.string()).min(1).max(6),
        missing_information: z.array(z.string()).max(6),
        risk_factors: z.array(z.string()).max(6),
        next_steps: z.array(z.string()).min(1).max(5),
        rationale: z.string().max(1200),
      });

      const t0 = Date.now();
      const { object } = await generateObject({
        model: gateway("google/gemini-2.5-flash"),
        schema,
        prompt: `Produce a FUNDING READINESS RECOMMENDATION (never a loan approval) for this entrepreneur.

BUSINESS PROFILE (user-confirmed): ${JSON.stringify(profile)}
FINANCIAL SUMMARY (extracted from records): ${JSON.stringify(financial)}
TRUST PROFILE (verified events): ${JSON.stringify(trust)}
VAULT EVIDENCE (retrieved passages): ${JSON.stringify(knowledge)}
REQUESTED: ${args.requestedAmount ?? "not stated"} for ${args.purpose ?? "unstated purpose"}

Rules: cite only evidence actually present above. If evidence is thin, say so in missing_information and keep the recommended range conservative.`,
      });

      void recordAgentEvent({
        userId: ctx.userId,
        agent: "Atlas CFO",
        action: "funding_readiness",
        latencyMs: Date.now() - t0,
        confidence: object.readiness_score / 100,
        outcome: "generated",
        sourcesRetrieved: Number(knowledge.source_count ?? 0),
        metadata: { sessionId: ctx.sessionId, channel: ctx.channel },
      });

      return { provenance: "ESTIMATED", label: "Funding Readiness Recommendation", ...object };
    },
  } satisfies ToolDef<z.ZodObject<{ requestedAmount: z.ZodOptional<z.ZodNumber>; purpose: z.ZodOptional<z.ZodString> }>>,

  requestHumanReview: {
    description:
      "Escalate to a human reviewer. Creates a funding request in `submitted` state (awaiting human review) and notifies reviewers. Only call after the user explicitly confirms the amount and purpose.",
    input: z.object({
      title: z.string().min(3).max(160),
      amount: z.number().positive().max(10_000_000),
      currency: z.string().min(3).max(3).default("USD"),
      purpose: z.string().min(10).max(2000),
    }),
    mutating: true,
    run: async (args, ctx) => {
      const business = await loadBusiness(ctx.userId);
      const { data, error } = await supabaseAdmin
        .from("funding_requests")
        .insert({
          user_id: ctx.userId,
          business_id: business?.id ?? null,
          title: args.title,
          pitch: args.purpose,
          amount_requested: args.amount,
          currency: args.currency.toUpperCase(),
          sector: business?.industry ?? null,
          region: business?.country ?? null,
          attachments: [],
          status: "submitted",
          human_approval: "pending",
        })
        .select("id, title, amount_requested, currency, status, human_approval")
        .single();

      if (error) return { created: false, error: error.message };

      return {
        created: true,
        awaiting: "human_review",
        request_id: data.id,
        title: data.title,
        amount: data.amount_requested,
        currency: data.currency,
        status: data.status,
      };
    },
  } satisfies ToolDef<
    z.ZodObject<{
      title: z.ZodString;
      amount: z.ZodNumber;
      currency: z.ZodDefault<z.ZodString>;
      purpose: z.ZodString;
    }>
  >,
} as const;

export type AtlasToolName = keyof typeof ATLAS_TOOLS;

export function isAtlasTool(name: string): name is AtlasToolName {
  return Object.prototype.hasOwnProperty.call(ATLAS_TOOLS, name);
}

/**
 * Validated, audited execution of a single tool.
 * Never trust a model-supplied user id — ctx.userId comes from the verified session.
 */
export async function runAtlasTool(
  name: string,
  rawArgs: unknown,
  ctx: ToolContext,
): Promise<Record<string, unknown>> {
  if (!isAtlasTool(name)) return { error: `Unknown tool: ${name}` };
  const def = ATLAS_TOOLS[name] as ToolDef<z.ZodTypeAny>;
  const startedAt = Date.now();

  const parsed = def.input.safeParse(rawArgs ?? {});
  if (!parsed.success) {
    void recordInteractionStep({
      userId: ctx.userId,
      workflowId: ctx.sessionId,
      step: `tool:${name}`,
      status: "error",
      metadata: { channel: ctx.channel, error: "invalid_input", issues: parsed.error.issues.slice(0, 4) },
    });
    return { error: "Invalid tool input", issues: parsed.error.issues.map((i) => i.message) };
  }

  try {
    const output = await def.run(parsed.data, ctx);

    void recordInteractionStep({
      userId: ctx.userId,
      workflowId: ctx.sessionId,
      step: `tool:${name}`,
      status: "complete",
      metadata: {
        channel: ctx.channel,
        agent: "Atlas CFO",
        durationMs: Date.now() - startedAt,
        mutating: def.mutating ?? false,
        outputKeys: Object.keys(output).slice(0, 12),
      },
    });

    if (def.mutating) {
      await supabaseAdmin.rpc("log_audit", {
        _actor: ctx.userId,
        _action: `agent.tool.${name}`,
        _entity_type: "agent_tool",
        _entity_id: null as unknown as string,
        _subject: ctx.userId,
        _summary: `Atlas CFO executed ${name} (${ctx.channel})`,
        _details: { sessionId: ctx.sessionId, output },
      });
    }

    return output;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Tool execution failed";
    void recordInteractionStep({
      userId: ctx.userId,
      workflowId: ctx.sessionId,
      step: `tool:${name}`,
      status: "error",
      metadata: { channel: ctx.channel, error: message },
    });
    return { error: message };
  }
}
