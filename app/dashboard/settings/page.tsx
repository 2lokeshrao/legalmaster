import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, CreditCard, ShieldCheck } from "lucide-react";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-2">
          <ShieldCheck className="h-3 w-3" />
          Account Security
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium text-lg">Manage your profile and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <Card className="rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <CardHeader className="p-10 pb-6 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-6">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-sm">
                <User className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">Profile Information</CardTitle>
                <CardDescription className="text-slate-500 font-medium text-base">Update your personal details for legal documents.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-bold text-slate-700 text-sm uppercase tracking-widest">Full Name</Label>
                <Input defaultValue={session.user.name} className="h-14 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all font-medium" />
              </div>
              <div className="space-y-3">
                <Label className="font-bold text-slate-700 text-sm uppercase tracking-widest">Email Address</Label>
                <Input defaultValue={session.user.email} disabled className="h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-400 font-medium" />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 transition-all">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <CardHeader className="p-10 pb-6 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-6">
              <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 shadow-sm">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">Security & Password</CardTitle>
                <CardDescription className="text-slate-500 font-medium text-base">Manage your password and account security settings.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <Button variant="outline" className="h-14 px-10 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:bg-slate-50 transition-all">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
