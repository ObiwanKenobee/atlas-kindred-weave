import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Long-term context for an entrepreneur: the verified business profile.
 * Kept small on purpose — retrieval (vault RAG) supplies the rest.
 */
export async function buildBusinessContext(userId: string): Promise<string> {
  const { data } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!data) {
    return "\n\n--- Business profile ---\nThe user has not completed business onboarding yet. If they ask about their business, invite them to complete their business profile at /business first.\n--- End business profile ---";
  }

  const b = data as Record<string, unknown>;
  const lines = [
    `Name: ${b.name}`,
    b.business_type ? `Type: ${b.business_type}` : null,
    b.industry ? `Industry: ${b.industry}` : null,
    b.country ? `Country: ${b.country}` : null,
    b.stage ? `Stage: ${b.stage}` : null,
    b.team_size != null ? `Team size: ${b.team_size}` : null,
    b.revenue_range ? `Revenue range: ${b.revenue_range}` : null,
    b.primary_objective ? `Primary objective: ${b.primary_objective}` : null,
    b.funding_requirement_minor != null
      ? `Funding requirement: ${(Number(b.funding_requirement_minor) / 100).toLocaleString()} ${b.funding_currency ?? ""}`.trim()
      : null,
    b.funding_purpose ? `Funding purpose: ${b.funding_purpose}` : null,
    b.description ? `Description: ${b.description}` : null,
  ].filter(Boolean);

  return `\n\n--- Business profile (user-confirmed, not independently verified) ---\n${lines.join("\n")}\n--- End business profile ---`;
}
