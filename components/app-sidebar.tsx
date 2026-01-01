"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FilePlus, 
  FileText, 
  Settings, 
  LogOut, 
  Shield,
  HelpCircle,
  Zap,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Create New", icon: FilePlus, href: "/dashboard/create" },
    { title: "My Documents", icon: FileText, href: "/dashboard/documents" },
  ];

  const accountItems = [
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
    { title: "Help Center", icon: HelpCircle, href: "/dashboard/help" },
  ];

  return (
    <Sidebar className="border-r border-slate-100 bg-white">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="bg-blue-50 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="rounded-lg" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">LegalMaster</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={`h-12 rounded-xl px-4 transition-all duration-200 ${pathname === item.href ? 'bg-blue-50 text-blue-600 font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-4 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={`h-12 rounded-xl px-4 transition-all duration-200 ${pathname === item.href ? 'bg-blue-50 text-blue-600 font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade Card */}
        <div className="mt-auto p-4">
          <div className="bg-slate-900 rounded-2xl p-5 relative overflow-hidden group cursor-pointer">
            <div className="relative z-10 space-y-3">
              <div className="bg-blue-600 w-fit p-1.5 rounded-lg">
                <Zap className="h-4 w-4 text-white fill-white" />
              </div>
              <div className="space-y-1">
                <p className="text-white font-bold text-sm">Pro Plan</p>
                <p className="text-slate-400 text-xs font-medium">Unlimited documents & priority support.</p>
              </div>
              <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg h-9">
                Upgrade Now
              </Button>
            </div>
            <ShieldCheck className="absolute -bottom-4 -right-4 h-20 w-20 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-slate-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="h-12 rounded-xl px-4 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
