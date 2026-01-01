import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ManageAgreements() {
  const agreements = await prisma.agreement.findMany({
    include: { user: true, template: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900">All Agreements</h2>
        <p className="text-slate-500 font-medium">Monitor all generated legal documents.</p>
      </div>

      <div className="overflow-hidden border-2 border-slate-100 rounded-[2.5rem] bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b-2 border-slate-100">
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Document</th>
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">User</th>
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Status</th>
              <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-50">
            {agreements.map((agreement) => (
              <tr key={agreement.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-slate-900">{agreement.template.title}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-slate-600 font-medium">{agreement.user.name}</td>
                <td className="px-10 py-8">
                  <Badge className={agreement.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                    {agreement.status}
                  </Badge>
                </td>
                <td className="px-10 py-8 text-slate-400 font-bold text-sm">
                  {new Date(agreement.createdAt).toLocaleDateString('en-GB')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
