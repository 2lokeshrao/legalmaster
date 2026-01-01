import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, User, ShieldCheck, ArrowRight, Sparkles, Globe, Scale, Gavel } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Rental agreements, lease deeds, and property sale documents.",
    icon: Home,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    hoverColor: "group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    id: "business",
    title: "Business & Corporate",
    description: "NDAs, partnership deeds, and employment contracts.",
    icon: Briefcase,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    hoverColor: "group-hover:bg-indigo-600 group-hover:text-white",
  },
  {
    id: "personal",
    title: "Legal & Personal",
    description: "Affidavits, power of attorney, and wills.",
    icon: Scale,
    color: "bg-violet-50 text-violet-600 border-violet-100",
    hoverColor: "group-hover:bg-violet-600 group-hover:text-white",
  },
  {
    id: "legal-compliance",
    title: "IT & Web",
    description: "Privacy policies, terms of service, and software licenses.",
    icon: Globe,
    color: "bg-slate-50 text-slate-600 border-slate-100",
    hoverColor: "group-hover:bg-slate-900 group-hover:text-white",
  },
];

export default function CreateAgreementPage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm uppercase tracking-widest">
          <Gavel className="h-4 w-4" />
          <span>Step 1: Select Category</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Professional Legal Services</h2>
        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
          Choose a category to see our court-ready templates. Each document is designed for maximum legal protection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={`/dashboard/create/${category.id}`} className="group">
            <Card className="h-full rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 overflow-hidden relative">
              <CardHeader className="p-10 pb-6 flex flex-row items-start gap-6">
                <div className={`p-5 rounded-3xl border-2 transition-all duration-500 ${category.color} ${category.hoverColor}`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-2xl font-bold text-slate-900">{category.title}</CardTitle>
                  <CardDescription className="text-slate-500 text-lg font-medium leading-relaxed">
                    {category.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-10 pb-10">
                <div className="flex items-center gap-2 font-bold text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                  View Templates <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
              
              {/* Decorative background element */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-slate-50 rounded-full -z-10 group-hover:bg-blue-50 transition-colors duration-500" />
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-900/20">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <p className="text-white text-xl font-bold">Court-Ready Documents</p>
            <p className="text-slate-400 font-medium">All templates are vetted by legal experts and updated for 2026.</p>
          </div>
        </div>
        <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold relative z-10">Learn about our legal process</Button>
        <Sparkles className="absolute -bottom-10 -right-10 h-48 w-48 text-white/5 rotate-12" />
      </div>
    </div>
  );
}
