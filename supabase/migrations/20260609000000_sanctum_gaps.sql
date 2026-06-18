-- =====================================================================
-- Atlas Sanctum: Gap closure migration
-- knowledge-vault bucket, interaction_steps, subscription plans
-- =====================================================================

-- 1. Knowledge Vault storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('knowledge-vault', 'knowledge-vault', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users read own vault files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'knowledge-vault' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own vault files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'knowledge-vault' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own vault files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'knowledge-vault' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 2. Observable interaction steps (Gemini Interactions API pattern)
CREATE TABLE IF NOT EXISTS public.interaction_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  workflow_id text NOT NULL,
  step text NOT NULL,
  status text NOT NULL DEFAULT 'complete',
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_is_workflow ON public.interaction_steps(workflow_id, created_at);
CREATE INDEX idx_is_user ON public.interaction_steps(user_id, created_at DESC);

GRANT SELECT, INSERT ON public.interaction_steps TO authenticated;
GRANT ALL ON public.interaction_steps TO service_role;

ALTER TABLE public.interaction_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own interaction steps"
  ON public.interaction_steps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Reviewers and admins view all interaction steps"
  ON public.interaction_steps FOR SELECT
  USING (public.has_role(auth.uid(), 'reviewer') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role inserts interaction steps"
  ON public.interaction_steps FOR INSERT
  WITH CHECK (true);

-- 3. Subscription plans (revenue model foundation)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_plan text NOT NULL DEFAULT 'free'
    CHECK (subscription_plan IN ('free', 'launch', 'growth', 'scale', 'enterprise'));

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_status text NOT NULL DEFAULT 'active'
    CHECK (subscription_status IN ('active', 'past_due', 'cancelled', 'trialing'));

CREATE TABLE IF NOT EXISTS public.subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan text NOT NULL,
  event_type text NOT NULL,
  amount_cents integer,
  currency text DEFAULT 'USD',
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_sub_events_user ON public.subscription_events(user_id, created_at DESC);

GRANT SELECT, INSERT ON public.subscription_events TO authenticated;
GRANT ALL ON public.subscription_events TO service_role;

ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own subscription events"
  ON public.subscription_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all subscription events"
  ON public.subscription_events FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages subscription events"
  ON public.subscription_events FOR ALL
  WITH CHECK (true);
