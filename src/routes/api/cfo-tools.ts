import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { generateObject } from "ai";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { recordAgentEvent } from "@/lib/observability.server";
import { verifyEphemeralToken } from "@/lib/ephemeral-session.server";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit.server";
import { z } from "zod";

type ToolCall = {
  tool_name: string;
  tool_call_id: string;
  parameters: Record<string, unknown>;
};

type WebhookBody = {
  type: string;
  tool_call: ToolCall;
  conversation_id?: string;
  agent_id?: string;
  dynamic_variables?: Record<string, string>;
};

const OpportunityQuickSchema = z.object({
  opportunities: z.array(z.object({
    title: z.string(),
    type: z.string(),
    fit_score: z.number(),
    next_step: z.string(),
  })).min(1).max(5),
  summary: z.string(),
});

const TreasuryQuickSchema = z.object({
  health_score: z.string(),
  headline: z.string(),
  cashflow_assessment: z.string(),
  recommendations: z.array(z.string()).min(1).max(4),
});

function normalizeToolName(name: string): string {
  const map: Record<string, string> = {
    createFundingRequest: "create_funding_request",
    updateTrustScore: "update_trust_score",
    generateTreasuryReport: "generate_treasury_report",
    createVerificationRecord: "create_verification_record",
    findFundingOpportunities: "find_funding_opportunities",
    sendNotification: "send_notification",
    getTrustScore: "get_trust_score",
    getFundingStatus: "get_funding_status",
    getTreasuryMetrics: "get_treasury_metrics",
  };
  return map[name] ?? name;
}

