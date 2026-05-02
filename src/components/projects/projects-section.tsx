import BlurFade from "@/components/ui/magicui/blur-fade";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjectsByLang } from "@/data/projects";
import { Icons } from "@/components/ui/icons";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

import type { Language } from "@/types/locale";

export default async function ProjectsSection({
  limit,
  lang,
}: {
  limit?: number;
  lang: Language;
}) {
  const dict = await import("@/lib/dictionary").then((m) => m.getDictionary(lang));
  const sortedProjects = getProjectsByLang(lang).sort((a, b) => (a.order || 99) - (b.order || 99));
  
  // Préférer les projets marqués "featured", ou fallback sur 4 projets (pas d'open source)
  const featured = sortedProjects.filter(p => p.featured);
  const fallback = sortedProjects.filter(p => p.category !== "opensource").slice(0, 4);
  const rawDisplay = featured.length > 0 ? featured : fallback;
  const displayProjects = limit ? rawDisplay.slice(0, limit) : rawDisplay;

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-20 max-w-[608px] mx-auto w-full px-6 lg:px-0">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
            <div className="border border-border bg-black z-10 rounded-xl px-4 py-1 shadow-sm">
              <span className="text-white text-sm font-medium uppercase tracking-widest">
                {dict.projects.title}
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-clash italic text-center uppercase">
              {dict.projects.title}
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed max-w-[700px] text-center font-cabinet">
              {dict.projects.seo.description}
            </p>
          </div>
        </div>

        {displayProjects.length > 0 && (
          <div className="relative flex flex-col">
            {/* Project list */}
            <div className="flex flex-col w-full mx-auto gap-y-16">
              {displayProjects.map((project, id) => {
                const projectLinks = project.links?.map((link) => ({
                  ...link,
                  icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                })) || [];

                return (
                  <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 12 + id * 0.05} className="w-full">
                    <ProjectCard
                      category={project.category as "client" | "opensource" | "personal"}
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

            {/* Gradient Blur Overlay — se fond avec le background */}
            <div className="relative mt-0 h-32 -translate-y-32 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none" />

            {/* View All Button — centré sous le fondu */}
            <div className="flex justify-center -mt-16">
              <Link href={`/${lang}/projects`}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full transition-all group px-8 h-12 text-sm font-semibold text-foreground bg-background/80 backdrop-blur-md border border-border/50 hover:bg-muted/80 shadow-lg hover:shadow-xl"
                >
                  {dict.projects.viewAll || "View all projects"}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
