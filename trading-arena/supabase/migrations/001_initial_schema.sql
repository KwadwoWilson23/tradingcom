-- Trigger function to auto-create profiles on auth.users INSERT
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. profiles
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger for auth.users to profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- profiles RLS
CREATE POLICY "Users can read all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);


-- 2. competitions
CREATE TABLE public.competitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('draft','registration','active','completed','cancelled')) DEFAULT 'draft',
    account_type TEXT CHECK (account_type IN ('demo_only','real_only','any')) DEFAULT 'demo_only',
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    registration_deadline TIMESTAMPTZ,
    prize_pool DECIMAL(12,2) DEFAULT 0,
    max_participants INTEGER,
    max_drawdown_pct DECIMAL(5,2),
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER competitions_updated_at
  BEFORE UPDATE ON public.competitions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_competitions_code ON public.competitions(code);
CREATE INDEX idx_competitions_status_public ON public.competitions(status, is_public);

-- competitions RLS
CREATE POLICY "Everyone can read public comps" ON public.competitions
  FOR SELECT USING (is_public = true OR auth.uid() IN (SELECT user_id FROM public.competition_entries WHERE competition_id = id));

CREATE POLICY "Admins can insert competitions" ON public.competitions
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can update competitions" ON public.competitions
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can delete competitions" ON public.competitions
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));


-- 3. competition_entries
CREATE TABLE public.competition_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID REFERENCES public.competitions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    metaapi_account_id TEXT,
    platform TEXT CHECK (platform IN ('mt4','mt5')),
    broker_server TEXT,
    account_login TEXT,
    starting_balance DECIMAL(14,2),
    starting_equity DECIMAL(14,2),
    current_balance DECIMAL(14,2),
    current_equity DECIMAL(14,2),
    peak_equity DECIMAL(14,2),
    max_drawdown_pct DECIMAL(5,2) DEFAULT 0,
    net_gain_pct DECIMAL(8,4) DEFAULT 0,
    total_trades INTEGER DEFAULT 0,
    winning_trades INTEGER DEFAULT 0,
    realized_pnl DECIMAL(14,2) DEFAULT 0,
    deposit_adjustment DECIMAL(14,2) DEFAULT 0,
    rank INTEGER,
    prev_rank INTEGER,
    status TEXT CHECK (status IN ('pending','syncing','active','disqualified','completed')) DEFAULT 'pending',
    disqualification_reason TEXT,
    joined_at TIMESTAMPTZ DEFAULT now(),
    frozen_at TIMESTAMPTZ,
    UNIQUE(competition_id, user_id)
);

ALTER TABLE public.competition_entries ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_competition_entries_leaderboard ON public.competition_entries(competition_id, net_gain_pct DESC);

-- competition_entries RLS
CREATE POLICY "Users can read entries in comps they have entered" ON public.competition_entries
  FOR SELECT USING (
    competition_id IN (SELECT competition_id FROM public.competition_entries WHERE user_id = auth.uid()) 
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can insert their own entry" ON public.competition_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Note: Only server can update entries via service role. So no update/delete policy for regular users.

-- 4. account_snapshots
CREATE TABLE public.account_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES public.competition_entries(id) ON DELETE CASCADE,
    balance DECIMAL(14,2) NOT NULL,
    equity DECIMAL(14,2) NOT NULL,
    margin DECIMAL(14,2),
    free_margin DECIMAL(14,2),
    margin_level DECIMAL(8,2),
    net_gain_pct DECIMAL(8,4),
    recorded_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.account_snapshots ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_account_snapshots_recorded_at ON public.account_snapshots(entry_id, recorded_at);

-- account_snapshots RLS
CREATE POLICY "Users can read their own snapshots" ON public.account_snapshots
  FOR SELECT USING (
    entry_id IN (SELECT id FROM public.competition_entries WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- 5. open_positions
CREATE TABLE public.open_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES public.competition_entries(id) ON DELETE CASCADE,
    position_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    type TEXT CHECK (type IN ('buy','sell')),
    volume DECIMAL(10,4),
    open_price DECIMAL(14,6),
    current_price DECIMAL(14,6),
    stop_loss DECIMAL(14,6),
    take_profit DECIMAL(14,6),
    floating_pnl DECIMAL(14,2),
    open_time TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(entry_id, position_id)
);

ALTER TABLE public.open_positions ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER open_positions_updated_at
  BEFORE UPDATE ON public.open_positions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- open_positions RLS
CREATE POLICY "Users can read positions in same comp" ON public.open_positions
  FOR SELECT USING (
    entry_id IN (
      SELECT id FROM public.competition_entries 
      WHERE competition_id IN (SELECT competition_id FROM public.competition_entries WHERE user_id = auth.uid())
    )
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- 6. closed_deals
CREATE TABLE public.closed_deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES public.competition_entries(id) ON DELETE CASCADE,
    deal_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    type TEXT CHECK (type IN ('buy','sell')),
    volume DECIMAL(10,4),
    open_price DECIMAL(14,6),
    close_price DECIMAL(14,6),
    profit DECIMAL(14,2),
    commission DECIMAL(14,2),
    swap DECIMAL(14,2),
    open_time TIMESTAMPTZ,
    close_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(entry_id, deal_id)
);

ALTER TABLE public.closed_deals ENABLE ROW LEVEL SECURITY;

-- closed_deals RLS
CREATE POLICY "Users can read deals in same comp" ON public.closed_deals
  FOR SELECT USING (
    entry_id IN (
      SELECT id FROM public.competition_entries 
      WHERE competition_id IN (SELECT competition_id FROM public.competition_entries WHERE user_id = auth.uid())
    )
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );
