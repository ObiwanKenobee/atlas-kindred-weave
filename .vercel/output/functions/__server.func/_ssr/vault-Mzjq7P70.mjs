import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { u as useAuth, B as Button, I as Input } from "./router-Dq4PHNk3.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PlanGate } from "./PlanGate-DI-fB5Gn.mjs";
import "../_libs/seroval.mjs";
import { B as BookOpen, z as Upload, S as Search, o as Brain, F as FileText, v as LoaderCircle, b as Sparkles, E as ExternalLink, I as Trash2, J as Image, M as Mic, K as File } from "../_libs/lucide-react.mjs";
import { g as objectType, j as arrayType, i as stringType, k as enumType, h as numberType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./entitlements-DDmJ5IMx.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "./ephemeral-session.server-DRewInbI.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "./ai-gateway.server-C06lV5S3.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "./paystack.server-Bs-IoxkW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const ExtractInput = objectType({
  storagePath: stringType().min(1).optional(),
  base64: stringType().min(1).optional(),
  mimeType: stringType().min(1),
  fileName: stringType().min(1),
  docKind: stringType().optional()
});
const extractDocumentContent = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ExtractInput.parse(d)).handler(createSsrRpc("6d3a556270650db74f1939917b771551f585d26d5ebb3526dcfaf92b730c4571"));
const IngestInput = objectType({
  storagePath: stringType().min(1),
  fileName: stringType().min(1),
  fileType: enumType(["pdf", "image", "audio", "text"]),
  content: stringType().min(1),
  docKind: enumType(["business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript", "general"]).default("general"),
  fundingRequestId: stringType().uuid().optional(),
  tags: arrayType(stringType()).default([])
});
const ingestDocument = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => IngestInput.parse(d)).handler(createSsrRpc("712432c5d69ae65bf55e5b7442a349131d9335fe155393fdee154cea39d059f4"));
const SearchInput = objectType({
  query: stringType().min(1),
  topK: numberType().int().min(1).max(20).default(5),
  docKind: enumType(["business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript", "general"]).optional()
});
const searchVault = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => SearchInput.parse(d)).handler(createSsrRpc("d942063027803c1dfc5ae0aa69dd6684058bdc3659f71385c7351613fd13ddfe"));
const QueryInput = objectType({
  question: stringType().min(5).max(1e3),
  topK: numberType().int().min(1).max(10).default(6)
});
const queryVault = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => QueryInput.parse(d)).handler(createSsrRpc("762e54f5f840938d1a0b232d4d6e621b955ea22d39aabf93c32de370fa370202"));
const DeleteInput = objectType({
  storagePath: stringType().min(1)
});
const deleteFromVault = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => DeleteInput.parse(d)).handler(createSsrRpc("7cad4ea5ff2572816da0d26bde9b6f0a53dba7fa7131ceab5b441841fc36dd27"));
const VaultFileInput = objectType({
  storagePath: stringType().min(1)
});
const getVaultFileUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => VaultFileInput.parse(d)).handler(createSsrRpc("d72ba26cb2d780c9214cdeafeef0761ad116eab19d5d5b8569867dba976ebe2c"));
function VaultPage() {
  const {
    user
  } = useAuth();
  const [docs, setDocs] = reactExports.useState([]);
  const [uploadBusy, setUploadBusy] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState(null);
  const [searching, setSearching] = reactExports.useState(false);
  const [question, setQuestion] = reactExports.useState("");
  const [answer, setAnswer] = reactExports.useState(null);
  const [asking, setAsking] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("upload");
  const [extracting, setExtracting] = reactExports.useState(false);
  const [file, setFile] = reactExports.useState(null);
  const [docKind, setDocKind] = reactExports.useState("general");
  const [extractedText, setExtractedText] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  const ingest = useServerFn(ingestDocument);
  const search = useServerFn(searchVault);
  const query = useServerFn(queryVault);
  const del = useServerFn(deleteFromVault);
  const extract = useServerFn(extractDocumentContent);
  const getFileUrl = useServerFn(getVaultFileUrl);
  async function fileToBase64(f) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        resolve(result.split(",")[1] ?? "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  }
  async function loadDocs() {
    if (!user) return;
    const {
      data
    } = await supabase.from("knowledge_documents").select("id, file_name, file_type, doc_kind, storage_path, created_at").eq("user_id", user.id).eq("chunk_index", 0).order("created_at", {
      ascending: false
    });
    setDocs(data ?? []);
  }
  reactExports.useEffect(() => {
    loadDocs();
  }, [user]);
  async function handleFileChange(f) {
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
      const {
        content
      } = await extract({
        data: {
          base64,
          mimeType: f.type || "application/octet-stream",
          fileName: f.name,
          docKind
        }
      });
      setExtractedText(content);
      toast.success("Document extracted — review before indexing.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Auto-extraction failed — paste text manually.");
    } finally {
      setExtracting(false);
    }
  }
  async function handleUpload(e) {
    e.preventDefault();
    if (!user || !file || !extractedText.trim()) return toast.error("Attach a file and provide its text content.");
    setUploadBusy(true);
    try {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const {
        error: storageErr
      } = await supabase.storage.from("knowledge-vault").upload(path, file);
      if (storageErr) throw storageErr;
      await ingest({
        data: {
          storagePath: path,
          fileName: file.name,
          fileType: file.type.startsWith("image") ? "image" : file.type.includes("audio") ? "audio" : file.type === "application/pdf" ? "pdf" : "text",
          content: extractedText,
          docKind,
          tags: []
        }
      });
      toast.success(`"${file.name}" indexed into your Knowledge Vault.`);
      setFile(null);
      setExtractedText("");
      if (fileRef.current) fileRef.current.value = "";
      await loadDocs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadBusy(false);
    }
  }
  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const {
        results
      } = await search({
        data: {
          query: searchQuery,
          topK: 8
        }
      });
      setSearchResults(results);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Search failed");
    } finally {
      setSearching(false);
    }
  }
  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim()) return;
    setAsking(true);
    setAnswer(null);
    try {
      const result = await query({
        data: {
          question,
          topK: 6
        }
      });
      setAnswer(result);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Query failed");
    } finally {
      setAsking(false);
    }
  }
  async function handleViewFile(storagePath) {
    try {
      const {
        url
      } = await getFileUrl({
        data: {
          storagePath
        }
      });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not open file.");
    }
  }
  async function handleDelete(storagePath, fileName) {
    if (!confirm(`Remove "${fileName}" from your vault?`)) return;
    try {
      await del({
        data: {
          storagePath
        }
      });
      toast.success("Removed.");
      await loadDocs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mx-auto h-10 w-10 text-gold/60 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Knowledge Vault" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to access your Business Intelligence layer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Economic Intelligence Layer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: "Knowledge Vault" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "Upload your business documents, receipts, and transcripts. Atlas Memory indexes everything and answers questions grounded in your evidence — no hallucination." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-1 border-b border-border/60", children: ["upload", "search", "ask"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab(tab), className: `px-4 py-2 text-sm capitalize transition ${activeTab === tab ? "border-b-2 border-gold text-gold" : "text-muted-foreground hover:text-foreground"}`, children: [
      tab === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-1.5 inline h-3.5 w-3.5" }),
      tab === "search" && /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-1.5 inline h-3.5 w-3.5" }),
      tab === "ask" && /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "mr-1.5 inline h-3.5 w-3.5" }),
      tab === "upload" ? "Upload" : tab === "search" ? "Search" : "Ask Atlas"
    ] }, tab)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        activeTab === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Add to Vault" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpload, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "glyph-border flex cursor-pointer items-center justify-center gap-2 rounded-md p-4 text-sm text-muted-foreground hover:text-gold", children: [
              file ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-gold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
              file ? file.name : "Select file (PDF, image, audio, text)",
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", className: "hidden", accept: ".pdf,.txt,.png,.jpg,.jpeg,.webp,.mp3,.m4a,.wav", onChange: (e) => e.target.files?.[0] && handleFileChange(e.target.files[0]) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: docKind, onChange: (e) => setDocKind(e.target.value), className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm", children: ["general", "business_plan", "receipt", "invoice", "inventory", "tax", "funding", "audio_transcript"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: k.replace(/_/g, " ") }, k)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: extractedText, onChange: (e) => setExtractedText(e.target.value), placeholder: extracting ? "Extracting document content with Gemini Vision…" : "Extracted text appears here. Edit before indexing.", rows: 8, required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: uploadBusy || extracting || !file || !extractedText.trim(), className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: uploadBusy || extracting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
              " Index into Vault"
            ] }) })
          ] })
        ] }),
        activeTab === "search" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Semantic Search" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. supplier invoices from March", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: searching, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: searching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
              " Search"
            ] }) })
          ] }),
          searchResults && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              searchResults.length,
              " results"
            ] }),
            searchResults.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/40 bg-secondary/20 p-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-gold", children: r.file_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/40 text-gold text-[10px]", children: [
                  (r.similarity * 100).toFixed(0),
                  "% match"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground line-clamp-3", children: r.content })
            ] }, r.id))
          ] })
        ] }),
        activeTab === "ask" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-4", children: "Ask Atlas Memory" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAsk, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: 'e.g. "How is my business performing?" or "Can I qualify for $5,000 funding?"', value: question, onChange: (e) => setQuestion(e.target.value), rows: 4, required: true, minLength: 5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: asking, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: asking ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
              " Ask (grounded)"
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
        activeTab === "ask" && answer && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
            " Atlas Memory Response",
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto border-gold/40 text-gold text-[10px]", children: [
              (answer.confidence * 100).toFixed(0),
              "% retrieval confidence"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed", children: answer.answer }),
          answer.sources.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-border/40 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: "Sources Retrieved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: answer.sources.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded border border-border/30 bg-secondary/20 p-2.5 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-gold shrink-0", children: [
                "[",
                s.index,
                "]"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: s.fileName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-border/40 text-[9px] shrink-0", children: s.docKind.replace(/_/g, " ") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground line-clamp-2", children: s.excerpt })
              ] })
            ] }, s.index)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-gold mb-3", children: [
            "Your Vault — ",
            docs.length,
            " document",
            docs.length !== 1 ? "s" : ""
          ] }),
          docs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No documents yet. Upload your first file to activate Atlas Memory." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: docs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-3 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DocIcon, { type: doc.file_type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: doc.file_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-border/40 text-[9px] mr-1", children: doc.doc_kind.replace(/_/g, " ") }),
                  new Date(doc.created_at).toLocaleDateString()
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": `View ${doc.file_name}`, onClick: () => handleViewFile(doc.storage_path), className: "text-muted-foreground hover:text-gold", title: "View file", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": `Remove ${doc.file_name} from vault`, onClick: () => handleDelete(doc.storage_path, doc.file_name), className: "text-muted-foreground hover:text-destructive", title: "Remove from vault", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, doc.id)) })
        ] })
      ] })
    ] })
  ] });
}
function DocIcon({
  type
}) {
  if (type === "image") return /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-gold/70 shrink-0" });
  if (type === "audio") return /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-5 w-5 text-gold/70 shrink-0" });
  if (type === "pdf") return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-gold/70 shrink-0" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(File, { className: "h-5 w-5 text-gold/70 shrink-0" });
}
function GatedVaultPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { feature: "vault", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VaultPage, {}) });
}
export {
  GatedVaultPage as component
};
