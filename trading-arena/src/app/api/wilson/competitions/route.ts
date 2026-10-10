import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateCompetitionCode } from '@/lib/utils';
import { requireWilsonAdmin } from '@/lib/auth/wilson-admin';

export async function GET(request: Request) {
  try {
    const adminError = await requireWilsonAdmin();
    if (adminError) return adminError;

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('competitions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminError = await requireWilsonAdmin();
    if (adminError) return adminError;

    const body = await request.json();
    const joinCode = body.code || generateCompetitionCode();
    
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('competitions')
      .insert({
        ...body,
        code: joinCode,
        status: 'registration'
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
