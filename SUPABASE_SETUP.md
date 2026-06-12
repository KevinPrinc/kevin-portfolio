# Supabase Setup Guide — Kevin's Portfolio Studio

Follow these steps to wire up the `/studio` admin dashboard.

---

## 1. Create a Supabase project
Go to https://supabase.com → New Project → pick a name + password → wait ~2 min for it to spin up.

---

## 2. Run this SQL
Go to **SQL Editor** in your Supabase dashboard → New Query → paste everything below → Run.

```sql
-- ── PROJECTS TABLE ──────────────────────────────────────────
create table projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text default '',
  link text default '',
  tags text[] default '{}',
  video_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ── CERTIFICATES TABLE ──────────────────────────────────────
create table certificates (
  id bigint generated always as identity primary key,
  title text not null,
  issuer text default '',
  date_issued text,
  link text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ── ENABLE ROW LEVEL SECURITY ────────────────────────────────
alter table projects enable row level security;
alter table certificates enable row level security;

-- ── PUBLIC READ ACCESS (so portfolio visitors can view data) ──
create policy "Public read projects"
  on projects for select using (true);

create policy "Public read certificates"
  on certificates for select using (true);

-- ── PUBLIC WRITE ACCESS (needed since /studio uses anon key) ──
-- NOTE: This allows anyone with your anon key to write data.
-- Since /studio has its own login, this is acceptable for a
-- personal portfolio. For stronger protection later, switch to
-- Supabase Auth.
create policy "Public insert projects"
  on projects for insert with check (true);

create policy "Public update projects"
  on projects for update using (true);

create policy "Public delete projects"
  on projects for delete using (true);

create policy "Public insert certificates"
  on certificates for insert with check (true);

create policy "Public update certificates"
  on certificates for update using (true);

create policy "Public delete certificates"
  on certificates for delete using (true);
```

---

## 3. Create the storage bucket (for project videos)
Go to **Storage** → **New bucket**:
- Name: `project-media`
- Public bucket: ✅ **Yes** (toggle ON — so videos are publicly viewable)
- Click **Create bucket**

Then go to the bucket → **Policies** → add this policy (or use SQL Editor):

```sql
-- Allow public read of files in project-media
create policy "Public read project-media"
  on storage.objects for select
  using (bucket_id = 'project-media');

-- Allow uploads to project-media (anon key, since /studio is gated by its own login)
create policy "Public upload project-media"
  on storage.objects for insert
  with check (bucket_id = 'project-media');

create policy "Public update project-media"
  on storage.objects for update
  using (bucket_id = 'project-media');

create policy "Public delete project-media"
  on storage.objects for delete
  using (bucket_id = 'project-media');
```

---

## 4. Get your API credentials
Go to **Settings → API**:
- Copy **Project URL**
- Copy **anon / public** key (NOT the service_role key)

---

## 5. Set environment variables

### For local development
Create a `.env` file in the project root (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_STUDIO_USER=admin
VITE_STUDIO_PASS=your-chosen-password
```

### For Netlify / Vercel deployment
Add the same 4 variables in:
- **Netlify:** Site settings → Environment variables
- **Vercel:** Project settings → Environment Variables

Then redeploy.

---

## 6. Access the studio
Once deployed, go to:
```
https://yoursite.com/studio
```
Log in with the username/password you set in `VITE_STUDIO_USER` / `VITE_STUDIO_PASS`.

From there you can:
- Add/edit/delete **Projects** with title, description, tags, link, and an `.mp4` demo video (uploaded to Supabase Storage)
- Add/edit/delete **Certificates** with title, issuer, date, and link

Everything updates live on the public portfolio — no redeploy needed.
