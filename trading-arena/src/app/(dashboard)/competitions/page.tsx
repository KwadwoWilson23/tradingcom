'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Competition, CompetitionStatus } from '@/types/database';

function statusVariant(status: CompetitionStatus | null): BadgeProps['variant'] {
  if (status === 'active') return 'success';
  if (status === 'registration' || status === 'draft') return 'primary';
  if (status === 'cancelled') return 'destructive';
  return 'outline';
}

function formatAccountType(value: Competition['account_type']) {
  if (value === 'demo_only') return 'Demo Only';
  if (value === 'real_only') return 'Real Only';
  return 'Demo or Real';
}

export default function CompetitionsPage() {
  const [filter, setFilter] = useState<'all' | CompetitionStatus>('all');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch('/api/competitions')
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

  const visibleCompetitions = useMemo(
    () => filter === 'all' ? competitions : competitions.filter((competition) => competition.status === filter),
    [competitions, filter]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">Competitions</h1>
          <p className="text-slate-500">Live competitions from your Supabase database.</p>
        </div>
        <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | CompetitionStatus)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-8 text-center text-slate-500">Loading competitions...</CardContent>
        </Card>
      ) : visibleCompetitions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <PlusCircle className="mb-4 h-10 w-10 text-slate-300" />
            <h2 className="text-lg font-semibold text-slate-900">No competitions configured yet</h2>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              Once a Wilson admin creates public competitions in Supabase, they will appear here automatically.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCompetitions.map((competition) => (
            <Card key={competition.id} className="flex flex-col hover:border-blue-200">
              <CardHeader className="pb-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <Badge variant={statusVariant(competition.status)}>{competition.status ?? 'draft'}</Badge>
                  {competition.end_date && (
                    <div className="flex items-center text-xs font-medium text-slate-500">
                      <Clock className="mr-1 h-3 w-3" />
                      Ends {new Date(competition.end_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{competition.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{competition.description || 'No description provided.'}</p>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs font-semibold uppercase text-slate-500">Prize Pool</div>
                      <div className="font-bold text-blue-700">${Number(competition.prize_pool ?? 0).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-slate-500">Account</div>
                      <div className="font-medium text-slate-900">{formatAccountType(competition.account_type)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-100 px-6 pb-6 pt-4">
                <Link href="/join" className="w-full">
                  <Button variant="primary" className="w-full">
                    Join Competition
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
