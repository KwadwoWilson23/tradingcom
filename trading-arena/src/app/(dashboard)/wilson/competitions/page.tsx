'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Eye, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Competition, CompetitionStatus } from '@/types/database';

const statuses: Array<'all' | CompetitionStatus> = ['all', 'draft', 'registration', 'active', 'completed', 'cancelled'];

export default function WilsonCompetitionsPage() {
  const [filter, setFilter] = useState<'all' | CompetitionStatus>('all');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch('/api/wilson/competitions')
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Competition[]) => {
        if (mounted) setCompetitions(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setCompetitions([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCompetitions = useMemo(
    () => filter === 'all' ? competitions : competitions.filter((competition) => competition.status === filter),
    [competitions, filter]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manage Competitions</h1>
        <Link href="/wilson/competitions/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Competition
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-4">
            <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | CompetitionStatus)}>
              <TabsList>
                {statuses.map((status) => (
                  <TabsTrigger key={status} value={status}>
                    {status === 'all' ? 'All' : status}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="p-8 text-center text-sm text-slate-500">Loading competitions...</div>
          ) : filteredCompetitions.length === 0 ? (
            <div className="p-10 text-center">
              <h2 className="text-lg font-semibold text-slate-900">No competitions found</h2>
              <p className="mt-2 text-sm text-slate-500">Create a competition and it will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Account Type</TableHead>
                    <TableHead>Prize Pool</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompetitions.map((competition) => (
                    <TableRow key={competition.id}>
                      <TableCell><code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{competition.code}</code></TableCell>
                      <TableCell className="font-medium">{competition.name}</TableCell>
                      <TableCell><Badge variant="outline">{competition.status}</Badge></TableCell>
                      <TableCell className="text-sm text-slate-600">{competition.account_type}</TableCell>
                      <TableCell className="text-sm font-medium">${Number(competition.prize_pool ?? 0).toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{new Date(competition.start_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm">{new Date(competition.end_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/wilson/competitions/${competition.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
