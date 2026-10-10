import { createAdminClient } from '@/lib/supabase/admin';
import { syncService } from './sync-service';

export class CompetitionLifecycleManager {
  private supabase: ReturnType<typeof createAdminClient> | null = null;

  private getSupabase() {
    if (!this.supabase) {
      this.supabase = createAdminClient();
    }
    return this.supabase;
  }

  async startCompetition(competitionId: string): Promise<void> {
    const supabase = this.getSupabase();

    await supabase
      .from('competitions')
      .update({ status: 'active' })
      .eq('id', competitionId);

    const { data: entries } = await supabase
      .from('competition_entries')
      .select('id, metaapi_account_id')
      .eq('competition_id', competitionId)
      .eq('status', 'active');

    if (entries) {
      for (const entry of entries) {
        if (!entry.metaapi_account_id) continue;
        await syncService.startSync(entry.id, entry.metaapi_account_id);
      }
    }
  }

  async endCompetition(competitionId: string): Promise<void> {
    const supabase = this.getSupabase();

    const { data: entries } = await supabase
      .from('competition_entries')
      .select('id')
      .eq('competition_id', competitionId)
      .eq('status', 'active');

    if (entries) {
      for (const entry of entries) {
        await syncService.stopSync(entry.id);
      }
    }

    await this.updateRankings(competitionId);

    await supabase
      .from('competitions')
      .update({ 
        status: 'completed',
        frozen_at: new Date().toISOString()
      })
      .eq('id', competitionId);
    
    // Undeploy accounts logic would go here
  }

  async updateRankings(competitionId: string): Promise<void> {
    const supabase = this.getSupabase();

    const { data: competition } = await supabase
      .from('competitions')
      .select('max_drawdown_pct')
      .eq('id', competitionId)
      .single();

    const maxDrawdownLimit = competition?.max_drawdown_pct;

    const { data: entries } = await supabase
      .from('competition_entries')
      .select('*')
      .eq('competition_id', competitionId)
      .eq('status', 'active')
      .order('net_gain_pct', { ascending: false });

    if (!entries) return;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      
      if (maxDrawdownLimit && (entry.max_drawdown_pct ?? 0) > maxDrawdownLimit) {
        await supabase
          .from('competition_entries')
          .update({ status: 'disqualified' })
          .eq('id', entry.id);
        continue;
      }

      await supabase
        .from('competition_entries')
        .update({ 
          prev_rank: entry.rank,
          rank: i + 1 
        })
        .eq('id', entry.id);
    }
  }

  async checkLifecycles(): Promise<void> {
    const supabase = this.getSupabase();
    const now = new Date().toISOString();

    const { data: toStart } = await supabase
      .from('competitions')
      .select('id')
      .eq('status', 'registration')
      .lte('start_date', now);

    if (toStart) {
      for (const comp of toStart) {
        await this.startCompetition(comp.id);
      }
    }

    const { data: toEnd } = await supabase
      .from('competitions')
      .select('id')
      .eq('status', 'active')
      .lte('end_date', now);

    if (toEnd) {
      for (const comp of toEnd) {
        await this.endCompetition(comp.id);
      }
    }
  }
}
