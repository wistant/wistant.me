import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { SplitIdeEditor } from "@/components/admin/dashboard/split-ide-editor";
import { getContent } from "@/lib/admin/server/cms/engine";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";
import { notFound } from "next/navigation";

export default async function BlogEditorPage({
  params,
}: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getAdminDictionary(lang);
  const content = await getContent("blog", slug, lang);

  if (!content) {
    notFound();
  }

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background transition-none">
          <main className="w-full flex-1 overflow-hidden transition-none">
            <SplitIdeEditor 
              slug={slug}
              contentType="blog"
              lang={lang}
              initialContent={content.content} 
              initialFrontmatter={content.frontmatter}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
