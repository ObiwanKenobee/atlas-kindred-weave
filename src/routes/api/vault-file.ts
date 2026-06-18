import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyEphemeralToken } from "@/lib/ephemeral-session.server";
import type { Database } from "@/integrations/supabase/types";

async function resolveUserId(request: Request): Promise<string | null> {
  const ephemeralHeader = request.headers.get("x-ephemeral-token");
  if (ephemeralHeader) {
    const session = await verifyEphemeralToken(ephemeralHeader, "vault_query");
    return session?.userId ?? null;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const userClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await userClient.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub;
}

export const Route = createFileRoute("/api/vault-file")({
  server: {
    handlers: {
      GET: async () => {
        const request = getRequest();
        const url = new URL(request.url);
        const path = url.searchParams.get("path");

        if (!path) return Response.json({ error: "path required" }, { status: 400 });

        const userId = await resolveUserId(request);
        if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

        // Storage paths are scoped as {userId}/...
        if (!path.startsWith(`${userId}/`)) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        const { data: doc } = await supabaseAdmin
          .from("knowledge_documents")
          .select("id")
          .eq("user_id", userId)
          .eq("storage_path", path)
          .limit(1)
          .maybeSingle();

        if (!doc) return Response.json({ error: "Document not found" }, { status: 404 });

        const { data: signed, error: signErr } = await supabaseAdmin.storage
          .from("knowledge-vault")
          .createSignedUrl(path, 120);

        if (signErr || !signed?.signedUrl) {
          return Response.json({ error: "Could not generate signed URL" }, { status: 500 });
        }

        return Response.redirect(signed.signedUrl, 302);
      },
    },
  },
});
