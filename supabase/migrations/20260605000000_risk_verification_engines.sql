-- =====================================================================
-- Atlas Sanctum: Risk Engine + Verification Engine schema additions
-- =====================================================================

-- 1. risk_scores: persist AI-generated risk assessments per user over time
CREATE TABLE IF NOT EXISTS public.risk_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trust_score numeric(5,2) NOT NULL,
  risk_level text NOT NULL CHECK (risk_level IN ('very_low','low','medium','high','very_high')),
  recommendation text NOT NULL,
  rationale text,
  flags jsonb NOT NULL DEFAULT '[]'::jsonb,
  signals jsonb NOT NULL DEFAULT '{}'::jsonb,
  computed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_risk_scores_user ON public.risk_scores(user_id, computed_at DESC);

GRANT SELECT, INSERT ON public.risk_scores TO authenticated;
GRANT ALL ON public.risk_scores TO service_role;

ALTER TABLE public.risk_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own risk scores"
  ON public.risk_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Reviewers view all risk scores"
  ON public.risk_scores FOR SELECT
  USING (public.has_role(auth.uid(), 'reviewer') OR public.has_role(auth.uid(), 'admin'));

-- Service role inserts on behalf of users via server function
CREATE POLICY "Service role inserts risk scores"
  ON public.risk_scores FOR INSERT
  WITH CHECK (true);

-- 2. Ensure verification_events.notes column exists (added in original schema)
-- Already exists — no-op guard:
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'verification_events' AND column_name = 'notes'
  ) THEN
    ALTER TABLE public.verification_events ADD COLUMN notes text;
  END IF;
END $$;

-- 3. Reviewers can read all verification events
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='verification_events'
    AND policyname='Reviewers view all verification events'
  ) THEN
    CREATE POLICY "Reviewers view all verification events"
      ON public.verification_events FOR SELECT
      USING (public.has_role(auth.uid(), 'reviewer') OR public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
