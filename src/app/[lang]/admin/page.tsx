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

  const stats = {
    totalViews: 12500,
    totalProjects: projects.length,
    totalPosts: blog.length,
    activeUsers: 2,
  };

  const recentActivities = blog.slice(0, 5).map(post => ({
    action: "Article publié",
    item: post.frontmatter.title as string,
    time: new Date(post.lastModified).toLocaleDateString(),
    image: post.frontmatter.image as string || post.frontmatter.thumbnail as string
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
