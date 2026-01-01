import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-slate-50" />
              <h1 className="text-xl font-black text-slate-900">Admin Control Panel</h1>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
