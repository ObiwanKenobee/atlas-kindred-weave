
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'reviewer', 'member');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  granted_by UUID,
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_reviewer(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('reviewer','admin')
  )
$$;

-- ============ DECISION VERSIONS ============
CREATE TABLE public.decision_report_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funding_request_id UUID NOT NULL REFERENCES public.funding_requests(id) ON DELETE CASCADE,
  version INT NOT NULL,
  report JSONB NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  human_approval TEXT NOT NULL DEFAULT 'pending'
    CHECK (human_approval IN ('pending','approved','declined','revision_requested')),
  human_decision_notes TEXT,
  human_decided_by UUID,
  human_decided_by_name TEXT,
  human_decided_at TIMESTAMPTZ,
  UNIQUE (funding_request_id, version)
);

GRANT SELECT ON public.decision_report_versions TO authenticated;
GRANT ALL ON public.decision_report_versions TO service_role;

ALTER TABLE public.decision_report_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners or reviewers view versions"
  ON public.decision_report_versions FOR SELECT TO authenticated
  USING (
    public.is_reviewer(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.funding_requests fr
      WHERE fr.id = funding_request_id AND fr.user_id = auth.uid()
    )
  );
-- No insert/update/delete policies => only service_role (server fns) may write.

ALTER TABLE public.funding_requests
  ADD COLUMN current_version INT NOT NULL DEFAULT 0,
  ADD COLUMN final_version_id UUID REFERENCES public.decision_report_versions(id);

-- Reviewers can read all funding requests (for the queue + audit)
CREATE POLICY "Reviewers view all funding"
  ON public.funding_requests FOR SELECT TO authenticated
  USING (public.is_reviewer(auth.uid()));

-- ============ NOTIFICATIONS ============
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user_created ON public.notifications (user_id, created_at DESC);

GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- ============ AUDIT LOG ============
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  actor_name TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  subject_user_id UUID,
  summary TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_log_created ON public.audit_log (created_at DESC);
CREATE INDEX idx_audit_log_entity ON public.audit_log (entity_type, entity_id);
CREATE INDEX idx_audit_log_fts ON public.audit_log
  USING GIN (to_tsvector('english', coalesce(summary,'') || ' ' || coalesce(action,'') || ' ' || coalesce(entity_type,'') || ' ' || coalesce(actor_name,'')));

GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviewers or subjects view audit"
  ON public.audit_log FOR SELECT TO authenticated
  USING (
    public.is_reviewer(auth.uid())
    OR auth.uid() = subject_user_id
    OR auth.uid() = actor_id
  );

