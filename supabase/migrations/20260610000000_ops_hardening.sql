-- =====================================================================
-- Atlas Sanctum: Ops Hardening
-- 1. pg_cron: auto-expire ephemeral sessions every 10 minutes
-- 2. Admin bootstrap: grant first admin role via a secure function
-- 3. Rate limiting table for AI endpoints
-- 4. notify_user RPC (idempotent)
-- =====================================================================

-- 1. pg_cron: schedule expire_sessions every 10 minutes
--    Requires pg_cron extension (enabled by default on Supabase Pro/Team)
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'expire-ephemeral-sessions',   -- job name (idempotent)
  '*/10 * * * *',                -- every 10 minutes
  $$DELETE FROM public.ephemeral_sessions WHERE expires_at < now() - interval '1 hour';$$
);

-- 2. Admin bootstrap
--    Call once after deploy: SELECT public.bootstrap_admin('<your-user-uuid>');
--    Requires the user_roles table from a prior migration.
CREATE OR REPLACE FUNCTION public.bootstrap_admin(target_user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  already_admin boolean;
BEGIN
  -- Only callable when there are zero existing admins (prevents privilege escalation)
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  ) INTO already_admin;

  IF already_admin THEN
    RETURN 'Admin already exists — use the admin panel to manage roles.';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT DO NOTHING;

  RETURN 'Admin role granted to ' || target_user_id::text;
END;
$$;

REVOKE ALL ON FUNCTION public.bootstrap_admin FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bootstrap_admin TO service_role;

-- 3. Rate limiting table
--    Tracks per-user AI call counts in rolling 1-minute windows.
CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  user_id   uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint  text    NOT NULL,
  window_start timestamptz NOT NULL,
  call_count integer NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, endpoint, window_start)
);

CREATE INDEX IF NOT EXISTS idx_rlb_user_endpoint
  ON public.rate_limit_buckets(user_id, endpoint, window_start DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.rate_limit_buckets TO service_role;

ALTER TABLE public.rate_limit_buckets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages rate limit buckets"
  ON public.rate_limit_buckets FOR ALL
  USING (true)
  WITH CHECK (true);

-- Atomic upsert + count for rate limiting — returns current call_count in this window
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  _user_id  uuid,
  _endpoint text,
  _limit    integer DEFAULT 20
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _window timestamptz := date_trunc('minute', now());
  _count  integer;
BEGIN
  INSERT INTO public.rate_limit_buckets (user_id, endpoint, window_start, call_count)
  VALUES (_user_id, _endpoint, _window, 1)
  ON CONFLICT (user_id, endpoint, window_start)
  DO UPDATE SET call_count = rate_limit_buckets.call_count + 1
  RETURNING call_count INTO _count;

  -- Clean up windows older than 2 minutes (opportunistic, non-blocking)
  DELETE FROM public.rate_limit_buckets
  WHERE user_id = _user_id
    AND endpoint = _endpoint
    AND window_start < now() - interval '2 minutes';

  RETURN _count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_rate_limit TO service_role;

-- 4. notify_user RPC (idempotent — safe to re-run if already exists)
CREATE TABLE IF NOT EXISTS public.notifications (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind       text        NOT NULL,
  title      text        NOT NULL,
  body       text,
  link       text,
  metadata   jsonb       NOT NULL DEFAULT '{}',
  read_at    timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notif_user
  ON public.notifications(user_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'notifications' AND policyname = 'Users manage own notifications'
  ) THEN
    CREATE POLICY "Users manage own notifications"
      ON public.notifications FOR ALL
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.notify_user(
  _user     uuid,
  _kind     text,
  _title    text,
  _body     text    DEFAULT NULL,
  _link     text    DEFAULT NULL,
  _metadata jsonb   DEFAULT '{}'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, kind, title, body, link, metadata)
  VALUES (_user, _kind, _title, _body, _link, _metadata)
  RETURNING id INTO _id;
  RETURN _id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.notify_user TO service_role, authenticated;
