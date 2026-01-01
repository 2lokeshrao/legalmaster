import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FilePlus, 
  FileText, 
  Clock, 
  CheckCircle, 
  MoreVertical, 
  ExternalLink, 
  ArrowRight,
  Zap,
  ShieldCheck,
  AlertCircle,
  Mail,
  HelpCircle,
  Gavel,
  Scale
} from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const agreements = await prisma.agreement.findMany({
    where: { userId: session.user.id },
    include: { template: true },
    orderBy: { createdAt: 'desc' }
  });

  const pendingAgreements = agreements.filter(a => a.status === 'Draft');
  const completedAgreements = agreements.filter(a => a.status === 'Paid');

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-2">
            <Scale className="h-3 w-3" />
            Legal Dashboard
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {session.user.name}!</h1>
          <p className="text-slate-500 font-medium text-lg">Manage your court-ready legal documents and agreements.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 transition-all hover:scale-105">
          <Link href="/dashboard/create">
            <FilePlus className="mr-2 h-5 w-5" /> Create New Agreement
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-slate-900 border-none shadow-2xl shadow-slate-200 text-white overflow-hidden relative rounded-[2.5rem]">
          <CardHeader className="p-8 pb-2 relative z-10">
            <CardTitle className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">Quick Start</CardTitle>
            <CardDescription className="text-white text-2xl font-bold mt-2">New Document</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 relative z-10">
            <p className="text-slate-400 mb-8 font-medium text-base leading-relaxed">Generate a legally valid agreement in just 5 minutes.</p>
            <Button asChild variant="secondary" className="w-full h-12 rounded-xl font-bold text-slate-900 hover:bg-white transition-all">
              <Link href="/dashboard/create">
                Start Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
          <Gavel className="absolute -bottom-6 -right-6 h-40 w-40 text-white/5 rotate-12" />
        </Card>

        <Card className="border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] group">
          <CardHeader className="p-8 pb-2">
            <CardTitle className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Total Documents</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="flex items-end gap-3">
              <div className="text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{agreements.length}</div>
              <div className="text-slate-400 font-bold mb-1.5 text-lg">Files</div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-black text-green-600 bg-green-50 w-fit px-4 py-1.5 rounded-full">
              <CheckCircle className="h-4 w-4" /> {completedAgreements.length} Completed
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] group">
          <CardHeader className="p-8 pb-2">
            <CardTitle className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="flex items-end gap-3">
              <div className="text-5xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">{pendingAgreements.length}</div>
              <div className="text-slate-400 font-bold mb-1.5 text-lg">Drafts</div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-black text-amber-600 bg-amber-50 w-fit px-4 py-1.5 rounded-full">
              <Clock className="h-4 w-4" /> Requires Attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Documents</h2>
          <Button variant="ghost" size="sm" asChild className="font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl px-4">
            <Link href="/dashboard/documents">View All Documents</Link>
          </Button>
        </div>

        {agreements.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50 rounded-[3rem]">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm mb-8">
                  <FileText className="h-16 w-16 text-slate-300" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">No documents yet</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2 font-medium text-lg">
                  Start by creating your first legal agreement. It only takes a few minutes.
                </p>
                <Button asChild className="mt-10 bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-2xl font-bold text-lg shadow-xl">
                  <Link href="/dashboard/create">Create First Agreement</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden border-2 border-slate-100 rounded-[2.5rem] bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b-2 border-slate-100">
                    <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Document Name</th>
                    <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Status</th>
                    <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Created Date</th>
                    <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Mode</th>
                    <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {agreements.map((agreement) => (
                    <tr key={agreement.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <Gavel className="h-6 w-6" />
                          </div>
                          <span className="font-bold text-xl text-slate-900">{agreement.template.title}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <Badge 
                          className={`rounded-full px-4 py-1.5 font-black text-xs uppercase tracking-widest ${agreement.status === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}`}
                        >
                          {agreement.status === 'Paid' ? 'Completed' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-10 py-8 text-slate-500 font-bold">
                        {new Date(agreement.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2 text-slate-600 font-black text-xs uppercase tracking-widest">
                          {agreement.inviteMode ? (
                            <><Zap className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" /> Invite</>
                          ) : (
                            <><ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Self</>
                          )}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <Button variant="ghost" size="sm" asChild className="rounded-xl font-black text-blue-600 hover:bg-blue-50 h-12 px-6">
                          <Link href={`/dashboard/edit/${agreement.id}`}>
                            Manage <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6">
              {agreements.map((agreement) => (
                <Card key={agreement.id} className="rounded-[2rem] border-2 border-slate-100 shadow-sm">
                  <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <Gavel className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">{agreement.template.title}</CardTitle>
                    </div>
                    <Badge 
                      className={`rounded-full font-black text-[10px] uppercase tracking-widest ${agreement.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                    >
                      {agreement.status === 'Paid' ? 'Done' : 'Draft'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex justify-between text-sm font-bold text-slate-400 mb-8 mt-4">
                      <span>{new Date(agreement.createdAt).toLocaleDateString('en-GB')}</span>
                      <span className="flex items-center gap-1 uppercase tracking-widest text-xs">
                        {agreement.inviteMode ? 'Invite Mode' : 'Self Fill'}
                      </span>
                    </div>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 h-14 rounded-2xl font-bold text-lg shadow-lg" asChild>
                      <Link href={`/dashboard/edit/${agreement.id}`}>
                        Manage Document
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none rounded-[3rem] overflow-hidden relative shadow-2xl shadow-slate-200">
        <CardContent className="p-12 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white">Need help with your agreement?</h3>
            <p className="text-slate-400 font-medium text-lg max-w-md">Our legal experts are available 24/7 to assist you with court-ready documents.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button variant="secondary" className="h-14 px-8 rounded-2xl font-bold text-lg shadow-xl" asChild>
              <Link href="/dashboard/help">
                <Mail className="mr-2 h-5 w-5" /> Contact Support
              </Link>
            </Button>
            <Button variant="outline" className="h-14 px-8 rounded-2xl font-bold text-lg border-white/20 text-white hover:bg-white/10 transition-all" asChild>
              <Link href="/dashboard/help">
                <HelpCircle className="mr-2 h-5 w-5" /> Help Center
              </Link>
            </Button>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </Card>
    </div>
  );
}
