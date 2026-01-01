import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Dashboard Header */}
          <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-slate-50" />
              <div className="relative max-w-md w-full hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search documents, templates..." 
                  className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-slate-500 hover:bg-slate-50 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 h-2 w-2 bg-blue-600 rounded-full border-2 border-white" />
              </Button>
              <div className="h-8 w-px bg-slate-100 mx-1" />
              <Button variant="ghost" className="h-11 px-3 rounded-xl hover:bg-slate-50 gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center shadow-sm">
                  <Image src="/images/logo.png" alt="Logo" width={24} height={24} className="rounded" />
                </div>
                <span className="font-bold text-sm text-slate-700 hidden sm:block">Umraomal Rao</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
