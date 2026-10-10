'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Clock, Download, Info, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

type JoinedTrader = {
  name: string;
  username: string;
  competition: string;
};

export default function LeaderboardPage() {
  const [joinedTrader, setJoinedTrader] = useState<JoinedTrader | null>(null);

  useEffect(() => {
    const name = window.localStorage.getItem('traders_ring_username');
    const username = window.localStorage.getItem('traders_ring_handle');
    const competition = window.localStorage.getItem('traders_ring_competition');

    if (name || username || competition) {
      queueMicrotask(() => setJoinedTrader({
        name: name || 'Pending trader',
        username: username || '@pending',
        competition: competition || 'Selected competition',
      }));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Live Competition Leaderboard</h1>
            <Badge variant="primary" className="bg-blue-900 text-white">Live Sync</Badge>
          </div>
          <p className="text-slate-500">
            {joinedTrader?.competition ?? 'Select and connect a competition account to begin ranking.'}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex items-center rounded-md border border-green-100 bg-green-50 px-2 py-1 text-sm font-medium text-green-600">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            Ready for broker sync
          </div>
          <Tabs defaultValue="overall">
            <TabsList>
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        <Info className="h-4 w-4 text-blue-600" />
        <span>Ranks will appear after real account snapshots and closed deals are synced from connected MT4/MT5 accounts.</span>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Trader</TableHead>
                <TableHead className="text-right">% Gain</TableHead>
                <TableHead className="text-right">Balance & Equity</TableHead>
                <TableHead className="text-right">Win Rate</TableHead>
                <TableHead className="text-right">Trades</TableHead>
                <TableHead className="text-right">Profit Factor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {joinedTrader ? (
                <TableRow className="border-l-4 border-l-blue-600 bg-blue-50/40">
                  <TableCell className="text-center font-bold text-slate-700">Pending</TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{joinedTrader.name}</div>
                    <div className="text-xs text-slate-500">{joinedTrader.username}</div>
                  </TableCell>
                  <TableCell className="text-right text-slate-500">Awaiting sync</TableCell>
                  <TableCell className="text-right text-slate-500">Awaiting sync</TableCell>
                  <TableCell className="text-right text-slate-500">Awaiting sync</TableCell>
                  <TableCell className="text-right text-slate-500">Awaiting sync</TableCell>
                  <TableCell className="text-right text-slate-500">Awaiting sync</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Trophy className="mb-4 h-10 w-10 text-slate-300" />
                      <h2 className="text-lg font-semibold text-slate-900">No leaderboard data yet</h2>
                      <p className="mt-2 max-w-md text-sm text-slate-500">
                        Rankings will be calculated from real connected accounts.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-slate-400" />
          <span>Drawdown and ranking rules are enforced from the selected competition settings.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> Last calculation: pending</span>
          <Button variant="outline" size="sm" className="h-8 text-xs" disabled>
            <Download className="mr-1 h-3 w-3" /> Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
