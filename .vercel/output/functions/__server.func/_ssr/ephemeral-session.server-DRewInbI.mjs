import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
async function verifyEphemeralToken(token, expectedPurpose) {
  if (!token?.trim()) return null;
  const { data: session, error } = await supabaseAdmin.from("ephemeral_sessions").select("id, user_id, purpose, expires_at, used_at").eq("token", token).maybeSingle();
  if (error || !session) return null;
  if (session.used_at) return null;
  if (new Date(session.expires_at) < /* @__PURE__ */ new Date()) return null;
  if (expectedPurpose && session.purpose !== expectedPurpose) return null;
  await supabaseAdmin.from("ephemeral_sessions").update({ used_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", session.id);
  return { userId: session.user_id, sessionId: session.id };
}
async function mintEphemeralSession(userId, purpose) {
  await supabaseAdmin.rpc("expire_sessions");
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const sessionToken = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1e3).toISOString();
  const { data: session, error } = await supabaseAdmin.from("ephemeral_sessions").insert({ user_id: userId, token: sessionToken, purpose, expires_at: expiresAt }).select("id, expires_at").single();
  if (error || !session) throw new Error("Failed to mint ephemeral session");
  return { token: sessionToken, sessionId: session.id, expiresAt: session.expires_at };
}
export {
  mintEphemeralSession as m,
  verifyEphemeralToken as v
};
