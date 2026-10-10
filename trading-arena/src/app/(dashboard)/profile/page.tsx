'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">Profile Settings</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2 text-center">
            <div className="mb-4 flex justify-center">
              <Avatar className="h-24 w-24 bg-blue-100 text-2xl text-blue-700" initials={username || 'U'} />
            </div>
            <CardTitle className="text-xl">{displayName || 'No display name set'}</CardTitle>
            <CardDescription>{username ? `@${username}` : 'No username set'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center text-slate-600">
                <Mail className="mr-3 h-4 w-4 text-slate-400" />
                Sign in to load profile email
              </div>
              <div className="flex items-center text-slate-600">
                <User className="mr-3 h-4 w-4 text-slate-400" />
                Profile data loads from Supabase
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your public profile details once account persistence is connected.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Display Name</label>
                <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Username</label>
                <Input value={username} onChange={(event) => setUsername(event.target.value)} disabled={!isEditing} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-2 justify-end border-t border-slate-100 pt-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Connected Trading Accounts</CardTitle>
          <CardDescription>Real MT4/MT5 account connections will appear here after joining a competition.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 p-8 text-center">
            <AlertTriangle className="mb-3 h-8 w-8 text-slate-300" />
            <h3 className="font-semibold text-slate-900">No connected accounts</h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">Connect a real investor-password account from the join page.</p>
            <Link href="/join">
              <Button variant="primary" className="mt-5">Connect Account</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competition History</CardTitle>
          <CardDescription>Real competition history will appear after entries are created and completed.</CardDescription>
        </CardHeader>
        <CardContent className="py-10 text-center text-sm text-slate-500">
          No real competition history yet.
        </CardContent>
      </Card>
    </div>
  );
}
