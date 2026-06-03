ALTER TABLE public.economic_nodes REPLICA IDENTITY FULL;
ALTER TABLE public.economic_edges REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.economic_nodes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.economic_edges;
