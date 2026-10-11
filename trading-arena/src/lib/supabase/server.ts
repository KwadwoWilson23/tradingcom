import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';
import { getSupabaseAuthConfig, hasSupabaseConfig } from './config';

export { hasSupabaseConfig };

export async function createServerSupabaseClient() {
  const { url, anonKey } = getSupabaseAuthConfig();

  const cookieStore = await cookies();
  return createServerClient<Database>(
    url,
    anonKey,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch { /* Server Component - read only */ }
        },
      },
    }
  );
}
