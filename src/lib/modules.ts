import {
  Shield, Coins, BadgeCheck, Vault, AlertTriangle, Sprout,
  Leaf, Brain, Network, Recycle, Sparkles, Home,
} from "lucide-react";

export type ModuleDef = {
  slug: string;
  path: string;
  name: string;
  glyph: string;
  tagline: string;
  purpose: string;
  icon: typeof Shield;
  agents: string[];
  outputs: string[];
  metrics: { label: string; value: string; delta?: string }[];
};

export const SANCTUM_MODULES: ModuleDef[] = [
  {
    slug: "identity",
    path: "/identity",
    name: "Identity & Trust",
    glyph: "I",
    tagline: "Economic identity earned through verified action.",
    purpose: "Establish economic identity and a living reputation across users, businesses, and communities.",
    icon: Shield,
    agents: ["Verification Agent", "Governance Agent"],
    outputs: ["Atlas Reputation Rating (ARR)", "Reliability Index", "Anomaly Alerts"],
    metrics: [
      { label: "Verified Identities", value: "248,910", delta: "+2.4%" },
      { label: "Avg ARR", value: "732 / 1000", delta: "+18" },
      { label: "Anomalies Today", value: "37", delta: "-12%" },
    ],
  },
  {
    slug: "funding",
    path: "/funding",
    name: "Funding Engine",
    glyph: "II",
    tagline: "Capital flows to measurable opportunity.",
    purpose: "Match capital to entrepreneurs through grants, revenue-based finance, and milestone funding.",
    icon: Coins,
    agents: ["Deal Agent", "Risk Agent", "Treasury Agent"],
    outputs: ["Funding Decision Reports", "Repayment Schedules", "Term Sheets"],
    metrics: [
      { label: "Capital Deployed", value: "$48.2M", delta: "+9.1%" },
      { label: "Active Deals", value: "1,284" },
      { label: "Default Rate", value: "1.8%", delta: "-0.3pp" },
    ],
  },
  {
    slug: "verification",
    path: "/verification",
    name: "Verification Engine",
    glyph: "III",
    tagline: "Proof without bureaucracy.",
    purpose: "Validate receipts, inventory, identity, location, and milestones using AI evidence analysis.",
    icon: BadgeCheck,
    agents: ["Verification Agent", "Research Agent"],
    outputs: ["Verification Confidence Score", "Evidence Trail", "Milestone Receipts"],
    metrics: [
      { label: "Proofs Processed", value: "92,418" },
      { label: "Avg Confidence", value: "94.6%", delta: "+1.2pp" },
      { label: "Fraud Caught", value: "412" },
    ],
  },
  {
    slug: "treasury",
    path: "/treasury",
    name: "Treasury Engine",
    glyph: "IV",
    tagline: "Financial intelligence, continuously.",
    purpose: "Track revenue, expenses, cash flow, and allocate capital across the Sanctum.",
    icon: Vault,
    agents: ["Treasury Agent", "Risk Agent"],
    outputs: ["Daily P&L", "Cash Flow Forecast", "Treasury Health Score"],
    metrics: [
      { label: "Reserves", value: "$112.7M" },
      { label: "Runway", value: "38 mo", delta: "+2 mo" },
      { label: "Health Score", value: "A+" },
    ],
  },
  {
    slug: "risk",
    path: "/risk",
    name: "Risk Engine",
    glyph: "V",
    tagline: "Protect the ecosystem.",
    purpose: "Detect fraud, AML risk, and abusive behavior; recommend protective actions.",
    icon: AlertTriangle,
    agents: ["Risk Agent", "Verification Agent"],
    outputs: ["Risk Score", "Fraud Probability", "Recommended Action"],
    metrics: [
      { label: "Open Alerts", value: "84" },
      { label: "Avg Risk Score", value: "0.21", delta: "-0.04" },
      { label: "Auto-resolved", value: "76%" },
    ],
  },
  {
    slug: "growth",
    path: "/growth",
    name: "Growth Engine",
    glyph: "VI",
    tagline: "Acquisition that respects the human.",
    purpose: "Run email, SMS, WhatsApp, referral, and community growth campaigns autonomously.",
    icon: Sprout,
    agents: ["Growth Agent", "Community Agent"],
    outputs: ["Lead Lists", "Campaign Plans", "Conversion Forecasts"],
    metrics: [
      { label: "Active Campaigns", value: "27" },
      { label: "MQL → SQL", value: "31%", delta: "+4pp" },
      { label: "Avg CAC", value: "$11.40" },
    ],
  },
  {
    slug: "impact",
    path: "/impact",
    name: "Impact Engine",
    glyph: "VII",
    tagline: "Measure what actually matters.",
    purpose: "Convert activity into verified outcomes: jobs, businesses, households, education, environment.",
    icon: Leaf,
    agents: ["Impact Agent", "Verification Agent"],
    outputs: ["Impact Score", "Prosperity Index", "Community Growth Index"],
    metrics: [
      { label: "Jobs Created", value: "12,847" },
      { label: "Businesses Funded", value: "3,294" },
      { label: "Trees Planted", value: "1.2M" },
    ],
  },
  {
    slug: "business-os",
    path: "/business-os",
    name: "Atlas Business OS",
    glyph: "VIII",
    tagline: "An AI executive team for every SME.",
    purpose: "AI CEO, CFO, COO, Sales, Growth, and Risk officers operating each business in the Sanctum.",
    icon: Brain,
    agents: ["AI CEO", "AI CFO", "AI COO", "AI Sales Director", "AI Growth Director", "AI Risk Officer"],
    outputs: ["Business Growth Dashboard", "Weekly Operating Plan", "Board Brief"],
    metrics: [
      { label: "Businesses Operated", value: "2,108" },
      { label: "Avg MoM Growth", value: "+7.3%" },
      { label: "AI Decisions / day", value: "184,000" },
    ],
  },
  {
    slug: "economic-graph",
    path: "/economic-graph",
    name: "Economic Graph",
    glyph: "IX",
    tagline: "Map the geometry of opportunity.",
    purpose: "Discover relationships between businesses, investors, suppliers, customers, and communities.",
    icon: Network,
    agents: ["Research Agent", "Deal Agent"],
    outputs: ["Economic Opportunity Map", "Partnership Recommendations"],
    metrics: [
      { label: "Nodes", value: "1.8M" },
      { label: "Edges", value: "14.6M" },
      { label: "Matches / week", value: "9,210" },
    ],
  },
  {
    slug: "regenerative",
    path: "/regenerative",
    name: "Regenerative Value Exchange",
    glyph: "X",
    tagline: "A marketplace for verified outcomes.",
    purpose: "Tradeable impact: jobs created, trees planted, businesses funded, students educated.",
    icon: Recycle,
    agents: ["Impact Agent", "Treasury Agent"],
    outputs: ["Impact Asset Certificates", "Impact Valuation Reports"],
    metrics: [
      { label: "Outcomes Listed", value: "8,430" },
      { label: "Volume (30d)", value: "$6.1M" },
      { label: "Avg Verification", value: "96%" },
    ],
  },
];

export const ORCHESTRATOR = {
  slug: "orchestrator",
  path: "/orchestrator",
  name: "Atlas Orchestrator",
  tagline: "The central intelligence coordinating every agent.",
  icon: Sparkles,
};

export const HOME = { path: "/", name: "Sanctum", icon: Home };
