"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function InviteForm({ agreement, templateSchema }: { agreement: any, templateSchema: any }) {
  const [formData, setFormData] = useState(agreement.formData || {});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/invite/${agreement.inviteToken}/save`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Details submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 space-y-6"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-lg shadow-green-100">
            <CheckCircle className="h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Submission Successful!</h2>
            <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto">
              Your details have been securely saved. The initiator will be notified to proceed with the agreement.
            </p>
          </div>
          <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-slate-200" onClick={() => window.close()}>
            Close Window
          </Button>
        </motion.div>
      ) : (
        <motion.form 
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit} 
          className="space-y-10"
        >
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Your Information</h3>
                <p className="text-slate-500 font-medium">Please fill in your details accurately.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {templateSchema.fields.map((field: any) => (
                <div key={field.name} className="space-y-3">
                  <Label htmlFor={field.name} className="text-sm font-bold text-slate-700">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea 
                      id={field.name} 
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      required
                      className="min-h-[120px] rounded-2xl border-2 border-slate-100 hover:border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  ) : (
                    <Input 
                      id={field.name} 
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      required
                      className="h-14 rounded-2xl border-2 border-slate-100 hover:border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100">
            <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-xl font-bold shadow-xl shadow-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
              Submit Securely <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <div className="flex items-center justify-center gap-2 mt-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              End-to-end encrypted submission
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
