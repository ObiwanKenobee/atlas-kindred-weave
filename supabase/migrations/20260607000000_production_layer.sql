-- =====================================================================
-- Atlas Sanctum: Production Layer
-- agent_events: observability spine for every AI action
-- ephemeral_sessions: secure short-lived session tokens (5-min TTL)
-- =====================================================================

-- 1. Agent events — every AI call is logged here
CREATE TABLE IF NOT EXISTS public.agent_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  -- which agent / engine produced this event
  agent text NOT NULL,                          -- 'CFO Agent', 'Funding Agent', 'Risk Agent', etc.
  action text NOT NULL,                         -- 'funding_decision', 'vault_query', 'risk_score', etc.
  -- performance
  latency_ms integer,                           -- wall-clock ms for the AI call
  input_tokens integer,
  output_tokens integer,
  -- outcome
  confidence numeric(4,3),                      -- 0.000–1.000
  outcome text,                                 -- 'approve'|'decline'|'verified'|'answered'|'error'
  -- grounding
  sources_retrieved integer DEFAULT 0,          -- number of vault chunks used
  -- full payload for audit (redacted PII before storing)
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ae_user      ON public.agent_events(user_id, created_at DESC);
CREATE INDEX idx_ae_agent     ON public.agent_events(agent, created_at DESC);
CREATE INDEX idx_ae_action    ON public.agent_events(action, created_at DESC);
CREATE INDEX idx_ae_created   ON public.agent_events(created_at DESC);

GRANT SELECT, INSERT ON public.agent_events TO authenticated;
GRANT ALL ON public.agent_events TO service_role;

ALTER TABLE public.agent_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own agent events"
  ON public.agent_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Reviewers and admins view all agent events"
  ON public.agent_events FOR SELECT
  USING (public.has_role(auth.uid(), 'reviewer') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role inserts agent events"
  ON public.agent_events FOR INSERT
  WITH CHECK (true);

-- 2. Ephemeral sessions — short-lived tokens for secure voice/AI sessions
--    Tokens expire after 5 minutes; the cleanup function removes stale rows.
CREATE TABLE IF NOT EXISTS public.ephemeral_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,                   -- hex token, never stored on client after use
  purpose text NOT NULL DEFAULT 'cfo_voice',    -- 'cfo_voice' | 'vault_query' | 'live_session'
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '5 minutes'),
  used_at timestamptz,                          -- set when token is consumed
  ip_hint text,                                 -- optional: requesting IP for anomaly detection
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_es_token   ON public.ephemeral_sessions(token);
CREATE INDEX idx_es_user    ON public.ephemeral_sessions(user_id, expires_at DESC);
CREATE INDEX idx_es_expires ON public.ephemeral_sessions(expires_at);

GRANT SELECT, INSERT, UPDATE ON public.ephemeral_sessions TO authenticated;
GRANT ALL ON public.ephemeral_sessions TO service_role;

ALTER TABLE public.ephemeral_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own sessions"
  ON public.ephemeral_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access"
  ON public.ephemeral_sessions FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Cleanup function — called periodically (or on each mint) to purge expired tokens
CREATE OR REPLACE FUNCTION public.expire_sessions()
RETURNS void
LANGUAGE sql
AS $$
  DELETE FROM public.ephemeral_sessions
  WHERE expires_at < now() - interval '1 hour';
$$;

GRANT EXECUTE ON FUNCTION public.expire_sessions TO service_role;

-- 4. Aggregate view: per-agent performance summary (used by observability dashboard)
CREATE OR REPLACE VIEW public.agent_performance AS
SELECT
  agent,
  action,
  count(*)                                          AS total_calls,
  round(avg(latency_ms))                            AS avg_latency_ms,
  round(avg(input_tokens + output_tokens))          AS avg_tokens,
  round(avg(confidence) * 100, 1)                   AS avg_confidence_pct,
  round(avg(sources_retrieved), 1)                  AS avg_sources,
  count(*) FILTER (WHERE outcome = 'error')         AS error_count,
  max(created_at)                                   AS last_call_at
FROM public.agent_events
GROUP BY agent, action;

GRANT SELECT ON public.agent_performance TO authenticated, service_role;
