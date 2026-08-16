import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const seedDemoBusiness_createServerFn_handler = createServerRpc({
  id: "f5516b38bd74882f5b4ec7ccc3f701ec8a84581e6b00443a2b6899e65cc7a4a6",
  name: "seedDemoBusiness",
  filename: "src/lib/demo.functions.ts"
}, (opts) => seedDemoBusiness.__executeServer(opts));
const seedDemoBusiness = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(seedDemoBusiness_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    DEMO_BUSINESS,
    DEMO_DOCUMENTS
  } = await import("./demo.server-B0Q4zU8T.mjs");
  const userId = context.userId;
  const {
    data: existing
  } = await supabaseAdmin.from("businesses").select("id").eq("user_id", userId).order("created_at", {
    ascending: true
  }).limit(1).maybeSingle();
  const fields = {
    ...DEMO_BUSINESS,
    onboarding_complete: true
  };
  let businessId;
  if (existing?.id) {
    const {
      data,
      error
    } = await supabaseAdmin.from("businesses").update(fields).eq("id", existing.id).eq("user_id", userId).select("id").single();
    if (error) throw new Error(error.message);
    businessId = data.id;
  } else {
    const {
      data,
      error
    } = await supabaseAdmin.from("businesses").insert({
      ...fields,
      user_id: userId
    }).select("id").single();
    if (error) throw new Error(error.message);
    businessId = data.id;
  }
  await supabaseAdmin.from("knowledge_documents").delete().eq("user_id", userId).in("file_name", DEMO_DOCUMENTS.map((d) => d.file_name));
  const key = process.env["LOVABLE_API_KEY"];
  async function embed(text) {
    if (!key) return null;
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": key,
          "X-Lovable-AIG-SDK": "vercel-ai-sdk"
        },
        body: JSON.stringify({
          model: "google/text-embedding-004",
          input: text.slice(0, 8e3)
        })
      });
      if (!res.ok) return null;
      const json = await res.json();
      return JSON.stringify(json.data[0].embedding);
    } catch {
      return null;
    }
  }
  const rows = await Promise.all(DEMO_DOCUMENTS.map(async (doc) => ({
    user_id: userId,
    file_name: doc.file_name,
    file_type: "text/markdown",
    doc_kind: doc.doc_kind,
    tags: doc.tags,
    content: doc.content,
    chunk_index: 0,
    total_chunks: 1,
    embedding: await embed(doc.content)
  })));
  const {
    error: docError
  } = await supabaseAdmin.from("knowledge_documents").insert(rows);
  if (docError) throw new Error(docError.message);
  return {
    businessId,
    documents: rows.length,
    embedded: rows.filter((r) => r.embedding !== null).length
  };
});
export {
  seedDemoBusiness_createServerFn_handler
};
