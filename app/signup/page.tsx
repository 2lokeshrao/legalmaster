"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, mobile, password }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with Back to Home */}
      <header className="p-4 md:p-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Trust Content */}
          <div className="hidden lg:block space-y-6 pr-8">
            <h1 className="text-4xl font-bold text-blue-900 leading-tight">
              Join thousands of users creating legal documents daily.
            </h1>
            <p className="text-lg text-gray-600">
              LegalMaster provides a secure, transparent, and easy-to-use platform for all your legal needs.
            </p>
            <ul className="space-y-4">
              {[
                "Legally vetted templates",
                "Secure digital signatures",
                "Instant PDF downloads",
                "Collaborative filling mode"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Signup Form */}
          <Card className="shadow-xl border-t-4 border-t-blue-700">
            <CardHeader className="space-y-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="bg-blue-50 p-2 rounded-xl">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-900">Create Your Account</CardTitle>
              <CardDescription>
                Get started with LegalMaster in less than a minute
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input 
                      id="mobile" 
                      type="tel" 
                      placeholder="+91 9876543210" 
                      required 
                      value={mobile} 
                      onChange={(e) => setMobile(e.target.value)} 
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="h-11"
                  />
                </div>
                <p className="text-[10px] text-gray-500">
                  By signing up, you agree to our <Link href="#" className="text-blue-700 underline">Terms of Service</Link> and <Link href="#" className="text-blue-700 underline">Privacy Policy</Link>.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base" type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create My Account"}
                </Button>
                <div className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-700 font-semibold hover:underline">
                    Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      
      <footer className="py-6 text-center text-xs text-gray-400">
        © 2026 LegalMaster Platform. Trusted by 10,000+ users.
      </footer>
    </div>
  );
}
