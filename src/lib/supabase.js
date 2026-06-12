import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────
//  REPLACE these two values with your own from Supabase:
//  Dashboard → Settings → API
//    • Project URL  →  VITE_SUPABASE_URL
//    • anon/public key  →  VITE_SUPABASE_ANON_KEY
//
//  Create a .env file in the project root:
//    VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
//    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
// ─────────────────────────────────────────────────────────────
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn(
    '[Supabase] Missing env vars. Create a .env file with ' +
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(
  SUPABASE_URL  || 'https://placeholder.supabase.co',
  SUPABASE_ANON || 'placeholder'
)
