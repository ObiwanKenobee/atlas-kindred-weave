-- 1) Human-in-the-loop approval fields on funding requests
ALTER TABLE public.funding_requests
  ADD COLUMN IF NOT EXISTS human_approval text NOT NULL DEFAULT 'pending'
    CHECK (human_approval IN ('pending','approved','declined','revision_requested')),
  ADD COLUMN IF NOT EXISTS human_decision_notes text,
  ADD COLUMN IF NOT EXISTS human_decided_at timestamptz,
  ADD COLUMN IF NOT EXISTS human_decided_by uuid;

-- 2) Trust score recalculation from verification_events
CREATE OR REPLACE FUNCTION public.recalc_trust_score(_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_verified int; v_rejected int; v_pending int; v_score numeric;
BEGIN
  SELECT
    count(*) FILTER (WHERE status = 'verified'),
    count(*) FILTER (WHERE status = 'rejected'),
    count(*) FILTER (WHERE status = 'pending')
  INTO v_verified, v_rejected, v_pending
  FROM public.verification_events WHERE user_id = _user_id;

  v_score := 50 + (v_verified * 10) - (v_rejected * 8) + (LEAST(v_pending, 5) * 1);
  v_score := GREATEST(0, LEAST(100, v_score));

  UPDATE public.profiles
    SET trust_score = v_score,
        verified = (v_verified >= 2 AND v_rejected = 0),
        updated_at = now()
  WHERE user_id = _user_id;
END $$;

CREATE OR REPLACE FUNCTION public.trg_recalc_trust_score()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.recalc_trust_score(COALESCE(NEW.user_id, OLD.user_id));
  RETURN COALESCE(NEW, OLD);
END $$;

DROP TRIGGER IF EXISTS verification_events_recalc_trust ON public.verification_events;
CREATE TRIGGER verification_events_recalc_trust
AFTER INSERT OR UPDATE OR DELETE ON public.verification_events
FOR EACH ROW EXECUTE FUNCTION public.trg_recalc_trust_score();

-- Allow user_roles-style update of verification_events status by owner (for demo purposes)
DROP POLICY IF EXISTS "Users update own verification" ON public.verification_events;
CREATE POLICY "Users update own verification"
ON public.verification_events FOR UPDATE
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3) Economic graph auto-sync from real entities
CREATE OR REPLACE FUNCTION public.sync_profile_to_graph()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.verified AND (TG_OP = 'INSERT' OR OLD.verified IS DISTINCT FROM NEW.verified) THEN
    IF NOT EXISTS (SELECT 1 FROM public.economic_nodes WHERE owner_user_id = NEW.user_id AND kind = 'business') THEN
      INSERT INTO public.economic_nodes (kind, name, description, region, owner_user_id, metadata)
      VALUES ('business',
              COALESCE(NEW.display_name, 'Sanctum Member'),
              COALESCE(NEW.bio, 'Verified Atlas Sanctum participant'),
              NEW.region, NEW.user_id,
              jsonb_build_object('trust_score', NEW.trust_score, 'source','profile'));
    END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS profiles_sync_graph ON public.profiles;
CREATE TRIGGER profiles_sync_graph
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.sync_profile_to_graph();

CREATE OR REPLACE FUNCTION public.sync_funding_to_graph()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_business_id uuid; v_funding_id uuid; v_display text;
BEGIN
  SELECT display_name INTO v_display FROM public.profiles WHERE user_id = NEW.user_id;

  SELECT id INTO v_business_id FROM public.economic_nodes
    WHERE owner_user_id = NEW.user_id AND kind = 'business' LIMIT 1;
  IF v_business_id IS NULL THEN
    INSERT INTO public.economic_nodes (kind, name, description, region, owner_user_id, metadata)
    VALUES ('business', COALESCE(v_display, 'Sanctum Member'), 'Funding applicant', NEW.region, NEW.user_id,
            jsonb_build_object('source','funding'))
    RETURNING id INTO v_business_id;
  END IF;

  INSERT INTO public.economic_nodes (kind, name, description, region, owner_user_id, metadata)
  VALUES ('partnership', NEW.title,
          'Funding request: ' || COALESCE(NEW.sector,'unspecified sector'),
          NEW.region, NEW.user_id,
          jsonb_build_object('funding_request_id', NEW.id, 'amount', NEW.amount_requested, 'currency', NEW.currency))
  RETURNING id INTO v_funding_id;

  INSERT INTO public.economic_edges (source_id, target_id, relationship, weight, metadata)
  VALUES (v_business_id, v_funding_id, 'seeks_funding', 2, jsonb_build_object('funding_request_id', NEW.id));

  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS funding_requests_sync_graph ON public.funding_requests;
CREATE TRIGGER funding_requests_sync_graph
AFTER INSERT ON public.funding_requests
FOR EACH ROW EXECUTE FUNCTION public.sync_funding_to_graph();
