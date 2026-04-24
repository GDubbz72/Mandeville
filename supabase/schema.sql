-- Run this in Supabase dashboard → SQL Editor.

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  last_name text,
  investor_type text not null,
  interests jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  firm text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.inquiries enable row level security;

create policy "anon can insert subscribers"
  on public.subscribers for insert to anon with check (true);

create policy "anon can insert inquiries"
  on public.inquiries for insert to anon with check (true);
