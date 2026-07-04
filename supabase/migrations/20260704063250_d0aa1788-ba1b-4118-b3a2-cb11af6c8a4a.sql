
-- 1. Views: use security_invoker so RLS applies as caller
ALTER VIEW public.rve_marketplace_stats SET (security_invoker = true);
ALTER VIEW public.agent_performance SET (security_invoker = true);

-- 2. profiles: remove public SELECT, restrict to authenticated
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles viewable by authenticated"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- 3. asset_bids: remove public SELECT, restrict to bidder or asset owner
DROP POLICY IF EXISTS "Bids are public" ON public.asset_bids;
CREATE POLICY "Bidder or asset owner view bids"
  ON public.asset_bids FOR SELECT
  TO authenticated
  USING (
    auth.uid() = bidder_id
    OR EXISTS (
      SELECT 1 FROM public.impact_assets ia
      WHERE ia.id = asset_bids.asset_id AND ia.owner_user_id = auth.uid()
    )
  );

-- 4. economic_edges: authenticated-only
DROP POLICY IF EXISTS "Edges viewable by everyone" ON public.economic_edges;
CREATE POLICY "Edges viewable by authenticated"
  ON public.economic_edges FOR SELECT
  TO authenticated
  USING (true);

-- 5. economic_nodes: authenticated-only SELECT, scope other policies to authenticated
DROP POLICY IF EXISTS "Nodes viewable by everyone" ON public.economic_nodes;
CREATE POLICY "Nodes viewable by authenticated"
  ON public.economic_nodes FOR SELECT
  TO authenticated
  USING (true);
DROP POLICY IF EXISTS "Owners delete own node" ON public.economic_nodes;
CREATE POLICY "Owners delete own node"
  ON public.economic_nodes FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners update own node" ON public.economic_nodes;
CREATE POLICY "Owners update own node"
  ON public.economic_nodes FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_user_id);

-- 6. impact_assets: only truly listed assets visible publicly
DROP POLICY IF EXISTS "Listed assets are public" ON public.impact_assets;
CREATE POLICY "Listed assets are public"
  ON public.impact_assets FOR SELECT
  TO anon, authenticated
  USING (status = 'listed');

-- 7. user_roles: scope admin policies to authenticated
DROP POLICY IF EXISTS "Admins delete roles" ON public.user_roles;
CREATE POLICY "Admins delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Admins insert roles" ON public.user_roles;
CREATE POLICY "Admins insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Admins view all roles" ON public.user_roles;
CREATE POLICY "Admins view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Also scope profiles admin/write policies to authenticated (harden)
DROP POLICY IF EXISTS "Admins view all profiles" ON public.profiles;
CREATE POLICY "Admins view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
DROP POLICY IF EXISTS "Users delete own profile" ON public.profiles;
CREATE POLICY "Users delete own profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 8. Revoke EXECUTE on server-only SECURITY DEFINER functions from anon/authenticated/public.
-- All these are invoked via supabaseAdmin (service_role) only.
REVOKE EXECUTE ON FUNCTION public.notify_user(uuid, text, text, text, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_audit(uuid, text, text, uuid, uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_notif_pref(uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.queue_sanctum_email(uuid, text, text, text, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.recalc_trust_score(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.accept_asset_bid(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_rate_limit(uuid, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.expire_sessions() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.match_documents(uuid, text, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_post_likes(uuid) FROM PUBLIC, anon, authenticated;

-- Keep has_role and is_reviewer executable (used inside RLS policies evaluated as caller role).
