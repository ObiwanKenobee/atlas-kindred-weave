import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Per-user, per-endpoint rate limit enforced via a Postgres atomic upsert.
// Limits are per 1-minute rolling window.
const LIMITS: Record<string, number> = {
  "/api/chat": 20,
  "/api/cfo-tools": 30,
  orchestrator: 5,
  vault_query: 15,
};

export class RateLimitError extends Error {
  readonly status = 429;
  constructor(endpoint: string, limit: number) {
    super(`Rate limit exceeded for ${endpoint}: max ${limit} calls/minute.`);
  }
}

export async function enforceRateLimit(userId: string, endpoint: string): Promise<void> {
  const limit = LIMITS[endpoint] ?? 20;

  const { data, error } = await supabaseAdmin.rpc("increment_rate_limit", {
    _user_id: userId,
    _endpoint: endpoint,
    _limit: limit,
  });

  if (error) {
    // Never let rate-limit failures block the user — just log and continue
    console.error("[rate-limit] RPC error:", error.message);
    return;
  }

  if ((data as number) > limit) {
    throw new RateLimitError(endpoint, limit);
  }
}
