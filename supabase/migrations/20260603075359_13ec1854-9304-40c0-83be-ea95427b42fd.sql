REVOKE EXECUTE ON FUNCTION public.recalc_trust_score(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_recalc_trust_score() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_profile_to_graph() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_funding_to_graph() FROM PUBLIC, anon, authenticated;