async function dispatch(toolName: string, params: Record<string, unknown>, userId: string) {
  switch (toolName) {
    case "get_trust_score": {
      const { data } = await supabaseAdmin
        .from("profiles")
        .select("trust_score, verified, display_name, region")
        .eq("user_id", userId)
        .single();
      const { data: verEvents } = await supabaseAdmin
        .from("verification_events")
        .select("status, kind")
        .eq("user_id", userId);
      const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
      return {
        atlasScore: data?.trust_score ?? 50,
        trust_score: data?.trust_score ?? 50,
        verified: data?.verified ?? false,
        verified_proofs: verified,
        region: data?.region ?? "unknown",
        display_name: data?.display_name ?? "Entrepreneur",
      };
    }

    case "get_funding_status": {
      const { data } = await supabaseAdmin
        .from("funding_requests")
        .select("id, title, amount_requested, currency, status, human_approval, decision_report, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);
      const requests = (data ?? []).map((r) => ({
        id: r.id,
        title: r.title,
        amount: r.amount_requested,
        currency: r.currency,
        status: r.status,
        human_approval: r.human_approval,
        funding_readiness: (r.decision_report as Record<string, unknown> | null)
          ? ((r.decision_report as Record<string, unknown>)?.trust_assessment as Record<string, number> | undefined)?.score ?? null
          : null,
      }));
      return { recent_requests: requests, total: requests.length };
    }

    case "create_funding_request": {
      const title = String(params.title ?? "Voice Funding Request");
      const amount = Number(params.amount ?? 0);
      const currency = String(params.currency ?? "USD");
      const pitch = String(params.pitch ?? "Submitted via Atlas CFO voice conversation.");
      const sector = params.sector ? String(params.sector) : null;
      const region = params.region ? String(params.region) : null;

      if (amount <= 0) return { error: "Amount must be greater than zero." };

      const { data, error } = await supabaseAdmin
        .from("funding_requests")
        .insert({
          user_id: userId,
          title,
          pitch,
          amount_requested: amount,
          currency,
          sector,
          region,
          attachments: [],
          status: "submitted",
        })
        .select("id, title, amount_requested, currency, status")
        .single();

      if (error) return { error: error.message };
      return { created: true, request_id: data.id, title: data.title, amount: data.amount_requested, currency: data.currency, status: data.status };
    }

    case "get_treasury_metrics": {
      const { data: approved } = await supabaseAdmin
        .from("funding_requests")
        .select("amount_requested, currency, created_at")
        .eq("user_id", userId)
        .eq("human_approval", "approved");

      const totalCapital = (approved ?? []).reduce((s, r) => s + Number(r.amount_requested), 0);

      const { data: docs } = await supabaseAdmin
        .from("knowledge_documents")
        .select("doc_kind, created_at")
        .eq("user_id", userId)
        .eq("chunk_index", 0);

      const docKinds = (docs ?? []).reduce<Record<string, number>>((acc, d) => {
        acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
        return acc;
      }, {});

      return {
        total_capital_approved: totalCapital,
        approved_requests: (approved ?? []).length,
        document_summary: docKinds,
        currency: "USD",
      };
    }

    case "update_trust_score": {
      const delta = Number(params.delta ?? 0);
      const reason = String(params.reason ?? "Adjusted via Atlas CFO");
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("trust_score")
        .eq("user_id", userId)
        .single();

      const current = profile?.trust_score ?? 50;
      const next = Math.max(0, Math.min(100, Math.round(current + delta)));

      await supabaseAdmin
        .from("profiles")
        .update({ trust_score: next, updated_at: new Date().toISOString() })
        .eq("user_id", userId);

      await supabaseAdmin.from("risk_scores").insert({
        user_id: userId,
        trust_score: next,
        risk_level: next >= 70 ? "low" : next >= 40 ? "medium" : "high",
        recommendation: "manual_adjustment",
        rationale: reason,
        flags: [],
        signals: { delta, source: "cfo_voice" },
      });

      return { atlasScore: next, previous: current, delta, reason };
    }

    case "create_verification_record": {
      const kind = String(params.kind ?? "other");
      const claim = String(params.claim ?? "Submitted via Atlas CFO voice session.");
      const status = String(params.status ?? "pending");

      const { data, error } = await supabaseAdmin
        .from("verification_events")
        .insert({
          user_id: userId,
          kind,
          status: ["verified", "rejected", "pending"].includes(status) ? status : "pending",
          evidence_url: params.evidence_url ? String(params.evidence_url) : null,
          notes: JSON.stringify({ claim, source: "cfo_voice", confidence: params.confidence ?? null }),
        })
        .select("id, kind, status")
        .single();

      if (error) return { error: error.message };
      return {
        verificationStatus: data.status,
        confidence: Number(params.confidence ?? 0.8),
        event_id: data.id,
      };
    }

    case "find_funding_opportunities": {
      const [{ data: profile }, { data: funding }] = await Promise.all([
        supabaseAdmin.from("profiles").select("trust_score, region, display_name").eq("user_id", userId).single(),
        supabaseAdmin.from("funding_requests").select("sector, human_approval").eq("user_id", userId).limit(5),
      ]);

      const key = process.env.LOVABLE_API_KEY;
      if (!key) return { error: "AI not configured" };
      const gateway = createLovableAiGatewayProvider(key);

      const sectors = [...new Set((funding ?? []).map((r) => r.sector).filter(Boolean))].join(", ") || "general";
      const { object } = await generateObject({
        model: gateway("google/gemini-2.5-flash"),
        schema: OpportunityQuickSchema,
        prompt: `Find 3-5 funding opportunities for ${profile?.display_name ?? "entrepreneur"} in ${profile?.region ?? "Africa"}. Trust score: ${profile?.trust_score ?? 50}/100. Sector: ${sectors}. Be concise and actionable.`,
      });

      return {
        fundingReadiness: profile?.trust_score ?? 50,
        recommendedAmount: Number(params.target_amount ?? 1500),
        confidence: 0.85,
        opportunities: object.opportunities,
        summary: object.summary,
      };
    }

    case "generate_treasury_report": {
      const [{ data: profile }, { data: funding }] = await Promise.all([
        supabaseAdmin.from("profiles").select("trust_score, display_name, region").eq("user_id", userId).single(),
        supabaseAdmin.from("funding_requests").select("title, amount_requested, human_approval").eq("user_id", userId).limit(10),
      ]);

      const approved = (funding ?? []).filter((r) => r.human_approval === "approved");
      const total = approved.reduce((s, r) => s + Number(r.amount_requested), 0);

      const key = process.env.LOVABLE_API_KEY;
      if (!key) {
        return {
          health_score: total > 0 ? "B" : "C",
          headline: `${approved.length} approved requests totaling $${total.toLocaleString()}`,
          cashflow_assessment: "Limited data — upload vault documents for richer analysis.",
          recommendations: ["Upload receipts and invoices to the Knowledge Vault", "Submit a funding request if you need capital"],
        };
      }

      const gateway = createLovableAiGatewayProvider(key);
      const { object } = await generateObject({
        model: gateway("google/gemini-2.5-flash"),
        schema: TreasuryQuickSchema,
        prompt: `Generate a brief treasury report for ${profile?.display_name}. Trust: ${profile?.trust_score}/100. Approved capital: $${total}. Region: ${profile?.region ?? "unknown"}.`,
      });

      return object;
    }

    case "send_notification": {
      const title = String(params.title ?? "Message from Atlas CFO");
      const body = String(params.body ?? "Your AI financial officer has an update for you.");
      const link = params.link ? String(params.link) : "/notifications";

      await supabaseAdmin.rpc("notify_user", {
        _user: userId,
        _kind: "cfo_message",
        _title: title,
        _body: body.slice(0, 500),
        _link: link,
        _metadata: { source: "cfo_voice" },
      });

      return { sent: true, title, link };
    }

    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}

export const Route = createFileRoute("/api/cfo-tools")({
  server: {
    handlers: {
      POST: async () => {
        const request = getRequest();
        const t0 = Date.now();
        const body = (await request.json()) as WebhookBody;

        if (body.type !== "tool_call" || !body.tool_call) {
          return Response.json({ error: "Not a tool_call event" }, { status: 400 });
        }

        const userId = body.dynamic_variables?.user_id;
        if (!userId) {
          return Response.json({
            type: "tool_result",
            tool_call_id: body.tool_call.tool_call_id,
            result: JSON.stringify({ error: "user_id not provided in dynamic_variables" }),
          });
        }

        const ephemeralToken =
          body.dynamic_variables?.ephemeral_token ??
          request.headers.get("x-ephemeral-token") ??
          "";

        if (ephemeralToken) {
          const session = await verifyEphemeralToken(ephemeralToken, "cfo_voice");
          if (!session || session.userId !== userId) {
            return Response.json({
              type: "tool_result",
              tool_call_id: body.tool_call.tool_call_id,
              result: JSON.stringify({ error: "Invalid or expired session token" }),
            });
          }
        } else if (process.env.CFO_TOOLS_REQUIRE_EPHEMERAL === "true") {
          return Response.json({
            type: "tool_result",
            tool_call_id: body.tool_call.tool_call_id,
            result: JSON.stringify({ error: "Ephemeral token required" }),
          });
        }

        // Rate limit: 30 tool calls per minute per user
        try {
          await enforceRateLimit(userId, "/api/cfo-tools");
        } catch (e) {
          if (e instanceof RateLimitError) {
            return Response.json({
              type: "tool_result",
              tool_call_id: body.tool_call.tool_call_id,
              result: JSON.stringify({ error: e.message }),
            }, { status: 429 });
          }
        }

        const toolName = normalizeToolName(body.tool_call.tool_name);
        const result = await dispatch(toolName, body.tool_call.parameters ?? {}, userId);

        void recordAgentEvent({
          userId,
          agent: "CFO Agent",
          action: `tool.${toolName}`,
          latencyMs: Date.now() - t0,
          outcome: "error" in result && result.error ? "error" : "answered",
          metadata: {
            tool: toolName,
            conversation_id: body.conversation_id ?? null,
            result_preview: JSON.stringify(result).slice(0, 200),
          },
        });

        return Response.json({
          type: "tool_result",
          tool_call_id: body.tool_call.tool_call_id,
          result: JSON.stringify(result),
        });
      },
    },
  },
});
