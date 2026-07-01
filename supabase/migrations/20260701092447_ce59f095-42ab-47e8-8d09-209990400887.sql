
-- ============================================================================
-- Profiles: subscription plan + status
-- ============================================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'active';

-- ============================================================================
-- risk_scores
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.risk_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trust_score NUMERIC NOT NULL DEFAULT 50,
  risk_level TEXT NOT NULL DEFAULT 'medium',
  recommendation TEXT,
  rationale TEXT,
  flags JSONB NOT NULL DEFAULT '[]'::jsonb,
  signals JSONB NOT NULL DEFAULT '{}'::jsonb,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS risk_scores_user_computed_idx ON public.risk_scores(user_id, computed_at DESC);
GRANT SELECT, INSERT ON public.risk_scores TO authenticated;
GRANT ALL ON public.risk_scores TO service_role;
ALTER TABLE public.risk_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own risk scores" ON public.risk_scores;
CREATE POLICY "Users view own risk scores" ON public.risk_scores
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_reviewer(auth.uid()));

-- ============================================================================
-- knowledge_documents (Vault)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT,
  storage_path TEXT,
  content TEXT NOT NULL,
  chunk_index INTEGER NOT NULL DEFAULT 0,
  total_chunks INTEGER NOT NULL DEFAULT 1,
  embedding TEXT,
  doc_kind TEXT NOT NULL DEFAULT 'general',
  funding_request_id UUID REFERENCES public.funding_requests(id) ON DELETE SET NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS knowledge_documents_user_idx ON public.knowledge_documents(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS knowledge_documents_kind_idx ON public.knowledge_documents(user_id, doc_kind, chunk_index);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_documents TO authenticated;
GRANT ALL ON public.knowledge_documents TO service_role;
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own knowledge docs" ON public.knowledge_documents;
CREATE POLICY "Users manage own knowledge docs" ON public.knowledge_documents
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- community_posts
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'update',
  likes INTEGER NOT NULL DEFAULT 0,
  replies INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS community_posts_created_idx ON public.community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS community_posts_category_idx ON public.community_posts(category, created_at DESC);
GRANT SELECT ON public.community_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.community_posts TO authenticated;
GRANT ALL ON public.community_posts TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Community posts are public" ON public.community_posts;
CREATE POLICY "Community posts are public" ON public.community_posts
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users create own community posts" ON public.community_posts;
CREATE POLICY "Users create own community posts" ON public.community_posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users update own community posts" ON public.community_posts;
CREATE POLICY "Users update own community posts" ON public.community_posts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users delete own community posts" ON public.community_posts;
CREATE POLICY "Users delete own community posts" ON public.community_posts
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.increment_post_likes(post_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.community_posts SET likes = likes + 1 WHERE id = post_id;
$$;
GRANT EXECUTE ON FUNCTION public.increment_post_likes(UUID) TO authenticated;

-- ============================================================================
-- subscription_events
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  event_type TEXT NOT NULL,
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS subscription_events_user_idx ON public.subscription_events(user_id, created_at DESC);
GRANT SELECT ON public.subscription_events TO authenticated;
GRANT ALL ON public.subscription_events TO service_role;
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own subscription events" ON public.subscription_events;
CREATE POLICY "Users view own subscription events" ON public.subscription_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- Regenerative Value Exchange
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.impact_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL,
  verification_score NUMERIC NOT NULL DEFAULT 0.8,
  status TEXT NOT NULL DEFAULT 'listed',
  ask_price_usd NUMERIC,
  currency TEXT NOT NULL DEFAULT 'USD',
  region TEXT,
  sector TEXT,
  sdg_tags TEXT[] NOT NULL DEFAULT '{}',
  verification_event_id UUID REFERENCES public.verification_events(id) ON DELETE SET NULL,
  funding_request_id UUID REFERENCES public.funding_requests(id) ON DELETE SET NULL,
  minted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT impact_assets_owner_user_id_fkey_named
    FOREIGN KEY (owner_user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
-- Named FK to profiles.user_id so PostgREST embed `profiles!impact_assets_owner_user_id_fkey(...)` resolves.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'impact_assets_owner_user_id_fkey'
  ) THEN
    ALTER TABLE public.impact_assets
      ADD CONSTRAINT impact_assets_owner_user_id_fkey
      FOREIGN KEY (owner_user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS impact_assets_status_idx ON public.impact_assets(status, minted_at DESC);
CREATE INDEX IF NOT EXISTS impact_assets_owner_idx ON public.impact_assets(owner_user_id, minted_at DESC);
CREATE INDEX IF NOT EXISTS impact_assets_kind_idx ON public.impact_assets(kind, status);
GRANT SELECT ON public.impact_assets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.impact_assets TO authenticated;
GRANT ALL ON public.impact_assets TO service_role;
ALTER TABLE public.impact_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Listed assets are public" ON public.impact_assets;
CREATE POLICY "Listed assets are public" ON public.impact_assets
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Owners manage own assets" ON public.impact_assets;
CREATE POLICY "Owners manage own assets" ON public.impact_assets
  FOR ALL TO authenticated USING (auth.uid() = owner_user_id) WITH CHECK (auth.uid() = owner_user_id);

CREATE TABLE IF NOT EXISTS public.asset_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES public.impact_assets(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bid_amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'asset_bids_bidder_id_fkey') THEN
    ALTER TABLE public.asset_bids
      ADD CONSTRAINT asset_bids_bidder_id_fkey
      FOREIGN KEY (bidder_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS asset_bids_asset_idx ON public.asset_bids(asset_id, bid_amount DESC);
CREATE INDEX IF NOT EXISTS asset_bids_bidder_idx ON public.asset_bids(bidder_id, created_at DESC);
GRANT SELECT ON public.asset_bids TO anon, authenticated;
GRANT INSERT, UPDATE ON public.asset_bids TO authenticated;
GRANT ALL ON public.asset_bids TO service_role;
ALTER TABLE public.asset_bids ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Bids are public" ON public.asset_bids;
CREATE POLICY "Bids are public" ON public.asset_bids FOR SELECT USING (true);
DROP POLICY IF EXISTS "Bidders create own bids" ON public.asset_bids;
CREATE POLICY "Bidders create own bids" ON public.asset_bids
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = bidder_id);

CREATE TABLE IF NOT EXISTS public.asset_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES public.impact_assets(id) ON DELETE CASCADE,
  bid_id UUID REFERENCES public.asset_bids(id) ON DELETE SET NULL,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_usd NUMERIC NOT NULL,
  fee_usd NUMERIC NOT NULL DEFAULT 0,
  net_usd NUMERIC NOT NULL DEFAULT 0,
  settled_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS asset_transactions_settled_idx ON public.asset_transactions(settled_at DESC);
GRANT SELECT ON public.asset_transactions TO authenticated;
GRANT ALL ON public.asset_transactions TO service_role;
ALTER TABLE public.asset_transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Participants view own transactions" ON public.asset_transactions;
CREATE POLICY "Participants view own transactions" ON public.asset_transactions
  FOR SELECT TO authenticated USING (auth.uid() IN (seller_id, buyer_id));

-- Marketplace stats view
CREATE OR REPLACE VIEW public.rve_marketplace_stats AS
SELECT
  (SELECT count(*) FROM public.impact_assets) AS total_assets,
  (SELECT count(*) FROM public.impact_assets WHERE status = 'listed') AS listed,
  (SELECT count(*) FROM public.impact_assets WHERE status = 'sold') AS sold,
  COALESCE((SELECT sum(ask_price_usd) FROM public.impact_assets WHERE status = 'listed'), 0) AS total_listed_value,
  (SELECT count(DISTINCT kind) FROM public.impact_assets) AS asset_types,
  (SELECT count(DISTINCT owner_user_id) FROM public.impact_assets) AS unique_sellers;
GRANT SELECT ON public.rve_marketplace_stats TO anon, authenticated, service_role;

-- Accept bid RPC: atomically settle a sale
CREATE OR REPLACE FUNCTION public.accept_asset_bid(_bid_id UUID, _actor_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_bid public.asset_bids;
  v_asset public.impact_assets;
  v_fee NUMERIC;
  v_net NUMERIC;
  v_tx_id UUID;
BEGIN
  SELECT * INTO v_bid FROM public.asset_bids WHERE id = _bid_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Bid not found'; END IF;
  IF v_bid.status <> 'open' THEN RAISE EXCEPTION 'Bid is not open'; END IF;

  SELECT * INTO v_asset FROM public.impact_assets WHERE id = v_bid.asset_id FOR UPDATE;
  IF v_asset.owner_user_id <> _actor_id THEN RAISE EXCEPTION 'Only the asset owner can accept bids'; END IF;
  IF v_asset.status <> 'listed' THEN RAISE EXCEPTION 'Asset is no longer available'; END IF;

  v_fee := round(v_bid.bid_amount * 0.015, 2);  -- 1.5% Sanctum fee
  v_net := v_bid.bid_amount - v_fee;

  INSERT INTO public.asset_transactions (asset_id, bid_id, seller_id, buyer_id, amount_usd, fee_usd, net_usd)
  VALUES (v_asset.id, v_bid.id, v_asset.owner_user_id, v_bid.bidder_id, v_bid.bid_amount, v_fee, v_net)
  RETURNING id INTO v_tx_id;

  UPDATE public.impact_assets SET status = 'sold' WHERE id = v_asset.id;
  UPDATE public.asset_bids SET status = 'accepted' WHERE id = v_bid.id;
  UPDATE public.asset_bids SET status = 'rejected' WHERE asset_id = v_asset.id AND id <> v_bid.id AND status = 'open';

  PERFORM public.log_audit(_actor_id, 'rve.sale', 'impact_asset', v_asset.id, v_bid.bidder_id,
    'Impact asset sold: ' || v_asset.title,
    jsonb_build_object('amount', v_bid.bid_amount, 'fee', v_fee, 'net', v_net));

  PERFORM public.notify_user(v_bid.bidder_id, 'rve.won',
    'Your bid on "' || v_asset.title || '" was accepted',
    'You now hold ' || v_asset.quantity::text || ' ' || v_asset.unit || ' of verified impact.',
    '/regenerative', jsonb_build_object('asset_id', v_asset.id, 'tx_id', v_tx_id));

  RETURN jsonb_build_object('tx_id', v_tx_id, 'amount', v_bid.bid_amount, 'fee', v_fee, 'net', v_net);
END $$;
GRANT EXECUTE ON FUNCTION public.accept_asset_bid(UUID, UUID) TO authenticated;
