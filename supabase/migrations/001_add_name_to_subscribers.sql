-- Run once in Supabase SQL Editor to add name fields to existing subscribers table.

alter table public.subscribers
  add column if not exists first_name text,
  add column if not exists last_name text;
