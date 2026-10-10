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
      .from('competitions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminError = await requireWilsonAdmin();
    if (adminError) return adminError;

    const body = await request.json();
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('competitions')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminError = await requireWilsonAdmin();
    if (adminError) return adminError;

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('competitions')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
