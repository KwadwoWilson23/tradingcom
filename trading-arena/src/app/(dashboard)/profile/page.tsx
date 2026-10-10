'use client';

import { useState } from 'react';
import { User, Mail, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('Your Name');
  const [username, setUsername] = useState('your_username');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24 text-2xl bg-blue-100 text-blue-700">YN</Avatar>
            </div>
            <CardTitle className="text-xl">{displayName}</CardTitle>
            <CardDescription>@{username}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm mt-4">
              <div className="flex items-center text-slate-600">
                <Mail className="h-4 w-4 mr-3 text-slate-400" />
                name@example.com
              </div>
              <div className="flex items-center text-slate-600">
                <User className="h-4 w-4 mr-3 text-slate-400" />
                Member since Oct 2024
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your public profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Display Name</label>
                <Input 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Username</label>
                <Input 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t border-slate-100 pt-6 mt-2">
            {isEditing ? (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setIsEditing(false)}>Save Changes</Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Trading Accounts</CardTitle>
          <CardDescription>Link your MT4/MT5 accounts to participate in competitions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50">
              <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 flex items-center">
                    MetaTrader 5 Account 
                    <Badge variant="success" className="ml-2 text-[10px]">Connected</Badge>
                  </h4>
                  <p className="text-sm text-slate-500">Broker: FTMO • Account: 1048572</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-slate-600">Disconnect</Button>
            </div>
            
            <div className="border border-slate-200 border-dashed rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                <div className="bg-slate-100 text-slate-400 p-2 rounded-lg">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">MetaTrader 4 Account</h4>
                  <p className="text-sm text-slate-500">No MT4 account currently linked.</p>
                </div>
              </div>
              <Button variant="primary" size="sm">Connect Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competition History */}
      <Card>
        <CardHeader>
          <CardTitle>Competition History</CardTitle>
          <CardDescription>Your past performance across all tournaments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competition</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Final Rank</TableHead>
                <TableHead className="text-right">% Gain</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Global Forex Championship Q4</TableCell>
                <TableCell className="text-slate-500">Oct 2024</TableCell>
                <TableCell>#4 <span className="text-xs text-slate-400">/ 248</span></TableCell>
                <TableCell className="text-right font-medium text-green-600">+18.42%</TableCell>
                <TableCell className="text-right">
                  <Badge variant="destructive" className="bg-red-500">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">September Masters</TableCell>
                <TableCell className="text-slate-500">Sep 2024</TableCell>
                <TableCell>#12 <span className="text-xs text-slate-400">/ 100</span></TableCell>
                <TableCell className="text-right font-medium text-green-600">+8.5%</TableCell>
                <TableCell className="text-right">
                  <Badge variant="default" className="bg-slate-200 text-slate-700">Completed</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Summer Trading Sprint</TableCell>
                <TableCell className="text-slate-500">Aug 2024</TableCell>
                <TableCell>#45 <span className="text-xs text-slate-400">/ 500</span></TableCell>
                <TableCell className="text-right font-medium text-red-600">-2.1%</TableCell>
                <TableCell className="text-right">
                  <Badge variant="default" className="bg-slate-200 text-slate-700">Completed</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
