-- 1. asset_bids: no client-side modification path at all
REVOKE UPDATE, DELETE ON public.asset_bids FROM anon, authenticated;

-- 2. economic graph: authenticated users may only add nodes they own; edges are server-managed
DROP POLICY IF EXISTS "Authenticated may add nodes" ON public.economic_nodes;
CREATE POLICY "Owners insert own node"
  ON public.economic_nodes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Authenticated may add edges" ON public.economic_edges;
REVOKE INSERT, UPDATE, DELETE ON public.economic_edges FROM anon, authenticated;

-- 3. impact_assets: public marketplace reads exclude internal linkage/owner identifiers
REVOKE SELECT ON public.impact_assets FROM anon, authenticated;
GRANT SELECT (id, kind, title, description, quantity, unit, verification_score,
              status, ask_price_usd, currency, region, sector, sdg_tags, minted_at)
  ON public.impact_assets TO anon, authenticated;
GRANT SELECT (owner_user_id, verification_event_id, funding_request_id)
  ON public.impact_assets TO authenticated;
GRANT ALL ON public.impact_assets TO service_role;