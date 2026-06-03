import jsPDF from "jspdf";

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
  pitch: string;
  amount_requested: number;
  currency: string;
  region: string | null;
  sector: string | null;
  status: string;
  human_approval: string;
  human_decision_notes: string | null;
  human_decided_at: string | null;
  created_at: string;
  attachments: { name: string }[];
  decision_report: Decision | null;
};

const MOSS = [44, 76, 58] as const;
const GOLD = [188, 142, 60] as const;
const INK = [30, 36, 32] as const;

export function downloadDecisionPdf(req: Request) {
  if (!req.decision_report) return;
  const d = req.decision_report;
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
    M,
    y + 24,
  );
  y += 48;

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
    M + 12,
    y + 58,
  );
  // Human approval badge
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  const human = `HUMAN APPROVAL: ${req.human_approval.toUpperCase().replace("_", " ")}`;
  doc.setTextColor(...GOLD);
  doc.text(human, W - M - 12 - doc.getTextWidth(human), y + 18);
  if (req.human_decided_at) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...INK);
    const ts = new Date(req.human_decided_at).toLocaleString();
    doc.text(ts, W - M - 12 - doc.getTextWidth(ts), y + 34);
  }
  y += 90;

  y = section(doc, "Executive Summary", y, M, W);
  y = paragraph(doc, d.summary, y, M, W);

  y = section(doc, "Recommended Terms", y, M, W);
  const terms = [
    `Instrument: ${d.recommended_terms.instrument}`,
    `Duration: ${d.recommended_terms.duration_months} months`,
    d.recommended_terms.revenue_share_pct != null
      ? `Revenue share: ${d.recommended_terms.revenue_share_pct}%`
      : null,
    d.recommended_terms.interest_rate_pct != null
      ? `Interest rate: ${d.recommended_terms.interest_rate_pct}%`
      : null,
  ].filter(Boolean) as string[];
  y = bullets(doc, terms, y, M, W);

  y = section(doc, "Milestones", y, M, W);
  y = bullets(
    doc,
    d.recommended_terms.milestones.map((m, i) => `${String(i + 1).padStart(2, "0")}.  ${m}`),
    y,
    M,
    W,
  );

  y = section(doc, `Trust Assessment — ${d.trust_assessment.score}/100`, y, M, W);
  y = paragraph(doc, d.trust_assessment.rationale, y, M, W);

  y = section(doc, `Risk Assessment — ${d.risk_assessment.score}/100`, y, M, W);
  if (d.risk_assessment.flags.length) y = bullets(doc, d.risk_assessment.flags, y, M, W);
  else y = paragraph(doc, "No flags raised.", y, M, W);

  y = section(doc, "Impact Forecast", y, M, W);
  y = bullets(
    doc,
    [
      `Jobs created: ${d.impact_forecast.jobs_created.toLocaleString()}`,
      `Households reached: ${d.impact_forecast.households_reached.toLocaleString()}`,
      `Prosperity Index Δ: ${d.impact_forecast.prosperity_index_delta.toFixed(2)}`,
    ],
    y,
    M,
    W,
  );
  y = paragraph(doc, d.impact_forecast.notes, y, M, W);

  y = section(doc, "Safeguards & Human Override", y, M, W);
  y = bullets(doc, d.safeguards, y, M, W);

  y = section(doc, "Audit Trail", y, M, W);
  const audit = [
    `Submitted by user — ${new Date(req.created_at).toLocaleString()}`,
    `AI Funding Council deliberation — agents: ${d.agents_invoked.join(", ")}`,
    `Recommendation rendered: ${label(d.recommendation)} (${d.recommended_amount.toLocaleString()} ${d.recommended_currency})`,
    req.human_decided_at
      ? `Human decision: ${req.human_approval.replace("_", " ")} at ${new Date(req.human_decided_at).toLocaleString()}`
      : "Human decision: pending review",
  ];
  y = bullets(doc, audit, y, M, W);
  if (req.human_decision_notes) {
    y = section(doc, "Reviewer Notes", y, M, W);
    y = paragraph(doc, req.human_decision_notes, y, M, W);
  }

  if (req.attachments.length) {
    y = section(doc, "Attachments on file", y, M, W);
    y = bullets(doc, req.attachments.map((a) => a.name), y, M, W);
  }

  // Footer on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "Atlas Sanctum · Built for centuries, not quarters · Confidential",
      M,
      H - 20,
    );
    doc.text(`${i} / ${pages}`, W - M - 30, H - 20);
  }

  doc.save(`atlas-decision-${req.id.slice(0, 8)}.pdf`);
}

function label(r: string) {
  return ({
    approve: "Approve",
    approve_with_conditions: "Approve with conditions",
    decline: "Decline",
    needs_more_info: "Needs more info",
  } as Record<string, string>)[r] ?? r;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function section(doc: jsPDF, title: string, y: number, M: number, W: number) {
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

function paragraph(doc: jsPDF, text: string, y: number, M: number, W: number) {
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

function bullets(doc: jsPDF, items: string[], y: number, M: number, W: number) {
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

function ensure(doc: jsPDF, y: number, needed: number) {
  const H = doc.internal.pageSize.getHeight();
  if (y + needed > H - 40) {
    doc.addPage();
    return 60;
  }
  return y;
}
