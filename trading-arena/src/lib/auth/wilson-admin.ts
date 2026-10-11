import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const ALLOWED_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'kwadwowilson2@gmail.com').toLowerCase();

export async function requireWilsonAdmin() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user.email?.toLowerCase() !== ALLOWED_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}
