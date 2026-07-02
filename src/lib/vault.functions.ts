import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { recordAgentEvent } from "@/lib/observability.server";

async function embedText(text: string): Promise<number[]> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    body: JSON.stringify({
      model: "google/text-embedding-004",
      input: text.slice(0, 8000),
    }),
  });
  if (!res.ok) throw new Error(`Embedding request failed: ${await res.text()}`);
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
}

function chunkText(text: string, maxChars = 1500, overlap = 200): string[] {
  if (text.length <= maxChars) return [text];
  const chunks: string[] = [];
  let pos = 0;
  while (pos < text.length) {
    chunks.push(text.slice(pos, pos + maxChars));
    pos += maxChars - overlap;
  }
  return chunks;
}

const ExtractInput = z.object({
  storagePath: z.string().min(1).optional(),
  base64: z.string().min(1).optional(),
  mimeType: z.string().min(1),
  fileName: z.string().min(1),
  docKind: z.string().optional(),
});

export const extractDocumentContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ExtractInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const t0 = Date.now();
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");
    const gateway = createLovableAiGatewayProvider(key);

    let imageUrl: string | null = null;

    if (data.storagePath) {
      if (!data.storagePath.startsWith(`${userId}/`)) {
        throw new Error("Access denied");
      }
      const { data: signed, error } = await supabaseAdmin.storage
        .from("knowledge-vault")
        .createSignedUrl(data.storagePath, 120);
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

      const { text } = await generateText({
        model: gateway("google/gemini-2.5-flash"),
        prompt: `${prompt}\n\nDocument URL: ${url}`,
      });
      extractedText = text.trim();
    } else if (isAudio) {
      extractedText =
        "[Audio file uploaded — paste a transcript manually, or use Scribe v2 transcription in production.]";
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
      metadata: { fileName: data.fileName, mimeType: data.mimeType, chars: extractedText.length },
    });

    return { content: extractedText, charCount: extractedText.length };
  });

const IngestInput = z.object({
  storagePath: z.string().min(1),
  fileName: z.string().min(1),
  fileType: z.enum(["pdf", "image", "audio", "text"]),
  content: z.string().min(1),
  docKind: z
    .enum(["business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript", "general"])
    .default("general"),
  fundingRequestId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
});

export const ingestDocument = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => IngestInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const t0 = Date.now();
    const chunks = chunkText(data.content);

    const rows = await Promise.all(
      chunks.map(async (chunk, i) => {
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
          tags: data.tags,
        };
      }),
    );

    const { error } = await supabaseAdmin.from("knowledge_documents").insert(rows);
    if (error) throw new Error(error.message);

    void recordAgentEvent({
      userId,
      agent: "Knowledge Vault",
      action: "document_ingest",
      latencyMs: Date.now() - t0,
      outcome: "answered",
      sourcesRetrieved: 0,
      metadata: { fileName: data.fileName, chunks: chunks.length, docKind: data.docKind },
    });

    return { chunksIndexed: chunks.length, fileName: data.fileName };
  });

const SearchInput = z.object({
  query: z.string().min(1),
  topK: z.number().int().min(1).max(20).default(5),
  docKind: z
    .enum(["business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript", "general"])
    .optional(),
});

export type SearchResult = {
  id: string;
  file_name: string;
  content: string;
  doc_kind: string;
  similarity: number;
};

export const searchVault = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => SearchInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const embedding = await embedText(data.query);

    const { data: rows, error } = await supabaseAdmin.rpc("match_documents", {
      _user_id: userId,
      _embedding: JSON.stringify(embedding),
      _match_count: data.topK,
      _doc_kind: (data.docKind ?? null) as unknown as string,
    });
    if (error) throw new Error(error.message);

    return { results: (rows ?? []) as SearchResult[] };
  });

const QueryInput = z.object({
  question: z.string().min(5).max(1000),
  topK: z.number().int().min(1).max(10).default(6),
});

export const queryVault = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => QueryInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const t0 = Date.now();
    const embedding = await embedText(data.question);

    const { data: chunks, error } = await supabaseAdmin.rpc("match_documents", {
      _user_id: userId,
      _embedding: JSON.stringify(embedding),
      _match_count: data.topK,
      _doc_kind: null as unknown as string,
    });
    if (error) throw new Error(error.message);

    const results = (chunks ?? []) as SearchResult[];

    if (results.length === 0) {
      return {
        answer:
          "I found no documents in your Knowledge Vault yet. Upload your business records — receipts, invoices, plans, or statements — and I can reason over them.",
        sources: [],
        confidence: 0,
      };
    }

    const contextBlock = results
      .map((r, i) => `[${i + 1}] ${r.file_name} (${r.doc_kind}, similarity ${(r.similarity * 100).toFixed(0)}%)\n${r.content}`)
      .join("\n\n---\n\n");

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

    const { text } = await generateText({
      model: gateway("google/gemini-2.5-flash"),
      prompt,
    });

    const sources = results.map((r) => ({
      index: results.indexOf(r) + 1,
      fileName: r.file_name,
      docKind: r.doc_kind,
      excerpt: r.content.slice(0, 200),
      similarity: r.similarity,
    }));

    void recordAgentEvent({
      userId,
      agent: "Knowledge Vault",
      action: "vault_query",
      latencyMs: Date.now() - t0,
      outcome: "answered",
      sourcesRetrieved: results.length,
      confidence: results[0]?.similarity ?? undefined,
      metadata: { questionLength: data.question.length },
    });

    return { answer: text, sources, confidence: results[0]?.similarity ?? 0 };
  });

const DeleteInput = z.object({ storagePath: z.string().min(1) });

export const deleteFromVault = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => DeleteInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const { error } = await supabaseAdmin
      .from("knowledge_documents")
      .delete()
      .eq("user_id", userId)
      .eq("storage_path", data.storagePath);
    if (error) throw new Error(error.message);

    await supabaseAdmin.storage.from("knowledge-vault").remove([data.storagePath]);
    return { ok: true };
  });

const VaultFileInput = z.object({ storagePath: z.string().min(1) });

export const getVaultFileUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => VaultFileInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    if (!data.storagePath.startsWith(`${userId}/`)) throw new Error("Access denied");

    const { data: doc } = await supabaseAdmin
      .from("knowledge_documents")
      .select("id")
      .eq("user_id", userId)
      .eq("storage_path", data.storagePath)
      .limit(1)
      .maybeSingle();

    if (!doc) throw new Error("Document not found");

    const { data: signed, error } = await supabaseAdmin.storage
      .from("knowledge-vault")
      .createSignedUrl(data.storagePath, 120);

    if (error || !signed?.signedUrl) throw new Error("Could not generate file URL");
    return { url: signed.signedUrl };
  });
