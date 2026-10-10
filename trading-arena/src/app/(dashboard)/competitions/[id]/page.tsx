import { ArrowLeft, Calendar, ShieldAlert, Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const instant = false;

function formatAccountType(value: string | null) {
  if (value === 'demo_only') return 'Demo Only';
  if (value === 'real_only') return 'Real Only';
  return 'Demo or Real';
}

export default async function CompetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: competition } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', id)
    .eq('is_public', true)
    .maybeSingle();

  const { count: participantCount } = await supabase
    .from('competition_entries')
    .select('id', { count: 'exact', head: true })
    .eq('competition_id', id);

  if (!competition) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Link href="/competitions" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Competitions
        </Link>
        <Card>
          <CardContent className="p-10 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Competition not found</h1>
            <p className="mt-2 text-slate-500">This competition is private, deleted, or has not been created yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link href="/competitions" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Competitions
      </Link>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="h-24 bg-slate-900" />
        <div className="px-6 pb-8 pt-6 sm:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge variant="primary">{competition.status ?? 'draft'}</Badge>
                <Badge variant="outline">{formatAccountType(competition.account_type)}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">{competition.name}</h1>
              <p className="mt-2 text-lg text-slate-600">{competition.description || 'No description provided.'}</p>
            </div>
            <Link href="/join" className="w-full md:w-auto">
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                Join Competition
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 md:grid-cols-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Trophy className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs text-slate-500">Prize Pool</p>
                <p className="font-bold">${Number(competition.prize_pool ?? 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500">Start</p>
                <p className="font-bold">{new Date(competition.start_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Users className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Participants</p>
                <p className="font-bold">{participantCount ?? 0}{competition.max_participants ? ` / ${competition.max_participants}` : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <ShieldAlert className="h-5 w-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Max Drawdown</p>
                <p className="font-bold">{competition.max_drawdown_pct ?? 0}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="py-10 text-center text-sm text-slate-500">
          Rankings will appear after traders connect real MT4/MT5 accounts and the sync service records snapshots.
        </CardContent>
      </Card>
    </div>
  );
}
