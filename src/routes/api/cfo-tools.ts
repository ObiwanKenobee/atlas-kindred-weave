import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ElevenLabs sends tool-call webhooks to this endpoint during a conversation.
// Docs: https://elevenlabs.io/docs/conversational-ai/customization/tools/server-tools
//
// Each request body: { type: "tool_call", tool_call: { tool_name, tool_call_id, parameters } }
// We must respond: { type: "tool_result", tool_call_id, result: <JSON string> }

type ToolCall = {
  tool_name: string;
  tool_call_id: string;
  parameters: Record<string, unknown>;
};

type WebhookBody = {
  type: string;
  tool_call: ToolCall;
  // ElevenLabs passes user metadata we injected at session-start via dynamic_variables
  conversation_id?: string;
  agent_id?: string;
  dynamic_variables?: Record<string, string>;
};

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
        // Pull top-level readiness score from decision report if present
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
      // Aggregate the user's approved funding as a proxy for treasury insight
      const { data: approved } = await supabaseAdmin
        .from("funding_requests")
        .select("amount_requested, currency, created_at")
        .eq("user_id", userId)
        .eq("human_approval", "approved");

      const totalCapital = (approved ?? []).reduce((s, r) => s + Number(r.amount_requested), 0);

      // Pull knowledge docs for financial context (receipts, invoices)
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

    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}

export const Route = createFileRoute("/api/cfo-tools")({
  server: {
    handlers: {
      POST: async () => {
        const request = getRequest();
        const body = (await request.json()) as WebhookBody;

        if (body.type !== "tool_call" || !body.tool_call) {
          return Response.json({ error: "Not a tool_call event" }, { status: 400 });
        }

        // userId is injected as a dynamic variable when we create the signed session URL
        const userId = body.dynamic_variables?.user_id;
        if (!userId) {
          return Response.json({ type: "tool_result", tool_call_id: body.tool_call.tool_call_id, result: JSON.stringify({ error: "user_id not provided in dynamic_variables" }) });
        }

        const result = await dispatch(body.tool_call.tool_name, body.tool_call.parameters ?? {}, userId);

        return Response.json({
          type: "tool_result",
          tool_call_id: body.tool_call.tool_call_id,
          result: JSON.stringify(result),
        });
      },
    },
  },
});
