-- =========================================================
-- i-Exchange waitlist table
-- Paste this whole file into Supabase -> SQL Editor -> New query -> Run.
-- =========================================================

create table if not exists public.waitlist (
  id          bigint generated always as identity primary key,
  email       text not null unique
              check (email = lower(email) and char_length(email) <= 254),
  city        text check (char_length(city) <= 60),
  created_at  timestamptz not null default now()
);

-- Turn on Row Level Security. With RLS on and NO policies, the public
-- "anon" and "authenticated" keys can't read or write anything.
-- Only the server (using the secret / service_role key) can, because
-- that key bypasses RLS.
alter table public.waitlist enable row level security;

-- Belt and braces: also remove direct table privileges from public roles.
revoke all on table public.waitlist from anon, authenticated;
