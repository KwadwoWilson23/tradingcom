'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, Clock, KeyRound, Shield, Trophy, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const competitions = [
  {
    id: 'global-forex-q4',
    title: 'Global Forex Championship Q4',
    status: 'Live Now',
    badge: 'destructive' as const,
    accountType: 'Demo or Real',
    prizePool: '$50,000',
    entry: 'Free',
    participants: 248,
    starts: 'Running now',
    rules: 'Major forex pairs and metals. Max daily drawdown 5%.',
  },
  {
    id: 'prop-prep',
    title: 'Prop Firm Challenge Preparation',
    status: 'Live Now',
    badge: 'success' as const,
    accountType: 'Demo Only',
    prizePool: 'Funded Accounts',
    entry: 'Free',
    participants: 512,
    starts: 'Running now',
    rules: 'Strict drawdown limits, profit target scoring, no balance manipulation.',
  },
  {
    id: 'crypto-dash',
    title: 'Weekend Crypto Dash',
    status: 'Starts in 2d',
    badge: 'primary' as const,
    accountType: 'Demo or Real',
    prizePool: '$5,000',
    entry: '$10',
    participants: 124,
    starts: 'Oct 12, 2026',
    rules: 'BTC and ETH pairs only. Weekend volatility format.',
  },
];

function toHandle(username: string) {
  const clean = username.trim().replace(/^@+/, '').replace(/\s+/g, '_').toLowerCase();
  return clean ? `@${clean}` : '@your_username';
}

function initialsFrom(username: string) {
  const clean = username.trim().replace(/^@+/, '');
  return (clean.slice(0, 2) || 'YT').toUpperCase();
}

export default function JoinPage() {
  const [selectedId, setSelectedId] = useState(competitions[0].id);
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedCompetition = useMemo(
    () => competitions.find((competition) => competition.id === selectedId) ?? competitions[0],
    [selectedId]
  );

  const saveJoinPreview = () => {
    const displayName = username.trim() || 'Your Username';

    window.localStorage.setItem('traders_ring_username', displayName);
    window.localStorage.setItem('traders_ring_handle', toHandle(displayName));
    window.localStorage.setItem('traders_ring_initials', initialsFrom(displayName));
    window.localStorage.setItem('traders_ring_competition', selectedCompetition.title);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="primary" className="mb-4 uppercase tracking-wide">
            No login needed
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Join a Competition
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Choose a current competition, enter the username you want shown on the leaderboard, then connect your MT4 or MT5 account read-only.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <Zap className="h-4 w-4" />
          Bridge server online
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Current competitions</h2>
            <Badge variant="outline">{competitions.length} available</Badge>
          </div>

          <div className="grid gap-4">
            {competitions.map((competition) => {
              const isSelected = selectedId === competition.id;

              return (
                <button
                  key={competition.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(competition.id);
                    setSubmitted(false);
                  }}
                  className={`w-full rounded-xl border bg-white p-5 text-left shadow-card transition ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/15'
                      : 'border-slate-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge
                          variant={competition.badge}
                          className={competition.badge === 'destructive' ? 'bg-red-50 text-red-700' : ''}
                        >
                          {competition.status}
                        </Badge>
                        <Badge variant="outline">{competition.accountType}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{competition.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{competition.rules}</p>
                    </div>
                    {isSelected && (
                      <div className="flex shrink-0 items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                        <CheckCircle className="h-4 w-4" />
                        Selected
                      </div>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="text-xs font-semibold uppercase text-slate-500">Prize</div>
                      <div className="mt-1 font-bold text-blue-700">{competition.prizePool}</div>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="text-xs font-semibold uppercase text-slate-500">Entry</div>
                      <div className="mt-1 font-bold text-slate-900">{competition.entry}</div>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-500">
                        <Users className="h-3 w-3" />
                        Traders
                      </div>
                      <div className="mt-1 font-bold text-slate-900">{competition.participants}</div>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-500">
                        <Clock className="h-3 w-3" />
                        Start
                      </div>
                      <div className="mt-1 font-bold text-slate-900">{competition.starts}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Connect account</CardTitle>
                  <p className="mt-1 text-sm text-slate-500">{selectedCompetition.title}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Leaderboard username</span>
                <Input
                  placeholder="Example: KwamePips"
                  className="h-11"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setSubmitted(false);
                  }}
                />
                <span className="block text-xs text-slate-500">
                  This is the only public name shown on the leaderboard.
                </span>
              </label>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-blue-700" />
                  <p className="text-sm text-blue-900">
                    Use your investor password only. It allows read-only syncing for balance, equity, open positions, and closed deals.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Trading platform</span>
                  <Select
                    options={[
                      { label: 'MetaTrader 5', value: 'mt5' },
                      { label: 'MetaTrader 4', value: 'mt4' },
                    ]}
                    defaultValue="mt5"
                    className="h-11"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Broker server</span>
                  <Input placeholder="Example: ICMarketsSC-Demo" className="h-11" />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Account login</span>
                  <Input placeholder="12345678" className="h-11" inputMode="numeric" />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Investor password</span>
                  <Input placeholder="Read-only password" className="h-11" type="password" />
                </label>
              </div>

              {submitted && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  {username.trim() || 'Your username'} is ready to appear on the leaderboard for {selectedCompetition.title}.
                </div>
              )}

              <Button
                variant="primary"
                className="h-12 w-full text-base font-semibold"
                onClick={saveJoinPreview}
                disabled={!username.trim()}
              >
                Connect Account & Join
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Trophy className="h-4 w-4 text-blue-600" />
                Your starting balance is locked when the account connects.
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
