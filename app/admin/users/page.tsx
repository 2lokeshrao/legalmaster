import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ManageUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900">User Management</h2>
        <p className="text-slate-500 font-medium">View and manage registered users.</p>
      </div>

      <div className="overflow-hidden border-2 border-slate-100 rounded-[2.5rem] bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b-2 border-slate-100">
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">User</th>
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Email</th>
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Role</th>
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-slate-600 font-medium">{user.email}</td>
                <td className="px-10 py-8">
                  <Badge className={user.role === 'ADMIN' ? 'bg-slate-900' : 'bg-blue-100 text-blue-700'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-10 py-8 text-slate-400 font-bold text-sm">
                  {new Date(user.createdAt).toLocaleDateString('en-GB')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
