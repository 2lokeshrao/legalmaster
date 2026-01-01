import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BadgeCheck, Clock, ArrowRight, Gavel, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DocumentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const agreements = await prisma.agreement.findMany({
    where: { userId: session.user.id },
    include: { template: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-2">
            <ShieldCheck className="h-3 w-3" />
            Secure Document Vault
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Documents</h1>
          <p className="text-slate-500 font-medium text-lg">View and manage all your court-ready legal agreements.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all hover:scale-105">
          <Link href="/dashboard/create">
            Create New Agreement
          </Link>
        </Button>
      </div>

      {agreements.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50 rounded-[3rem]">
          <CardContent className="py-24 text-center">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm w-fit mx-auto mb-8">
              <FileText className="h-16 w-16 text-slate-300" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">No documents found</h3>
            <p className="text-slate-500 mt-2 font-medium text-lg max-w-sm mx-auto">You haven't created any legal agreements yet. Start your first one today.</p>
            <Button asChild className="mt-10 bg-blue-600 h-14 px-10 rounded-2xl font-bold text-lg shadow-xl">
              <Link href="/dashboard/create">Create Your First Agreement</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agreements.map((agreement) => (
            <Card key={agreement.id} className="rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-600 transition-all duration-500 group hover:shadow-2xl hover:shadow-blue-100 overflow-hidden">
              <CardHeader className="p-10 pb-4">
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <Gavel className="h-7 w-7" />
                  </div>
                  <Badge 
                    className={`rounded-full px-3 py-1 font-bold text-xs uppercase tracking-widest ${agreement.status === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}`}
                  >
                    {agreement.status === 'Paid' ? 'Completed' : 'Draft'}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{agreement.template.title}</CardTitle>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mt-3">
                  <Clock className="h-4 w-4" /> {new Date(agreement.createdAt).toLocaleDateString('en-GB')}
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-4">
                <Button asChild className="w-full h-14 rounded-2xl font-bold bg-slate-900 group-hover:bg-blue-600 transition-all shadow-lg">
                  <Link href={`/dashboard/edit/${agreement.id}`}>
                    Manage Document <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
