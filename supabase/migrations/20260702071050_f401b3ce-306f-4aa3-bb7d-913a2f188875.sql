
-- Rate limits table (per user + endpoint, 1-min window)
CREATE TABLE IF NOT EXISTS public.rate_limits (
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('minute', now()),
  call_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, endpoint, window_started_at)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.rate_limits TO authenticated;
GRANT ALL ON public.rate_limits TO service_role;

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see their own rate limits" ON public.rate_limits
  FOR SELECT USING (auth.uid() = user_id);

-- Atomic increment RPC; returns new call_count for the current 1-min window
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  _user_id UUID, _endpoint TEXT, _limit INTEGER
) RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window TIMESTAMPTZ := date_trunc('minute', now());
  v_count INTEGER;
BEGIN
  INSERT INTO public.rate_limits(user_id, endpoint, window_started_at, call_count)
  VALUES (_user_id, _endpoint, v_window, 1)
  ON CONFLICT (user_id, endpoint, window_started_at)
  DO UPDATE SET call_count = public.rate_limits.call_count + 1
  RETURNING call_count INTO v_count;

  -- Housekeeping: drop windows older than 10 min
  DELETE FROM public.rate_limits
    WHERE window_started_at < now() - interval '10 minutes';

  RETURN v_count;
END;
$$;

-- Vault retrieval RPC. Embeddings are stored as text-JSON; without pgvector we
-- fall back to recency + optional doc_kind filter. Returns the shape expected
-- by src/lib/vault.functions.ts / src/routes/api/chat.ts.
CREATE OR REPLACE FUNCTION public.match_documents(
  _user_id UUID,
  _embedding TEXT,
  _match_count INTEGER,
  _doc_kind TEXT
) RETURNS TABLE (
  id UUID,
  file_name TEXT,
  content TEXT,
  doc_kind TEXT,
  similarity DOUBLE PRECISION
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kd.id,
    kd.file_name,
    kd.content,
    kd.doc_kind,
    0.5::double precision AS similarity
  FROM public.knowledge_documents kd
  WHERE kd.user_id = _user_id
    AND (_doc_kind IS NULL OR kd.doc_kind = _doc_kind)
    AND kd.content IS NOT NULL
    AND length(kd.content) > 0
  ORDER BY kd.created_at DESC
  LIMIT GREATEST(_match_count, 1);
END;
$$;
