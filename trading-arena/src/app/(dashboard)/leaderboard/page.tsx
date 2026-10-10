'use client';

import { useEffect, useState } from 'react';
import { Clock, Download, ArrowUp, ArrowDown, Minus, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export default function LeaderboardPage() {
  const [joinedTrader, setJoinedTrader] = useState({
    name: 'Your Username',
    username: '@your_username',
    avatar: 'YT',
    competition: 'Global Forex Championship Q4',
  });

  useEffect(() => {
    const name = window.localStorage.getItem('traders_ring_username');
    const username = window.localStorage.getItem('traders_ring_handle');
    const avatar = window.localStorage.getItem('traders_ring_initials');
    const competition = window.localStorage.getItem('traders_ring_competition');

    if (name || username || avatar || competition) {
      queueMicrotask(() => setJoinedTrader({
        name: name || 'Your Username',
        username: username || '@your_username',
        avatar: avatar || 'YT',
        competition: competition || 'Global Forex Championship Q4',
      }));
    }
  }, []);

  const topThree = [
    { rank: 2, name: 'Sarah Jenkins', username: '@pips_queen', gain: '+24.5%', profit: '$2,450.00', winRate: '72%', trades: 142, avatar: 'SJ' },
    { rank: 1, name: 'Michael Chen', username: '@algo_mike', gain: '+32.8%', profit: '$3,280.00', winRate: '81%', trades: 84, avatar: 'MC' },
    { rank: 3, name: 'David Smith', username: '@dsmith_fx', gain: '+21.2%', profit: '$2,120.00', winRate: '64%', trades: 215, avatar: 'DS' }
  ];

  const standings = [
    { rank: 4, name: joinedTrader.name, username: joinedTrader.username, gain: '+18.42%', balance: '$11,420', equity: '$11,648', winRate: '68.4%', trades: 42, profitFactor: '1.8', rankChange: 'up', isUser: true },
    { rank: 5, name: 'Elena R.', username: '@elena_trade', gain: '+17.9%', balance: '$11,390', equity: '$11,350', winRate: '59.2%', trades: 98, profitFactor: '1.4', rankChange: 'down', isUser: false },
    { rank: 6, name: 'James W.', username: '@jwilson', gain: '+16.5%', balance: '$11,250', equity: '$11,250', winRate: '62.5%', trades: 64, profitFactor: '1.6', rankChange: 'same', isUser: false },
    { rank: 7, name: 'Ahmed K.', username: '@ak_trader', gain: '+15.2%', balance: '$11,120', equity: '$11,400', winRate: '55.8%', trades: 112, profitFactor: '1.3', rankChange: 'up', isUser: false },
    { rank: 8, name: 'Maria G.', username: '@maria_fx', gain: '+14.8%', balance: '$11,080', equity: '$10,950', winRate: '71.0%', trades: 31, profitFactor: '2.1', rankChange: 'down', isUser: false },
    { rank: 9, name: 'Tom B.', username: '@tomb_trade', gain: '+13.5%', balance: '$10,950', equity: '$10,950', winRate: '60.4%', trades: 86, profitFactor: '1.5', rankChange: 'same', isUser: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Live Competition Leaderboard</h1>
            <Badge variant="primary" className="bg-blue-900 text-white hover:bg-blue-800">PRO TIER</Badge>
          </div>
          <p className="text-slate-500">{joinedTrader.competition} • 248 Participants</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              Live Auto-Sync
            </div>
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

      {/* Institutional Engine Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center space-x-3 text-sm text-slate-600">
        <Info className="h-4 w-4 text-blue-600" />
        <span>Leaderboard is powered by our institutional-grade engine. Ranks are calculated based on Net Gain % with Equity protecting against drawdown.</span>
      </div>

      {/* Podium */}
      <div className="flex flex-col lg:flex-row justify-center items-end gap-4 lg:gap-6 pt-10 pb-6">
        {/* 2nd Place */}
        <Card className="w-full lg:w-72 border-slate-200 relative pt-10">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm shadow-sm mb-2 border-2 border-white">2</div>
            <Avatar className="w-16 h-16 border-4 border-white shadow-md bg-blue-100 text-blue-700 font-bold text-xl">{topThree[0].avatar}</Avatar>
          </div>
          <div className="p-5 text-center mt-6">
            <h3 className="font-bold text-lg text-slate-900">{topThree[0].name}</h3>
            <p className="text-sm text-slate-500 mb-3">{topThree[0].username}</p>
            <Badge variant="outline" className="bg-slate-50 text-xs mb-4">MT5 Verified</Badge>
            
            <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-3 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Net Gain</p>
                <p className="font-bold text-green-600 text-lg">{topThree[0].gain}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Profit</p>
                <p className="font-bold text-slate-900 text-sm mt-1">{topThree[0].profit}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Win Rate</p>
                <p className="font-medium text-slate-700 text-sm">{topThree[0].winRate}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Trades</p>
                <p className="font-medium text-slate-700 text-sm">{topThree[0].trades}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 1st Place */}
        <Card className="w-full lg:w-80 border-blue-200 shadow-md relative pt-10 lg:scale-105 z-10 border-t-4 border-t-blue-600">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Badge variant="primary" className="mb-2 bg-blue-600 text-[10px] font-bold tracking-wider px-2 py-0.5">CURRENT CHAMPION</Badge>
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-yellow-900 font-bold flex items-center justify-center text-lg shadow-sm mb-2 border-2 border-white">1</div>
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg bg-blue-600 text-white font-bold text-2xl">{topThree[1].avatar}</Avatar>
          </div>
          <div className="p-6 text-center mt-8">
            <h3 className="font-bold text-xl text-slate-900">{topThree[1].name}</h3>
            <p className="text-sm text-slate-500 mb-3">{topThree[1].username}</p>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs mb-5">MT5 Verified</Badge>
            
            <div className="grid grid-cols-2 gap-3 text-left bg-blue-50/50 p-4 rounded-lg border border-blue-100">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Net Gain</p>
                <p className="font-bold text-green-600 text-2xl">{topThree[1].gain}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Profit</p>
                <p className="font-bold text-slate-900 text-base mt-2">{topThree[1].profit}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Win Rate</p>
                <p className="font-medium text-slate-700 text-sm">{topThree[1].winRate}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Trades</p>
                <p className="font-medium text-slate-700 text-sm">{topThree[1].trades}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 3rd Place */}
        <Card className="w-full lg:w-72 border-slate-200 relative pt-10">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-orange-200 text-orange-800 font-bold flex items-center justify-center text-sm shadow-sm mb-2 border-2 border-white">3</div>
            <Avatar className="w-16 h-16 border-4 border-white shadow-md bg-blue-100 text-blue-700 font-bold text-xl">{topThree[2].avatar}</Avatar>
          </div>
          <div className="p-5 text-center mt-6">
            <h3 className="font-bold text-lg text-slate-900">{topThree[2].name}</h3>
            <p className="text-sm text-slate-500 mb-3">{topThree[2].username}</p>
            <Badge variant="outline" className="bg-slate-50 text-xs mb-4">MT4 Verified</Badge>
            
            <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-3 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Net Gain</p>
                <p className="font-bold text-green-600 text-lg">{topThree[2].gain}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Profit</p>
                <p className="font-bold text-slate-900 text-sm mt-1">{topThree[2].profit}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Win Rate</p>
                <p className="font-medium text-slate-700 text-sm">{topThree[2].winRate}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Trades</p>
                <p className="font-medium text-slate-700 text-sm">{topThree[2].trades}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Standings Table */}
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
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((trader) => (
                <TableRow key={trader.rank} className={trader.isUser ? 'bg-blue-50/40 border-l-4 border-l-blue-600' : ''}>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-bold text-slate-700">{trader.rank}</span>
                      {trader.rankChange === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                      {trader.rankChange === 'down' && <ArrowDown className="h-3 w-3 text-red-500" />}
                      {trader.rankChange === 'same' && <Minus className="h-3 w-3 text-slate-300" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 text-xs">{trader.isUser ? joinedTrader.avatar : trader.name.substring(0, 2).toUpperCase()}</Avatar>
                      <div>
                        <div className="font-medium text-slate-900 flex items-center space-x-2">
                          <span>{trader.name}</span>
                          {trader.isUser && <Badge variant="primary" className="text-[10px] h-4 px-1.5 bg-blue-600">YOU</Badge>}
                        </div>
                        <div className="text-xs text-slate-500">{trader.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-green-600">{trader.gain}</TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-slate-900">{trader.balance}</div>
                    <div className="text-xs text-slate-500">Eq: {trader.equity}</div>
                  </TableCell>
                  <TableCell className="text-right text-slate-700">{trader.winRate}</TableCell>
                  <TableCell className="text-right text-slate-700">{trader.trades}</TableCell>
                  <TableCell className="text-right text-slate-700">{trader.profitFactor}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-700">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Footer info */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200 gap-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-slate-400" />
          <span>Maximum drawdown rule in effect: 10% daily, 20% overall.</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Last calculation: Just now</span>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="mr-1 h-3 w-3" /> Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
