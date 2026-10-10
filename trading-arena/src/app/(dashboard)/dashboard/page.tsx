'use client';

import { Trophy, TrendingUp, DollarSign, Activity, Share2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between border border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 items-center">
            <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 animate-pulse">LIVE</Badge>
            <span className="text-slate-300 font-medium text-sm">Global Forex Championship Q4</span>
          </div>
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm">
          <div className="text-slate-400">
            Day <span className="text-white font-bold">14</span> / 30
          </div>
          <div className="text-slate-400">
            Time Remaining: <span className="text-white font-mono">16d 04h 22m</span>
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-400/10">MT5 Verified</Badge>
        </div>
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pro Division</h1>
            <Badge variant="primary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">$50,000 Prize Pool</Badge>
          </div>
          <p className="text-slate-500">Your real-time performance metrics</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Share2 className="mr-2 h-4 w-4" /> Share Card
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Arena Standing" 
          value="#4" 
          subtext="/ 248 traders" 
          icon={<Trophy className="h-5 w-5 text-blue-600" />} 
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard 
          label="Cumulative Return" 
          value="+18.42%" 
          subtext="High water mark: +19.1%" 
          icon={<TrendingUp className="h-5 w-5 text-green-600" />} 
          trend={{ value: 1.2, isPositive: true }}
        />
        <StatCard 
          label="Account Solvency" 
          value="$11,420.00" 
          subtext="Initial: $10,000.00" 
          icon={<DollarSign className="h-5 w-5 text-slate-600" />} 
        />
        <StatCard 
          label="Win Efficiency" 
          value="68.4%" 
          subtext="Total Trades: 42" 
          icon={<Activity className="h-5 w-5 text-blue-600" />} 
        />
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle>Equity & Balance Growth</CardTitle>
              <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">MT5 Real-Time</Badge>
            </div>
            <CardDescription>Track your performance over the duration of the tournament</CardDescription>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="3d">3D</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4 text-sm text-slate-500">
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div> Equity</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-slate-400 mr-2 border-2 border-slate-300 border-dashed"></div> Balance</div>
          </div>
          <div className="h-72 w-full bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 text-sm flex-col">
            <TrendingUp className="h-8 w-8 text-slate-300 mb-2" />
            <p>Chart requires recharts library</p>
            <p className="text-xs mt-1">Placeholder for Equity/Balance line chart</p>
          </div>
        </CardContent>
      </Card>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pair</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Open</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">EURUSD</div>
                    <Badge variant="success" className="mt-1 text-[10px]">BUY</Badge>
                  </TableCell>
                  <TableCell>1.50</TableCell>
                  <TableCell>1.09420</TableCell>
                  <TableCell className="text-right font-medium text-green-600">+$142.50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">GBPJPY</div>
                    <Badge variant="success" className="mt-1 text-[10px]">BUY</Badge>
                  </TableCell>
                  <TableCell>0.50</TableCell>
                  <TableCell>188.420</TableCell>
                  <TableCell className="text-right font-medium text-green-600">+$84.20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">XAUUSD</div>
                    <Badge variant="destructive" className="mt-1 text-[10px]">SELL</Badge>
                  </TableCell>
                  <TableCell>2.00</TableCell>
                  <TableCell>2024.50</TableCell>
                  <TableCell className="text-right font-medium text-red-600">-$312.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Closed Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { pair: 'US30', type: 'BUY', size: '1.00', profit: '+$450.00', time: '2 mins ago', isWin: true },
                { pair: 'EURUSD', type: 'SELL', size: '2.50', profit: '-$120.50', time: '1 hour ago', isWin: false },
                { pair: 'GBPAUD', type: 'BUY', size: '0.75', profit: '+$85.20', time: '3 hours ago', isWin: true },
                { pair: 'XAUUSD', type: 'BUY', size: '1.50', profit: '+$210.00', time: '5 hours ago', isWin: true },
                { pair: 'USDJPY', type: 'SELL', size: '3.00', profit: '-$45.00', time: 'Yesterday', isWin: false },
              ].map((trade, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.type === 'BUY' ? 'success' : 'destructive'} className="w-12 justify-center">{trade.type}</Badge>
                    <div>
                      <div className="font-medium text-slate-900">{trade.pair}</div>
                      <div className="text-xs text-slate-500">{trade.size} lots • {trade.time}</div>
                    </div>
                  </div>
                  <div className={`font-medium ${trade.isWin ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.profit}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
