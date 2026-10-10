'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { Search, Shield, User as UserIcon } from 'lucide-react';

const mockUsers = Array.from({ length: 10 }).map((_, i) => ({
  id: `u${i}`,
  name: `User ${i + 1}`,
  username: `user_${i + 1}`,
  email: `user${i + 1}@example.com`,
  competitions: Math.floor(Math.random() * 10),
  isAdmin: i === 0 || i === 3,
  joinedDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

export default function AdminUsersPage() {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = filter === 'admins' 
    ? mockUsers.filter(u => u.isAdmin)
    : mockUsers;

  const handleToggleAdmin = () => {
    setModalOpen(false);
    alert(`Changed admin status for ${selectedUser?.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                className={filter === 'all' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                onClick={() => setFilter('all')}
              >
                All Users
              </Button>
              <Button 
                variant={filter === 'admins' ? 'default' : 'outline'}
                className={filter === 'admins' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                onClick={() => setFilter('admins')}
              >
                Admins Only
              </Button>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search users by name or email..." className="pl-9" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Comps Entered</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <UserIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-slate-500">@{user.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{user.email}</TableCell>
                    <TableCell>{user.competitions}</TableCell>
                    <TableCell>
                      {user.isAdmin 
                        ? <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100"><Shield className="w-3 h-3 mr-1" /> Admin</Badge>
                        : <Badge variant="outline">User</Badge>
                      }
                    </TableCell>
                    <TableCell className="text-sm">{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">View Profile</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setModalOpen(true);
                          }}
                        >
                          Toggle Admin
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t flex items-center justify-between text-sm text-slate-500">
            <div>Showing {filteredUsers.length} users</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {modalOpen && (
        <Modal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)}
          title="Confirm Role Change"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to {selectedUser?.isAdmin ? 'remove admin privileges from' : 'grant admin privileges to'} <strong>{selectedUser?.name}</strong>?
            </p>
            {selectedUser?.isAdmin ? (
              <p className="text-sm text-amber-600 p-3 bg-amber-50 rounded border border-amber-200">
                This user will lose access to the admin dashboard and all administrative actions.
              </p>
            ) : (
              <p className="text-sm text-blue-600 p-3 bg-blue-50 rounded border border-blue-200">
                This user will gain full access to the admin dashboard and can manage competitions, users, and platform settings.
              </p>
            )}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleToggleAdmin} className="bg-blue-600 hover:bg-blue-700">Confirm Change</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
