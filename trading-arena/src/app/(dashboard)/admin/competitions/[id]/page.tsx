'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { Copy, Users, Activity, TrendingUp, Clock, Search, Download, Ban } from 'lucide-react';

const mockComp = {
  id: '1',
  name: 'November Challenge',
  code: 'TR-NOV-23X',
  status: 'active',
  description: 'A monthly challenge for pro traders.',
  accountType: 'Demo Only',
  prizePool: 5000,
  maxParticipants: 500,
  enrolled: 145,
  startDate: '2023-11-01',
  endDate: '2023-11-30',
  registrationDeadline: '2023-11-05',
  maxDrawdown: 5.0,
  isPublic: true,
};

const mockParticipants = Array.from({ length: 15 }).map((_, i) => ({
  id: `p${i}`,
  rank: i + 1,
  name: `Trader ${i + 1}`,
  username: `trader_${i + 1}`,
  platform: i % 2 === 0 ? 'MT4' : 'MT5',
  accountLogin: `100${Math.floor(Math.random() * 10000)}`,
  balance: 10000 + (Math.random() * 5000) - 1000,
  equity: 10000 + (Math.random() * 5500) - 1000,
  gain: (Math.random() * 20) - 5,
  trades: Math.floor(Math.random() * 100),
  winRate: 40 + (Math.random() * 40),
  status: Math.random() > 0.1 ? 'active' : 'disqualified'
})).sort((a, b) => b.gain - a.gain).map((p, i) => ({ ...p, rank: i + 1 }));

export default function AdminCompetitionDetailPage() {
  const [activeTab, setActiveTab] = useState('details');
  const [disqualifyModalOpen, setDisqualifyModalOpen] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'registration': return <Badge className="bg-yellow-100 text-yellow-800">Registration</Badge>;
      case 'draft': return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case 'completed': return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(mockComp.code);
    alert('Copied to clipboard');
  };

  const handleDisqualify = () => {
    setDisqualifyModalOpen(false);
    alert(`Disqualified ${selectedTrader?.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{mockComp.name}</h1>
            {getStatusBadge(mockComp.status)}
          </div>
          <div className="flex items-center mt-2 text-sm text-slate-600 gap-2">
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{mockComp.code}</span>
            <button onClick={copyCode} className="hover:text-blue-600 p-1">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Advance Status</Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">Cancel Competition</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-lg"><Users className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Enrolled Traders</p>
              <h3 className="text-2xl font-bold">{mockComp.enrolled}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-700 rounded-lg"><TrendingUp className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Gain</p>
              <h3 className="text-2xl font-bold">4.2%</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-lg"><Activity className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Syncs</p>
              <h3 className="text-2xl font-bold">138</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-700 rounded-lg"><Clock className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Days Remaining</p>
              <h3 className="text-2xl font-bold">14</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3 bg-transparent shadow-none">Details</TabsTrigger>
          <TabsTrigger value="participants" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3 bg-transparent shadow-none">Participants</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Edit Competition</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {/* Same form fields as create page, but pre-filled */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Competition Name</label>
                      <Input defaultValue={mockComp.name} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Code</label>
                      <Input defaultValue={mockComp.code} disabled />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search participants..." className="pl-9" />
                  </div>
                  <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Trader</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Login</TableHead>
                        <TableHead>Equity</TableHead>
                        <TableHead>Gain %</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockParticipants.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-bold text-slate-700">#{p.rank}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-xs text-slate-500">@{p.username}</p>
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="outline">{p.platform}</Badge></TableCell>
                          <TableCell className="font-mono text-sm">{p.accountLogin}</TableCell>
                          <TableCell>${p.equity.toFixed(2)}</TableCell>
                          <TableCell className={p.gain >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {p.gain > 0 ? '+' : ''}{p.gain.toFixed(2)}%
                          </TableCell>
                          <TableCell>
                            {p.status === 'active' 
                              ? <Badge className="bg-green-100 text-green-800">Active</Badge>
                              : <Badge className="bg-red-100 text-red-800">Disqualified</Badge>
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">Profile</Button>
                              {p.status === 'active' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                                  onClick={() => {
                                    setSelectedTrader(p);
                                    setDisqualifyModalOpen(true);
                                  }}
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {disqualifyModalOpen && (
        <Modal 
          isOpen={disqualifyModalOpen} 
          onClose={() => setDisqualifyModalOpen(false)}
          title="Disqualify Participant"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to disqualify <strong>{selectedTrader?.name}</strong>? This action cannot be undone.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Disqualification</label>
              <textarea 
                className="w-full min-h-[100px] border rounded p-2 text-sm"
                placeholder="e.g. Max drawdown exceeded, violated rules..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDisqualifyModalOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDisqualify}>Confirm Disqualification</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
