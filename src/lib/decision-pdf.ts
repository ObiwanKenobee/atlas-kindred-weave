import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";

type Decision = {
  recommendation: string;
  summary: string;
  recommended_amount: number;
  recommended_currency: string;
  recommended_terms: {
    instrument: string;
    duration_months: number;
    revenue_share_pct?: number;
    interest_rate_pct?: number;
    milestones: string[];
  };
  trust_assessment: { score: number; rationale: string };
  risk_assessment: { score: number; flags: string[] };
  impact_forecast: {
    jobs_created: number;
    households_reached: number;
    prosperity_index_delta: number;
    notes: string;
  };
  agents_invoked: string[];
  safeguards: string[];
};

type Request = {
  id: string;
  title: string;
  amount_requested: number;
  currency: string;
  region: string | null;
  sector: string | null;
  status: string;
  current_version?: number;
  final_version_id?: string | null;
  created_at: string;
  attachments: { name: string }[];
};

type Version = {
  id: string;
  version: number;
  report: Decision;
  generated_at: string;
  human_approval: "pending" | "approved" | "declined" | "revision_requested";
  human_decision_notes: string | null;
  human_decided_by_name: string | null;
  human_decided_at: string | null;
};

const MOSS = [44, 76, 58] as const;
const GOLD = [188, 142, 60] as const;
const INK = [30, 36, 32] as const;

/**
 * Generates the PDF from the latest APPROVED or REVISION_REQUESTED version,
 * else the latest pending version with a "NOT APPROVED YET" notice,
 * else a placeholder PDF when there is no decision at all.
 */
export async function downloadDecisionPdf(req: Request) {
  const { data: versionsRaw } = await supabase
    .from("decision_report_versions")
    .select("*")
    .eq("funding_request_id", req.id)
    .order("version", { ascending: false });

  const versions = (versionsRaw as unknown as Version[]) ?? [];
  const approved = versions.find((v) => v.human_approval === "approved");
  const reviewed = approved
    ?? versions.find((v) => v.human_approval === "revision_requested" || v.human_approval === "declined");
  const target = reviewed ?? versions[0] ?? null;

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = M;

  // Header band
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
    M, y + 24,
  );
  y += 48;

  if (!target) {
    return renderPlaceholder(
      doc, req, M, W, H, y,
      "NO DECISION REPORT GENERATED",
      "The AI Funding Council has not yet produced a deliberation for this request.",
    );
  }

  const isFinal = target.human_approval === "approved";
  const statusLabel = isFinal
    ? `APPROVED · v${target.version}`
    : target.human_approval === "declined"
      ? `DECLINED · v${target.version}`
      : target.human_approval === "revision_requested"
        ? `REVISION REQUESTED · v${target.version}`
        : `NOT APPROVED YET · v${target.version} (DRAFT)`;

  // Banner
  doc.setFillColor(isFinal ? 230 : 250, isFinal ? 240 : 230, isFinal ? 220 : 200);
  doc.rect(M, y, W - 2 * M, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...MOSS);
  doc.text(statusLabel, M + 12, y + 18);
  if (target.human_decided_by_name) {
    const stamp = `Reviewer: ${target.human_decided_by_name} · ${
      target.human_decided_at ? new Date(target.human_decided_at).toLocaleString() : ""
    }`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(stamp, W - M - 12 - doc.getTextWidth(stamp), y + 18);
  }
  y += 44;

  const d = target.report;

  // Recommendation block
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
    M + 12, y + 58,
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
      M + 12, y + 30,
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
    d.recommended_terms.interest_rate_pct != null ? `Interest rate: ${d.recommended_terms.interest_rate_pct}%` : null,
  ].filter(Boolean) as string[];
  y = bullets(doc, terms, y, M, W);

  y = section(doc, "Milestones", y, M, W);
  y = bullets(doc, d.recommended_terms.milestones.map((m, i) => `${String(i + 1).padStart(2, "0")}.  ${m}`), y, M, W);

  y = section(doc, `Trust Assessment — ${d.trust_assessment.score}/100`, y, M, W);
  y = paragraph(doc, d.trust_assessment.rationale, y, M, W);

  y = section(doc, `Risk Assessment — ${d.risk_assessment.score}/100`, y, M, W);
  if (d.risk_assessment.flags.length) y = bullets(doc, d.risk_assessment.flags, y, M, W);
  else y = paragraph(doc, "No flags raised.", y, M, W);

  y = section(doc, "Impact Forecast", y, M, W);
  y = bullets(doc, [
    `Jobs created: ${d.impact_forecast.jobs_created.toLocaleString()}`,
    `Households reached: ${d.impact_forecast.households_reached.toLocaleString()}`,
    `Prosperity Index Δ: ${d.impact_forecast.prosperity_index_delta.toFixed(2)}`,
  ], y, M, W);
  y = paragraph(doc, d.impact_forecast.notes, y, M, W);

  y = section(doc, "Safeguards & Human Override", y, M, W);
  y = bullets(doc, d.safeguards, y, M, W);

  y = section(doc, "Version History & Audit Trail", y, M, W);
  const trail: string[] = [`Submitted by user — ${new Date(req.created_at).toLocaleString()}`];
  for (const v of [...versions].reverse()) {
    trail.push(
      `v${v.version} · ${new Date(v.generated_at).toLocaleString()} — AI: ${label(v.report.recommendation)}` +
      (v.human_approval === "pending"
        ? "  ·  awaiting human review"
        : `  ·  ${v.human_approval.replace("_", " ")} by ${v.human_decided_by_name ?? "reviewer"} on ${
            v.human_decided_at ? new Date(v.human_decided_at).toLocaleString() : "—"
          }`),
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
    `atlas-decision-${req.id.slice(0, 8)}-v${target.version}${isFinal ? "-approved" : "-draft"}.pdf`,
  );
}

function renderPlaceholder(
  doc: jsPDF, req: Request, M: number, W: number, H: number, y: number,
  title: string, body: string,
) {
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

function finalize(doc: jsPDF, M: number, W: number, H: number) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Atlas Sanctum · Built for centuries, not quarters · Confidential", M, H - 20);
    doc.text(`${i} / ${pages}`, W - M - 30, H - 20);
  }
}

function label(r: string) {
  return ({
    approve: "Approve",
    approve_with_conditions: "Approve with conditions",
    decline: "Decline",
    needs_more_info: "Needs more info",
  } as Record<string, string>)[r] ?? r;
}
function truncate(s: string, n: number) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
function section(doc: jsPDF, title: string, y: number, M: number, W: number) {
  y = ensure(doc, y, 40);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...GOLD);
  doc.text(title.toUpperCase(), M, y);
  doc.setDrawColor(...GOLD); doc.setLineWidth(0.5); doc.line(M, y + 4, W - M, y + 4);
  return y + 18;
}
function paragraph(doc: jsPDF, text: string, y: number, M: number, W: number) {
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...INK);
  const lines = doc.splitTextToSize(text, W - 2 * M);
  for (const line of lines) { y = ensure(doc, y, 16); doc.text(line, M, y); y += 13; }
  return y + 4;
}
function bullets(doc: jsPDF, items: string[], y: number, M: number, W: number) {
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...INK);
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
function ensure(doc: jsPDF, y: number, needed: number) {
  const H = doc.internal.pageSize.getHeight();
  if (y + needed > H - 40) { doc.addPage(); return 60; }
  return y;
}
