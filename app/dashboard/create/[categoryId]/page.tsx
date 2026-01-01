import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, Sparkles, ArrowRight, Gavel } from "lucide-react";

export default async function CategoryTemplatesPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  
  const templates = await prisma.template.findMany({
    where: { categoryId: categoryId }
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" asChild className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50">
            <Link href="/dashboard/create">
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </Link>
          </Button>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-2">
              <Gavel className="h-3 w-3" />
              Step 2: Choose Template
            </div>
            <h2 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{categoryId.replace('-', ' ')} Templates</h2>
          </div>
        </div>
        <p className="text-slate-500 font-medium max-w-xs md:text-right">
          Select the specific document you need. All templates are fully customizable and court-ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 group overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">{template.title}</CardTitle>
              <CardDescription className="text-slate-500 font-medium text-base leading-relaxed mt-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Price</span>
                  <span className="text-2xl font-black text-blue-600">₹{template.price}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Legally Vetted
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Court Ready
                  </div>
                </div>
              </div>
              <Button asChild className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-lg font-bold shadow-lg transition-all group-hover:bg-blue-600">
                <Link href={`/dashboard/create/template/${template.id}`}>
                  Select Template <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Card */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none rounded-[3rem] overflow-hidden relative">
        <CardContent className="p-12 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white">Need a custom legal document?</h3>
            <p className="text-slate-400 text-lg font-medium max-w-md">
              Our legal team can create custom templates for your specific needs. Contact us for a quote.
            </p>
          </div>
          <Button className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-10 rounded-2xl text-lg font-bold shadow-xl">
            Request Custom Template
          </Button>
        </CardContent>
        <Sparkles className="absolute -bottom-10 -right-10 h-48 w-48 text-white/5 rotate-12" />
      </Card>
    </div>
  );
}
