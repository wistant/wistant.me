import { getCurrentLanguage } from "@/lib/dictionary";
import { getAllProjects } from "@/lib/mdx-registry";
import BlurFade from "@/components/ui/magicui/blur-fade";
import React, { Suspense } from "react";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import { ProjectItem } from "@/components/projects/project-item";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCurrentLanguage();
  return getPageMetadata(lang, {
    image: "/og.png",
    url: "/projects",
  });
}

export default async function ProjectsPage() {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();
  const BLUR_FADE_DELAY = 0.04;

  // Directly fetch and filter projects from our new native registry
  const allProjects = getAllProjects(lang);
  
  const sortedProjects = allProjects.filter(p => p.active !== false);
  
  // The sequence mapping sets the visual rendering order of the project categories on this page.
  const PROJECT_CATEGORY_ORDER = ["personal", "opensource", "client"] as const;

  const sections = PROJECT_CATEGORY_ORDER.map(categoryName => {
    let title = "";
    if (categoryName === "personal") title = dict.projects.categories.personal || "Personal Projects";
    if (categoryName === "opensource") title = dict.projects.categories.opensource || "Open Source";
    if (categoryName === "client") title = dict.projects.categories.freelance || "Client Work";

    return {
      categoryName,
      title,
      items: sortedProjects.filter((p) => p.category === categoryName)
    };
  }).filter(s => s.items.length > 0);

  return (
    <main className="max-w-2xl mx-auto py-20 min-h-screen px-4">
      {/* Header Section */}
      <div className="flex flex-col gap-6 justify-center relative z-10 pt-8 pb-4">
        <div className="w-full">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tighter text-foreground font-clash">
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
            <div className="flex flex-col gap-y-10 mt-12">
              
              {sections.map((section, sectionIdx) => (
                <section key={section.categoryName} className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">{section.title}</h2>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>
                  <div className="flex flex-col">
                    {section.items.map((project, id) => (
                      <BlurFade 
                        key={project.slug} 
                        delay={BLUR_FADE_DELAY * 10 + id * 0.05 + sectionIdx * 0.1} 
                        className="w-full"
                      >
                        <ProjectItem 
                          project={project}
                          lang={lang}
                        />
                      </BlurFade>
                    ))}
                  </div>
                </section>
              ))}

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
