import { getProjectsByLang } from "@/data/projects";
import { Icons } from "@/components/ui/icons";
import { ProjectCard } from "@/components/projects/project-card";
import { OpenSourceCard } from "@/components/projects/open-source-card";
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
  const dict = await getDictionary(lang);
  return getPageMetadata(lang, dict.projects.seo);
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
  
  const clientProjects = allProjects.filter((p) => p.category === "client");
  const openSourceProjects = allProjects.filter((p) => p.category === "opensource");
  const personalProjects = allProjects.filter((p) => p.category === "personal");

  return (
    <main className="min-h-dvh flex flex-col gap-6 relative px-6 lg:px-0 pt-12 pb-17 max-w-[608px] mx-auto">
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
              
              {/* Selected Client Work */}
              {clientProjects.length > 0 && (
                <section className="flex flex-col gap-10">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-clash">Client Work</h2>
                    <div className="h-px flex-1 bg-border/50 translate-y-1" />
                  </div>
                  <div className="flex flex-col w-full mx-auto gap-y-16 mt-6">
                    {clientProjects.map((project, id) => {
                      const projectLinks = project.links?.map((link) => ({
                        ...link,
                        icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                      })) || [];

                      return (
                        <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 10 + id * 0.05} className="w-full">
                          <ProjectCard
                            category="client"
                            href={`/${lang}/projects/${project.slug}`}
                            title={project.title || ""}
                            description={project.description || ""}
                            dates={project.dates || ""}
                            tags={project.tags ?? []}
                            image={project.image}
                            video={project.video}
                            links={projectLinks}
                            className="w-full"
                          />
                        </BlurFade>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Open Source Contributions */}
              {openSourceProjects.length > 0 && (
                <section className="flex flex-col gap-10">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-clash">Open Source</h2>
                    <div className="h-px flex-1 bg-border/50 translate-y-1" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 w-full mx-auto gap-x-6 gap-y-6 mt-6">
                    {openSourceProjects.map((project, id) => {
                      const projectLinks = project.links?.map((link) => ({
                        ...link,
                        icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                      })) || [];

                      return (
                        <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 12 + id * 0.05} className="w-full">
                          <OpenSourceCard
                            title={project.title || ""}
                            description={project.description || ""}
                            dates={project.dates || ""}
                            tags={project.tags ?? []}
                            links={projectLinks}
                          />
                        </BlurFade>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Personal Projects */}
              {personalProjects.length > 0 && (
                <section className="flex flex-col gap-10">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-clash">Personal Projects</h2>
                    <div className="h-px flex-1 bg-border/50 translate-y-1" />
                  </div>
                  <div className="flex flex-col w-full mx-auto gap-y-16 mt-6">
                    {personalProjects.map((project, id) => {
                      const projectLinks = project.links?.map((link) => ({
                        ...link,
                        icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                      })) || [];

                      return (
                        <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 14 + id * 0.05} className="w-full">
                          <ProjectCard
                            category="personal"
                            href={`/${lang}/projects/${project.slug}`}
                            title={project.title || ""}
                            description={project.description || ""}
                            dates={project.dates || ""}
                            tags={project.tags ?? []}
                            image={project.image}
                            video={project.video}
                            links={projectLinks}
                            className="w-full"
                          />
                        </BlurFade>
                      );
                    })}
                  </div>
                </section>
              )}

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
