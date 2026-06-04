
-- =====================================================================
-- 1. Notification preferences (per user)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  inapp_submission boolean NOT NULL DEFAULT true,
  email_submission boolean NOT NULL DEFAULT true,
  inapp_decision   boolean NOT NULL DEFAULT true,
  email_decision   boolean NOT NULL DEFAULT true,
  inapp_review_needed boolean NOT NULL DEFAULT true,
  email_review_needed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.notification_preferences TO authenticated;
GRANT ALL ON public.notification_preferences TO service_role;

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own notification prefs"
  ON public.notification_preferences FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_notif_prefs_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helper to fetch (with defaults) a user's prefs
CREATE OR REPLACE FUNCTION public.get_notif_pref(_user uuid, _channel text, _event text)
RETURNS boolean
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.notification_preferences;
BEGIN
  SELECT * INTO r FROM public.notification_preferences WHERE user_id = _user;
  IF NOT FOUND THEN
    -- Defaults: in-app on for everything; email on for submission+decision only
    RETURN CASE
      WHEN _channel = 'inapp' THEN true
      WHEN _channel = 'email' AND _event = 'review_needed' THEN false
      WHEN _channel = 'email' THEN true
      ELSE false
    END;
  END IF;
  RETURN CASE
    WHEN _channel='inapp' AND _event='submission'     THEN r.inapp_submission
    WHEN _channel='email' AND _event='submission'     THEN r.email_submission
    WHEN _channel='inapp' AND _event='decision'       THEN r.inapp_decision
    WHEN _channel='email' AND _event='decision'       THEN r.email_decision
    WHEN _channel='inapp' AND _event='review_needed'  THEN r.inapp_review_needed
    WHEN _channel='email' AND _event='review_needed'  THEN r.email_review_needed
    ELSE false
  END;
END $$;

-- =====================================================================
-- 2. Email enqueue helper (safe no-op until email infra is provisioned)
-- =====================================================================
CREATE OR REPLACE FUNCTION public.queue_sanctum_email(
  _user uuid, _template text, _subject text, _heading text, _body text, _link text
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_email text; v_name text; v_payload jsonb;
BEGIN
  SELECT email INTO v_email FROM auth.users WHERE id = _user;
  IF v_email IS NULL THEN RETURN; END IF;
  SELECT display_name INTO v_name FROM public.profiles WHERE user_id = _user;

  v_payload := jsonb_build_object(
    'template_name', _template,
    'recipient_email', v_email,
    'subject', _subject,
    'idempotency_key', _template || '-' || gen_random_uuid()::text,
    'template_data', jsonb_build_object(
      'name', COALESCE(v_name, 'Sanctum Member'),
      'heading', _heading,
      'body', _body,
      'link', _link
    )
  );

  -- Email infra may not exist yet; ignore gracefully.
  BEGIN
    PERFORM public.enqueue_email('transactional_emails', v_payload);
  EXCEPTION WHEN undefined_function OR undefined_table THEN
    NULL;
  END;
END $$;

-- =====================================================================
-- 3. Replace notify_user to honor in-app prefs
-- =====================================================================
CREATE OR REPLACE FUNCTION public.notify_user(
  _user uuid, _kind text, _title text, _body text, _link text, _metadata jsonb
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_event text; v_allowed boolean;
BEGIN
  v_event := CASE
    WHEN _kind = 'funding.submitted' THEN 'submission'
    WHEN _kind = 'funding.review_needed' THEN 'review_needed'
    WHEN _kind IN ('funding.approved','funding.declined','funding.revision_requested') THEN 'decision'
    ELSE 'submission'
  END;

  v_allowed := public.get_notif_pref(_user, 'inapp', v_event);
  IF v_allowed THEN
    INSERT INTO public.notifications(user_id, kind, title, body, link, metadata)
    VALUES (_user, _kind, _title, _body, _link, COALESCE(_metadata,'{}'::jsonb));
  END IF;

  IF public.get_notif_pref(_user, 'email', v_event) THEN
    PERFORM public.queue_sanctum_email(
      _user,
      'sanctum-notification',
      _title,
      _title,
      COALESCE(_body,''),
      COALESCE(_link, '/notifications')
    );
  END IF;
END $$;

-- Update funding_submitted trigger so reviewers also get email through notify_user
CREATE OR REPLACE FUNCTION public.trg_audit_funding_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r record;
BEGIN
  PERFORM public.log_audit(
    NEW.user_id, 'funding.submitted', 'funding_request', NEW.id, NEW.user_id,
    'Funding request submitted: ' || NEW.title,
    jsonb_build_object('amount', NEW.amount_requested, 'currency', NEW.currency,
                       'sector', NEW.sector, 'region', NEW.region)
  );
  PERFORM public.notify_user(
    NEW.user_id, 'funding.submitted',
    'Funding request received',
    'Your pitch "' || NEW.title || '" is being deliberated by the Council.',
    '/funding', jsonb_build_object('funding_request_id', NEW.id)
  );
  FOR r IN SELECT user_id FROM public.user_roles WHERE role IN ('reviewer','admin') LOOP
    PERFORM public.notify_user(
      r.user_id, 'funding.review_needed',
      'New funding request awaiting review',
      NEW.title || ' — ' || NEW.amount_requested::text || ' ' || NEW.currency,
      '/funding', jsonb_build_object('funding_request_id', NEW.id)
    );
  END LOOP;
  RETURN NEW;
END $$;

-- =====================================================================
-- 4. Admin management of user_roles
-- =====================================================================
CREATE POLICY "Admins view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to search profiles directory (already has own-row select)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins view all profiles') THEN
    CREATE POLICY "Admins view all profiles" ON public.profiles
      FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Audit role changes
CREATE OR REPLACE FUNCTION public.trg_audit_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_act text; v_subj uuid;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_act := 'role.granted'; v_subj := NEW.user_id;
    PERFORM public.log_audit(auth.uid(), v_act, 'user_role', NEW.id, v_subj,
      'Granted role ' || NEW.role::text, jsonb_build_object('role', NEW.role));
    PERFORM public.notify_user(v_subj, 'role.granted',
      'You were granted the ' || NEW.role::text || ' role',
      'Atlas Sanctum has extended new permissions to your account.',
      '/profile', jsonb_build_object('role', NEW.role));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    v_act := 'role.revoked'; v_subj := OLD.user_id;
    PERFORM public.log_audit(auth.uid(), v_act, 'user_role', OLD.id, v_subj,
      'Revoked role ' || OLD.role::text, jsonb_build_object('role', OLD.role));
    PERFORM public.notify_user(v_subj, 'role.revoked',
      'Your ' || OLD.role::text || ' role was revoked',
      'A steward has updated your Sanctum permissions.',
      '/profile', jsonb_build_object('role', OLD.role));
    RETURN OLD;
  END IF;
  RETURN NULL;
END $$;

DROP TRIGGER IF EXISTS trg_user_roles_audit ON public.user_roles;
CREATE TRIGGER trg_user_roles_audit
  AFTER INSERT OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.trg_audit_user_role();
