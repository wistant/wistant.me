import { getProjectsByLang } from "@/data/projects";
import { Icons } from "@/components/ui/icons";
import { ProjectCard } from "@/components/projects/project-card";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import React, { Suspense } from "react";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return getPageMetadata(lang);
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const BLUR_FADE_DELAY = 0.04;

  const allProjects = getProjectsByLang(lang);
  
  // The sequence mapping sets the visual rendering order of the project categories on this page.
  const PROJECT_CATEGORY_ORDER = ["personal", "opensource", "client"] as const;

  const sections = PROJECT_CATEGORY_ORDER.map(categoryName => {
    let title = "";
    if (categoryName === "personal") title = "Personal Projects";
    if (categoryName === "opensource") title = "Open Source";
    if (categoryName === "client") title = "Client Work";

    return {
      categoryName,
      title,
      items: allProjects.filter((p) => p.category === categoryName)
    };
  });

  return (
    <main className="min-h-dvh flex flex-col gap-6 relative">
      {/* Hero Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.45}
          flickerChance={0.05}
        />
      </div>

      {/* Header Section */}
      <div className="flex flex-col gap-6 justify-center relative z-10 pt-8 pb-10">
        <div className="w-full">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl md:text-5xl tracking-tighter text-foreground font-clash">
              {dict.projects.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base font-light">
              {dict.projects.seo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Categorized Projects Grid */}
      <div className="w-full relative z-10 pb-32">
        <Suspense
          fallback={
            <div className="text-center py-20 text-muted-foreground">
              {dict.ui.loadingArticles}
            </div>
          }
        >
          {allProjects.length > 0 ? (
            <div className="flex flex-col gap-y-24">
              
              {sections.map((section) => {
                if (section.items.length === 0) return null;

                return (
                  <section key={section.categoryName} className="flex flex-col gap-10">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-clash">{section.title}</h2>
                      <div className="h-px flex-1 bg-border/50 translate-y-1" />
                    </div>
                    <div className="flex flex-col w-full mx-auto gap-y-16 mt-6">
                      {section.items.map((project, id) => {
                        const projectLinks = project.links?.map((link) => ({
                          ...link,
                          icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                        })) || [];

                        return (
                          <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 10 + id * 0.05} className="w-full">
                            <ProjectCard
                              category={section.categoryName}
                              href={`/${lang}/projects/${project.slug}`}
                              title={project.title || ""}
                              description={project.description || ""}
                              dates={project.dates || ""}
                              tags={project.tags ?? []}
                              image={project.image}
                              images={(project as Record<string, unknown>).images as string[]}
                              video={project.video}
                              links={projectLinks}
                              className="w-full"
                            />
                          </BlurFade>
                        );
                      })}
                    </div>
                  </section>
                );
              })}

            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl">
              {dict.ui.noArticlesFound}
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}
