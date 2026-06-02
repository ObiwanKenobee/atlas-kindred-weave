
-- =========================================================
-- ATLAS SANCTUM — core schema
-- profiles, verification, chat history, funding, economic graph
-- =========================================================

-- ---------- ENUMS ----------
CREATE TYPE public.funding_status AS ENUM ('draft','submitted','under_review','approved','declined','withdrawn');
CREATE TYPE public.node_type AS ENUM ('business','investor','supplier','community','partnership');
CREATE TYPE public.verification_status AS ENUM ('pending','verified','rejected');

-- ---------- TIMESTAMP HELPER ----------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ---------- PROFILES ----------
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  region TEXT,
  trust_score NUMERIC(5,2) NOT NULL DEFAULT 50.00,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------- VERIFICATION EVENTS ----------
CREATE TABLE public.verification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  status public.verification_status NOT NULL DEFAULT 'pending',
  evidence_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.verification_events TO authenticated;
GRANT ALL ON public.verification_events TO service_role;
ALTER TABLE public.verification_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own verification" ON public.verification_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own verification" ON public.verification_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_verification_user ON public.verification_events(user_id, created_at DESC);

-- ---------- CHAT CONVERSATIONS ----------
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled deliberation',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO authenticated;
GRANT ALL ON public.chat_conversations TO service_role;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users CRUD own conversations" ON public.chat_conversations FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_conv_user ON public.chat_conversations(user_id, updated_at DESC);
CREATE TRIGGER chat_conv_updated_at BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- CHAT MESSAGES ----------
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  parts JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users CRUD own messages" ON public.chat_messages FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_msg_conv ON public.chat_messages(conversation_id, created_at ASC);

-- ---------- FUNDING REQUESTS ----------
CREATE TABLE public.funding_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  pitch TEXT NOT NULL,
  amount_requested NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  region TEXT,
  sector TEXT,
  status public.funding_status NOT NULL DEFAULT 'submitted',
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  decision_report JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.funding_requests TO authenticated;
GRANT ALL ON public.funding_requests TO service_role;
ALTER TABLE public.funding_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users CRUD own funding" ON public.funding_requests FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_fund_user ON public.funding_requests(user_id, created_at DESC);
CREATE TRIGGER fund_updated_at BEFORE UPDATE ON public.funding_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- ECONOMIC GRAPH ----------
CREATE TABLE public.economic_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.node_type NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  region TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.economic_nodes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.economic_nodes TO authenticated;
GRANT ALL ON public.economic_nodes TO service_role;
ALTER TABLE public.economic_nodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Nodes viewable by everyone" ON public.economic_nodes FOR SELECT USING (true);
CREATE POLICY "Authenticated may add nodes" ON public.economic_nodes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Owners update own node" ON public.economic_nodes FOR UPDATE
  USING (auth.uid() = owner_user_id);
CREATE POLICY "Owners delete own node" ON public.economic_nodes FOR DELETE
  USING (auth.uid() = owner_user_id);

CREATE TABLE public.economic_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES public.economic_nodes(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES public.economic_nodes(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  weight NUMERIC(5,2) NOT NULL DEFAULT 1,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.economic_edges TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.economic_edges TO authenticated;
GRANT ALL ON public.economic_edges TO service_role;
ALTER TABLE public.economic_edges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Edges viewable by everyone" ON public.economic_edges FOR SELECT USING (true);
CREATE POLICY "Authenticated may add edges" ON public.economic_edges FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE INDEX idx_edge_source ON public.economic_edges(source_id);
CREATE INDEX idx_edge_target ON public.economic_edges(target_id);

-- ---------- SEED ECONOMIC GRAPH ----------
WITH inserted AS (
  INSERT INTO public.economic_nodes (kind, name, description, region) VALUES
    ('business',  'Sahel Solar Collective',     'Distributed solar microgrids',          'West Africa'),
    ('business',  'Andes Coffee Cooperative',   'Regenerative coffee farms',             'South America'),
    ('business',  'Mekong Textile Guild',       'Circular textile manufacturing',        'Southeast Asia'),
    ('investor',  'Verdant Capital',            'Impact-first growth fund',              'Global'),
    ('investor',  'Atlas Sovereign Treasury',   'Sanctum strategic reserve',             'Global'),
    ('supplier',  'Iberian Hemp Mills',         'Sustainable raw fibre',                 'Europe'),
    ('supplier',  'Pacific Lithium Refiners',   'Low-impact battery supply',             'Oceania'),
    ('community', 'Lagos Builders Guild',       '12,400 verified entrepreneurs',         'West Africa'),
    ('community', 'Lima Maker Network',         '7,800 verified entrepreneurs',          'South America'),
    ('partnership','Andes-Verdant Accord',      'Recommended partnership',               'South America')
  RETURNING id, name
)
INSERT INTO public.economic_edges (source_id, target_id, relationship, weight)
SELECT a.id, b.id, rel, w FROM (VALUES
  ('Verdant Capital',          'Andes Coffee Cooperative',  'funds',           4.0),
  ('Atlas Sovereign Treasury', 'Sahel Solar Collective',    'funds',           3.5),
  ('Iberian Hemp Mills',       'Mekong Textile Guild',      'supplies',        2.5),
  ('Pacific Lithium Refiners', 'Sahel Solar Collective',    'supplies',        2.8),
  ('Lagos Builders Guild',     'Sahel Solar Collective',    'employs',         3.2),
  ('Lima Maker Network',       'Andes Coffee Cooperative',  'employs',         3.0),
  ('Andes-Verdant Accord',     'Andes Coffee Cooperative',  'recommends',      4.5),
  ('Andes-Verdant Accord',     'Verdant Capital',           'recommends',      4.5),
  ('Verdant Capital',          'Mekong Textile Guild',      'evaluating',      2.0)
) AS e(src, tgt, rel, w)
JOIN inserted a ON a.name = e.src
JOIN inserted b ON b.name = e.tgt;

-- ---------- STORAGE BUCKET ----------
INSERT INTO storage.buckets (id, name, public) VALUES ('funding-attachments','funding-attachments', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Owners read funding attachments" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'funding-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Owners upload funding attachments" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'funding-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Owners delete funding attachments" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'funding-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);
