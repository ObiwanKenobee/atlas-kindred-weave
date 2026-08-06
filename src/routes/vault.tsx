import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { ingestDocument, searchVault, queryVault, deleteFromVault, extractDocumentContent, getVaultFileUrl } from "@/lib/vault.functions";
import type { SearchResult } from "@/lib/vault.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload, Search, Brain, Trash2, Loader2, FileText, Image, Mic, File,
  Sparkles, BookOpen, ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { PlanGate } from "@/components/PlanGate";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Knowledge Vault — Atlas Sanctum" },
      { name: "description", content: "Your business intelligence vault. Upload documents, images, and transcripts. Ask questions grounded in your evidence." },
    ],
  }),
  component: GatedVaultPage,
});

type DocKind = "business_plan" | "receipt" | "invoice" | "inventory" | "tax" | "funding" | "audio_transcript" | "general";

type VaultDoc = {
  id: string;
  file_name: string;
  file_type: string;
  doc_kind: string;
  storage_path: string;
  created_at: string;
};

function VaultPage() {
  const { user } = useAuth();
  const [docs, setDocs] = useState<VaultDoc[]>([]);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<{ answer: string; sources: { index: number; fileName: string; docKind: string; excerpt: string; similarity: number }[]; confidence: number } | null>(null);
  const [asking, setAsking] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "search" | "ask">("upload");

  // upload form state
  const [extracting, setExtracting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [docKind, setDocKind] = useState<DocKind>("general");
  const [extractedText, setExtractedText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const ingest = useServerFn(ingestDocument);
  const search = useServerFn(searchVault);
  const query = useServerFn(queryVault);
  const del = useServerFn(deleteFromVault);
  const extract = useServerFn(extractDocumentContent);
  const getFileUrl = useServerFn(getVaultFileUrl);

  async function fileToBase64(f: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] ?? "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  }

  async function loadDocs() {
    if (!user) return;
    const { data } = await supabase
      .from("knowledge_documents")
      .select("id, file_name, file_type, doc_kind, storage_path, created_at")
      .eq("user_id", user.id)
      .eq("chunk_index", 0) // only show first chunk per doc in the list
      .order("created_at", { ascending: false });
    setDocs((data as unknown as VaultDoc[]) ?? []);
  }

  useEffect(() => { loadDocs(); }, [user]); // eslint-disable-line

  // When user selects a text file, auto-populate extracted text
  async function handleFileChange(f: File) {
    setFile(f);
    setExtractedText("");

    const name = f.name.toLowerCase();
    if (name.includes("receipt")) setDocKind("receipt");
    else if (name.includes("invoice")) setDocKind("invoice");
    else if (name.includes("inventory")) setDocKind("inventory");
    else if (name.includes("plan") || name.includes("business")) setDocKind("business_plan");
    else if (name.includes("tax")) setDocKind("tax");
    else if (name.includes("fund") || name.includes("loan")) setDocKind("funding");
    else if (name.includes("transcript") || name.includes("audio")) setDocKind("audio_transcript");
    else setDocKind("general");

    if (f.type === "text/plain") {
      setExtractedText(await f.text());
      return;
    }

    setExtracting(true);
    try {
      const base64 = await fileToBase64(f);
      const { content } = await extract({
        data: { base64, mimeType: f.type || "application/octet-stream", fileName: f.name, docKind },
      });
      setExtractedText(content);
      toast.success("Document extracted — review before indexing.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Auto-extraction failed — paste text manually.");
    } finally {
      setExtracting(false);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !file || !extractedText.trim()) return toast.error("Attach a file and provide its text content.");
    setUploadBusy(true);
    try {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error: storageErr } = await supabase.storage
        .from("knowledge-vault")
        .upload(path, file);
      if (storageErr) throw storageErr;

      await ingest({
        data: {
          storagePath: path,
          fileName: file.name,
          fileType: file.type.startsWith("image") ? "image"
            : file.type.includes("audio") ? "audio"
            : file.type === "application/pdf" ? "pdf"
            : "text",
          content: extractedText,
          docKind,
          tags: [],
        },
      });

      toast.success(`"${file.name}" indexed into your Knowledge Vault.`);
      setFile(null); setExtractedText(""); if (fileRef.current) fileRef.current.value = "";
      await loadDocs();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadBusy(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const { results } = await search({ data: { query: searchQuery, topK: 8 } });
      setSearchResults(results);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Search failed");
    } finally {
      setSearching(false);
    }
  }

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setAsking(true);
    setAnswer(null);
    try {
      const result = await query({ data: { question, topK: 6 } });
      setAnswer(result);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Query failed");
    } finally {
      setAsking(false);
    }
  }

  async function handleViewFile(storagePath: string) {
    try {
      const { url } = await getFileUrl({ data: { storagePath } });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not open file.");
    }
  }

  async function handleDelete(storagePath: string, fileName: string) {
    if (!confirm(`Remove "${fileName}" from your vault?`)) return;
    try {
      await del({ data: { storagePath } });
      toast.success("Removed.");
      await loadDocs();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <BookOpen className="mx-auto h-10 w-10 text-gold/60 mb-4" />
        <h1 className="font-display text-3xl">Knowledge Vault</h1>
        <p className="mt-3 text-muted-foreground">Sign in to access your Business Intelligence layer.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Economic Intelligence Layer</div>
        <h1 className="mt-3 font-display text-4xl">Knowledge Vault</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Upload your business documents, receipts, and transcripts. Atlas Memory indexes everything and answers questions grounded in your evidence — no hallucination.
        </p>
      </div>

      {/* tabs */}
      <div className="mt-6 flex gap-1 border-b border-border/60">
        {(["upload", "search", "ask"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm capitalize transition ${
              activeTab === tab
                ? "border-b-2 border-gold text-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "upload" && <Upload className="mr-1.5 inline h-3.5 w-3.5" />}
            {tab === "search" && <Search className="mr-1.5 inline h-3.5 w-3.5" />}
            {tab === "ask" && <Brain className="mr-1.5 inline h-3.5 w-3.5" />}
            {tab === "upload" ? "Upload" : tab === "search" ? "Search" : "Ask Atlas"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* left panel */}
        <div className="lg:col-span-2">
          {activeTab === "upload" && (
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Add to Vault</div>
              <form onSubmit={handleUpload} className="space-y-3">
                <label className="glyph-border flex cursor-pointer items-center justify-center gap-2 rounded-md p-4 text-sm text-muted-foreground hover:text-gold">
                  {file ? <FileText className="h-4 w-4 text-gold" /> : <Upload className="h-4 w-4" />}
                  {file ? file.name : "Select file (PDF, image, audio, text)"}
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.png,.jpg,.jpeg,.webp,.mp3,.m4a,.wav"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  />
                </label>

                <select
                  value={docKind}
                  onChange={(e) => setDocKind(e.target.value as DocKind)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {(["general","business_plan","receipt","invoice","inventory","tax","funding","audio_transcript"] as DocKind[]).map((k) => (
                    <option key={k} value={k}>{k.replace(/_/g, " ")}</option>
                  ))}
                </select>

                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder={extracting ? "Extracting document content with Gemini Vision…" : "Extracted text appears here. Edit before indexing."}
                  rows={8}
                  required
                />

                <Button
                  type="submit"
                  disabled={uploadBusy || extracting || !file || !extractedText.trim()}
                  className="w-full bg-gradient-gold text-gold-foreground shadow-glow"
                >
                  {uploadBusy || extracting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Index into Vault</>}
                </Button>
              </form>
            </Card>
          )}

          {activeTab === "search" && (
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Semantic Search</div>
              <form onSubmit={handleSearch} className="space-y-3">
                <Input
                  placeholder="e.g. supplier invoices from March"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" disabled={searching} className="w-full bg-gradient-gold text-gold-foreground shadow-glow">
                  {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4" /> Search</>}
                </Button>
              </form>
              {searchResults && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-muted-foreground">{searchResults.length} results</div>
                  {searchResults.map((r) => (
                    <div key={r.id} className="rounded-md border border-border/40 bg-secondary/20 p-3 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-sm text-gold">{r.file_name}</span>
                        <Badge variant="outline" className="border-gold/40 text-gold text-[10px]">
                          {(r.similarity * 100).toFixed(0)}% match
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-3">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === "ask" && (
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-4">Ask Atlas Memory</div>
              <form onSubmit={handleAsk} className="space-y-3">
                <Textarea
                  placeholder='e.g. "How is my business performing?" or "Can I qualify for $5,000 funding?"'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  required
                  minLength={5}
                />
                <Button type="submit" disabled={asking} className="w-full bg-gradient-gold text-gold-foreground shadow-glow">
                  {asking ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Brain className="h-4 w-4" /> Ask (grounded)</>}
                </Button>
              </form>
            </Card>
          )}
        </div>

        {/* right panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* RAG answer */}
          {activeTab === "ask" && answer && (
            <Card className="glyph-border p-6">
              <div className="text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                <Brain className="h-3.5 w-3.5" /> Atlas Memory Response
                <Badge variant="outline" className="ml-auto border-gold/40 text-gold text-[10px]">
                  {(answer.confidence * 100).toFixed(0)}% retrieval confidence
                </Badge>
              </div>
              <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{answer.answer}</div>

              {answer.sources.length > 0 && (
                <div className="mt-5 border-t border-border/40 pt-4">
                  <div className="text-xs uppercase tracking-widest text-gold mb-3">Sources Retrieved</div>
                  <div className="space-y-2">
                    {answer.sources.map((s) => (
                      <div key={s.index} className="flex gap-3 rounded border border-border/30 bg-secondary/20 p-2.5 text-xs">
                        <span className="font-display text-gold shrink-0">[{s.index}]</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium truncate">{s.fileName}</span>
                            <Badge variant="outline" className="border-border/40 text-[9px] shrink-0">{s.docKind.replace(/_/g," ")}</Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{s.excerpt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* vault document list */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-3">
              Your Vault — {docs.length} document{docs.length !== 1 ? "s" : ""}
            </div>
            {docs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No documents yet. Upload your first file to activate Atlas Memory.</p>
            ) : (
              <div className="space-y-2">
                {docs.map((doc) => (
                  <Card key={doc.id} className="glyph-border p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <DocIcon type={doc.file_type} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{doc.file_name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          <Badge variant="outline" className="border-border/40 text-[9px] mr-1">{doc.doc_kind.replace(/_/g," ")}</Badge>
                          {new Date(doc.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleViewFile(doc.storage_path)}
                        className="text-muted-foreground hover:text-gold"
                        title="View file"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.storage_path, doc.file_name)}
                        className="text-muted-foreground hover:text-destructive"
                        title="Remove from vault"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocIcon({ type }: { type: string }) {
  if (type === "image") return <Image className="h-5 w-5 text-gold/70 shrink-0" />;
  if (type === "audio") return <Mic className="h-5 w-5 text-gold/70 shrink-0" />;
  if (type === "pdf") return <FileText className="h-5 w-5 text-gold/70 shrink-0" />;
  return <File className="h-5 w-5 text-gold/70 shrink-0" />;
}


function GatedVaultPage() {
  return (
    <PlanGate feature="vault">
      <VaultPage />
    </PlanGate>
  );
}
