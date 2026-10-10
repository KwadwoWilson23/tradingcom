import Link from 'next/link';
import { Activity, LineChart, PlusCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <Badge variant="outline" className="mb-4">No account connected</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Trader Dashboard</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Real performance metrics will appear here after a trader joins a competition and connects an MT4/MT5 account.
        </p>
        <Link href="/join">
          <Button variant="primary" className="mt-6">
            <PlusCircle className="mr-2 h-4 w-4" /> Join Competition
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Arena Standing" value="Pending" icon={<Trophy className="h-5 w-5 text-blue-600" />} />
        <StatCard label="Cumulative Return" value="Pending" icon={<LineChart className="h-5 w-5 text-green-600" />} />
        <StatCard label="Current Equity" value="Pending" icon={<Activity className="h-5 w-5 text-slate-600" />} />
        <StatCard label="Total Trades" value="Pending" icon={<Activity className="h-5 w-5 text-blue-600" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equity & Balance Growth</CardTitle>
          <CardDescription>Live charting starts after real account snapshots are recorded.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-72 flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-sm text-slate-400">
            <LineChart className="mb-2 h-8 w-8 text-slate-300" />
            No chart data yet
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Open Positions</CardTitle>
          </CardHeader>
          <CardContent className="py-10 text-center text-sm text-slate-500">
            No real open positions synced yet.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Closed Deals</CardTitle>
          </CardHeader>
          <CardContent className="py-10 text-center text-sm text-slate-500">
            No real closed deals synced yet.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
