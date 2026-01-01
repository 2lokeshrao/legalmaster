import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Database, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [userCount, agreementCount, templateCount] = await Promise.all([
    prisma.user.count(),
    prisma.agreement.count(),
    prisma.template.count(),
  ]);

  const stats = [
    { title: "Total Users", value: userCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Agreements", value: agreementCount, icon: FileText, color: "text-green-600", bg: "bg-green-50" },
    { title: "Active Templates", value: templateCount, icon: Database, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Revenue (Est.)", value: "₹" + (agreementCount * 99), icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-[2rem] border-2 border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-bold">System Health</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50">
                <span className="font-bold text-slate-600">Database Status</span>
                <span className="text-green-600 font-black uppercase text-xs tracking-widest">Operational</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50">
                <span className="font-bold text-slate-600">PDF Engine</span>
                <span className="text-green-600 font-black uppercase text-xs tracking-widest">Operational</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50">
                <span className="font-bold text-slate-600">Auth Service</span>
                <span className="text-green-600 font-black uppercase text-xs tracking-widest">Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
