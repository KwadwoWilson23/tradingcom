'use client';

import Link from 'next/link';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompetitionsPage() {
  type CompetitionStatusColor = 'default' | 'primary' | 'success' | 'destructive' | 'outline';

  const competitions: Array<{
    id: string;
    title: string;
    status: string;
    statusColor: CompetitionStatusColor;
    description: string;
    prizePool: string;
    entryFee: string;
    participants: number;
    daysLeft: number | null;
  }> = [
    {
      id: 'comp-1',
      title: 'Global Forex Championship Q4',
      status: 'Live Now',
      statusColor: 'destructive',
      description: 'The premier quarterly trading competition for seasoned professionals. Trade major forex pairs and metals.',
      prizePool: '$50,000',
      entryFee: 'Free',
      participants: 248,
      daysLeft: 16
    },
    {
      id: 'comp-2',
      title: 'Prop Firm Challenge Preparation',
      status: 'Live Now',
      statusColor: 'destructive',
      description: 'Practice for your next prop firm challenge with strict drawdown rules and profit targets.',
      prizePool: 'Funded Accs',
      entryFee: 'Free',
      participants: 512,
      daysLeft: 5
    },
    {
      id: 'comp-3',
      title: 'Weekend Crypto Dash',
      status: 'Starts in 2d',
      statusColor: 'primary',
      description: 'High-volatility weekend trading competition focusing exclusively on BTC and ETH pairs.',
      prizePool: '$5,000',
      entryFee: '$10',
      participants: 124,
      daysLeft: null
    },
    {
      id: 'comp-4',
      title: 'Beginner\'s Arena',
      status: 'Active',
      statusColor: 'success',
      description: 'A low-stakes environment for new traders to test their strategies and learn risk management.',
      prizePool: '$1,000',
      entryFee: 'Free',
      participants: 845,
      daysLeft: 22
    },
    {
      id: 'comp-5',
      title: 'Gold Diggers Tournament',
      status: 'Starts in 5d',
      statusColor: 'primary',
      description: 'XAUUSD only competition. Highest profit factor wins the grand prize.',
      prizePool: '$10,000',
      entryFee: '$25',
      participants: 67,
      daysLeft: null
    },
    {
      id: 'comp-6',
      title: 'September Masters',
      status: 'Completed',
      statusColor: 'default',
      description: 'Monthly masters tournament for verified traders with positive track records.',
      prizePool: '$25,000',
      entryFee: 'Invite Only',
      participants: 100,
      daysLeft: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Competitions</h1>
          <p className="text-slate-500">Discover and join active trading tournaments</p>
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {competitions.map((comp) => (
          <Card key={comp.id} className="flex flex-col hover:border-blue-200 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge 
                  variant={comp.statusColor}
                  className={comp.statusColor === 'destructive' ? 'bg-red-500 animate-pulse' : ''}
                >
                  {comp.status}
                </Badge>
                {comp.daysLeft !== null && comp.daysLeft > 0 && (
                  <div className="flex items-center text-xs text-slate-500 font-medium">
                    <Clock className="h-3 w-3 mr-1" /> {comp.daysLeft}d left
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{comp.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mt-2">{comp.description}</p>
            </CardHeader>
            <CardContent className="pb-4 flex-1">
              <div className="bg-slate-50 rounded-lg p-3 flex justify-between items-center border border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Prize Pool</div>
                  <div className="font-bold text-blue-700 text-lg">{comp.prizePool}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Entry</div>
                  <div className="font-medium text-slate-900">{comp.entryFee}</div>
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-slate-600">
                <Users className="h-4 w-4 mr-2 text-slate-400" />
                <span>{comp.participants} Enrolled</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-slate-100 mt-4 px-6 pb-6 pt-4">
              {comp.status === 'Completed' ? (
                <Button variant="outline" className="w-full" disabled>
                  View Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Link href="/join" className="w-full">
                  <Button variant="primary" className="w-full">
                    Join Competition
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
