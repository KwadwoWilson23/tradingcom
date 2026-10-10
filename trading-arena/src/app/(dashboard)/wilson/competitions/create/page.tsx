'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function CreateCompetitionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accountType: 'demo_only',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    prizePool: '',
    maxParticipants: '',
    maxDrawdown: '',
    isPublic: true,
  });

  const generatedCode = useMemo(() => {
    if (formData.name) {
      const code = formData.name.substring(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, '');
      const suffix = formData.name
        .split('')
        .reduce((total, char) => total + char.charCodeAt(0), 0)
        .toString()
        .padStart(4, '0')
        .slice(-4);
      return `TR-${code.padEnd(4, 'X')}-${suffix}`;
    }

    return 'TR-XXXX-XXXX';
  }, [formData.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError(null);

      const response = await fetch('/api/admin/competitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: generatedCode,
          name: formData.name,
          description: formData.description || null,
          account_type: formData.accountType,
          start_date: new Date(formData.startDate).toISOString(),
          end_date: new Date(formData.endDate).toISOString(),
          registration_deadline: formData.registrationDeadline ? new Date(formData.registrationDeadline).toISOString() : null,
          prize_pool: Number(formData.prizePool || 0),
          max_participants: formData.maxParticipants ? Number(formData.maxParticipants) : null,
          max_drawdown_pct: formData.maxDrawdown ? Number(formData.maxDrawdown) : null,
          is_public: formData.isPublic,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: 'Failed to create competition' }));
        throw new Error(body.error || 'Failed to create competition');
      }

      router.push('/wilson/competitions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create competition');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Create New Competition</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Competition Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Competition Name *</label>
                <Input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. November Pro Challenge" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Auto-Generated Code</label>
                <div className="h-10 px-3 py-2 bg-slate-100 border border-slate-200 rounded-md font-mono text-slate-600 flex items-center">
                  {generatedCode}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the rules and details of this competition..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Account Type *</label>
                <select 
                  name="accountType" 
                  value={formData.accountType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  required
                >
                  <option value="demo_only">Demo Only</option>
                  <option value="real_only">Real Only</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Prize Pool (USD) *</label>
                <Input 
                  name="prizePool" 
                  type="number" 
                  min="0"
                  value={formData.prizePool} 
                  onChange={handleChange} 
                  placeholder="e.g. 5000" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Max Participants</label>
                <Input 
                  name="maxParticipants" 
                  type="number" 
                  min="0"
                  value={formData.maxParticipants} 
                  onChange={handleChange} 
                  placeholder="Leave empty for unlimited" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Start Date *</label>
                <Input 
                  name="startDate" 
                  type="date" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">End Date *</label>
                <Input 
                  name="endDate" 
                  type="date" 
                  value={formData.endDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Registration Deadline *</label>
                <Input 
                  name="registrationDeadline" 
                  type="date" 
                  value={formData.registrationDeadline} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Max Drawdown %</label>
                <Input 
                  name="maxDrawdown" 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.maxDrawdown} 
                  onChange={handleChange} 
                  placeholder="e.g. 5.0" 
                />
              </div>
              <div className="flex items-center h-full pt-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      name="isPublic"
                      className="sr-only" 
                      checked={formData.isPublic}
                      onChange={handleChange}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublic ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublic ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {formData.isPublic ? 'Publicly Visible' : 'Hidden / Private'}
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end gap-3">
              <Link href="/wilson/competitions">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Competition
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

