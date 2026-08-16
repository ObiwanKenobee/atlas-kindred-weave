const DEMO_BUSINESS = {
  name: "Mazingira Solar Cooperative",
  business_type: "cooperative",
  country: "Kenya",
  industry: "Clean energy",
  stage: "early revenue",
  team_size: 14,
  revenue_range: "100k – 1M / yr",
  primary_objective: "Expand pay-as-you-go solar home systems from 1,200 to 5,000 households across Nakuru and Kisumu counties.",
  funding_requirement_minor: 45e7,
  funding_currency: "KES",
  funding_purpose: "Working capital for 3,800 solar kits, two service vans, and six field technicians over 12 months.",
  description: "Mazingira Solar Cooperative distributes and services pay-as-you-go solar home systems to off-grid households in western Kenya. Members pay a KES 1,500 deposit and KES 850 per month for 24 months. The cooperative operates two depots, a 14-person team, and a mobile-money repayment rail with a 91% on-time collection rate."
};
const DEMO_DOCUMENTS = [
  {
    file_name: "Mazingira — Management Accounts (last 12 months).md",
    doc_kind: "financial_statement",
    tags: ["demo", "financials"],
    content: `Mazingira Solar Cooperative — Management accounts, trailing 12 months (KES).

Revenue: 18,420,000 (kit deposits 3,100,000; monthly repayments 13,900,000; service fees 1,420,000)
Cost of goods sold: 9,860,000
Gross profit: 8,560,000 (46.5% gross margin)
Operating expenses: 6,240,000 (payroll 3,480,000; logistics 1,290,000; depot rent 720,000; other 750,000)
EBITDA: 2,320,000
Net profit after finance costs: 1,410,000

Cash position at period end: 2,980,000
Accounts receivable (customer repayment book): 11,600,000 across 1,207 active contracts
Portfolio at risk > 30 days: 8.9%
On-time collection rate: 91%
Average revenue per household per month: 850
Customer acquisition cost: 2,140 per household
Unit payback period: 11 months`
  },
  {
    file_name: "Mazingira — Expansion Plan 2026.md",
    doc_kind: "business_plan",
    tags: ["demo", "strategy"],
    content: `Mazingira Solar Cooperative — Expansion plan 2026.

Objective: grow from 1,200 to 5,000 active households in 12 months across Nakuru and Kisumu.

Use of funds (KES 4,500,000):
- 3,800 solar home system kits at ~900,000 per 1,000 kits: 3,420,000
- Two service vans (used, 2018 models): 640,000
- Six field technicians, 12 months fully loaded: 320,000
- Working capital buffer: 120,000

Milestones:
Q1 — Kisumu depot opened, 400 new households, 3 technicians hired.
Q2 — 1,200 new households cumulative, mobile-money repayment automation live.
Q3 — 2,600 new households cumulative, second van deployed.
Q4 — 3,800 new households cumulative, portfolio at risk held below 9%.

Key risks: import duty changes on solar components, seasonal repayment dips during planting months (March, October), technician retention.
Mitigations: 90-day component buffer stock, flexible repayment holidays capped at 2 per contract per year, technician profit-share after 12 months.`
  },
  {
    file_name: "Mazingira — Registration & Compliance.md",
    doc_kind: "legal",
    tags: ["demo", "compliance"],
    content: `Mazingira Solar Cooperative — Registration and compliance summary.

Registered entity: Mazingira Solar Cooperative Society Ltd
Registration number: CS/2019/04417 (Commissioner for Co-operative Development, Kenya)
Date of registration: 14 March 2019
KRA PIN: P051XXXXXXA — tax compliance certificate valid through 31 December 2026
EPRA solar technician licences: 6 held, 2 pending renewal
Insurance: goods-in-transit and depot stock cover, KES 6,000,000 limit
Governance: 7-member elected board, quarterly meetings, audited annually by a registered CPA firm
Last external audit: FY2025, unqualified opinion

Banking: cooperative current account plus an M-Pesa paybill used for all customer repayments, reconciled daily.`
  }
];
export {
  DEMO_BUSINESS,
  DEMO_DOCUMENTS
};
