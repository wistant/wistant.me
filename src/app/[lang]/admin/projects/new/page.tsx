import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { SplitIdeEditor } from "@/components/admin/dashboard/split-ide-editor";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";

export default async function NewProjectEditorPage({
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
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background transition-none">
          <main className="w-full flex-1 overflow-hidden transition-none">
            <SplitIdeEditor 
              isNew 
              contentType="projects" 
              lang={lang} 
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
