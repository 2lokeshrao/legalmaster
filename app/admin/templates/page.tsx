import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import Link from "next/link";

export default async function ManageTemplates() {
  const templates = await prisma.template.findMany({
    orderBy: { title: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Legal Templates</h2>
          <p className="text-slate-500 font-medium">Add, edit or remove agreement templates.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 h-12 px-6 rounded-xl font-bold shadow-lg">
          <Plus className="mr-2 h-5 w-5" /> Add New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="overflow-hidden border-2 border-slate-100 rounded-[2.5rem] bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b-2 border-slate-100">
                <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Template Name</th>
                <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Category</th>
                <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Price</th>
                <th className="px-10 py-6 font-black text-slate-400 uppercase text-xs tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {templates.map((template) => (
                <tr key={template.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-xl text-slate-900">{template.title}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="capitalize font-bold text-slate-600">{template.categoryId.replace('-', ' ')}</span>
                  </td>
                  <td className="px-10 py-8 font-black text-blue-600">
                    ₹{template.price}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-blue-50 text-blue-600">
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-red-50 text-red-600">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
