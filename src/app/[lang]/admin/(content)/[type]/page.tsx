import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { ContentTable } from "@/components/admin/dashboard/content-table";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";
import { ContentTypeSchema } from "@/lib/admin/schemas";
import { notFound } from "next/navigation";

export default async function GenericDashboardPage({ 
  params 
}: { 
  params: Promise<{ lang: Language; type: string }> 
}) {
  const { lang, type } = await params;
  
  const validation = ContentTypeSchema.safeParse(type);
  if (!validation.success) {
    notFound();
  }

  const dict = await getAdminDictionary(lang);
  const title = (dict.sidebar as Record<string, string>)[type] || type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader dict={dict as AdminDictionary} />
          <main className="w-full flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="text-muted-foreground">Manage your {title.toLowerCase()} content.</p>
            </div>
            <ContentTable dict={dict as AdminDictionary} contentType={validation.data} lang={lang} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
