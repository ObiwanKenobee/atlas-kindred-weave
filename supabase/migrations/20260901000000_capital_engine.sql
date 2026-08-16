-- =====================================================================
-- Atlas Agentic Capital Engine
-- Complete closed-loop regenerative finance infrastructure
-- =====================================================================

-- ── Capital Pools ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.capital_pools (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  description     text,
  total_capital   numeric(18,2) NOT NULL DEFAULT 0,
  deployed_capital numeric(18,2) NOT NULL DEFAULT 0,
  reserved_capital numeric(18,2) NOT NULL DEFAULT 0,
  currency        text        NOT NULL DEFAULT 'USD',
  status          text        NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','closed')),
  created_by      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata        jsonb       NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.capital_pools (name, description, total_capital, currency)
VALUES ('Atlas Regenerative Capital Fund I', 'Simulated capital pool for regenerative project financing', 1000000, 'USD')
ON CONFLICT DO NOTHING;

GRANT SELECT ON public.capital_pools TO authenticated, anon;
GRANT ALL ON public.capital_pools TO service_role;
ALTER TABLE public.capital_pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view capital pools" ON public.capital_pools FOR SELECT USING (true);
CREATE POLICY "Service role manages pools" ON public.capital_pools FOR ALL WITH CHECK (true);

-- ── Regenerative Projects ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.regen_projects (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  text        NOT NULL,
  description           text,
  sector                text        NOT NULL CHECK (sector IN (
    'ecosystem_restoration','regenerative_agriculture','clean_energy',
    'resilient_infrastructure','water','affordable_housing',
    'climate_adaptation','financial_inclusion','biodiversity','circular_economy'
  )),
  location              text        NOT NULL,
  country               text        NOT NULL DEFAULT 'KE',
  capital_required      numeric(18,2) NOT NULL,
  capital_allocated     numeric(18,2) NOT NULL DEFAULT 0,
  currency              text        NOT NULL DEFAULT 'USD',
  expected_return_pct   numeric(6,3) NOT NULL DEFAULT 0,
  duration_months       integer     NOT NULL DEFAULT 24,
  -- state machine
  status                text        NOT NULL DEFAULT 'DISCOVERED' CHECK (status IN (
    'DISCOVERED','UNDER_REVIEW','DUE_DILIGENCE_COMPLETE','INVESTMENT_PROPOSED',
    'AWAITING_APPROVAL','APPROVED','CAPITAL_ALLOCATED','ACTIVE','MONITORING',
    'IMPACT_VERIFICATION','OUTCOME_VERIFIED','REINVEST','SCALE','PAUSE','EXIT'
  )),
  -- scores (0-100)
  opportunity_score     numeric(5,2),
  financial_score       numeric(5,2),
  impact_score          numeric(5,2),
  execution_score       numeric(5,2),
  evidence_score        numeric(5,2),
  governance_score      numeric(5,2),
  risk_score            numeric(5,2),
  overall_score         numeric(5,2),
  -- impact targets
  expected_jobs         integer     NOT NULL DEFAULT 0,
  expected_beneficiaries integer    NOT NULL DEFAULT 0,
  expected_hectares     numeric(10,2),
  expected_co2_tonnes   numeric(10,2),
  -- agent outputs (structured JSON)
  discovery_report      jsonb,
  due_diligence_report  jsonb,
  investment_proposal   jsonb,
  impact_report         jsonb,
  reallocation_report   jsonb,
  -- human decision
  human_approval        text        CHECK (human_approval IN ('pending','approved','rejected','more_evidence')),
  human_decided_by      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  human_decided_at      timestamptz,
  human_notes           text,
  -- metadata
  submitted_by          uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  image_url             text,
  tags                  text[]      NOT NULL DEFAULT '{}',
  sdg_goals             integer[]   NOT NULL DEFAULT '{}',
  metadata              jsonb       NOT NULL DEFAULT '{}',
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_rp_status   ON public.regen_projects(status, created_at DESC);
CREATE INDEX idx_rp_sector   ON public.regen_projects(sector);
CREATE INDEX idx_rp_score    ON public.regen_projects(overall_score DESC NULLS LAST);

GRANT SELECT ON public.regen_projects TO authenticated, anon;
GRANT ALL ON public.regen_projects TO service_role;
ALTER TABLE public.regen_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view projects" ON public.regen_projects FOR SELECT USING (true);
CREATE POLICY "Authenticated can submit projects" ON public.regen_projects FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Service role manages projects" ON public.regen_projects FOR ALL WITH CHECK (true);

-- ── Capital Allocations ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.capital_allocations (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id         uuid        NOT NULL REFERENCES public.capital_pools(id) ON DELETE CASCADE,
  project_id      uuid        NOT NULL REFERENCES public.regen_projects(id) ON DELETE CASCADE,
  amount          numeric(18,2) NOT NULL,
  currency        text        NOT NULL DEFAULT 'USD',
  instrument      text        NOT NULL DEFAULT 'milestone_grant' CHECK (instrument IN (
    'milestone_grant','revenue_share','concessional_loan','equity','blended_finance','grant'
  )),
  status          text        NOT NULL DEFAULT 'proposed' CHECK (status IN (
    'proposed','approved','active','completed','paused','exited'
  )),
  expected_return_pct numeric(6,3),
  risk_level      text        CHECK (risk_level IN ('low','medium','high','very_high')),
  impact_thesis   text,
  release_conditions jsonb    NOT NULL DEFAULT '[]',
  monitoring_requirements jsonb NOT NULL DEFAULT '[]',
  approved_by     uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.capital_allocations TO authenticated;
GRANT ALL ON public.capital_allocations TO service_role;
ALTER TABLE public.capital_allocations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated view allocations" ON public.capital_allocations FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Service role manages allocations" ON public.capital_allocations FOR ALL WITH CHECK (true);

-- ── Project Milestones ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.project_milestones (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      uuid        NOT NULL REFERENCES public.regen_projects(id) ON DELETE CASCADE,
  allocation_id   uuid        REFERENCES public.capital_allocations(id) ON DELETE SET NULL,
  title           text        NOT NULL,
  description     text,
  sequence        integer     NOT NULL DEFAULT 1,
  tranche_amount  numeric(18,2) NOT NULL DEFAULT 0,
  currency        text        NOT NULL DEFAULT 'USD',
  status          text        NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending','submitted','under_review','verified','released','failed'
  )),
  due_date        date,
  submitted_at    timestamptz,
  verified_at     timestamptz,
  released_at     timestamptz,
  evidence_ids    uuid[]      NOT NULL DEFAULT '{}',
  verification_score numeric(5,2),
  agent_notes     text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_pm_project  ON public.project_milestones(project_id, sequence);
CREATE INDEX idx_pm_status   ON public.project_milestones(status);

GRANT SELECT ON public.project_milestones TO authenticated;
GRANT ALL ON public.project_milestones TO service_role;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated view milestones" ON public.project_milestones FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Service role manages milestones" ON public.project_milestones FOR ALL WITH CHECK (true);

-- ── Evidence Records ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.evidence_records (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      uuid        NOT NULL REFERENCES public.regen_projects(id) ON DELETE CASCADE,
  milestone_id    uuid        REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  source          text        NOT NULL,
  metric          text        NOT NULL,
  claimed_value   numeric(18,4),
  verified_value  numeric(18,4),
  unit            text        NOT NULL DEFAULT 'unit',
  confidence      numeric(5,2) NOT NULL DEFAULT 0 CHECK (confidence BETWEEN 0 AND 100),
  verification_status text    NOT NULL DEFAULT 'CLAIMED' CHECK (verification_status IN (
    'CLAIMED','ESTIMATED','VERIFIED','THIRD_PARTY_VERIFIED','REJECTED'
  )),
  evidence_type   text        NOT NULL DEFAULT 'report' CHECK (evidence_type IN (
    'report','satellite','survey','financial','photo','third_party','sensor','beneficiary'
  )),
  anomalies       text[],
  notes           text,
  verified_by_agent text,
  verified_at     timestamptz,
  metadata        jsonb       NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_er_project  ON public.evidence_records(project_id, created_at DESC);
CREATE INDEX idx_er_status   ON public.evidence_records(verification_status);

GRANT SELECT ON public.evidence_records TO authenticated;
GRANT ALL ON public.evidence_records TO service_role;
ALTER TABLE public.evidence_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated view evidence" ON public.evidence_records FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Service role manages evidence" ON public.evidence_records FOR ALL WITH CHECK (true);

-- ── Capital Ledger Transactions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.capital_transactions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  allocation_id   uuid        REFERENCES public.capital_allocations(id) ON DELETE SET NULL,
  project_id      uuid        NOT NULL REFERENCES public.regen_projects(id) ON DELETE CASCADE,
  pool_id         uuid        REFERENCES public.capital_pools(id) ON DELETE SET NULL,
  milestone_id    uuid        REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  tx_type         text        NOT NULL CHECK (tx_type IN (
    'ALLOCATION','TRANCHE_RELEASE','RETURN','FEE','ADJUSTMENT','REFUND'
  )),
  amount          numeric(18,2) NOT NULL,
  currency        text        NOT NULL DEFAULT 'USD',
  from_entity     text        NOT NULL,
  to_entity       text        NOT NULL,
  purpose         text        NOT NULL,
  status          text        NOT NULL DEFAULT 'SIMULATED' CHECK (status IN (
    'SIMULATED','PENDING','EXECUTED','FAILED','REVERSED'
  )),
  authorization   text,
  authorized_by   uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  reference_id    text,
  metadata        jsonb       NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ct_project  ON public.capital_transactions(project_id, created_at DESC);
CREATE INDEX idx_ct_pool     ON public.capital_transactions(pool_id, created_at DESC);

GRANT SELECT ON public.capital_transactions TO authenticated;
GRANT ALL ON public.capital_transactions TO service_role;
ALTER TABLE public.capital_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated view transactions" ON public.capital_transactions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Service role manages transactions" ON public.capital_transactions FOR ALL WITH CHECK (true);

-- ── Agent Audit Events ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.agent_audit_events (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      uuid        REFERENCES public.regen_projects(id) ON DELETE CASCADE,
  agent           text        NOT NULL,
  action          text        NOT NULL,
  reason          text,
  input_summary   text,
  output_summary  text,
  confidence      numeric(5,2),
  evidence_refs   text[],
  authorization   text,
  result          text,
  latency_ms      integer,
  metadata        jsonb       NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_aae_project ON public.agent_audit_events(project_id, created_at DESC);
CREATE INDEX idx_aae_agent   ON public.agent_audit_events(agent, created_at DESC);

GRANT SELECT ON public.agent_audit_events TO authenticated;
GRANT ALL ON public.agent_audit_events TO service_role;
ALTER TABLE public.agent_audit_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated view agent events" ON public.agent_audit_events FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Service role manages agent events" ON public.agent_audit_events FOR ALL WITH CHECK (true);

-- ── Project State Transitions ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.project_state_transitions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      uuid        NOT NULL REFERENCES public.regen_projects(id) ON DELETE CASCADE,
  from_status     text        NOT NULL,
  to_status       text        NOT NULL,
  triggered_by    text        NOT NULL, -- 'agent' | 'human' | 'system'
  actor           text,
  reason          text,
  metadata        jsonb       NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_pst_project ON public.project_state_transitions(project_id, created_at DESC);

GRANT SELECT ON public.project_state_transitions TO authenticated;
GRANT ALL ON public.project_state_transitions TO service_role;
ALTER TABLE public.project_state_transitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated view transitions" ON public.project_state_transitions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Service role manages transitions" ON public.project_state_transitions FOR ALL WITH CHECK (true);

-- ── Seed demo projects ────────────────────────────────────────────────
INSERT INTO public.regen_projects (
  name, description, sector, location, country,
  capital_required, expected_return_pct, duration_months,
  expected_jobs, expected_beneficiaries, expected_hectares,
  status, overall_score, impact_score, risk_score,
  tags, sdg_goals
) VALUES
(
  'Mathare River Restoration',
  'Ecological restoration of the Mathare River corridor in Nairobi — riparian buffer planting, waste removal, community water access, and biodiversity recovery across 1,200 hectares.',
  'ecosystem_restoration', 'Nairobi, Kenya', 'KE',
  250000, 12.0, 36,
  180, 4820, 1200,
  'DISCOVERED', 91, 94, 42,
  ARRAY['water','biodiversity','community','nairobi'], ARRAY[6,13,15]
),
(
  'Rift Valley Regenerative Agriculture Cooperative',
  'Transition 340 smallholder farmers in the Rift Valley to regenerative practices — cover cropping, agroforestry, soil carbon sequestration, and cooperative market access.',
  'regenerative_agriculture', 'Nakuru, Kenya', 'KE',
  175000, 14.5, 30,
  340, 1700, 850,
  'UNDER_REVIEW', 87, 89, 38,
  ARRAY['agriculture','carbon','cooperative','food-security'], ARRAY[1,2,13,15]
),
(
  'Kisumu Solar Micro-Grid Network',
  'Deploy 12 community solar micro-grids across peri-urban Kisumu, providing clean energy to 3,200 households and enabling productive use of energy for SMEs.',
  'clean_energy', 'Kisumu, Kenya', 'KE',
  320000, 16.2, 48,
  95, 3200, NULL,
  'DUE_DILIGENCE_COMPLETE', 83, 85, 51,
  ARRAY['solar','energy-access','sme','kisumu'], ARRAY[7,8,11]
),
(
  'Mombasa Affordable Housing Initiative',
  'Construct 200 climate-resilient affordable housing units in Mombasa using locally-sourced materials and passive cooling design, targeting households earning below $300/month.',
  'affordable_housing', 'Mombasa, Kenya', 'KE',
  480000, 9.8, 60,
  220, 1000, NULL,
  'INVESTMENT_PROPOSED', 79, 82, 58,
  ARRAY['housing','climate-resilience','mombasa'], ARRAY[1,11,13]
),
(
  'Lake Victoria Water Purification Network',
  'Install 28 community water purification stations around Lake Victoria, serving 12,000 people with clean water and reducing waterborne disease incidence by an estimated 60%.',
  'water', 'Kisumu & Homa Bay, Kenya', 'KE',
  195000, 11.0, 24,
  45, 12000, NULL,
  'ACTIVE', 92, 96, 35,
  ARRAY['water','health','lake-victoria'], ARRAY[3,6]
),
(
  'Turkana Climate Adaptation Fund',
  'Build climate-resilient livelihoods for 800 pastoralist households in Turkana through drought-resistant crops, water harvesting, and mobile financial services.',
  'climate_adaptation', 'Turkana, Kenya', 'KE',
  140000, 8.5, 36,
  120, 4000, 200,
  'MONITORING', 76, 88, 62,
  ARRAY['climate','pastoralism','turkana','resilience'], ARRAY[1,2,13]
)
ON CONFLICT DO NOTHING;

-- ── Seed milestones for active project ───────────────────────────────
DO $$
DECLARE
  _pid uuid;
BEGIN
  SELECT id INTO _pid FROM public.regen_projects WHERE name = 'Lake Victoria Water Purification Network' LIMIT 1;
  IF _pid IS NOT NULL THEN
    INSERT INTO public.project_milestones (project_id, title, description, sequence, tranche_amount, status, due_date)
    VALUES
      (_pid, 'M1: Site Assessment & Community Mobilisation', 'Complete site surveys for all 28 locations and establish community water committees.', 1, 45000, 'verified', CURRENT_DATE - INTERVAL '90 days'),
      (_pid, 'M2: Equipment Procurement & Installation (Phase 1)', 'Procure and install first 10 purification stations with solar power systems.', 2, 65000, 'verified', CURRENT_DATE - INTERVAL '30 days'),
      (_pid, 'M3: Installation Phase 2 & Operator Training', 'Install remaining 18 stations and train 56 community operators.', 3, 55000, 'submitted', CURRENT_DATE + INTERVAL '30 days'),
      (_pid, 'M4: Impact Verification & Outcome Reporting', 'Independent water quality testing, beneficiary surveys, and final impact report.', 4, 30000, 'pending', CURRENT_DATE + INTERVAL '90 days')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- ── Seed evidence for active project ─────────────────────────────────
DO $$
DECLARE
  _pid uuid;
BEGIN
  SELECT id INTO _pid FROM public.regen_projects WHERE name = 'Lake Victoria Water Purification Network' LIMIT 1;
  IF _pid IS NOT NULL THEN
    INSERT INTO public.evidence_records (project_id, source, metric, claimed_value, verified_value, unit, confidence, verification_status, evidence_type)
    VALUES
      (_pid, 'Community Survey Report Q1', 'Households with clean water access', 8400, 8210, 'households', 97, 'VERIFIED', 'survey'),
      (_pid, 'Water Quality Lab Tests', 'E.coli reduction', 94, 91, 'percent', 99, 'THIRD_PARTY_VERIFIED', 'third_party'),
      (_pid, 'Project Progress Report', 'Stations installed', 18, 18, 'units', 100, 'VERIFIED', 'report'),
      (_pid, 'Community Health Clinic Data', 'Waterborne disease reduction', 60, NULL, 'percent', 55, 'ESTIMATED', 'report'),
      (_pid, 'GPS Field Survey', 'Communities served', 22, 22, 'communities', 100, 'VERIFIED', 'survey')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
