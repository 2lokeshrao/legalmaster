"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Shield, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  Mail, 
  Phone, 
  AlertCircle, 
  Menu,
  ArrowRight,
  Zap,
  Lock,
  Globe,
  Scale,
  Gavel,
  FileCheck
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <header className="px-4 lg:px-8 h-20 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center group" href="/">
          <div className="bg-blue-50 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="rounded-lg" />
          </div>
          <span className="ml-3 text-2xl font-bold tracking-tight text-slate-900">LegalMaster</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="ml-auto hidden md:flex gap-8 items-center">
          <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors" href="#services">
            Legal Services
          </Link>
          <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors" href="#requirements">
            Requirements
          </Link>
          <div className="h-4 w-px bg-slate-200 mx-2" />
          <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors" href="/login">
            Login
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <AlertCircle className="text-blue-600 h-6 w-6" />
                  </div>
                  Ready to start?
                </DialogTitle>
                <DialogDescription className="text-slate-500 text-lg pt-2">
                  Ensure you have these documents ready for a seamless experience:
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-6">
                <div className="space-y-3">
                  {[
                    "Aadhar Card (Both Parties)",
                    "PAN Card (For Financial Agreements)",
                    "Property Details (For Real Estate)",
                    "Mobile Number for OTP Verification"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-lg font-semibold">
                  <Link href="/signup">I'm Ready, Let's Go</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>

        {/* Mobile Nav */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-12">
                <Link className="text-xl font-semibold text-slate-700" href="#how-it-works">How It Works</Link>
                <Link className="text-xl font-semibold text-slate-700" href="#services">Legal Services</Link>
                <Link className="text-xl font-semibold text-slate-700" href="#requirements">Requirements</Link>
                <hr className="border-slate-100" />
                <Link className="text-xl font-semibold text-slate-700" href="/login">Login</Link>
                <Button asChild className="w-full bg-blue-600 h-14 rounded-2xl text-lg font-bold">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32 xl:py-48 overflow-hidden hero-gradient">
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm uppercase tracking-widest">
                <Scale className="h-4 w-4" />
                <span>Professional Notary & Legal Services</span>
              </motion.div>
              
              <motion.div variants={fadeIn} className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-[1.1]">
                  Legally Valid Agreements <span className="text-blue-600">in 5 Minutes</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-slate-500 text-lg md:text-2xl font-medium leading-relaxed">
                  Secure, transparent, and legally binding documents vetted by experts. Get your court-ready agreements instantly.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                  <Link href="/signup">Start Your Agreement <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-14 px-10 rounded-2xl text-lg font-bold border-slate-200 hover:bg-slate-50 transition-all">
                  <Link href="#how-it-works">View Legal Process</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="pt-12 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-bold text-slate-900"><Gavel className="h-6 w-6" /> COURT READY</div>
                <div className="flex items-center gap-2 font-bold text-slate-900"><FileCheck className="h-6 w-6" /> LEGALLY VETTED</div>
                <div className="flex items-center gap-2 font-bold text-slate-900"><Shield className="h-6 w-6" /> SECURE & VALID</div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900">Simple 3-Step Process</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">We've simplified legal documentation so you can focus on what matters most.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-slate-200 -z-10" />
              
              {[
                {
                  step: "1",
                  title: "Choose Agreement",
                  desc: "Select from our wide range of legally vetted templates like Rent, Affidavit, etc.",
                  icon: FileText,
                  color: "bg-blue-600"
                },
                {
                  step: "2",
                  title: "Fill Details",
                  desc: "Enter your information or invite the other party to fill their details via a secure link.",
                  icon: CheckCircle,
                  color: "bg-indigo-600"
                },
                {
                  step: "3",
                  title: "Pay & Download",
                  desc: "Secure payment and instant download of your ready-to-use document.",
                  icon: CreditCard,
                  color: "bg-violet-600"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-blue-100 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300`}>
                    <item.icon size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">{item.step}. {item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services & Pricing Section */}
        <section id="services" className="w-full py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900">Legal Services & Pricing</h2>
                <p className="text-slate-500 text-lg max-w-2xl">No hidden fees. No hourly rates. Just simple, flat pricing for every document.</p>
              </div>
              <Button variant="outline" className="rounded-full px-8 h-12 font-bold border-slate-200" asChild>
                <Link href="/signup">View All Templates</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Rent Agreement", price: "99", desc: "Residential & Commercial", popular: true },
                { title: "Affidavit", price: "49", desc: "General & Specific", popular: false },
                { title: "Power of Attorney", price: "199", desc: "General & Special", popular: false },
                { title: "Partnership Deed", price: "499", desc: "Business Registration", popular: false },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`flex flex-col h-full rounded-3xl border-2 transition-all duration-300 hover:scale-105 ${service.popular ? 'border-blue-600 shadow-2xl shadow-blue-100' : 'border-slate-100 hover:border-blue-200 shadow-sm'}`}>
                    {service.popular && (
                      <div className="bg-blue-600 text-white text-center py-1 text-xs font-bold uppercase tracking-widest rounded-t-[1.4rem]">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="pt-8">
                      <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                      <CardDescription className="text-slate-500 font-medium">{service.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between pt-4">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-900">₹{service.price}</span>
                          <span className="text-slate-400 font-medium">/doc</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">Includes digital signature & instant download.</p>
                      </div>
                      <Button asChild className={`w-full mt-8 h-12 rounded-xl font-bold transition-all ${service.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                        <Link href="/signup">Select Template</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Guide Section */}
        <section id="requirements" className="w-full py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">What You Need</h2>
                  <p className="text-slate-400 text-xl leading-relaxed">
                    Be prepared before you start. Having these documents ready will help you complete your agreement in minutes.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Aadhar Card (Both Parties)",
                    "PAN Card (Financials)",
                    "Property Details",
                    "Witness Information",
                    "Mobile for OTP",
                    "Digital Signature"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="bg-blue-500/20 p-1 rounded-full">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="font-semibold">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3rem] shadow-2xl relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-6 -right-6 bg-white text-blue-600 p-4 rounded-2xl shadow-xl font-black text-xl transform rotate-12">
                  PRO TIP
                </div>
                <h3 className="text-3xl font-bold mb-6">Collaborative Filling</h3>
                <p className="text-blue-50 text-lg leading-relaxed mb-8">
                  You don't need to have all the details. Invite the second party to fill their own information via a secure link. You retain full control over the final document.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 w-full h-14 rounded-2xl text-lg font-bold">
                  <Link href="/signup">Learn About Invite Mode</Link>
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </section>

        {/* Support/Trust Section */}
        <section className="w-full py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900">Trusted by Thousands</h2>
                <p className="text-slate-500 text-lg max-w-2xl">We take security and legality seriously. Your data is safe with us.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {[
                  { icon: Shield, title: "SSL Secured", desc: "Bank-grade encryption for all your data." },
                  { icon: Lock, title: "Data Privacy", desc: "We never share your personal information." },
                  { icon: CheckCircle, title: "Legally Valid", desc: "Vetted by top legal experts globally." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-8 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                      <item.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl pt-8">
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center gap-6 p-8">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <Mail className="text-blue-600 h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-xl font-bold">Email Support</CardTitle>
                      <CardDescription className="text-blue-600 font-bold text-lg">support@legalmaster.com</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="rounded-3xl border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center gap-6 p-8">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <Phone className="text-blue-600 h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-xl font-bold">Phone Support</CardTitle>
                      <CardDescription className="text-blue-600 font-bold text-lg">+91 1800-LEGAL-MASTER</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 w-full border-t bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Link className="flex items-center group" href="/">
                <div className="bg-blue-50 p-2 rounded-xl">
                  <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="rounded-lg" />
                </div>
                <span className="ml-3 text-2xl font-bold tracking-tight text-slate-900">LegalMaster</span>
              </Link>
              <p className="text-slate-500 text-lg max-w-md font-medium">
                Making legal documentation accessible, affordable, and secure for everyone, everywhere.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Platform</h4>
              <nav className="flex flex-col gap-2">
                <Link className="text-slate-500 hover:text-blue-600 font-medium" href="#">Templates</Link>
                <Link className="text-slate-500 hover:text-blue-600 font-medium" href="#">Pricing</Link>
                <Link className="text-slate-500 hover:text-blue-600 font-medium" href="#">How it Works</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Legal</h4>
              <nav className="flex flex-col gap-2">
                <Link className="text-slate-500 hover:text-blue-600 font-medium" href="#">Privacy Policy</Link>
                <Link className="text-slate-500 hover:text-blue-600 font-medium" href="#">Terms of Service</Link>
                <Link className="text-slate-500 hover:text-blue-600 font-medium" href="#">Cookie Policy</Link>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 font-medium">© 2026 LegalMaster Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Globe className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Mail className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Help Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button className="rounded-2xl h-16 w-16 shadow-2xl shadow-blue-200 bg-blue-600 hover:bg-blue-700" size="icon">
          <HelpCircle className="h-8 w-8" />
        </Button>
      </motion.div>
    </div>
  );
}
