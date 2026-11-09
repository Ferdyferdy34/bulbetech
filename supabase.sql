-- Bulbe Tech: schéma cloud minimal et sécurisé.
create table if not exists public.shop_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.shop_data enable row level security;

create policy "users can read own shop data" on public.shop_data
for select using (auth.uid() = user_id);
create policy "users can insert own shop data" on public.shop_data
for insert with check (auth.uid() = user_id);
create policy "users can update own shop data" on public.shop_data
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Realtime (à activer aussi dans le dashboard Supabase si nécessaire).
alter publication supabase_realtime add table public.shop_data;
