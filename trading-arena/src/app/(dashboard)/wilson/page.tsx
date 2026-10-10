'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, Plus, Trophy, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatCard } from '@/components/ui/stat-card';
import type { Competition } from '@/types/database';

export default function WilsonDashboardPage() {
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

  const activeCount = useMemo(
    () => competitions.filter((competition) => competition.status === 'active').length,
    [competitions]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Wilson Portal</h1>
        <Link href="/wilson/competitions/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Competition
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Total Competitions" value={loading ? '...' : competitions.length} icon={<Trophy className="h-5 w-5" />} />
        <StatCard title="Active Competitions" value={loading ? '...' : activeCount} icon={<Activity className="h-5 w-5" />} />
        <StatCard title="Registered Traders" value="Live after sync" icon={<Users className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Competitions</CardTitle>
          <Link href="/wilson/competitions">
            <Button variant="link" className="p-0 text-blue-600">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-500">Loading competitions...</div>
          ) : competitions.length === 0 ? (
            <div className="py-10 text-center">
              <h2 className="text-lg font-semibold text-slate-900">No competitions yet</h2>
              <p className="mt-2 text-sm text-slate-500">Create your first real competition to populate this dashboard.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitions.slice(0, 5).map((competition) => (
                    <TableRow key={competition.id}>
                      <TableCell className="font-medium">{competition.name}</TableCell>
                      <TableCell><code className="rounded bg-slate-100 px-2 py-1 text-xs">{competition.code}</code></TableCell>
                      <TableCell>{competition.status}</TableCell>
                      <TableCell>{new Date(competition.start_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(competition.end_date).toLocaleDateString()}</TableCell>
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
