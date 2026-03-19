import { DashboardSidebar } from "@/components/admin/dashboard/sidebar";
import { DashboardHeader } from "@/components/admin/dashboard/header";
import { DashboardContent } from "@/components/admin/dashboard/content";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import { getAdminDictionary } from "@/lib/dictionary";
import { Language, AdminDictionary } from "@/types/locale";
import { listContent } from "@/lib/admin/server/cms/engine";

export default async function DashboardPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getAdminDictionary(lang);
  const projects = await listContent("projects", lang);
  const blog = await listContent("blog", lang);

  const allTags = new Set<string>();
  projects.forEach(p => (p.frontmatter.tags as string[])?.forEach(t => allTags.add(t)));
  blog.forEach(p => (p.frontmatter.tags as string[])?.forEach(t => allTags.add(t)));

  const stats = {
    totalContent: projects.length + blog.length,
    totalProjects: projects.length,
    totalPosts: blog.length,
    totalTags: allTags.size,
  };

  const recentActivities = [...projects, ...blog]
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(0, 5)
    .map(doc => ({
      action: "Dernière modification",
      item: doc.frontmatter.title as string,
      time: new Date(doc.lastModified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      image: doc.frontmatter.image as string || ""
    }));

  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar dict={dict as AdminDictionary} lang={lang} />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col h-full w-full bg-background">
          <DashboardHeader dict={dict} />
          <main className="w-full flex-1 overflow-auto">
            <DashboardContent 
              dict={dict as AdminDictionary} 
              stats={stats} 
              lang={lang} 
              activities={recentActivities} 
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
