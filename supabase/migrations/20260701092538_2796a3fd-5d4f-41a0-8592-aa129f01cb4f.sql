
-- Ephemeral sessions
CREATE TABLE IF NOT EXISTS public.ephemeral_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  purpose TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ephemeral_sessions_token_idx ON public.ephemeral_sessions(token);
CREATE INDEX IF NOT EXISTS ephemeral_sessions_user_idx ON public.ephemeral_sessions(user_id, created_at DESC);
GRANT ALL ON public.ephemeral_sessions TO service_role;
ALTER TABLE public.ephemeral_sessions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.expire_sessions()
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  DELETE FROM public.ephemeral_sessions WHERE expires_at < now() - interval '1 day';
$$;
GRANT EXECUTE ON FUNCTION public.expire_sessions() TO service_role;

-- Agent events
CREATE TABLE IF NOT EXISTS public.agent_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  agent TEXT NOT NULL,
  action TEXT NOT NULL,
  latency_ms INTEGER,
  input_tokens INTEGER,
  output_tokens INTEGER,
  confidence NUMERIC,
  outcome TEXT,
  sources_retrieved INTEGER NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS agent_events_user_idx ON public.agent_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS agent_events_agent_idx ON public.agent_events(agent, action, created_at DESC);
GRANT SELECT ON public.agent_events TO authenticated;
GRANT ALL ON public.agent_events TO service_role;
ALTER TABLE public.agent_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own agent events" ON public.agent_events;
CREATE POLICY "Users view own agent events" ON public.agent_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_reviewer(auth.uid()));

-- Interaction steps
CREATE TABLE IF NOT EXISTS public.interaction_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  workflow_id TEXT NOT NULL,
  step TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'complete',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS interaction_steps_workflow_idx ON public.interaction_steps(workflow_id, created_at);
GRANT SELECT ON public.interaction_steps TO authenticated;
GRANT ALL ON public.interaction_steps TO service_role;
ALTER TABLE public.interaction_steps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own interaction steps" ON public.interaction_steps;
CREATE POLICY "Users view own interaction steps" ON public.interaction_steps
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_reviewer(auth.uid()));

-- Agent performance summary view
CREATE OR REPLACE VIEW public.agent_performance AS
SELECT
  agent,
  action,
  count(*)::bigint AS total_calls,
  COALESCE(round(avg(latency_ms))::int, 0) AS avg_latency_ms,
  COALESCE(round(avg(COALESCE(input_tokens,0) + COALESCE(output_tokens,0)))::int, 0) AS avg_tokens,
  COALESCE(round(avg(confidence) * 100)::int, 0) AS avg_confidence_pct,
  COALESCE(round(avg(sources_retrieved))::int, 0) AS avg_sources,
  count(*) FILTER (WHERE outcome = 'error')::bigint AS error_count,
  max(created_at) AS last_call_at
FROM public.agent_events
GROUP BY agent, action;
GRANT SELECT ON public.agent_performance TO authenticated, service_role;