-- ============ HELPERS ============
CREATE OR REPLACE FUNCTION public.log_audit(
  _actor uuid, _action text, _entity_type text, _entity_id uuid,
  _subject uuid, _summary text, _details jsonb
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_name text;
BEGIN
  SELECT display_name INTO v_name FROM public.profiles WHERE user_id = _actor;
  INSERT INTO public.audit_log(actor_id, actor_name, action, entity_type, entity_id, subject_user_id, summary, details)
  VALUES (_actor, v_name, _action, _entity_type, _entity_id, _subject, _summary, COALESCE(_details,'{}'::jsonb));
END $$;

CREATE OR REPLACE FUNCTION public.notify_user(
  _user uuid, _kind text, _title text, _body text, _link text, _metadata jsonb
) RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO public.notifications(user_id, kind, title, body, link, metadata)
  VALUES (_user, _kind, _title, _body, _link, COALESCE(_metadata,'{}'::jsonb));
$$;

-- ============ TRUST RECALC UPGRADE (adds audit) ============
CREATE OR REPLACE FUNCTION public.recalc_trust_score(_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_verified int; v_rejected int; v_pending int; v_old numeric; v_score numeric;
BEGIN
  SELECT
    count(*) FILTER (WHERE status='verified'),
    count(*) FILTER (WHERE status='rejected'),
    count(*) FILTER (WHERE status='pending')
  INTO v_verified, v_rejected, v_pending
  FROM public.verification_events WHERE user_id = _user_id;

  v_score := 50 + (v_verified*10) - (v_rejected*8) + (LEAST(v_pending,5)*1);
  v_score := GREATEST(0, LEAST(100, v_score));

  SELECT trust_score INTO v_old FROM public.profiles WHERE user_id = _user_id;
  UPDATE public.profiles
    SET trust_score = v_score,
        verified = (v_verified >= 2 AND v_rejected = 0),
        updated_at = now()
    WHERE user_id = _user_id;

  PERFORM public.log_audit(
    _user_id, 'trust.recalculated', 'profile', _user_id, _user_id,
    'Trust score recalculated to ' || v_score::text,
    jsonb_build_object('old_score', v_old, 'new_score', v_score,
                       'verified', v_verified, 'rejected', v_rejected, 'pending', v_pending)
  );
END $$;

-- ============ AUDIT TRIGGERS ============
CREATE OR REPLACE FUNCTION public.trg_audit_verification()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.log_audit(
    NEW.user_id, 'verification.' || lower(TG_OP), 'verification_event', NEW.id, NEW.user_id,
    'Verification ' || NEW.kind || ' set to ' || NEW.status,
    jsonb_build_object('kind', NEW.kind, 'status', NEW.status, 'notes', NEW.notes)
  );
  RETURN NEW;
END $$;
CREATE TRIGGER audit_verification_events
  AFTER INSERT OR UPDATE ON public.verification_events
  FOR EACH ROW EXECUTE FUNCTION public.trg_audit_verification();

CREATE OR REPLACE FUNCTION public.trg_audit_funding_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.log_audit(
    NEW.user_id, 'funding.submitted', 'funding_request', NEW.id, NEW.user_id,
    'Funding request submitted: ' || NEW.title,
    jsonb_build_object('amount', NEW.amount_requested, 'currency', NEW.currency, 'sector', NEW.sector, 'region', NEW.region)
  );
  -- Notify owner
  PERFORM public.notify_user(
    NEW.user_id, 'funding.submitted',
    'Funding request received',
    'Your pitch "' || NEW.title || '" is being deliberated by the Council.',
    '/funding', jsonb_build_object('funding_request_id', NEW.id)
  );
  -- Notify all reviewers
  INSERT INTO public.notifications(user_id, kind, title, body, link, metadata)
  SELECT ur.user_id, 'funding.review_needed',
         'New funding request awaiting review',
         NEW.title || ' — ' || NEW.amount_requested::text || ' ' || NEW.currency,
         '/funding',
         jsonb_build_object('funding_request_id', NEW.id)
  FROM public.user_roles ur
  WHERE ur.role IN ('reviewer','admin');
  RETURN NEW;
END $$;
CREATE TRIGGER audit_funding_insert
  AFTER INSERT ON public.funding_requests
  FOR EACH ROW EXECUTE FUNCTION public.trg_audit_funding_insert();

CREATE OR REPLACE FUNCTION public.trg_audit_funding_decision()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_action text; v_title text;
BEGIN
  IF NEW.human_approval IS DISTINCT FROM OLD.human_approval
     AND NEW.human_approval <> 'pending' THEN
    v_action := 'funding.' || NEW.human_approval;
    v_title := CASE NEW.human_approval
      WHEN 'approved' THEN 'Your funding request was approved'
      WHEN 'declined' THEN 'Your funding request was declined'
      WHEN 'revision_requested' THEN 'Revision requested on your funding request'
      ELSE 'Funding decision updated'
    END;
    PERFORM public.log_audit(
      NEW.human_decided_by, v_action, 'funding_request', NEW.id, NEW.user_id,
      'Reviewer ' || NEW.human_approval || ' ' || NEW.title,
      jsonb_build_object('notes', NEW.human_decision_notes, 'version', NEW.current_version)
    );
    PERFORM public.notify_user(
      NEW.user_id, v_action, v_title,
      COALESCE(NEW.human_decision_notes, 'Open the funding request for the full decision report.'),
      '/funding', jsonb_build_object('funding_request_id', NEW.id, 'version', NEW.current_version)
    );
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER audit_funding_decision
  AFTER UPDATE ON public.funding_requests
  FOR EACH ROW EXECUTE FUNCTION public.trg_audit_funding_decision();
