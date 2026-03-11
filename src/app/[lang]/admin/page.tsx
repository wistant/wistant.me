import { DashboardSidebar } from "@/admin/components/dashboard/sidebar";
import { DashboardHeader } from "@/admin/components/dashboard/header";
import { DashboardContent } from "@/admin/components/dashboard/content";
import { SidebarProvider } from "@/admin/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader />
          <main className="w-full flex-1 overflow-auto">
            <DashboardContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
