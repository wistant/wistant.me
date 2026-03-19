import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { SplitIdeEditor } from "@/components/admin/dashboard/split-ide-editor";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";
import { getContent } from "@/lib/admin/server/cms/engine";
import { ContentTypeSchema, ContentType } from "@/lib/admin/schemas";
import { notFound } from "next/navigation";

export default async function GenericEditEditorPage({
  params,
}: {
  params: Promise<{ lang: Language; type: string; slug: string }>;
}) {
  const { lang, type, slug } = await params;
  
  const validation = ContentTypeSchema.safeParse(type);
  if (!validation.success) {
    notFound();
  }

  const dict = await getAdminDictionary(lang);
  
  let data;
  try {
    data = await getContent(validation.data as ContentType, slug, lang);
  } catch {
    notFound();
  }

  if (!data) {
    notFound();
  }

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background transition-none">
          <main className="w-full flex-1 overflow-hidden transition-none">
            <SplitIdeEditor 
              contentType={validation.data as ContentType} 
              slug={slug}
              initialContent={data.content}
              initialFrontmatter={data.frontmatter}
              lang={lang} 
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
