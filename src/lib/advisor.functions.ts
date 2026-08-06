import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { requireFeature } from "@/lib/entitlements.server";

const AdvisorInput = z.object({
  question: z.string().min(5).max(1000),
});

const AdvisorOutputSchema = z.object({
  answer: z.string().min(20).max(1500),
  recommendations: z.array(z.string()).min(1).max(6),
  risks: z.array(z.string()).min(0).max(4),
  next_actions: z.array(z.string()).min(1).max(4),
  confidence: z.enum(["high", "medium", "low"]),
});

export type AdvisorOutput = z.infer<typeof AdvisorOutputSchema>;

export const askAdvisor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => AdvisorInput.parse(d))
  .handler(async ({ data, context }) => {
    await requireFeature(context.userId, "cfo");
    const { userId } = context;

    const [{ data: profile }, { data: funding }, { data: verEvents }, { data: riskScore }] =
      await Promise.all([
        supabaseAdmin.from("profiles").select("display_name, trust_score, verified, region, bio").eq("user_id", userId).single(),
        supabaseAdmin.from("funding_requests").select("title, sector, amount_requested, currency, status, human_approval, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
        supabaseAdmin.from("verification_events").select("kind, status").eq("user_id", userId).limit(20),
        supabaseAdmin.from("risk_scores").select("trust_score, risk_level, recommendation").eq("user_id", userId).order("computed_at", { ascending: false }).limit(1).maybeSingle(),
      ]);

    const approved = (funding ?? []).filter((r) => r.human_approval === "approved");
    const totalFunded = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
    const sectors = [...new Set((funding ?? []).map((r) => r.sector).filter(Boolean))];
    const verifiedCount = (verEvents ?? []).filter((e) => e.status === "verified").length;

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    const prompt = `You are the Atlas AI Business Advisor — a trusted strategic advisor for entrepreneurs in emerging markets.

User profile:
- Name: ${profile?.display_name ?? "Entrepreneur"}
- Region: ${profile?.region ?? "unspecified"}
- Bio: ${profile?.bio ?? "not provided"}
- Trust score: ${profile?.trust_score ?? 50}/100
- Verified: ${profile?.verified ?? false} (${verifiedCount} verification events)
- Risk level: ${riskScore?.risk_level ?? "unknown"}

Funding history:
- Total funded: $${totalFunded.toLocaleString()} across ${approved.length} approved requests
- Sectors: ${sectors.join(", ") || "none yet"}
- Recent requests: ${(funding ?? []).length}

User's question:
"${data.question}"

Provide strategic, practical advice grounded in their specific context. Be direct, honest, and actionable. Reference their trust score and verification status where relevant. Speak like a seasoned mentor, not a textbook.`;

    const { object } = await generateObject({
      model: gateway("google/gemini-2.5-flash"),
      schema: AdvisorOutputSchema,
      prompt,
    });

    return object;
  });
