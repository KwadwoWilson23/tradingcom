import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ competitionId: string }> }
) {
  try {
    const { competitionId } = await params;
    const supabase = await createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('competition_entries')
      .select(`
        *,
        users (
          id,
          username,
          avatar_url
        )
      `)
      .eq('competition_id', competitionId)
      .order('net_gain_pct', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
