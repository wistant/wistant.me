import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { MdxEditor } from "@/components/admin/dashboard/mdx-editor";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";

export default async function NewBlogEditorPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getAdminDictionary(lang);

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader dict={dict as AdminDictionary} />
          <main className="w-full h-full flex flex-col">
            <MdxEditor 
              isNew 
              contentType="blog" 
              dict={dict as AdminDictionary} 
              lang={lang} 
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
