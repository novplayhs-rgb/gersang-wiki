import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase랑 연결된 '진짜' 클라이언트를 만듭니다.
export const supabase = createClient(supabaseUrl, supabaseKey);