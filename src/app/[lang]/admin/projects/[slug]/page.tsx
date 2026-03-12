import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { MdxEditor } from "@/components/admin/dashboard/mdx-editor";
import { getContent } from "@/lib/admin/server/cms/engine";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";
import { notFound } from "next/navigation";

export default async function ProjectEditorPage({
  params,
}: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getAdminDictionary(lang);
  const content = await getContent("projects", slug, lang);

  if (!content) {
    notFound();
  }

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader dict={dict as AdminDictionary} />
          <main className="w-full flex-1 overflow-auto p-4">
            <MdxEditor 
              slug={slug}
              contentType="projects"
              lang={lang}
              dict={dict as AdminDictionary}
              initialContent={content.content} 
              initialFrontmatter={content.frontmatter}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
