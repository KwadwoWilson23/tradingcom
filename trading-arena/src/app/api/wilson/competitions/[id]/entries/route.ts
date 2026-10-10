import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireWilsonAdmin } from '@/lib/auth/wilson-admin';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminError = await requireWilsonAdmin();
    if (adminError) return adminError;

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('competition_entries')
      .select(`
        *,
        profiles (
          id,
          username,
          avatar_url,
          email
        )
      `)
      .eq('competition_id', id);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
