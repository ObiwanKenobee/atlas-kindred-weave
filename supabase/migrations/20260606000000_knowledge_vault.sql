-- Atlas Sanctum: Knowledge Vault (Business Knowledge Engine)
-- Requires pgvector extension (available on Supabase by default)

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS public.knowledge_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- file metadata
  file_name text NOT NULL,
  file_type text NOT NULL, -- 'pdf' | 'image' | 'audio' | 'text'
  storage_path text NOT NULL,
  -- content extracted from file (text, OCR result, transcript, etc.)
  content text NOT NULL,
  -- chunk metadata for multi-chunk documents
  chunk_index integer NOT NULL DEFAULT 0,
  total_chunks integer NOT NULL DEFAULT 1,
  -- semantic embedding (text-embedding-004 = 768 dims)
  embedding vector(768),
  -- metadata for hybrid / filtered search
  doc_kind text NOT NULL DEFAULT 'general', -- 'business_plan' | 'receipt' | 'invoice' | 'inventory' | 'tax' | 'funding' | 'audio_transcript' | 'general'
  funding_request_id uuid REFERENCES public.funding_requests(id) ON DELETE SET NULL,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_kd_user ON public.knowledge_documents(user_id);
CREATE INDEX idx_kd_kind ON public.knowledge_documents(user_id, doc_kind);
CREATE INDEX idx_kd_embedding ON public.knowledge_documents
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

GRANT SELECT, INSERT, DELETE ON public.knowledge_documents TO authenticated;
GRANT ALL ON public.knowledge_documents TO service_role;

ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own documents"
  ON public.knowledge_documents FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Semantic similarity search: returns top-k chunks for a user, ordered by cosine similarity
CREATE OR REPLACE FUNCTION public.match_documents(
  _user_id uuid,
  _embedding vector(768),
  _match_count int DEFAULT 5,
  _doc_kind text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  file_name text,
  content text,
  doc_kind text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    id,
    file_name,
    content,
    doc_kind,
    1 - (embedding <=> _embedding) AS similarity
  FROM public.knowledge_documents
  WHERE user_id = _user_id
    AND embedding IS NOT NULL
    AND (_doc_kind IS NULL OR doc_kind = _doc_kind)
  ORDER BY embedding <=> _embedding
  LIMIT _match_count;
$$;

GRANT EXECUTE ON FUNCTION public.match_documents TO authenticated, service_role;
