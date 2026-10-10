import { Calendar, Users, Trophy, ShieldAlert, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const instant = false;

export default async function CompetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock data based on ID (normally would fetch)
  const isJoined = id === 'comp-1'; // Assume we're joined to comp-1

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link href="/competitions" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-2">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Competitions
      </Link>
      
      {/* Header section */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="h-32 bg-slate-900 w-full relative">
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Badge variant="destructive" className="bg-red-500">Live Now</Badge>
            <Badge variant="outline" className="text-white border-white/20 bg-white/10">MT5 Only</Badge>
          </div>
        </div>
        
        <div className="px-6 sm:px-10 pb-10 pt-6 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Global Forex Championship Q4</h1>
              <p className="text-slate-600 text-lg">The premier quarterly trading competition for seasoned professionals. Trade major forex pairs and metals with strict risk management.</p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              {isJoined ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 w-full md:w-64 text-center">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Your Standing</p>
                  <p className="text-3xl font-black text-blue-600">#4 <span className="text-sm font-normal text-slate-500">/ 248</span></p>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full mt-3 h-8 text-xs">View Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <Link href="/join">
                  <Button variant="primary" size="lg" className="w-full md:w-auto text-lg px-8 py-6 h-auto shadow-md">
                    Join Competition
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center space-x-3 text-slate-700">
              <Trophy className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-slate-500">Prize Pool</p>
                <p className="font-bold text-lg">$50,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-700">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="font-bold">Oct 1 - Oct 31</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-700">
              <Users className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Participants</p>
                <p className="font-bold">248 / 500</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-700">
              <div className="h-5 w-5 rounded-full border-2 border-slate-400 flex items-center justify-center font-bold text-[10px] text-slate-400">$</div>
              <div>
                <p className="text-xs text-slate-500">Entry Fee</p>
                <p className="font-bold">Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Rules */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg"><ShieldAlert className="mr-2 h-5 w-5 text-slate-600" /> Rules & Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-slate-900">Maximum Daily Drawdown: 10%</h4>
                  <p className="text-xs text-slate-500">Calculated based on equity at the start of the day.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-slate-900">Maximum Overall Drawdown: 20%</h4>
                  <p className="text-xs text-slate-500">Account will be disqualified if equity drops 20% below initial balance.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-slate-900">Minimum Trades: 10</h4>
                  <p className="text-xs text-slate-500">You must execute at least 10 trades during the competition period.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-slate-900">EA / Bots Allowed</h4>
                  <p className="text-xs text-slate-500">Automated trading strategies are permitted.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prize Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-100">
                  <span className="font-bold text-yellow-800">1st Place</span>
                  <span className="font-bold text-yellow-900">$25,000 + Funded Acc</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-100 rounded border border-slate-200">
                  <span className="font-bold text-slate-700">2nd Place</span>
                  <span className="font-bold text-slate-900">$10,000</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded border border-orange-100">
                  <span className="font-bold text-orange-800">3rd Place</span>
                  <span className="font-bold text-orange-900">$5,000</span>
                </div>
                <div className="flex justify-between items-center p-2 text-sm text-slate-600 border-b border-slate-100">
                  <span>4th - 10th Place</span>
                  <span className="font-medium">$1,000 each</span>
                </div>
                <div className="flex justify-between items-center p-2 text-sm text-slate-600">
                  <span>11th - 20th Place</span>
                  <span className="font-medium">$300 each</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Mini Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Current Top 10</CardTitle>
                <CardDescription>Live standings as of just now</CardDescription>
              </div>
              <Link href="/leaderboard">
                <Button variant="ghost" size="sm" className="text-blue-600">Full Leaderboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">Rank</TableHead>
                    <TableHead>Trader</TableHead>
                    <TableHead className="text-right">% Gain</TableHead>
                    <TableHead className="text-right">Win Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { rank: 1, name: 'Michael Chen', user: '@algo_mike', gain: '+32.8%', wr: '81%' },
                    { rank: 2, name: 'Sarah Jenkins', user: '@pips_queen', gain: '+24.5%', wr: '72%' },
                    { rank: 3, name: 'David Smith', user: '@dsmith_fx', gain: '+21.2%', wr: '64%' },
                    { rank: 4, name: 'Your Name', user: '@your_username', gain: '+18.42%', wr: '68%', isUser: true },
                    { rank: 5, name: 'Elena R.', user: '@elena_trade', gain: '+17.9%', wr: '59%' },
                    { rank: 6, name: 'James W.', user: '@jwilson', gain: '+16.5%', wr: '62%' },
                    { rank: 7, name: 'Ahmed K.', user: '@ak_trader', gain: '+15.2%', wr: '55%' },
                  ].map((trader) => (
                    <TableRow key={trader.rank} className={trader.isUser ? 'bg-blue-50/40 border-l-2 border-l-blue-600' : ''}>
                      <TableCell className="text-center font-bold text-slate-700">{trader.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6 text-[10px]">{trader.name.substring(0,2).toUpperCase()}</Avatar>
                          <div className="text-sm font-medium text-slate-900">{trader.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-600">{trader.gain}</TableCell>
                      <TableCell className="text-right text-slate-600 text-sm">{trader.wr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
