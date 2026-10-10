import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const { data: competition, error } = await supabase
      .from('competitions')
      .select('*')
      .eq('code', code)
      .single();

    if (error || !competition) {
      return NextResponse.json({ error: 'Invalid competition code' }, { status: 404 });
    }

    if (!competition.status || !['registration', 'active'].includes(competition.status)) {
      return NextResponse.json({ error: 'Competition is not accepting entries' }, { status: 400 });
    }

    if (competition.registration_deadline && new Date(competition.registration_deadline) < new Date()) {
      return NextResponse.json({ error: 'Registration deadline has passed' }, { status: 400 });
    }

    return NextResponse.json({ competition });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
