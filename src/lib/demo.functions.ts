import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Seeds a demo business plus its vault documents for the signed-in user so the
 * full economic loop (business → evidence → CFO → funding readiness) can be walked.
 * Idempotent: existing demo documents are replaced, an existing business is updated.
 */
export const seedDemoBusiness = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { DEMO_BUSINESS, DEMO_DOCUMENTS } = await import("@/lib/demo.server");
    const userId = context.userId;

    const { data: existing } = await supabaseAdmin
      .from("businesses")
      .select("id")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    const fields = { ...DEMO_BUSINESS, onboarding_complete: true };

    let businessId: string;
    if (existing?.id) {
      const { data, error } = await supabaseAdmin
        .from("businesses")
        .update(fields)
        .eq("id", existing.id)
        .eq("user_id", userId)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      businessId = data.id;
    } else {
      const { data, error } = await supabaseAdmin
        .from("businesses")
        .insert({ ...fields, user_id: userId })
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      businessId = data.id;
    }

    // Replace any previous demo documents so re-running stays clean.
    await supabaseAdmin
      .from("knowledge_documents")
      .delete()
      .eq("user_id", userId)
      .in(
        "file_name",
        DEMO_DOCUMENTS.map((d) => d.file_name),
      );

    const key = process.env["LOVABLE_API_KEY"];

    async function embed(text: string): Promise<string | null> {
      if (!key) return null;
      try {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
          body: JSON.stringify({ model: "google/text-embedding-004", input: text.slice(0, 8000) }),
        });
        if (!res.ok) return null;
        const json = (await res.json()) as { data: { embedding: number[] }[] };
        return JSON.stringify(json.data[0].embedding);
      } catch {
        return null;
      }
    }

    const rows = await Promise.all(
      DEMO_DOCUMENTS.map(async (doc) => ({
        user_id: userId,
        file_name: doc.file_name,
        file_type: "text/markdown",
        doc_kind: doc.doc_kind,
        tags: doc.tags,
        content: doc.content,
        chunk_index: 0,
        total_chunks: 1,
        embedding: await embed(doc.content),
      })),
    );

    const { error: docError } = await supabaseAdmin.from("knowledge_documents").insert(rows);
    if (docError) throw new Error(docError.message);

    return {
      businessId,
      documents: rows.length,
      embedded: rows.filter((r) => r.embedding !== null).length,
    };
  });
