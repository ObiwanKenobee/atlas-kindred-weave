import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type EphemeralPurpose = "cfo_voice" | "vault_query" | "live_session" | "cfo_tools";

export async function verifyEphemeralToken(
  token: string,
  expectedPurpose?: EphemeralPurpose,
): Promise<{ userId: string; sessionId: string } | null> {
  if (!token?.trim()) return null;

  const { data: session, error } = await supabaseAdmin
    .from("ephemeral_sessions")
    .select("id, user_id, purpose, expires_at, used_at")
    .eq("token", token)
    .maybeSingle();

  if (error || !session) return null;
  if (session.used_at) return null;
  if (new Date(session.expires_at) < new Date()) return null;
  if (expectedPurpose && session.purpose !== expectedPurpose) return null;

  await supabaseAdmin
    .from("ephemeral_sessions")
    .update({ used_at: new Date().toISOString() })
    .eq("id", session.id);

  return { userId: session.user_id, sessionId: session.id };
}

export async function mintEphemeralSession(
  userId: string,
  purpose: EphemeralPurpose,
): Promise<{ token: string; sessionId: string; expiresAt: string }> {
  await supabaseAdmin.rpc("expire_sessions");

  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const sessionToken = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("ephemeral_sessions")
    .insert({ user_id: userId, token: sessionToken, purpose, expires_at: expiresAt })
    .select("id, expires_at")
    .single();

  if (error || !session) throw new Error("Failed to mint ephemeral session");

  return { token: sessionToken, sessionId: session.id, expiresAt: session.expires_at };
}
