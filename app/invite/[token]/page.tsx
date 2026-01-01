import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldCheck, Lock, Globe } from "lucide-react";
import Image from "next/image";
import { InviteForm } from "./invite-form";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  
  const agreement = await prisma.agreement.findUnique({
    where: { inviteToken: token },
    include: { template: true, user: true }
  });

  if (!agreement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full rounded-[2.5rem] border-none shadow-2xl p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto">
            <Lock className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-black text-slate-900">Link Expired</CardTitle>
            <CardDescription className="text-slate-500 text-lg font-medium">
              This invitation link is no longer valid or has been deactivated.
            </CardDescription>
          </div>
        </Card>
      </div>
    );
  }

  const templateSchema = agreement.template.formSchemaJson as any;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 hero-gradient">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-blue-50 p-4 rounded-[2rem] shadow-xl shadow-blue-100 transform -rotate-6">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">LegalMaster</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 text-blue-600 font-bold text-sm shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Secure Collaboration Portal
            </div>
          </div>
        </div>

        <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden">
          <CardHeader className="p-12 pb-8 bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <CardTitle className="text-3xl font-bold">Invitation to Collaborate</CardTitle>
              <CardDescription className="text-slate-400 text-lg font-medium">
                <span className="text-white font-bold">{agreement.user.name}</span> has invited you to fill details for a <span className="text-blue-400 font-bold">{agreement.template.title}</span>.
              </CardDescription>
            </div>
            <Globe className="absolute -bottom-10 -right-10 h-48 w-48 text-white/5 rotate-12" />
          </CardHeader>
          <CardContent className="p-12">
            <InviteForm agreement={agreement} templateSchema={templateSchema} />
          </CardContent>
        </Card>

        <div className="text-center space-y-4 opacity-50">
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Trusted by global enterprises</p>
          <div className="flex justify-center gap-8 grayscale">
            <div className="font-black text-slate-900 text-xl">SECURE</div>
            <div className="font-black text-slate-900 text-xl">LEGAL</div>
            <div className="font-black text-slate-900 text-xl">FAST</div>
          </div>
        </div>
      </div>
    </div>
  );
}
