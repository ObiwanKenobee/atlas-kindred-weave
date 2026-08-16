import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, j as useIsReviewer, k as m$2, I as Input, B as Button } from "./router-Dq4PHNk3.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { C as Card } from "./card-BC4m7nIo.mjs";
import { T as Textarea } from "./textarea-DQK3DZjY.mjs";
import { B as Badge } from "./badge-CSZ6czco.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import "../_libs/seroval.mjs";
import { i as ShieldCheck, u as Paperclip, X, v as LoaderCircle, b as Sparkles, at as Download, F as FileText, L as Lock, av as History, s as Check, aw as RotateCcw, ax as Ban } from "../_libs/lucide-react.mjs";
import { g as objectType, i as stringType, k as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "tslib";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
const GenInput = objectType({
  requestId: stringType().uuid()
});
const generateFundingDecision = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => GenInput.parse(d)).handler(createSsrRpc("ce6708c36699fb579f5a0384b6c864fe901c773ba7a23483dc971ea2c2352a27"));
const ReviewInput = objectType({
  requestId: stringType().uuid(),
  approval: enumType(["approved", "declined", "revision_requested"]),
  notes: stringType().max(4e3).optional()
});
const reviewFundingDecision = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ReviewInput.parse(d)).handler(createSsrRpc("c054143d943196845fe8c7425121cfb12ae3f6f3d3462c7c77a76d9c25407c1b"));
const MOSS = [44, 76, 58];
const GOLD = [188, 142, 60];
const INK = [30, 36, 32];
async function downloadDecisionPdf(req) {
  const { data: versionsRaw } = await supabase.from("decision_report_versions").select("*").eq("funding_request_id", req.id).order("version", { ascending: false });
  const versions = versionsRaw ?? [];
  const approved = versions.find((v) => v.human_approval === "approved");
  const reviewed = approved ?? versions.find((v) => v.human_approval === "revision_requested" || v.human_approval === "declined");
  const target = reviewed ?? versions[0] ?? null;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = M;
  doc.setFillColor(...MOSS);
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("ATLAS SANCTUM · FUNDING DECISION REPORT", M, 38);
  doc.setTextColor(245, 240, 224);
  doc.setFontSize(20);
  doc.text(truncate(req.title, 60), M, 66);
  y = 120;
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Request ID: ${req.id}`, M, y);
  doc.text(`Submitted: ${new Date(req.created_at).toLocaleString()}`, M, y + 12);
  doc.text(
    `Amount requested: ${req.amount_requested.toLocaleString()} ${req.currency}    Sector: ${req.sector ?? "—"}    Region: ${req.region ?? "—"}`,
    M,
    y + 24
  );
  y += 48;
  if (!target) {
    return renderPlaceholder(
      doc,
      req,
      M,
      W,
      H,
      y,
      "NO DECISION REPORT GENERATED",
      "The AI Funding Council has not yet produced a deliberation for this request."
    );
  }
  const isFinal = target.human_approval === "approved";
  const statusLabel = isFinal ? `APPROVED · v${target.version}` : target.human_approval === "declined" ? `DECLINED · v${target.version}` : target.human_approval === "revision_requested" ? `REVISION REQUESTED · v${target.version}` : `NOT APPROVED YET · v${target.version} (DRAFT)`;
  doc.setFillColor(isFinal ? 230 : 250, isFinal ? 240 : 230, isFinal ? 220 : 200);
  doc.rect(M, y, W - 2 * M, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...MOSS);
  doc.text(statusLabel, M + 12, y + 18);
  if (target.human_decided_by_name) {
    const stamp = `Reviewer: ${target.human_decided_by_name} · ${target.human_decided_at ? new Date(target.human_decided_at).toLocaleString() : ""}`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(stamp, W - M - 12 - doc.getTextWidth(stamp), y + 18);
  }
  y += 44;
  const d = target.report;
  doc.setFillColor(245, 241, 230);
  doc.rect(M, y, W - 2 * M, 70, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...MOSS);
  doc.text("AI RECOMMENDATION", M + 12, y + 18);
  doc.setFontSize(16);
  doc.setTextColor(...INK);
  doc.text(label(d.recommendation), M + 12, y + 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `${d.recommended_amount.toLocaleString()} ${d.recommended_currency} · ${d.recommended_terms.instrument} · ${d.recommended_terms.duration_months}mo`,
    M + 12,
    y + 58
  );
  y += 90;
  if (!isFinal) {
    doc.setFillColor(252, 232, 200);
    doc.rect(M, y, W - 2 * M, 36, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...MOSS);
    doc.setFontSize(10);
    doc.text("⚠  THIS REPORT IS NOT YET APPROVED", M + 12, y + 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(
      "Recommendations are advisory until a Sanctum reviewer with reviewer-or-admin role records an approval.",
      M + 12,
      y + 30
    );
    y += 48;
  }
  y = section(doc, "Executive Summary", y, M, W);
  y = paragraph(doc, d.summary, y, M, W);
  y = section(doc, "Recommended Terms", y, M, W);
  const terms = [
    `Instrument: ${d.recommended_terms.instrument}`,
    `Duration: ${d.recommended_terms.duration_months} months`,
    d.recommended_terms.revenue_share_pct != null ? `Revenue share: ${d.recommended_terms.revenue_share_pct}%` : null,
    d.recommended_terms.interest_rate_pct != null ? `Interest rate: ${d.recommended_terms.interest_rate_pct}%` : null
  ].filter(Boolean);
  y = bullets(doc, terms, y, M, W);
  y = section(doc, "Milestones", y, M, W);
  y = bullets(doc, d.recommended_terms.milestones.map((m2, i) => `${String(i + 1).padStart(2, "0")}.  ${m2}`), y, M, W);
  y = section(doc, `Trust Assessment — ${d.trust_assessment.score}/100`, y, M, W);
  y = paragraph(doc, d.trust_assessment.rationale, y, M, W);
  y = section(doc, `Risk Assessment — ${d.risk_assessment.score}/100`, y, M, W);
  if (d.risk_assessment.flags.length) y = bullets(doc, d.risk_assessment.flags, y, M, W);
  else y = paragraph(doc, "No flags raised.", y, M, W);
  y = section(doc, "Impact Forecast", y, M, W);
  y = bullets(doc, [
    `Jobs created: ${d.impact_forecast.jobs_created.toLocaleString()}`,
    `Households reached: ${d.impact_forecast.households_reached.toLocaleString()}`,
    `Prosperity Index Δ: ${d.impact_forecast.prosperity_index_delta.toFixed(2)}`
  ], y, M, W);
  y = paragraph(doc, d.impact_forecast.notes, y, M, W);
  y = section(doc, "Safeguards & Human Override", y, M, W);
  y = bullets(doc, d.safeguards, y, M, W);
  y = section(doc, "Version History & Audit Trail", y, M, W);
  const trail = [`Submitted by user — ${new Date(req.created_at).toLocaleString()}`];
  for (const v of [...versions].reverse()) {
    trail.push(
      `v${v.version} · ${new Date(v.generated_at).toLocaleString()} — AI: ${label(v.report.recommendation)}` + (v.human_approval === "pending" ? "  ·  awaiting human review" : `  ·  ${v.human_approval.replace("_", " ")} by ${v.human_decided_by_name ?? "reviewer"} on ${v.human_decided_at ? new Date(v.human_decided_at).toLocaleString() : "—"}`)
    );
  }
  y = bullets(doc, trail, y, M, W);
  if (target.human_decision_notes) {
    y = section(doc, "Reviewer Notes", y, M, W);
    y = paragraph(doc, target.human_decision_notes, y, M, W);
  }
  if (req.attachments.length) {
    y = section(doc, "Attachments on file", y, M, W);
    y = bullets(doc, req.attachments.map((a) => a.name), y, M, W);
  }
  finalize(doc, M, W, H);
  doc.save(
    `atlas-decision-${req.id.slice(0, 8)}-v${target.version}${isFinal ? "-approved" : "-draft"}.pdf`
  );
}
function renderPlaceholder(doc, req, M, W, H, y, title, body) {
  doc.setFillColor(252, 232, 200);
  doc.rect(M, y, W - 2 * M, 80, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...MOSS);
  doc.text(title, M + 12, y + 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.text(body, M + 12, y + 54);
  finalize(doc, M, W, H);
  doc.save(`atlas-decision-${req.id.slice(0, 8)}-pending.pdf`);
}
function finalize(doc, M, W, H) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Atlas Sanctum · Built for centuries, not quarters · Confidential", M, H - 20);
    doc.text(`${i} / ${pages}`, W - M - 30, H - 20);
  }
}
function label(r) {
  return {
    approve: "Approve",
    approve_with_conditions: "Approve with conditions",
    decline: "Decline",
    needs_more_info: "Needs more info"
  }[r] ?? r;
}
function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function section(doc, title, y, M, W) {
  y = ensure(doc, y, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text(title.toUpperCase(), M, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(M, y + 4, W - M, y + 4);
  return y + 18;
}
function paragraph(doc, text, y, M, W) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  const lines = doc.splitTextToSize(text, W - 2 * M);
  for (const line of lines) {
    y = ensure(doc, y, 16);
    doc.text(line, M, y);
    y += 13;
  }
  return y + 4;
}
function bullets(doc, items, y, M, W) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  for (const item of items) {
    const lines = doc.splitTextToSize(item, W - 2 * M - 14);
    y = ensure(doc, y, 16);
    doc.text("•", M, y);
    for (let i = 0; i < lines.length; i++) {
      doc.text(lines[i], M + 12, y);
      if (i < lines.length - 1) y += 13;
      y = ensure(doc, y, 16);
    }
    y += 14;
  }
  return y + 2;
}
function ensure(doc, y, needed) {
  const H = doc.internal.pageSize.getHeight();
  if (y + needed > H - 40) {
    doc.addPage();
    return 60;
  }
  return y;
}
function FundingPage() {
  const {
    user
  } = useAuth();
  const isReviewer = useIsReviewer();
  const [requests, setRequests] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const generateDecision = useServerFn(generateFundingDecision);
  const [title, setTitle] = reactExports.useState("");
  const [pitch, setPitch] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [currency, setCurrency] = reactExports.useState("USD");
  const [region, setRegion] = reactExports.useState("");
  const [sector, setSector] = reactExports.useState("");
  const [files, setFiles] = reactExports.useState([]);
  async function refresh() {
    if (!user) return;
    const {
      data
    } = await supabase.from("funding_requests").select("*").order("created_at", {
      ascending: false
    });
    setRequests(data ?? []);
  }
  reactExports.useEffect(() => {
    refresh();
  }, [user]);
  async function submit(e) {
    e.preventDefault();
    if (!user) return toast.error("Sign in to submit a funding request.");
    setBusy(true);
    try {
      const attachments = [];
      for (const f of files) {
        const path = `${user.id}/${Date.now()}-${f.name}`;
        const {
          error
        } = await supabase.storage.from("funding-attachments").upload(path, f);
        if (error) throw error;
        attachments.push({
          name: f.name,
          path,
          size: f.size
        });
      }
      const {
        data: ins,
        error: insErr
      } = await supabase.from("funding_requests").insert({
        user_id: user.id,
        title,
        pitch,
        amount_requested: Number(amount) || 0,
        currency,
        region: region || null,
        sector: sector || null,
        attachments,
        status: "submitted"
      }).select().single();
      if (insErr) throw insErr;
      toast.success("Request submitted. The Funding Council is deliberating…");
      setTitle("");
      setPitch("");
      setAmount("");
      setRegion("");
      setSector("");
      setFiles([]);
      await refresh();
      await generateDecision({
        data: {
          requestId: ins.id
        }
      });
      toast.success("Funding Decision Report ready.");
      await refresh();
      const {
        data: fresh
      } = await supabase.from("funding_requests").select("*").eq("id", ins.id).single();
      if (fresh) setSelected(fresh);
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Funding Engine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Sign in to submit a pitch and receive an AI Funding Decision Report." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow", children: "Enter the Sanctum" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Engine II · Funding" }),
        isReviewer && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/60 text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mr-1 h-3 w-3" }),
          " Reviewer privileges"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl", children: m$2.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: m$2.tagline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-gold", children: "Submit a pitch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Title", value: title, onChange: (e) => setTitle(e.target.value), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", step: "100", placeholder: "Amount", value: amount, onChange: (e) => setAmount(e.target.value), required: true, className: "col-span-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: currency, onChange: (e) => setCurrency(e.target.value.toUpperCase()), maxLength: 4 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Region", value: region, onChange: (e) => setRegion(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Sector", value: sector, onChange: (e) => setSector(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Pitch — what will you build, who benefits, what evidence supports it?", value: pitch, onChange: (e) => setPitch(e.target.value), rows: 6, required: true, minLength: 40 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "glyph-border flex cursor-pointer items-center justify-center gap-2 rounded-md p-3 text-sm text-muted-foreground hover:text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
            files.length ? `${files.length} file(s) attached` : "Attach evidence",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", multiple: true, className: "hidden", onChange: (e) => setFiles(Array.from(e.target.files ?? [])) })
          ] }),
          files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-xs text-muted-foreground", children: files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2 rounded bg-secondary/40 px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: f.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": `Remove attachment ${f.name}`, onClick: () => setFiles(files.filter((_, j) => j !== i)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "w-full bg-gradient-gold text-gold-foreground shadow-glow", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            " Submit & generate report"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-gold", children: isReviewer ? "Review queue" : "Your funding requests" }),
        requests.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No requests yet." }),
        requests.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { onClick: () => setSelected(r), className: `glyph-border cursor-pointer p-4 transition hover:border-gold/60 ${selected?.id === r.id ? "border-gold/80 shadow-glow" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: r.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                r.amount_requested.toLocaleString(),
                " ",
                r.currency,
                " · ",
                r.region ?? "—",
                " · ",
                r.sector ?? "—"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status })
          ] }),
          r.decision_report && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sage", children: [
              "✦ v",
              r.current_version,
              " · ",
              recommendationLabel(r.decision_report.recommendation),
              " ·",
              " ",
              r.decision_report.recommended_amount.toLocaleString(),
              " ",
              r.decision_report.recommended_currency
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(HumanBadge, { approval: r.human_approval })
          ] })
        ] }, r.id))
      ] })
    ] }),
    selected?.decision_report && /* @__PURE__ */ jsxRuntimeExports.jsx(DecisionPanel, { req: selected, isReviewer, onClose: () => setSelected(null), onUpdated: async () => {
      await refresh();
      const fresh = await supabase.from("funding_requests").select("*").eq("id", selected.id).single();
      if (fresh.data) setSelected(fresh.data);
    } })
  ] });
}
function StatusBadge({
  status
}) {
  const map = {
    submitted: "border-gold/60 text-gold",
    under_review: "border-sage/60 text-sage",
    approved: "border-sage/80 text-sage",
    declined: "border-destructive/60 text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: map[status] ?? "border-border", children: status.replace("_", " ") });
}
function recommendationLabel(r) {
  return {
    approve: "Approve",
    approve_with_conditions: "Approve with conditions",
    decline: "Decline",
    needs_more_info: "Needs more info"
  }[r];
}
function HumanBadge({
  approval
}) {
  const map = {
    pending: "border-gold/60 text-gold",
    approved: "border-sage/80 text-sage",
    declined: "border-destructive/60 text-destructive",
    revision_requested: "border-gold/60 text-gold"
  };
  const text = {
    pending: "Awaiting human review",
    approved: "Human approved",
    declined: "Human declined",
    revision_requested: "Revision requested"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: map[approval], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mr-1 h-3 w-3" }),
    " ",
    text[approval]
  ] });
}
function DecisionPanel({
  req,
  isReviewer,
  onClose,
  onUpdated
}) {
  const d = req.decision_report;
  const [notes, setNotes] = reactExports.useState(req.human_decision_notes ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  const [versions, setVersions] = reactExports.useState([]);
  const review = useServerFn(reviewFundingDecision);
  const pending = req.human_approval === "pending" || req.human_approval === "revision_requested";
  reactExports.useEffect(() => {
    supabase.from("decision_report_versions").select("*").eq("funding_request_id", req.id).order("version", {
      ascending: false
    }).then(({
      data
    }) => setVersions(data ?? []));
  }, [req.id, req.current_version, req.human_approval]);
  async function decide(approval) {
    setSaving(true);
    try {
      await review({
        data: {
          requestId: req.id,
          approval,
          notes: notes || void 0
        }
      });
      toast.success(`Decision recorded: ${approval.replace("_", " ")}`);
      await onUpdated();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to record decision";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }
  async function exportPdf() {
    setExporting(true);
    try {
      await downloadDecisionPdf(req);
    } finally {
      setExporting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-xl glyph-border p-8 shadow-sanctum", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-border/60 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold/80", children: "Funding Decision Report" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl", children: req.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HumanBadge, { approval: req.human_approval }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-gold/40 text-gold", children: [
            "v",
            req.current_version
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: exportPdf, disabled: exporting, children: exporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Export PDF"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, "aria-label": "Close decision report", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "AI Recommendation", value: recommendationLabel(d.recommendation), accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Recommended", value: `${d.recommended_amount.toLocaleString()} ${d.recommended_currency}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Instrument", value: `${d.recommended_terms.instrument} · ${d.recommended_terms.duration_months}mo` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Trust", value: `${d.trust_assessment.score}/100` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Risk", value: `${d.risk_assessment.score}/100` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Jobs forecast", value: d.impact_forecast.jobs_created.toLocaleString() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: d.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Milestones", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: d.recommended_terms.milestones.map((mi, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-gold", children: String(i + 1).padStart(2, "0") }),
      " ",
      mi
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Trust assessment", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: d.trust_assessment.rationale }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Risk flags", children: d.risk_assessment.flags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-sage", children: "No flags raised." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm text-foreground/90", children: d.risk_assessment.flags.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "• ",
        f
      ] }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Impact forecast", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: d.impact_forecast.notes }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-sage", children: [
          "Prosperity Δ ",
          d.impact_forecast.prosperity_index_delta.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Safeguards & human override", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm text-foreground/90", children: d.safeguards.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "• ",
        s
      ] }, i)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-xs text-muted-foreground", children: [
      "Agents invoked: ",
      d.agents_invoked.join(", ")
    ] }),
    req.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Attachments", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm text-muted-foreground", children: req.attachments.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
      " ",
      a.name
    ] }, a.path)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mr-2 inline h-4 w-4" }),
      " Version history"
    ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      versions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No versions recorded yet." }),
      versions.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3 rounded border border-border/40 bg-secondary/20 px-3 py-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-sm", children: [
          "v",
          v.version,
          " · ",
          recommendationLabel(v.report.recommendation),
          v.human_approval !== "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-2 inline h-3 w-3 text-gold" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
          "Generated ",
          new Date(v.generated_at).toLocaleString()
        ] }),
        v.human_approval !== "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sage", children: [
          v.human_approval.replace("_", " "),
          " by ",
          v.human_decided_by_name ?? "reviewer",
          " ·",
          " ",
          v.human_decided_at ? new Date(v.human_decided_at).toLocaleString() : ""
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-gold", children: "Awaiting reviewer" }),
        v.human_decision_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-muted-foreground italic", children: [
          "“",
          v.human_decision_notes,
          "”"
        ] })
      ] }) }, v.id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Human-in-the-loop review", children: [
      !isReviewer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start gap-2 rounded border border-gold/40 bg-secondary/30 p-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mt-0.5 h-3.5 w-3.5 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Approval is restricted to users with the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "reviewer" }),
          " or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "admin" }),
          " role. The server enforces this regardless of UI state — your account currently does not have these privileges."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No AI recommendation is final until a reviewer with the required role approves. Each decision permanently stamps the active report version; further changes require a new version (re-generate the report)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Reviewer notes — what tipped the decision, what conditions must be met…", rows: 4, className: "mt-3", disabled: !isReviewer || !pending && !saving }),
      req.human_decided_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
        "Latest decision: ",
        req.human_approval.replace("_", " "),
        " · ",
        new Date(req.human_decided_at).toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => decide("approved"), disabled: !isReviewer || saving || !pending, className: "bg-gradient-gold text-gold-foreground shadow-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
          " Approve & finalize"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => decide("revision_requested"), disabled: !isReviewer || saving || !pending, className: "border-gold/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
          " Request revision"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => decide("declined"), disabled: !isReviewer || saving || !pending, className: "border-destructive/60 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4" }),
          " Decline"
        ] })
      ] })
    ] })
  ] });
}
function Stat({
  label: label2,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glyph-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 font-display text-xl ${accent ? "text-gold" : "text-foreground"}`, children: value })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-gold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children })
  ] });
}
export {
  FundingPage as component
};
