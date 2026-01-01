"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lock, 
  Unlock, 
  AlertTriangle, 
  Download, 
  Save, 
  CreditCard, 
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Eye
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function AgreementForm({ agreement, templateSchema }: { agreement: any, templateSchema: any }) {
  const [formData, setFormData] = useState(agreement.formData || {});
  const [loading, setLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const router = useRouter();
  const isPaid = agreement.status === "Paid";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/agreements/${agreement.id}/save`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Draft saved successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/agreements/${agreement.id}/pay`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Payment successful! Agreement locked.");
        router.refresh();
      }
    } catch (error) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(`/api/agreements/${agreement.id}/download`, "_blank");
  };

  const generatePreview = () => {
    let content = agreement.template.content;
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(placeholder, (value as string) || `[${key}]`);
    });
    content = content.replace(/{{currentDate}}/g, new Date().toLocaleDateString('en-GB'));
    setPreviewContent(content);
  };

  return (
    <div className="space-y-10">
      <Card className="rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        <CardHeader className="p-10 pb-6 bg-slate-50/50 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900">Agreement Details</CardTitle>
              <CardDescription className="text-slate-500 font-medium text-base">
                {isPaid 
                  ? "Primary details are locked. You can still edit secondary fields." 
                  : "Fill in the details below. Primary fields will be locked after payment."}
              </CardDescription>
            </div>
            <div className={`p-3 rounded-2xl ${isPaid ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {isPaid ? <ShieldCheck className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10">
          <form onSubmit={handleSave} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {templateSchema.fields.map((field: any) => {
                const isLockedField = field.locked && isPaid;
                return (
                  <div key={field.name} className="space-y-3">
                    <Label htmlFor={field.name} className="flex items-center justify-between text-sm font-bold text-slate-700">
                      <span className="flex items-center gap-2">
                        {field.label}
                        {field.locked && (
                          isPaid ? <Lock className="h-3.5 w-3.5 text-slate-400" /> : <Unlock className="h-3.5 w-3.5 text-blue-400" />
                        )}
                      </span>
                      {field.locked && !isPaid && (
                        <span className="text-[10px] text-amber-600 uppercase tracking-widest font-black flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Locks after pay
                        </span>
                      )}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea 
                        id={field.name} 
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        disabled={isLockedField}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                        className={`min-h-[120px] rounded-2xl border-2 transition-all focus:ring-4 focus:ring-blue-100 ${isLockedField ? "bg-slate-50 border-slate-100 text-slate-400" : "border-slate-100 hover:border-blue-200 focus:border-blue-600"}`}
                      />
                    ) : (
                      <Input 
                        id={field.name} 
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        disabled={isLockedField}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                        className={`h-14 rounded-2xl border-2 transition-all focus:ring-4 focus:ring-blue-100 ${isLockedField ? "bg-slate-50 border-slate-100 text-slate-400" : "border-slate-100 hover:border-blue-200 focus:border-blue-600"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 pt-10 border-t border-slate-100">
              {!isPaid ? (
                <>
                  <Button type="submit" disabled={loading} variant="outline" className="flex-1 h-14 rounded-2xl font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                    Save Draft
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" variant="secondary" onClick={generatePreview} className="flex-1 h-14 rounded-2xl font-bold border-2 border-slate-200 transition-all">
                        <Eye className="mr-2 h-5 w-5" /> Preview Agreement
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-[2rem] p-10">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Agreement Preview</DialogTitle>
                        <DialogDescription>This is how your final document will look with the current details.</DialogDescription>
                      </DialogHeader>
                      <div className="mt-8 p-8 bg-slate-50 rounded-2xl border border-slate-200 font-serif whitespace-pre-wrap text-slate-800 leading-relaxed">
                        {previewContent}
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-100 transition-all hover:scale-105">
                        <CreditCard className="mr-2 h-5 w-5" /> Pay ₹{agreement.template.price} & Lock
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[2rem] p-8">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold text-slate-900">Confirm Payment</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 text-lg font-medium pt-2">
                          Once payment is successful, primary details like <strong>Names</strong> and <strong>Addresses</strong> will be <strong>LOCKED</strong> and cannot be changed. Please review your details carefully.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="pt-6">
                        <AlertDialogCancel className="h-12 rounded-xl font-bold">Review Details</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePayment} className="h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700">
                          Confirm & Pay ₹{agreement.template.price}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <Button type="submit" disabled={loading} variant="outline" className="flex-1 h-14 rounded-2xl font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                    Update Secondary Fields
                  </Button>
                  <Button type="button" onClick={handleDownload} className="flex-1 h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-lg font-bold shadow-xl shadow-green-100 transition-all hover:scale-105">
                    <Download className="mr-2 h-5 w-5" /> Download Final PDF
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-8 opacity-50">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm"><ShieldCheck className="h-5 w-5" /> 256-BIT ENCRYPTION</div>
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm"><CheckCircle2 className="h-5 w-5" /> LEGALLY VALID</div>
      </div>
    </div>
  );
}
