import { NextResponse } from 'next/server';
import { createServerSupabaseClient, hasSupabaseConfig } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
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

  const { searchParams } = new URL(request.url);
  const status = parseCompetitionStatus(searchParams.get('status'));

  try {
    const adminClient = createAdminClient();
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    let query = adminClient.from('competitions').select('*');

    if (user) {
      const { data: entries } = await adminClient
        .from('competition_entries')
        .select('competition_id')
        .eq('user_id', user.id);

      const enteredIds = entries?.map((e) => e.competition_id) || [];

      if (enteredIds.length > 0) {
        query = query.or(`is_public.eq.true,id.in.(${enteredIds.join(',')})`);
      } else {
        query = query.eq('is_public', true);
      }
    } else {
      query = query.eq('is_public', true);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('start_date', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
