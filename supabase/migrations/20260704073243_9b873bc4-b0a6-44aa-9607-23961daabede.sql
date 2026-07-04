-- 1. Approval kinds enum
DO $$ BEGIN
  CREATE TYPE public.approval_kind AS ENUM ('risk_override', 'vault_release');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Table
CREATE TABLE IF NOT EXISTS public.approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.approval_kind NOT NULL,
  title TEXT NOT NULL,
  rationale TEXT,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  entity_type TEXT,
  entity_id UUID,
  proposed_change JSONB NOT NULL DEFAULT '{}'::jsonb,
  status public.approval_status NOT NULL DEFAULT 'pending',
  assigned_reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  decided_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  decision_notes TEXT,
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_approvals_status_created ON public.approval_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_approvals_requester ON public.approval_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_approvals_assigned ON public.approval_requests(assigned_reviewer_id);
CREATE INDEX IF NOT EXISTS idx_approvals_kind ON public.approval_requests(kind);

-- 3. Grants (authenticated only; access controlled by RLS)
GRANT SELECT, INSERT, UPDATE ON public.approval_requests TO authenticated;
GRANT ALL ON public.approval_requests TO service_role;

-- 4. RLS
ALTER TABLE public.approval_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "requester or reviewer can read"
  ON public.approval_requests FOR SELECT TO authenticated
  USING (
    requester_id = auth.uid()
    OR subject_user_id = auth.uid()
    OR public.is_reviewer(auth.uid())
  );

CREATE POLICY "authenticated can submit"
  ON public.approval_requests FOR INSERT TO authenticated
  WITH CHECK (requester_id = auth.uid());

CREATE POLICY "requester can cancel pending; reviewer can decide/assign"
  ON public.approval_requests FOR UPDATE TO authenticated
  USING (
    (requester_id = auth.uid() AND status = 'pending')
    OR public.is_reviewer(auth.uid())
  )
  WITH CHECK (
    (requester_id = auth.uid() AND status IN ('pending', 'cancelled'))
    OR public.is_reviewer(auth.uid())
  );

-- 5. Update trigger + audit logging
CREATE TRIGGER approval_requests_touch_updated_at
  BEFORE UPDATE ON public.approval_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.trg_audit_approval()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_action TEXT; v_summary TEXT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM public.log_audit(
      NEW.requester_id, 'approval.submitted', 'approval_request', NEW.id, NEW.subject_user_id,
      'Approval requested: ' || NEW.title,
      jsonb_build_object('kind', NEW.kind, 'entity_type', NEW.entity_type, 'entity_id', NEW.entity_id)
    );
    -- Notify all reviewers
    PERFORM public.notify_user(r.user_id, 'approval.review_needed',
      'Approval request awaiting review',
      NEW.title, '/approvals', jsonb_build_object('approval_id', NEW.id, 'kind', NEW.kind))
    FROM public.user_roles r WHERE r.role IN ('reviewer','admin');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.status IS DISTINCT FROM OLD.status AND NEW.status IN ('approved','rejected','cancelled') THEN
      v_action := 'approval.' || NEW.status::text;
      v_summary := 'Approval ' || NEW.status::text || ': ' || NEW.title;
      PERFORM public.log_audit(
        COALESCE(NEW.decided_by, auth.uid()), v_action, 'approval_request', NEW.id, NEW.subject_user_id,
        v_summary,
        jsonb_build_object('kind', NEW.kind, 'notes', NEW.decision_notes,
                           'entity_type', NEW.entity_type, 'entity_id', NEW.entity_id)
      );
      PERFORM public.notify_user(NEW.requester_id, v_action,
        v_summary,
        COALESCE(NEW.decision_notes, 'Open the approval to see the full decision.'),
        '/approvals', jsonb_build_object('approval_id', NEW.id));
    ELSIF NEW.assigned_reviewer_id IS DISTINCT FROM OLD.assigned_reviewer_id AND NEW.assigned_reviewer_id IS NOT NULL THEN
      PERFORM public.log_audit(
        auth.uid(), 'approval.assigned', 'approval_request', NEW.id, NEW.subject_user_id,
        'Approval assigned: ' || NEW.title,
        jsonb_build_object('assigned_reviewer_id', NEW.assigned_reviewer_id)
      );
      PERFORM public.notify_user(NEW.assigned_reviewer_id, 'approval.assigned',
        'You were assigned an approval',
        NEW.title, '/approvals', jsonb_build_object('approval_id', NEW.id));
    END IF;
    RETURN NEW;
  END IF;
  RETURN COALESCE(NEW, OLD);
END $$;

REVOKE EXECUTE ON FUNCTION public.trg_audit_approval() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS approval_requests_audit ON public.approval_requests;
CREATE TRIGGER approval_requests_audit
  AFTER INSERT OR UPDATE ON public.approval_requests
  FOR EACH ROW EXECUTE FUNCTION public.trg_audit_approval();