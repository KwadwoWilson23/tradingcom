export type CompetitionStatus = 'draft' | 'registration' | 'active' | 'completed' | 'cancelled';
export type AccountType = 'demo_only' | 'real_only' | 'any';
export type EntryStatus = 'pending' | 'syncing' | 'active' | 'disqualified' | 'completed';
export type Platform = 'mt4' | 'mt5';
export type PositionType = 'buy' | 'sell';
type DbRecord<T> = T & Record<string, unknown>;

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  is_admin: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Competition {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: CompetitionStatus | null;
  account_type: AccountType | null;
  start_date: string;
  end_date: string;
  registration_deadline: string | null;
  prize_pool: number | null;
  max_participants: number | null;
  max_drawdown_pct: number | null;
  is_public: boolean | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CompetitionEntry {
  id: string;
  competition_id: string | null;
  user_id: string | null;
  metaapi_account_id: string | null;
  platform: Platform | null;
  broker_server: string | null;
  account_login: string | null;
  starting_balance: number | null;
  starting_equity: number | null;
  current_balance: number | null;
  current_equity: number | null;
  peak_equity: number | null;
  max_drawdown_pct: number | null;
  net_gain_pct: number | null;
  total_trades: number | null;
  winning_trades: number | null;
  realized_pnl: number | null;
  deposit_adjustment: number | null;
  rank: number | null;
  prev_rank: number | null;
  status: EntryStatus | null;
  disqualification_reason: string | null;
  joined_at: string | null;
  frozen_at: string | null;
}

export interface AccountSnapshot {
  id: string;
  entry_id: string | null;
  balance: number;
  equity: number;
  margin: number | null;
  free_margin: number | null;
  margin_level: number | null;
  net_gain_pct: number | null;
  recorded_at: string | null;
}

export interface OpenPosition {
  id: string;
  entry_id: string | null;
  position_id: string;
  symbol: string;
  type: PositionType | null;
  volume: number | null;
  open_price: number | null;
  current_price: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  floating_pnl: number | null;
  open_time: string | null;
  updated_at: string | null;
}

export interface ClosedDeal {
  id: string;
  entry_id: string | null;
  deal_id: string;
  symbol: string;
  type: PositionType | null;
  volume: number | null;
  open_price: number | null;
  close_price: number | null;
  profit: number | null;
  commission: number | null;
  swap: number | null;
  open_time: string | null;
  close_time: string | null;
  created_at: string | null;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: DbRecord<Profile>;
        Insert: DbRecord<Partial<Profile> & { id: string; email: string }>;
        Update: DbRecord<Partial<Profile>>;
        Relationships: [];
      };
      competitions: {
        Row: DbRecord<Competition>;
        Insert: DbRecord<Partial<Competition> & { code: string; name: string; start_date: string; end_date: string }>;
        Update: DbRecord<Partial<Competition>>;
        Relationships: [];
      };
      competition_entries: {
        Row: DbRecord<CompetitionEntry>;
        Insert: DbRecord<Partial<CompetitionEntry>>;
        Update: DbRecord<Partial<CompetitionEntry>>;
        Relationships: [];
      };
      account_snapshots: {
        Row: DbRecord<AccountSnapshot>;
        Insert: DbRecord<Partial<AccountSnapshot> & { balance: number; equity: number }>;
        Update: DbRecord<Partial<AccountSnapshot>>;
        Relationships: [];
      };
      open_positions: {
        Row: DbRecord<OpenPosition>;
        Insert: DbRecord<Partial<OpenPosition> & { position_id: string; symbol: string }>;
        Update: DbRecord<Partial<OpenPosition>>;
        Relationships: [];
      };
      closed_deals: {
        Row: DbRecord<ClosedDeal>;
        Insert: DbRecord<Partial<ClosedDeal> & { deal_id: string; symbol: string }>;
        Update: DbRecord<Partial<ClosedDeal>>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      competition_status: CompetitionStatus;
      account_type: AccountType;
      entry_status: EntryStatus;
      platform: Platform;
      position_type: PositionType;
    };
    CompositeTypes: Record<string, never>;
  };
};
