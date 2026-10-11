'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, Edit, Loader2, Users, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [copied, setCopied] = useState(false);

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    status: 'registration',
    account_type: 'demo_only',
    prize_pool: '',
    max_drawdown_pct: '',
    max_participants: '',
    start_date: '',
    end_date: '',
    registration_deadline: '',
    is_public: true,
  });

  const loadCompetition = (resolvedId: string) => {
    return Promise.all([
      fetch(`/api/wilson/competitions/${resolvedId}`).then((response) => (response.ok ? response.json() : null)),
      fetch(`/api/wilson/competitions/${resolvedId}/entries`).then((response) => (response.ok ? response.json() : [])),
    ]).then(([competitionData, entryData]) => {
      setCompetition(competitionData);
      setEntries(Array.isArray(entryData) ? entryData : []);
      if (competitionData) {
        setEditForm({
          name: competitionData.name || '',
          description: competitionData.description || '',
          status: competitionData.status || 'registration',
          account_type: competitionData.account_type || 'demo_only',
          prize_pool: String(competitionData.prize_pool ?? ''),
          max_drawdown_pct: String(competitionData.max_drawdown_pct ?? ''),
          max_participants: String(competitionData.max_participants ?? ''),
          start_date: competitionData.start_date ? new Date(competitionData.start_date).toISOString().split('T')[0] : '',
          end_date: competitionData.end_date ? new Date(competitionData.end_date).toISOString().split('T')[0] : '',
          registration_deadline: competitionData.registration_deadline
            ? new Date(competitionData.registration_deadline).toISOString().split('T')[0]
            : '',
          is_public: Boolean(competitionData.is_public),
        });
      }
    });
  };

  useEffect(() => {
    let mounted = true;

    params.then(({ id: resolvedId }) => {
      if (!mounted) return;
      setId(resolvedId);
      loadCompetition(resolvedId).finally(() => {
        if (mounted) setLoading(false);
      });
    });

    return () => {
      mounted = false;
    };
  }, [params]);

  const copyCode = () => {
    if (competition?.code) {
      navigator.clipboard.writeText(competition.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);

    try {
      const payload: Record<string, any> = {
        name: editForm.name,
        description: editForm.description || null,
        status: editForm.status,
        account_type: editForm.account_type,
        prize_pool: Number(editForm.prize_pool || 0),
        max_drawdown_pct: editForm.max_drawdown_pct ? Number(editForm.max_drawdown_pct) : null,
        max_participants: editForm.max_participants ? Number(editForm.max_participants) : null,
        is_public: editForm.is_public,
      };

      if (editForm.start_date) payload.start_date = new Date(editForm.start_date).toISOString();
      if (editForm.end_date) payload.end_date = new Date(editForm.end_date).toISOString();
      if (editForm.registration_deadline) {
        payload.registration_deadline = new Date(editForm.registration_deadline).toISOString();
      }

      const res = await fetch(`/api/wilson/competitions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to update competition' }));
        throw new Error(errorData.error || 'Failed to update competition');
      }

      const updated = await res.json();
      setCompetition(updated);
      setIsEditing(false);
    } catch (err: any) {
      setEditError(err.message || 'Error saving changes');
    } finally {
      setEditLoading(false);
    }
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
                <Badge variant={competition.status === 'active' ? 'success' : competition.status === 'registration' ? 'primary' : 'outline'}>
                  {competition.status}
                </Badge>
                <Badge variant={competition.is_public ? 'outline' : 'default'} className="text-xs">
                  {competition.is_public ? 'Public' : 'Private'}
                </Badge>
              </div>
              <button onClick={copyCode} className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600">
                <code className="rounded bg-slate-100 px-2 py-0.5">{competition.code}</code>
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                {copied && <span className="text-xs text-emerald-600">Copied!</span>}
              </button>
            </div>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit Competition
            </Button>
          </div>

          {/* Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="text-lg font-bold text-slate-900">Edit Competition Details</h2>
                  <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {editError && (
                  <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {editError}
                  </div>
                )}

                <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Name *</label>
                    <Input name="name" value={editForm.name} onChange={handleEditChange} required />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      rows={3}
                      className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Status</label>
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="draft">Draft</option>
                        <option value="registration">Registration</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Account Type</label>
                      <select
                        name="account_type"
                        value={editForm.account_type}
                        onChange={handleEditChange}
                        className="w-full rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="demo_only">Demo Only</option>
                        <option value="real_only">Real Only</option>
                        <option value="any">Both (Demo & Real)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Prize Pool ($)</label>
                      <Input name="prize_pool" type="number" min="0" value={editForm.prize_pool} onChange={handleEditChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Max Drawdown %</label>
                      <Input name="max_drawdown_pct" type="number" step="0.1" value={editForm.max_drawdown_pct} onChange={handleEditChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Max Traders</label>
                      <Input name="max_participants" type="number" min="0" value={editForm.max_participants} onChange={handleEditChange} placeholder="Unlimited" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Start Date</label>
                      <Input name="start_date" type="date" value={editForm.start_date} onChange={handleEditChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">End Date</label>
                      <Input name="end_date" type="date" value={editForm.end_date} onChange={handleEditChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Deadline</label>
                      <Input name="registration_deadline" type="date" value={editForm.registration_deadline} onChange={handleEditChange} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="is_public"
                      name="is_public"
                      checked={editForm.is_public}
                      onChange={handleEditChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="is_public" className="text-sm font-medium text-slate-700">
                      Publicly Visible (shows on public Competitions and Join page)
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={editLoading}>
                      {editLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                <h3 className="text-2xl font-bold">{competition.max_drawdown_pct ? `${competition.max_drawdown_pct}%` : 'None'}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-500">Account Requirement</p>
                <h3 className="text-lg font-bold capitalize">
                  {competition.account_type === 'demo_only' ? 'Demo Only' : competition.account_type === 'real_only' ? 'Real Only' : 'Demo or Real'}
                </h3>
              </CardContent>
            </Card>
          </div>

          {competition.description && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rules & Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{competition.description}</p>
              </CardContent>
            </Card>
          )}

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
                          <TableCell>{entry.current_equity ? `$${Number(entry.current_equity).toLocaleString()}` : 'Pending'}</TableCell>
                          <TableCell>{entry.net_gain_pct ? `${Number(entry.net_gain_pct).toFixed(2)}%` : '0.00%'}</TableCell>
                          <TableCell>
                            <Badge variant={entry.status === 'active' ? 'success' : 'outline'}>{entry.status ?? 'pending'}</Badge>
                          </TableCell>
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
