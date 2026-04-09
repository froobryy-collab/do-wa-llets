import { createClient } from '@supabase/supabase-js'

// GANTI PAKAI LINK DAN KUNCI ASLIMU YA, DO!
const supabaseUrl = 'https://dqpbknntnadmjypvofyy.supabase.co' 
const supabaseAnonKey = 'sb_publishable_luBlEy8qAknroFQVT6SY8Q_OgBZc2mF'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)