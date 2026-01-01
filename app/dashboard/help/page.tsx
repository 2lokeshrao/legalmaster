import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Mail, Phone, MessageSquare, Search, Gavel, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest">
          <ShieldCheck className="h-3 w-3" />
          Legal Support Center
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">How can we help you?</h1>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
          <Input placeholder="Search for legal guides, articles..." className="h-20 pl-14 rounded-[2rem] border-2 border-slate-100 text-xl shadow-2xl shadow-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Mail, title: "Email Support", desc: "Get a response from our legal team within 24 hours.", action: "Send Email" },
          { icon: MessageSquare, title: "Live Chat", desc: "Chat with our legal experts for immediate assistance.", action: "Start Chat" },
          { icon: Phone, title: "Phone Support", desc: "Available Mon-Fri, 9am-6pm for premium users.", action: "Call Now" },
        ].map((item, i) => (
          <Card key={i} className="rounded-[2.5rem] border-2 border-slate-100 text-center p-10 hover:border-blue-600 transition-all duration-500 group hover:shadow-2xl hover:shadow-blue-100">
            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <item.icon className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 mb-3">{item.title}</CardTitle>
            <p className="text-slate-500 font-medium text-base mb-10 leading-relaxed">{item.desc}</p>
            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold text-lg border-2 border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-lg">
              {item.action}
            </Button>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-3 rounded-2xl">
            <Gavel className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {[
            "How do I download my court-ready agreement?",
            "Can I edit my document after payment is successful?",
            "Is my personal data secure on LegalMaster?",
            "How does the collaborative invite mode work?",
            "What documents are required for a rent agreement?",
          ].map((q, i) => (
            <Card key={i} className="rounded-3xl border-2 border-slate-100 p-8 hover:bg-slate-50 cursor-pointer transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-slate-700 group-hover:text-blue-600 transition-colors">{q}</span>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                  <HelpCircle className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
