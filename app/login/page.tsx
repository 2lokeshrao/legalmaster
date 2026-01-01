"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
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

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-700">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <Image src="/images/logo.png" alt="Logo" width={48} height={48} className="rounded-lg" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your legal documents
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-blue-700 hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-blue-700 hover:bg-blue-800 h-11 text-base" type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login to Dashboard"}
              </Button>
              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-700 font-semibold hover:underline">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <footer className="py-6 text-center text-xs text-gray-400">
        © 2026 LegalMaster Platform. Secure & Encrypted.
      </footer>
    </div>
  );
}
