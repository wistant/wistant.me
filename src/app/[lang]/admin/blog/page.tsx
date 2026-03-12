import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { ContentTable } from "@/components/admin/dashboard/content-table";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";

export default async function BlogDashboardPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getAdminDictionary(lang);

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader dict={dict as AdminDictionary} />
          <main className="w-full flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">{dict.sidebar.blog}</h2>
              <p className="text-muted-foreground">{dict.sidebar.blog} management.</p>
            </div>
            <ContentTable dict={dict as AdminDictionary} contentType="blog" lang={lang} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
