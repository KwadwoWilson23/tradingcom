'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

const allMockCompetitions = [
  { id: '1', name: 'November Challenge', code: 'TR-NOV-23X', status: 'active', accountType: 'Demo Only', prizePool: 5000, maxParticipants: 500, enrolled: 145, startDate: '2023-11-01', endDate: '2023-11-30' },
  { id: '2', name: 'December Sprint', code: 'TR-DEC-23Y', status: 'registration', accountType: 'Real Only', prizePool: 10000, maxParticipants: 200, enrolled: 45, startDate: '2023-12-01', endDate: '2023-12-15' },
  { id: '3', name: 'Q4 Pro Series', code: 'TR-Q4P-23Z', status: 'draft', accountType: 'Any', prizePool: 20000, maxParticipants: null, enrolled: 0, startDate: '2023-12-15', endDate: '2024-01-15' },
  { id: '4', name: 'October Classic', code: 'TR-OCT-23W', status: 'completed', accountType: 'Demo Only', prizePool: 2500, maxParticipants: 300, enrolled: 210, startDate: '2023-10-01', endDate: '2023-10-31' },
  { id: '5', name: 'Weekend Warrior', code: 'TR-WKND-23V', status: 'active', accountType: 'Any', prizePool: 1000, maxParticipants: 100, enrolled: 85, startDate: '2023-11-10', endDate: '2023-11-12' },
  { id: '6', name: 'Forex Titans', code: 'TR-FXT-23A', status: 'cancelled', accountType: 'Real Only', prizePool: 15000, maxParticipants: 50, enrolled: 12, startDate: '2023-11-20', endDate: '2023-12-20' },
  { id: '7', name: 'Beginner Bash', code: 'TR-BEG-23B', status: 'completed', accountType: 'Demo Only', prizePool: 500, maxParticipants: 1000, enrolled: 980, startDate: '2023-09-01', endDate: '2023-09-30' },
  { id: '8', name: 'Crypto Clash', code: 'TR-CRY-23C', status: 'draft', accountType: 'Any', prizePool: 5000, maxParticipants: 500, enrolled: 0, startDate: '2024-01-01', endDate: '2024-01-31' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    case 'registration': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Registration</Badge>;
    case 'draft': return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
    case 'completed': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
    case 'cancelled': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export default function AdminCompetitionsPage() {
  const [filter, setFilter] = useState('all');

  const filteredComps = filter === 'all' 
    ? allMockCompetitions 
    : allMockCompetitions.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Manage Competitions</h1>
        <Link href="/admin/competitions/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Competition
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <Tabs defaultValue="all" onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="registration">Registration</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Prize Pool</TableHead>
                  <TableHead>Enrolled / Max</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComps.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell>
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-700 font-mono">{comp.code}</code>
                    </TableCell>
                    <TableCell className="font-medium">{comp.name}</TableCell>
                    <TableCell>{getStatusBadge(comp.status)}</TableCell>
                    <TableCell className="text-sm text-slate-600">{comp.accountType}</TableCell>
                    <TableCell className="text-sm font-medium">${comp.prizePool.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">
                      {comp.enrolled} {comp.maxParticipants ? `/ ${comp.maxParticipants}` : ''}
                    </TableCell>
                    <TableCell className="text-sm">{new Date(comp.startDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm">{new Date(comp.endDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/competitions/${comp.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/competitions/${comp.id}?tab=details`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t flex items-center justify-between text-sm text-slate-500">
            <div>Showing {filteredComps.length} competitions</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
