import { c as createServerRpc } from "./createServerRpc-Dhdlfwot.mjs";
import { c as createServerFn } from "./server-BWHKBO2n.mjs";
import { a as generateText } from "../_libs/ai.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-16OviFoD.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { r as recordAgentEvent } from "./observability.server-D5WP9btl.mjs";
import { r as requireFeature, a as requireVaultCapacity } from "./entitlements.server-Dp7K62E0.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, i as stringType, j as arrayType, k as enumType, h as numberType } from "../_libs/zod.mjs";
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
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./entitlements-DDmJ5IMx.mjs";
async function embedText(text) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
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
  if (!res.ok) throw new Error(`Embedding request failed: ${await res.text()}`);
  const json = await res.json();
  return json.data[0].embedding;
}
function chunkText(text, maxChars = 1500, overlap = 200) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  let pos = 0;
  while (pos < text.length) {
    chunks.push(text.slice(pos, pos + maxChars));
    pos += maxChars - overlap;
  }
  return chunks;
}
const ExtractInput = objectType({
  storagePath: stringType().min(1).optional(),
  base64: stringType().min(1).optional(),
  mimeType: stringType().min(1),
  fileName: stringType().min(1),
  docKind: stringType().optional()
});
const extractDocumentContent_createServerFn_handler = createServerRpc({
  id: "6d3a556270650db74f1939917b771551f585d26d5ebb3526dcfaf92b730c4571",
  name: "extractDocumentContent",
  filename: "src/lib/vault.functions.ts"
}, (opts) => extractDocumentContent.__executeServer(opts));
const extractDocumentContent = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ExtractInput.parse(d)).handler(extractDocumentContent_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "vault");
  const {
    userId
  } = context;
  const t0 = Date.now();
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  let imageUrl = null;
  if (data.storagePath) {
    if (!data.storagePath.startsWith(`${userId}/`)) {
      throw new Error("Access denied");
    }
    const {
      data: signed,
      error
    } = await supabaseAdmin.storage.from("knowledge-vault").createSignedUrl(data.storagePath, 120);
    if (error || !signed?.signedUrl) throw new Error("Could not access file for extraction");
    imageUrl = signed.signedUrl;
  }
  const isImage = data.mimeType.startsWith("image/");
  const isPdf = data.mimeType === "application/pdf";
  const isAudio = data.mimeType.startsWith("audio/");
  let extractedText = "";
  if (data.mimeType === "text/plain" && data.base64) {
    extractedText = atob(data.base64);
  } else if (isImage || isPdf) {
    const url = imageUrl ?? (data.base64 ? `data:${data.mimeType};base64,${data.base64}` : null);
    if (!url) throw new Error("Provide storagePath or base64 for vision extraction");
    const prompt = `You are the Atlas Document Intelligence layer. Extract ALL readable text and structured data from this ${isPdf ? "PDF document" : "image"}.

File: ${data.fileName}
Document kind hint: ${data.docKind ?? "general"}

Extract:
- All visible text (OCR)
- Dates, amounts, vendor names, line items (for receipts/invoices)
- Inventory counts or product descriptions (for inventory photos)
- Key business facts

Return plain text only — no markdown headers. Be thorough and factual.`;
    const {
      text
    } = await generateText({
      model: gateway("google/gemini-2.5-flash"),
      prompt: `${prompt}

Document URL: ${url}`
    });
    extractedText = text.trim();
  } else if (isAudio) {
    extractedText = "[Audio file uploaded — paste a transcript manually, or use Scribe v2 transcription in production.]";
  } else {
    throw new Error("Unsupported file type for auto-extraction");
  }
  if (!extractedText.trim()) {
    throw new Error("Could not extract text from this file. Paste content manually.");
  }
  void recordAgentEvent({
    userId,
    agent: "Knowledge Vault",
    action: "document_extraction",
    latencyMs: Date.now() - t0,
    outcome: "answered",
    metadata: {
      fileName: data.fileName,
      mimeType: data.mimeType,
      chars: extractedText.length
    }
  });
  return {
    content: extractedText,
    charCount: extractedText.length
  };
});
const IngestInput = objectType({
  storagePath: stringType().min(1),
  fileName: stringType().min(1),
  fileType: enumType(["pdf", "image", "audio", "text"]),
  content: stringType().min(1),
  docKind: enumType(["business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript", "general"]).default("general"),
  fundingRequestId: stringType().uuid().optional(),
  tags: arrayType(stringType()).default([])
});
const ingestDocument_createServerFn_handler = createServerRpc({
  id: "712432c5d69ae65bf55e5b7442a349131d9335fe155393fdee154cea39d059f4",
  name: "ingestDocument",
  filename: "src/lib/vault.functions.ts"
}, (opts) => ingestDocument.__executeServer(opts));
const ingestDocument = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => IngestInput.parse(d)).handler(ingestDocument_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireVaultCapacity(context.userId);
  const {
    userId
  } = context;
  const t0 = Date.now();
  const chunks = chunkText(data.content);
  const rows = await Promise.all(chunks.map(async (chunk, i) => {
    const embedding = await embedText(chunk);
    return {
      user_id: userId,
      file_name: data.fileName,
      file_type: data.fileType,
      storage_path: data.storagePath,
      content: chunk,
      chunk_index: i,
      total_chunks: chunks.length,
      embedding: JSON.stringify(embedding),
      doc_kind: data.docKind,
      funding_request_id: data.fundingRequestId ?? null,
      tags: data.tags
    };
  }));
  const {
    error
  } = await supabaseAdmin.from("knowledge_documents").insert(rows);
  if (error) throw new Error(error.message);
  void recordAgentEvent({
    userId,
    agent: "Knowledge Vault",
    action: "document_ingest",
    latencyMs: Date.now() - t0,
    outcome: "answered",
    sourcesRetrieved: 0,
    metadata: {
      fileName: data.fileName,
      chunks: chunks.length,
      docKind: data.docKind
    }
  });
  return {
    chunksIndexed: chunks.length,
    fileName: data.fileName
  };
});
const SearchInput = objectType({
  query: stringType().min(1),
  topK: numberType().int().min(1).max(20).default(5),
  docKind: enumType(["business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript", "general"]).optional()
});
const searchVault_createServerFn_handler = createServerRpc({
  id: "d942063027803c1dfc5ae0aa69dd6684058bdc3659f71385c7351613fd13ddfe",
  name: "searchVault",
  filename: "src/lib/vault.functions.ts"
}, (opts) => searchVault.__executeServer(opts));
const searchVault = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => SearchInput.parse(d)).handler(searchVault_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "vault");
  const {
    userId
  } = context;
  const embedding = await embedText(data.query);
  const {
    data: rows,
    error
  } = await supabaseAdmin.rpc("match_documents", {
    _user_id: userId,
    _embedding: JSON.stringify(embedding),
    _match_count: data.topK,
    _doc_kind: data.docKind ?? null
  });
  if (error) throw new Error(error.message);
  return {
    results: rows ?? []
  };
});
const QueryInput = objectType({
  question: stringType().min(5).max(1e3),
  topK: numberType().int().min(1).max(10).default(6)
});
const queryVault_createServerFn_handler = createServerRpc({
  id: "762e54f5f840938d1a0b232d4d6e621b955ea22d39aabf93c32de370fa370202",
  name: "queryVault",
  filename: "src/lib/vault.functions.ts"
}, (opts) => queryVault.__executeServer(opts));
const queryVault = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => QueryInput.parse(d)).handler(queryVault_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "vault");
  const {
    userId
  } = context;
  const t0 = Date.now();
  const embedding = await embedText(data.question);
  const {
    data: chunks,
    error
  } = await supabaseAdmin.rpc("match_documents", {
    _user_id: userId,
    _embedding: JSON.stringify(embedding),
    _match_count: data.topK,
    _doc_kind: null
  });
  if (error) throw new Error(error.message);
  const results = chunks ?? [];
  if (results.length === 0) {
    return {
      answer: "I found no documents in your Knowledge Vault yet. Upload your business records — receipts, invoices, plans, or statements — and I can reason over them.",
      sources: [],
      confidence: 0
    };
  }
  const contextBlock = results.map((r, i) => `[${i + 1}] ${r.file_name} (${r.doc_kind}, similarity ${(r.similarity * 100).toFixed(0)}%)
${r.content}`).join("\n\n---\n\n");
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");
  const gateway = createLovableAiGatewayProvider(key);
  const prompt = `You are the Atlas Knowledge Engine — the financial intelligence layer of Atlas Sanctum.

You have retrieved the following evidence from the user's Business Knowledge Vault:

${contextBlock}

---

User question: "${data.question}"

Instructions:
- Answer ONLY using the retrieved evidence above. Do not hallucinate.
- Cite sources by number, e.g. "According to [1]..."
- If the evidence is insufficient to answer confidently, say so explicitly.
- Be concrete. Use numbers, dates, and facts from the documents.
- End with a one-line confidence assessment: "Confidence: High / Medium / Low — [reason]"`;
  const {
    text
  } = await generateText({
    model: gateway("google/gemini-2.5-flash"),
    prompt
  });
  const sources = results.map((r) => ({
    index: results.indexOf(r) + 1,
    fileName: r.file_name,
    docKind: r.doc_kind,
    excerpt: r.content.slice(0, 200),
    similarity: r.similarity
  }));
  void recordAgentEvent({
    userId,
    agent: "Knowledge Vault",
    action: "vault_query",
    latencyMs: Date.now() - t0,
    outcome: "answered",
    sourcesRetrieved: results.length,
    confidence: results[0]?.similarity ?? void 0,
    metadata: {
      questionLength: data.question.length
    }
  });
  return {
    answer: text,
    sources,
    confidence: results[0]?.similarity ?? 0
  };
});
const DeleteInput = objectType({
  storagePath: stringType().min(1)
});
const deleteFromVault_createServerFn_handler = createServerRpc({
  id: "7cad4ea5ff2572816da0d26bde9b6f0a53dba7fa7131ceab5b441841fc36dd27",
  name: "deleteFromVault",
  filename: "src/lib/vault.functions.ts"
}, (opts) => deleteFromVault.__executeServer(opts));
const deleteFromVault = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => DeleteInput.parse(d)).handler(deleteFromVault_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    error
  } = await supabaseAdmin.from("knowledge_documents").delete().eq("user_id", userId).eq("storage_path", data.storagePath);
  if (error) throw new Error(error.message);
  await supabaseAdmin.storage.from("knowledge-vault").remove([data.storagePath]);
  return {
    ok: true
  };
});
const VaultFileInput = objectType({
  storagePath: stringType().min(1)
});
const getVaultFileUrl_createServerFn_handler = createServerRpc({
  id: "d72ba26cb2d780c9214cdeafeef0761ad116eab19d5d5b8569867dba976ebe2c",
  name: "getVaultFileUrl",
  filename: "src/lib/vault.functions.ts"
}, (opts) => getVaultFileUrl.__executeServer(opts));
const getVaultFileUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => VaultFileInput.parse(d)).handler(getVaultFileUrl_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  if (!data.storagePath.startsWith(`${userId}/`)) throw new Error("Access denied");
  const {
    data: doc
  } = await supabaseAdmin.from("knowledge_documents").select("id").eq("user_id", userId).eq("storage_path", data.storagePath).limit(1).maybeSingle();
  if (!doc) throw new Error("Document not found");
  const {
    data: signed,
    error
  } = await supabaseAdmin.storage.from("knowledge-vault").createSignedUrl(data.storagePath, 120);
  if (error || !signed?.signedUrl) throw new Error("Could not generate file URL");
  return {
    url: signed.signedUrl
  };
});
export {
  deleteFromVault_createServerFn_handler,
  extractDocumentContent_createServerFn_handler,
  getVaultFileUrl_createServerFn_handler,
  ingestDocument_createServerFn_handler,
  queryVault_createServerFn_handler,
  searchVault_createServerFn_handler
};
