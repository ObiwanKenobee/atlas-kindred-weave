import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Database } from "@/integrations/supabase/types";

// POST /api/session
// Body: { purpose?: "cfo_voice" | "vault_query" | "live_session" }
// Returns: { token, expiresAt, sessionId }
//
// Security model:
// - Requires valid Supabase Bearer token in Authorization header
// - Mints a cryptographically random hex token stored in ephemeral_sessions
// - Token expires in 5 minutes and is single-use
// - The raw API key (LOVABLE_API_KEY / ELEVENLABS_API_KEY) is NEVER sent to the client
// - Downstream services (CFO voice, vault) validate by calling verifyEphemeralToken()

export const Route = createFileRoute("/api/session")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // ── Auth ──────────────────────────────────────────────────────────
        const authHeader = request.headers.get("authorization") ?? "";
        if (!authHeader.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice(7);

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
          return Response.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const userClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
          global: { headers: { Authorization: `Bearer ${token}` } },
          auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        });

        const { data, error } = await userClient.auth.getClaims(token);
        if (error || !data?.claims?.sub) {
          return Response.json({ error: "Invalid token" }, { status: 401 });
        }
        const userId = data.claims.sub;

        // ── Parse body ────────────────────────────────────────────────────
        let purpose: string = "cfo_voice";
        try {
          const body = (await request.json()) as { purpose?: string };
          if (body.purpose) purpose = body.purpose;
        } catch { /* empty body ok */ }

        // ── Cleanup stale sessions (opportunistic) ────────────────────────
        await supabaseAdmin.rpc("expire_sessions");

        // ── Mint token ────────────────────────────────────────────────────
        // 32 bytes = 64 hex chars — cryptographically random via Web Crypto
        const randomBytes = crypto.getRandomValues(new Uint8Array(32));
        const sessionToken = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, "0")).join("");

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        const { data: session, error: insertErr } = await supabaseAdmin
          .from("ephemeral_sessions")
          .insert({
            user_id: userId,
            token: sessionToken,
            purpose,
            expires_at: expiresAt,
          })
          .select("id, expires_at")
          .single();

        if (insertErr || !session) {
          return Response.json({ error: "Failed to create session" }, { status: 500 });
        }

        // ── Log to agent_events ───────────────────────────────────────────
        await supabaseAdmin.from("agent_events").insert({
          user_id: userId,
          agent: "Session Service",
          action: "session.mint",
          latency_ms: 0,
          outcome: "answered",
          metadata: { purpose, session_id: session.id },
        });

        return Response.json({
          token: sessionToken,
          sessionId: session.id,
          expiresAt: session.expires_at,
          purpose,
        });
      },
    },
  },
});
