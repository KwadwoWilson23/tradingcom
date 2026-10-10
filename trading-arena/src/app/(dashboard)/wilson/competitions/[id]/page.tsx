'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Competition, CompetitionEntry } from '@/types/database';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function WilsonCompetitionDetailPage({ params }: PageProps) {
  const [id, setId] = useState('');
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [entries, setEntries] = useState<CompetitionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    params.then(({ id: resolvedId }) => {
      if (!mounted) return;
      setId(resolvedId);

      Promise.all([
        fetch(`/api/admin/competitions/${resolvedId}`).then((response) => (response.ok ? response.json() : null)),
        fetch(`/api/admin/competitions/${resolvedId}/entries`).then((response) => (response.ok ? response.json() : [])),
      ])
        .then(([competitionData, entryData]) => {
          if (!mounted) return;
          setCompetition(competitionData);
          setEntries(Array.isArray(entryData) ? entryData : []);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    });

    return () => {
      mounted = false;
    };
  }, [params]);

  const copyCode = () => {
    if (competition?.code) navigator.clipboard.writeText(competition.code);
  };

  return (
    <div className="space-y-6">
      <Link href="/wilson/competitions" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Competitions
      </Link>

      {loading ? (
        <Card>
          <CardContent className="p-8 text-center text-sm text-slate-500">Loading competition...</CardContent>
        </Card>
      ) : !competition ? (
        <Card>
          <CardContent className="p-10 text-center">
            <h1 className="text-xl font-bold text-slate-900">Competition not found</h1>
            <p className="mt-2 text-sm text-slate-500">No real competition exists for this ID: {id}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{competition.name}</h1>
                <Badge variant="outline">{competition.status}</Badge>
              </div>
              <button onClick={copyCode} className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600">
                <code className="rounded bg-slate-100 px-2 py-0.5">{competition.code}</code>
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <Button variant="outline" disabled>Editing coming next</Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-700"><Users className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Enrolled Traders</p>
                  <h3 className="text-2xl font-bold">{entries.length}</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-500">Prize Pool</p>
                <h3 className="text-2xl font-bold">${Number(competition.prize_pool ?? 0).toLocaleString()}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-500">Max Drawdown</p>
                <h3 className="text-2xl font-bold">{competition.max_drawdown_pct ?? 0}%</h3>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-500">No real participants have joined this competition yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Login</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Equity</TableHead>
                        <TableHead>Gain %</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.rank ?? 'Pending'}</TableCell>
                          <TableCell className="font-mono text-sm">{entry.account_login ?? 'Not connected'}</TableCell>
                          <TableCell>{entry.platform ?? 'Pending'}</TableCell>
                          <TableCell>{entry.current_equity ?? 'Pending'}</TableCell>
                          <TableCell>{entry.net_gain_pct ?? 'Pending'}</TableCell>
                          <TableCell>{entry.status ?? 'pending'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
