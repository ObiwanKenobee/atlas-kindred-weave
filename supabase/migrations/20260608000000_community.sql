-- community_posts table
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(content) between 10 and 2000),
  category text not null default 'update'
    check (category in ('milestone','question','opportunity','update','success')),
  likes integer not null default 0,
  replies integer not null default 0,
  created_at timestamptz not null default now()
);

-- indexes
create index if not exists community_posts_user_id_idx on public.community_posts(user_id);
create index if not exists community_posts_created_at_idx on public.community_posts(created_at desc);
create index if not exists community_posts_category_idx on public.community_posts(category);

-- RLS
alter table public.community_posts enable row level security;

-- read: any authenticated user
create policy "community_posts_read" on public.community_posts
  for select using (auth.role() = 'authenticated');

-- insert: own posts only
create policy "community_posts_insert" on public.community_posts
  for insert with check (auth.uid() = user_id);

-- update: own posts only
create policy "community_posts_update" on public.community_posts
  for update using (auth.uid() = user_id);

-- delete: own posts only
create policy "community_posts_delete" on public.community_posts
  for delete using (auth.uid() = user_id);

-- atomic like increment (bypasses RLS via security definer)
create or replace function public.increment_post_likes(post_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.community_posts
  set likes = likes + 1
  where id = post_id;
end;
$$;
