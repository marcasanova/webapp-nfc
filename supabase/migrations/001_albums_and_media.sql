-- Album NFC — schema inicial (albums + media + RLS)
-- Aplicar en Supabase: Dashboard → SQL Editor → New query → pegar → Run
--
-- Después de este script, crea el bucket de Storage (ver comentarios al final
-- o la sección "Storage" del README).

-- Extensión para UUIDs (habitualmente ya activa en Supabase)
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------------

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text not null default '📷',
  country_code text not null,
  country_name text not null,
  slug text not null unique,
  cover_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums (id) on delete cascade,
  storage_path text not null,
  mime_type text not null,
  created_at timestamptz not null default now()
);

create index if not exists media_album_id_created_at_idx
  on public.media (album_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS (MVP abierto: anon puede todo)
-- ---------------------------------------------------------------------------

alter table public.albums enable row level security;
alter table public.media enable row level security;

-- albums
drop policy if exists "albums_select_anon" on public.albums;
drop policy if exists "albums_insert_anon" on public.albums;
drop policy if exists "albums_update_anon" on public.albums;
drop policy if exists "albums_delete_anon" on public.albums;

create policy "albums_select_anon"
  on public.albums for select
  to anon, authenticated
  using (true);

create policy "albums_insert_anon"
  on public.albums for insert
  to anon, authenticated
  with check (true);

create policy "albums_update_anon"
  on public.albums for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "albums_delete_anon"
  on public.albums for delete
  to anon, authenticated
  using (true);

-- media
drop policy if exists "media_select_anon" on public.media;
drop policy if exists "media_insert_anon" on public.media;
drop policy if exists "media_update_anon" on public.media;
drop policy if exists "media_delete_anon" on public.media;

create policy "media_select_anon"
  on public.media for select
  to anon, authenticated
  using (true);

create policy "media_insert_anon"
  on public.media for insert
  to anon, authenticated
  with check (true);

create policy "media_update_anon"
  on public.media for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "media_delete_anon"
  on public.media for delete
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage: bucket `media` + policies
-- Paths de objetos: {album_id}/{uuid}.{ext}
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "media_bucket_select" on storage.objects;
drop policy if exists "media_bucket_insert" on storage.objects;
drop policy if exists "media_bucket_update" on storage.objects;
drop policy if exists "media_bucket_delete" on storage.objects;

create policy "media_bucket_select"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "media_bucket_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'media');

create policy "media_bucket_update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

create policy "media_bucket_delete"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'media');
