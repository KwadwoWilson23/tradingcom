import { NextResponse } from 'next/server';
import { CompetitionLifecycleManager } from '@/lib/metaapi/competition-lifecycle';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const lifecycleManager = new CompetitionLifecycleManager();
    await lifecycleManager.checkLifecycles();

    // Optionally update rankings for active competitions
    const { createAdminClient } = await import('@/lib/supabase/admin');
    const supabase = createAdminClient();
    const { data: activeComps } = await supabase
      .from('competitions')
      .select('id')
      .eq('status', 'active');

    if (activeComps) {
      for (const comp of activeComps) {
        await lifecycleManager.updateRankings(comp.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
