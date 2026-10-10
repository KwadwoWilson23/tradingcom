'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatCard } from '@/components/ui/stat-card';
import { Trophy, Users, DollarSign, Activity, Plus, Download, Eye, Edit } from 'lucide-react';

const mockCompetitions = [
  {
    id: '1',
    name: 'November Challenge',
    code: 'TR-NOV-23X',
    status: 'active',
    accountType: 'Demo Only',
    participants: 145,
    startDate: '2023-11-01',
    endDate: '2023-11-30',
  },
  {
    id: '2',
    name: 'December Sprint',
    code: 'TR-DEC-23Y',
    status: 'registration',
    accountType: 'Real Only',
    participants: 45,
    startDate: '2023-12-01',
    endDate: '2023-12-15',
  },
  {
    id: '3',
    name: 'Q4 Pro Series',
    code: 'TR-Q4P-23Z',
    status: 'draft',
    accountType: 'Any',
    participants: 0,
    startDate: '2023-12-15',
    endDate: '2024-01-15',
  },
  {
    id: '4',
    name: 'October Classic',
    code: 'TR-OCT-23W',
    status: 'completed',
    accountType: 'Demo Only',
    participants: 210,
    startDate: '2023-10-01',
    endDate: '2023-10-31',
  },
  {
    id: '5',
    name: 'Weekend Warrior',
    code: 'TR-WKND-23V',
    status: 'active',
    accountType: 'Any',
    participants: 85,
    startDate: '2023-11-10',
    endDate: '2023-11-12',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    case 'registration':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Registration</Badge>;
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
    case 'completed':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/users">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" /> View All Users
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Link href="/admin/competitions/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Create New Competition
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Competitions"
          value="24"
          icon={<Trophy className="h-5 w-5 text-blue-600" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Competitions"
          value="5"
          icon={<Activity className="h-5 w-5 text-green-600" />}
        />
        <StatCard
          title="Registered Traders"
          value="1,452"
          icon={<Users className="h-5 w-5 text-purple-600" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Revenue (Fees)"
          value="$12,450"
          icon={<DollarSign className="h-5 w-5 text-slate-600" />}
          trend={{ value: 2.5, isPositive: true }}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Competitions</CardTitle>
          <Link href="/admin/competitions">
            <Button variant="link" className="text-blue-600 p-0">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCompetitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-medium">{comp.name}</TableCell>
                    <TableCell>
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs">{comp.code}</code>
                    </TableCell>
                    <TableCell>{getStatusBadge(comp.status)}</TableCell>
                    <TableCell>{comp.accountType}</TableCell>
                    <TableCell>{comp.participants}</TableCell>
                    <TableCell>{new Date(comp.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(comp.endDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
