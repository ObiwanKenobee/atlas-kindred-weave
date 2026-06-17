import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

// ─── helpers ────────────────────────────────────────────────────────────────

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

// Chunk long text into overlapping segments so large docs get indexed faithfully
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

// ─── Module 1: ingest document ──────────────────────────────────────────────

const IngestInput = z.object({
  storagePath: z.string().min(1),
  fileName: z.string().min(1),
  fileType: z.enum(["pdf", "image", "audio", "text"]),
  content: z.string().min(1), // extracted text / OCR / transcript (done client-side or via Vision)
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

    return { chunksIndexed: chunks.length, fileName: data.fileName };
  });

// ─── Module 2: semantic search ───────────────────────────────────────────────

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
      _doc_kind: data.docKind ?? null,
    });
    if (error) throw new Error(error.message);

    return { results: (rows ?? []) as SearchResult[] };
  });

// ─── Module 3: RAG query (grounded Q&A with citations) ───────────────────────

const QueryInput = z.object({
  question: z.string().min(5).max(1000),
  topK: z.number().int().min(1).max(10).default(6),
});

export const queryVault = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => QueryInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // 1. Embed the question
    const embedding = await embedText(data.question);

    // 2. Retrieve top-k relevant chunks from the user's vault
    const { data: chunks, error } = await supabaseAdmin.rpc("match_documents", {
      _user_id: userId,
      _embedding: JSON.stringify(embedding),
      _match_count: data.topK,
      _doc_kind: null,
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

    // 3. Build grounded context block
    const contextBlock = results
      .map((r, i) => `[${i + 1}] ${r.file_name} (${r.doc_kind}, similarity ${(r.similarity * 100).toFixed(0)}%)\n${r.content}`)
      .join("\n\n---\n\n");

    // 4. Inject into Gemini prompt — no retrieval = no answer
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

    // 5. Return answer + sources for citation UI
    const sources = results.map((r) => ({
      index: results.indexOf(r) + 1,
      fileName: r.file_name,
      docKind: r.doc_kind,
      excerpt: r.content.slice(0, 200),
      similarity: r.similarity,
    }));

    return { answer: text, sources, confidence: results[0]?.similarity ?? 0 };
  });

// ─── Delete a document from the vault ────────────────────────────────────────

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
