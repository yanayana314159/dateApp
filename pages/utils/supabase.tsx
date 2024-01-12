import { createClient } from "@supabase/supabase-js";

export function supabase() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON!
  );
  return supabase;
}
