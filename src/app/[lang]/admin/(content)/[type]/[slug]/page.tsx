import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { MdxEditor } from "@/components/admin/dashboard/mdx-editor";
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
    data = await getContent(validation.data, slug, lang);
  } catch (error) {
    notFound();
  }

  if (!data) {
    notFound();
  }

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader dict={dict as AdminDictionary} />
          <main className="w-full h-full flex flex-col">
            <MdxEditor 
              contentType={validation.data as ContentType} 
              slug={slug}
              initialContent={data.content}
              initialFrontmatter={data.frontmatter}
              dict={dict as AdminDictionary} 
              lang={lang} 
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
