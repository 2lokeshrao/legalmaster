import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Users, AlertCircle, Sparkles, ArrowRight, ShieldCheck, Gavel } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function TemplateSelectionPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const template = await prisma.template.findUnique({
    where: { id: templateId }
  });

  if (!template) redirect("/dashboard/create");

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" asChild className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50">
            <Link href={`/dashboard/create/${template.categoryId}`}>
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </Link>
          </Button>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-2">
              <Gavel className="h-3 w-3" />
              Step 3: Choose Filling Mode
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">How would you like to proceed?</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="relative overflow-hidden border-2 border-slate-100 hover:border-blue-600 transition-all duration-500 rounded-[3rem] group hover:shadow-2xl hover:shadow-blue-100">
          <CardHeader className="p-10 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <User className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Option A: Self Fill</CardTitle>
            <CardDescription className="text-slate-500 text-lg font-medium mt-2 leading-relaxed">
              You fill both First Party & Second Party details yourself. Best if you have all information ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0">
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-bold text-slate-700">Fastest if you have all details</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-bold text-slate-700">Full control over data entry</span>
              </div>
            </div>
            <form action={`/api/agreements/create`}>
              <input type="hidden" name="templateId" value={template.id} />
              <input type="hidden" name="mode" value="self" />
              <Button className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xl font-bold shadow-xl transition-all group-hover:bg-blue-600">
                Start Self Fill <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 border-slate-100 hover:border-indigo-600 transition-all duration-500 rounded-[3rem] group hover:shadow-2xl hover:shadow-indigo-100">
          <CardHeader className="p-10 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Option B: Invite Mode</CardTitle>
            <CardDescription className="text-slate-500 text-lg font-medium mt-2 leading-relaxed">
              Fill your details and invite the second party to fill theirs via a secure link.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0">
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="font-bold text-slate-700">Ensures accuracy from both sides</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="font-bold text-slate-700">Shareable link for second party</span>
              </div>
            </div>
            <form action={`/api/agreements/create`}>
              <input type="hidden" name="templateId" value={template.id} />
              <input type="hidden" name="mode" value="invite" />
              <Button className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xl font-bold shadow-xl transition-all group-hover:bg-indigo-600">
                Start Invite Mode <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-amber-50 border-2 border-amber-100 rounded-[2.5rem] overflow-hidden relative shadow-lg shadow-amber-100/50">
        <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100">
            <AlertCircle className="h-10 w-10 text-amber-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-amber-900">Important Security Note</h3>
            <p className="text-amber-800 text-lg font-medium leading-relaxed">
              Primary details like <strong>Property Address</strong> and <strong>Names</strong> will be <strong>LOCKED</strong> after payment. Please ensure they are correct before proceeding to pay. Secondary fields like Rent Amount and Clauses remain editable.
            </p>
          </div>
        </CardContent>
        <ShieldCheck className="absolute -bottom-10 -right-10 h-48 w-48 text-amber-600/5 rotate-12" />
      </Card>
    </div>
  );
}
