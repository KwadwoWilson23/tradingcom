import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function WilsonUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <Shield className="mb-4 h-10 w-10 text-slate-300" />
          <h2 className="text-lg font-semibold text-slate-900">No mock users displayed</h2>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Connect this view to a service-role backed user API before showing real account records here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
