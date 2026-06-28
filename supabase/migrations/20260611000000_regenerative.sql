-- =====================================================================
-- Atlas Sanctum: Regenerative Value Exchange
-- impact_assets: mintable outcome certificates
-- asset_transactions: completed trades
-- asset_bids: open offers on listed assets
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.impact_assets (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id   uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind            text        NOT NULL CHECK (kind IN ('job','business_funded','tree_planted','household_reached','student_educated','co2_offset','water_access','loan_repaid')),
  title           text        NOT NULL,
  description     text,
  quantity        integer     NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit            text        NOT NULL DEFAULT 'unit',
  -- verification evidence
  verification_event_id uuid  REFERENCES public.verification_events(id) ON DELETE SET NULL,
  funding_request_id    uuid  REFERENCES public.funding_requests(id)    ON DELETE SET NULL,
  verification_score    numeric(4,3) NOT NULL DEFAULT 0.8 CHECK (verification_score BETWEEN 0 AND 1),
  -- marketplace
  status          text        NOT NULL DEFAULT 'listed' CHECK (status IN ('listed','sold','withdrawn','pending_verification')),
  ask_price_usd   numeric(14,2),
  currency        text        NOT NULL DEFAULT 'USD',
  -- metadata
  region          text,
  sector          text,
  sdg_tags        text[]      NOT NULL DEFAULT '{}',
  metadata        jsonb       NOT NULL DEFAULT '{}',
  minted_at       timestamptz NOT NULL DEFAULT now(),
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ia_owner    ON public.impact_assets(owner_user_id, created_at DESC);
CREATE INDEX idx_ia_kind     ON public.impact_assets(kind, status);
CREATE INDEX idx_ia_status   ON public.impact_assets(status, created_at DESC);

GRANT SELECT ON public.impact_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.impact_assets TO authenticated;
GRANT ALL ON public.impact_assets TO service_role;

ALTER TABLE public.impact_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view listed assets"
  ON public.impact_assets FOR SELECT USING (true);

CREATE POLICY "Owners manage own assets"
  ON public.impact_assets FOR ALL
  USING (auth.uid() = owner_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

-- ── Bids ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.asset_bids (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id    uuid        NOT NULL REFERENCES public.impact_assets(id) ON DELETE CASCADE,
  bidder_id   uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bid_amount  numeric(14,2) NOT NULL CHECK (bid_amount > 0),
  currency    text        NOT NULL DEFAULT 'USD',
  message     text,
  status      text        NOT NULL DEFAULT 'open' CHECK (status IN ('open','accepted','rejected','withdrawn')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ab_asset   ON public.asset_bids(asset_id, status);
CREATE INDEX idx_ab_bidder  ON public.asset_bids(bidder_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.asset_bids TO authenticated;
GRANT ALL ON public.asset_bids TO service_role;

ALTER TABLE public.asset_bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bidders and asset owners can view bids"
  ON public.asset_bids FOR SELECT
  USING (
    auth.uid() = bidder_id
    OR auth.uid() IN (
      SELECT owner_user_id FROM public.impact_assets WHERE id = asset_id
    )
  );

CREATE POLICY "Authenticated users can place bids"
  ON public.asset_bids FOR INSERT
  WITH CHECK (auth.uid() = bidder_id);

CREATE POLICY "Bidders can withdraw own bids"
  ON public.asset_bids FOR UPDATE
  USING (auth.uid() = bidder_id OR auth.uid() IN (
    SELECT owner_user_id FROM public.impact_assets WHERE id = asset_id
  ));

-- ── Transactions ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.asset_transactions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id        uuid        NOT NULL REFERENCES public.impact_assets(id) ON DELETE SET NULL,
  seller_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  buyer_id        uuid        NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  amount_usd      numeric(14,2) NOT NULL,
  platform_fee    numeric(14,2) NOT NULL DEFAULT 0,
  net_to_seller   numeric(14,2) NOT NULL,
  kind            text        NOT NULL,
  quantity        integer     NOT NULL DEFAULT 1,
  settled_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_at_seller  ON public.asset_transactions(seller_id, settled_at DESC);
CREATE INDEX idx_at_buyer   ON public.asset_transactions(buyer_id, settled_at DESC);

GRANT SELECT ON public.asset_transactions TO authenticated;
GRANT ALL ON public.asset_transactions TO service_role;

ALTER TABLE public.asset_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parties view own transactions"
  ON public.asset_transactions FOR SELECT
  USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Admins view all transactions"
  ON public.asset_transactions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages transactions"
  ON public.asset_transactions FOR ALL
  WITH CHECK (true);

-- ── Marketplace stats view ────────────────────────────────────────────
CREATE OR REPLACE VIEW public.rve_marketplace_stats AS
SELECT
  COUNT(*)                                              AS total_assets,
  COUNT(*) FILTER (WHERE status = 'listed')             AS listed,
  COUNT(*) FILTER (WHERE status = 'sold')               AS sold,
  COALESCE(SUM(ask_price_usd) FILTER (WHERE status = 'listed'), 0) AS total_listed_value,
  COUNT(DISTINCT kind)                                  AS asset_types,
  COUNT(DISTINCT owner_user_id)                         AS unique_sellers
FROM public.impact_assets;

GRANT SELECT ON public.rve_marketplace_stats TO authenticated, service_role;

-- ── accept_bid function (atomic: close bid, mark sold, record tx) ─────
CREATE OR REPLACE FUNCTION public.accept_asset_bid(
  _bid_id   uuid,
  _actor_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _bid     asset_bids%ROWTYPE;
  _asset   impact_assets%ROWTYPE;
  _fee     numeric(14,2);
  _net     numeric(14,2);
  _tx_id   uuid;
BEGIN
  SELECT * INTO _bid   FROM asset_bids    WHERE id = _bid_id FOR UPDATE;
  SELECT * INTO _asset FROM impact_assets WHERE id = _bid.asset_id FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Bid or asset not found'; END IF;
  IF _asset.owner_user_id <> _actor_id THEN RAISE EXCEPTION 'Only the asset owner can accept bids'; END IF;
  IF _bid.status <> 'open' THEN RAISE EXCEPTION 'Bid is no longer open'; END IF;
  IF _asset.status <> 'listed' THEN RAISE EXCEPTION 'Asset is no longer listed'; END IF;

  -- 1.5% platform fee
  _fee := ROUND(_bid.bid_amount * 0.015, 2);
  _net := _bid.bid_amount - _fee;

  -- Accept bid, reject all others on this asset
  UPDATE asset_bids SET status = 'accepted' WHERE id = _bid_id;
  UPDATE asset_bids SET status = 'rejected' WHERE asset_id = _asset.id AND id <> _bid_id AND status = 'open';

  -- Mark asset sold
  UPDATE impact_assets SET status = 'sold' WHERE id = _asset.id;

  -- Record transaction
  INSERT INTO asset_transactions(asset_id, seller_id, buyer_id, amount_usd, platform_fee, net_to_seller, kind, quantity)
  VALUES (_asset.id, _asset.owner_user_id, _bid.bidder_id, _bid.bid_amount, _fee, _net, _asset.kind, _asset.quantity)
  RETURNING id INTO _tx_id;

  RETURN jsonb_build_object('tx_id', _tx_id, 'amount', _bid.bid_amount, 'fee', _fee, 'net', _net);
END;
$$;

GRANT EXECUTE ON FUNCTION public.accept_asset_bid TO authenticated, service_role;
