-- 1. Profiles: remove blanket authenticated read (exposes paystack_* identifiers)
DROP POLICY IF EXISTS "Profiles viewable by authenticated" ON public.profiles;
CREATE POLICY "Users view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 2. System/log tables: writes are service-role only
REVOKE INSERT, UPDATE, DELETE ON public.agent_events FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.audit_log FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.rate_limits FROM anon, authenticated;
REVOKE INSERT, DELETE ON public.notifications FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.payment_transactions FROM anon, authenticated;
GRANT ALL ON public.agent_events TO service_role;
GRANT ALL ON public.audit_log TO service_role;
GRANT ALL ON public.rate_limits TO service_role;
GRANT ALL ON public.notifications TO service_role;
GRANT ALL ON public.payment_transactions TO service_role;

-- 3. Ephemeral session tokens: service role only, no client access at all
REVOKE ALL ON public.ephemeral_sessions FROM anon, authenticated;
GRANT ALL ON public.ephemeral_sessions TO service_role;

-- 4. Asset bids: no client-side update/delete path
REVOKE UPDATE, DELETE ON public.asset_bids FROM anon, authenticated;
GRANT ALL ON public.asset_bids TO service_role;

-- 5. SECURITY DEFINER helpers must not be callable by signed-out visitors.
--    (authenticated retains EXECUTE because RLS policies evaluate these
--     helpers as the querying role.)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_reviewer(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_reviewer(uuid) TO authenticated, service_role;

-- rate_limits SELECT policy should target authenticated only
DROP POLICY IF EXISTS "Users see their own rate limits" ON public.rate_limits;
CREATE POLICY "Users see their own rate limits"
  ON public.rate_limits FOR SELECT TO authenticated
  USING (auth.uid() = user_id);