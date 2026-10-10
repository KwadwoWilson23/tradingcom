import { createAdminClient } from '@/lib/supabase/admin';

class TradersRingSyncListener {
  private entryId: string;
  private supabase;

  constructor(entryId: string) {
    this.entryId = entryId;
    this.supabase = createAdminClient();
  }

  async onAccountInformationUpdated(instanceIndex: string, accountInfo: any) {
    try {
      const { data: entry } = await this.supabase
        .from('competition_entries')
        .select('starting_equity, deposit_adjustment, peak_equity')
        .eq('id', this.entryId)
        .single();

      if (!entry) return;

      const current_equity = accountInfo.equity || 0;
      const current_balance = accountInfo.balance || 0;
      const starting_equity = entry.starting_equity || 0;
      const deposit_adjustment = entry.deposit_adjustment || 0;
      
      const net_gain_pct = starting_equity > 0 
        ? ((current_equity - starting_equity - deposit_adjustment) / starting_equity) * 100 
        : 0;

      const peak_equity = Math.max(entry.peak_equity || 0, current_equity);
      const max_drawdown_pct = peak_equity > 0 
        ? ((peak_equity - current_equity) / peak_equity) * 100 
        : 0;

      await this.supabase
        .from('competition_entries')
        .update({
          current_balance,
          current_equity,
          net_gain_pct,
          peak_equity,
          max_drawdown_pct,
          last_synced_at: new Date().toISOString()
        })
        .eq('id', this.entryId);

      await this.supabase.from('account_snapshots').insert({
        entry_id: this.entryId,
        balance: current_balance,
        equity: current_equity,
        net_gain_pct
      });
    } catch (e) {
      console.error('Error onAccountInformationUpdated:', e);
    }
  }

  async onPositionUpdated(instanceIndex: string, position: any) {
    try {
      await this.supabase.from('open_positions').upsert({
        entry_id: this.entryId,
        position_id: position.id,
        symbol: position.symbol,
        type: position.type,
        volume: position.volume,
        open_price: position.openPrice,
        current_price: position.currentPrice,
        floating_pnl: position.profit,
        updated_at: new Date().toISOString()
      }, { onConflict: 'entry_id, position_id' });
    } catch (e) {
      console.error('Error onPositionUpdated:', e);
    }
  }

  async onPositionRemoved(instanceIndex: string, positionId: string) {
    try {
      await this.supabase
        .from('open_positions')
        .delete()
        .eq('entry_id', this.entryId)
        .eq('position_id', positionId);
    } catch (e) {
      console.error('Error onPositionRemoved:', e);
    }
  }

  async onDealAdded(instanceIndex: string, deal: any) {
    try {
      await this.supabase.from('closed_deals').insert({
        entry_id: this.entryId,
        deal_id: deal.id,
        symbol: deal.symbol,
        type: deal.type,
        volume: deal.volume,
        close_price: deal.price,
        profit: deal.profit,
        commission: deal.commission,
        swap: deal.swap,
        close_time: deal.time
      });

      // Handle deposit/withdrawal adjustments
      if (deal.type === 'DEAL_TYPE_BALANCE') {
        const { data: entry } = await this.supabase
          .from('competition_entries')
          .select('deposit_adjustment')
          .eq('id', this.entryId)
          .single();
        
        if (entry) {
          await this.supabase
            .from('competition_entries')
            .update({
              deposit_adjustment: (entry.deposit_adjustment || 0) + deal.profit
            })
            .eq('id', this.entryId);
        }
      }
    } catch (e) {
      console.error('Error onDealAdded:', e);
    }
  }

  async onReconnected(instanceIndex: string, replicas: number) {
    // Implement full reconciliation if necessary
    console.log(`Reconnected entry: ${this.entryId}`);
  }
}

export class MetaApiSyncService {
  private metaapi: any | null = null;
  private connections: Map<string, any> = new Map();
  private supabase: ReturnType<typeof createAdminClient> | null = null;

  private async getMetaApi() {
    if (!this.metaapi) {
      const MetaApi = (await import('metaapi.cloud-sdk')).default;
      this.metaapi = new MetaApi(process.env.METAAPI_TOKEN!);
    }
    return this.metaapi;
  }

  private getSupabase() {
    if (!this.supabase) {
      this.supabase = createAdminClient();
    }
    return this.supabase;
  }

  async startSync(entryId: string, metaapiAccountId: string) {
    if (this.connections.has(entryId)) return;
    try {
      const metaapi = await this.getMetaApi();
      const account = await metaapi.metatraderAccountApi.getAccount(metaapiAccountId);
      const connection = account.getStreamingConnection();
      
      const listener = new TradersRingSyncListener(entryId);
      connection.addSynchronizationListener(listener);
      
      await connection.connect();
      await connection.waitSynchronized();
      
      this.connections.set(entryId, { connection, listener });
      console.log(`Started sync for entry ${entryId}`);
    } catch (e) {
      console.error(`Failed to start sync for ${entryId}:`, e);
    }
  }

  async stopSync(entryId: string) {
    const active = this.connections.get(entryId);
    if (active) {
      try {
        active.connection.removeSynchronizationListener(active.listener);
        await active.connection.close();
        this.connections.delete(entryId);
        console.log(`Stopped sync for entry ${entryId}`);
      } catch (e) {
        console.error(`Failed to stop sync for ${entryId}:`, e);
      }
    }
  }

  async syncAll() {
    const { data: entries } = await this.getSupabase()
      .from('competition_entries')
      .select('id, metaapi_account_id')
      .eq('status', 'active');
    
    if (!entries) return;
    for (const entry of entries) {
      if (!entry.metaapi_account_id) continue;
      await this.startSync(entry.id, entry.metaapi_account_id);
    }
  }

  async reconcile(entryId: string) {
    // REST fallback sync logic here
  }

  async reconcileAll() {
    const { data: entries } = await this.getSupabase()
      .from('competition_entries')
      .select('id')
      .eq('status', 'active');
    
    if (!entries) return;
    for (const entry of entries) {
      await this.reconcile(entry.id);
    }
  }
}

export const syncService = new MetaApiSyncService();
