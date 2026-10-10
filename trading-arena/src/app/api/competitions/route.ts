import { NextResponse } from 'next/server';
import { createServerSupabaseClient, hasSupabaseConfig } from '@/lib/supabase/server';
import type { CompetitionStatus } from '@/types/database';

const competitionStatuses: CompetitionStatus[] = ['draft', 'registration', 'active', 'completed', 'cancelled'];

function parseCompetitionStatus(status: string | null): CompetitionStatus | null {
  return status && competitionStatuses.includes(status as CompetitionStatus)
    ? (status as CompetitionStatus)
    : null;
}

export async function GET(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json([]);
  }

  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const status = parseCompetitionStatus(searchParams.get('status'));
  
  let query = supabase.from('competitions').select('*');
  
  if (status) query = query.eq('status', status);
  
  // Also get competitions the user has entered
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    // Get comps user has entered
    const { data: entries } = await supabase
      .from('competition_entries')
      .select('competition_id')
      .eq('user_id', user.id);
    
    const enteredIds = entries?.map(e => e.competition_id) || [];
    
    // Get public comps OR comps user entered
    if (enteredIds.length > 0) {
      query = supabase.from('competitions').select('*')
        .or(`is_public.eq.true,id.in.(${enteredIds.join(',')})`);
    } else {
      query = supabase.from('competitions').select('*')
        .eq('is_public', true);
    }
    
    if (status) query = query.eq('status', status);
  } else {
    query = query.eq('is_public', true);
  }
  
  const { data, error } = await query.order('start_date', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
