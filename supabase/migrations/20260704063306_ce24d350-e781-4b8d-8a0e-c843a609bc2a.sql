
REVOKE EXECUTE ON FUNCTION public.trg_recalc_trust_score() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_audit_verification() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_audit_funding_insert() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_audit_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_audit_funding_decision() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_funding_to_graph() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_profile_to_graph() FROM PUBLIC, anon, authenticated;
