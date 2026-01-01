import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Share2, ArrowLeft, Gavel } from "lucide-react";
import Link from "next/link";
import { AgreementForm } from "@/components/agreement-form";

export default async function EditAgreementPage({ params }: { params: Promise<{ agreementId: string }> }) {
  const { agreementId } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const agreement = await prisma.agreement.findUnique({
    where: { id: agreementId },
    include: { template: true }
  });

  if (!agreement || agreement.userId !== session.user.id) redirect("/dashboard");

  const templateSchema = agreement.template.formSchemaJson as any;
  const isPaid = agreement.status === "Paid";

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" asChild className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50">
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6 text-slate-600" />
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-2">
              <Gavel className="h-3 w-3" />
              Legal Document Editor
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{agreement.template.title}</h2>
            <p className="text-slate-500 font-medium">Agreement ID: {agreement.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              className={`rounded-full px-4 py-1.5 font-bold text-sm ${isPaid ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}`}
            >
              {isPaid ? "Paid & Locked" : "Draft Mode"}
            </Badge>
          </div>
        </div>
      </div>

      {agreement.inviteMode && !isPaid && (
        <Card className="bg-blue-900 border-none rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-blue-900/20">
          <CardHeader className="p-10 pb-4 relative z-10">
            <CardTitle className="text-white flex items-center gap-3 text-2xl font-bold">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              Invite Second Party
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 pt-0 relative z-10">
            <p className="text-blue-100 text-lg font-medium mb-6">
              Share this secure link with the second party to let them fill their details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                readOnly 
                value={`${process.env.NEXT_PUBLIC_APP_URL || 'https://shaky-files-march.lindy.site'}/invite/${agreement.inviteToken}`} 
                className="h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/40 text-lg font-medium focus:ring-0"
              />
              <Button className="h-14 px-8 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-lg shadow-xl">
                Copy Secure Link
              </Button>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        </Card>
      )}

      <AgreementForm agreement={agreement} templateSchema={templateSchema} />
    </div>
  );
}
