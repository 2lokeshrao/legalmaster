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
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Shield,
  PlusCircle,
  Database
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const menuItems = [
    { title: "Overview", icon: LayoutDashboard, href: "/admin" },
    { title: "Manage Templates", icon: Database, href: "/admin/templates" },
    { title: "All Agreements", icon: FileText, href: "/admin/agreements" },
    { title: "User Management", icon: Users, href: "/admin/users" },
  ];

  return (
    <Sidebar className="border-r border-slate-100 bg-white">
      <SidebarHeader className="p-6">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="bg-slate-900 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">Admin Panel</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={`h-12 rounded-xl px-4 transition-all duration-200 ${pathname === item.href ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
