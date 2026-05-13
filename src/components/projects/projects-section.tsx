import BlurFade from "@/components/ui/magicui/blur-fade";
import { getAllProjects } from "@/lib/mdx-registry";
import { ProjectCard } from "./project-card";
import { Icons } from "@/components/ui/icons";
import React from "react";

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
  
  // Directly fetch and filter projects from our new native registry
  const allProjects = getAllProjects();
  const sortedProjects = allProjects.filter(p => p.active !== false);

  // Prefer featured projects, otherwise fallback to first N non-open-source
  const featured = sortedProjects.filter(p => p.featured);
  const fallback = sortedProjects.filter(p => p.category !== "opensource");
  const rawDisplay = featured.length > 0 ? featured : fallback;
  const displayProjects = limit ? rawDisplay.slice(0, limit) : rawDisplay;

  if (displayProjects.length === 0) return null;

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-20 w-full">
        {/* Header */}
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

        {/* Projects list — high-density grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          {displayProjects.map((project, id) => {
            const projectLinks = project.links?.map((link: { type: string; href: string }) => ({
              ...link,
              icon: (link.type?.toLowerCase() === "source" || link.type?.toLowerCase() === "github")
                ? <Icons.github className="size-3" />
                : <Icons.globe className="size-3" />,
            })) || [];

            return (
              <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 12 + id * 0.05} className="w-full">
                <ProjectCard
                  href={`/${lang}/projects/${project.slug}`}
                  title={project.title || ""}
                  description={project.description || ""}
                  dates={project.dates || ""}
                  tags={project.tags ?? []}
                  image={project.image}
                  video={project.video}
                  links={projectLinks}
                  // index={(id + 1).toString().padStart(2, "0")}
                  className="h-full"
                />
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
