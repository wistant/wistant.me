import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { ContentTable } from "@/components/admin/dashboard/content-table";

export default function BlogDashboardPage() {
  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader />
          <main className="w-full flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Blog Posts</h2>
              <p className="text-muted-foreground">Manage your technical articles.</p>
            </div>
            <ContentTable contentType="blog" />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
