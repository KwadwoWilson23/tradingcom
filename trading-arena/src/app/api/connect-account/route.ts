import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Simple rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 attempts per minute

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const attempts = rateLimitMap.get(userId) || [];
  const recentAttempts = attempts.filter(t => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(userId, recentAttempts);
  if (recentAttempts.length >= RATE_LIMIT_MAX) return false;
  recentAttempts.push(now);
  rateLimitMap.set(userId, recentAttempts);
  return true;
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!checkRateLimit(user.id)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in 1 minute.' }, { status: 429 });
    }

    const body = await request.json();
    const { competition_id, login, server, password, platform } = body;

    // Validate inputs
    if (!competition_id || !login || !server || !password || !platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!['mt4', 'mt5'].includes(platform)) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }

    // Check competition exists and is open for registration
    const adminClient = createAdminClient();
    const { data: competition, error: compError } = await adminClient
      .from('competitions')
      .select('*')
      .eq('id', competition_id)
      .single();

    if (compError || !competition) {
      return NextResponse.json({ error: 'Competition not found' }, { status: 404 });
    }

    if (!competition.status || !['registration', 'active'].includes(competition.status)) {
      return NextResponse.json({ error: 'Competition is not accepting entries' }, { status: 400 });
    }

    // Check registration deadline
    if (competition.registration_deadline && new Date(competition.registration_deadline) < new Date()) {
      return NextResponse.json({ error: 'Registration deadline has passed' }, { status: 400 });
    }

    // Check max participants
    if (competition.max_participants) {
      const { count } = await adminClient
        .from('competition_entries')
        .select('*', { count: 'exact', head: true })
        .eq('competition_id', competition_id)
        .neq('status', 'disqualified');
      
      if ((count || 0) >= competition.max_participants) {
        return NextResponse.json({ error: 'Competition is full' }, { status: 400 });
      }
    }

    // Check user not already entered
    const { data: existingEntry } = await adminClient
      .from('competition_entries')
      .select('id')
      .eq('competition_id', competition_id)
      .eq('user_id', user.id)
      .single();

    if (existingEntry) {
      return NextResponse.json({ error: 'You have already joined this competition' }, { status: 400 });
    }

    // Provision MetaApi account
    // NOTE: In production, this would use the actual MetaApi SDK.
    // The password is used ONLY here and never stored.
    let metaapiAccountId: string;
    let startingBalance: number;
    let startingEquity: number;

    try {
      // Dynamic import to avoid loading MetaApi on every request
      const MetaApi = (await import('metaapi.cloud-sdk')).default;
      const metaapi = new MetaApi(process.env.METAAPI_TOKEN!);
      
      // Create MetaApi account with investor (read-only) password
      const account = await metaapi.metatraderAccountApi.createAccount({
        name: `traders-ring-${competition_id}-${user.id}`.substring(0, 63),
        type: 'cloud-g2',
        login: login,
        server: server,
        password: password, // Used only for provisioning, never stored
        platform: platform,
        magic: 0,
      });

      metaapiAccountId = account.id;

      // Deploy the account
      await account.deploy();
      await account.waitDeployed();

      // Wait for connection and get initial state
      const connection = account.getStreamingConnection();
      await connection.connect();
      await connection.waitSynchronized();

      const terminalState = connection.terminalState;
      startingBalance = terminalState.accountInformation?.balance || 0;
      startingEquity = terminalState.accountInformation?.equity || 0;

      // Validate account type against competition requirements
      const accountType = (terminalState.accountInformation as { tradeMode?: string } | undefined)?.tradeMode;
      if (competition.account_type === 'demo_only' && accountType !== 'DEMO') {
        // Undeploy and cleanup
        await account.undeploy();
        return NextResponse.json({ error: 'This competition requires a demo account' }, { status: 400 });
      }
      if (competition.account_type === 'real_only' && accountType === 'DEMO') {
        await account.undeploy();
        return NextResponse.json({ error: 'This competition requires a real account' }, { status: 400 });
      }

    } catch (metaError: any) {
      console.error('MetaApi provisioning error:', metaError?.message);
      return NextResponse.json(
        { error: 'Failed to connect trading account. Please check your credentials.' },
        { status: 400 }
      );
    }

    // Create the competition entry (password is NOT stored anywhere)
    const { data: entry, error: entryError } = await adminClient
      .from('competition_entries')
      .insert({
        competition_id,
        user_id: user.id,
        metaapi_account_id: metaapiAccountId,
        platform,
        broker_server: server,
        account_login: login,
        starting_balance: startingBalance,
        starting_equity: startingEquity,
        current_balance: startingBalance,
        current_equity: startingEquity,
        peak_equity: startingEquity,
        status: 'active',
      })
      .select()
      .single();

    if (entryError) {
      return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
    }

    // Record initial snapshot
    await adminClient.from('account_snapshots').insert({
      entry_id: entry.id,
      balance: startingBalance,
      equity: startingEquity,
      net_gain_pct: 0,
    });

    return NextResponse.json({
      success: true,
      entry_id: entry.id,
      starting_balance: startingBalance,
      starting_equity: startingEquity,
    });

  } catch (error: any) {
    console.error('Connect account error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
