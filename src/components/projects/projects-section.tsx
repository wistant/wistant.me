import BlurFade from "@/components/ui/magicui/blur-fade";
import { ProjectCard } from "@/components/projects/project-card";
import { OpenSourceCard } from "@/components/projects/open-source-card";
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
  const sortedProjects = getProjectsByLang(lang);
  const projects = limit ? sortedProjects.slice(0, limit) : sortedProjects;

  const clientProjects = projects.filter((p) => p.category === "client");
  const personalProjects = projects.filter((p) => p.category === "personal");
  const openSourceProjects = projects.filter((p) => p.category === "opensource");

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

        {/* Selected Client Work (Contributions et réalisations) */}
        {clientProjects.length > 0 && (
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <h3 className="text-xl md:text-2xl font-bold font-clash">Client Work</h3>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            {/* Grille flexible adaptée à 608px : 1 colonne par défaut, 2 si la place */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full mx-auto gap-x-6 gap-y-12">
              {clientProjects.map((project, id) => {
                const projectLinks = project.links?.map((link) => ({
                  ...link,
                  icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                })) || [];

                return (
                  <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 12 + id * 0.05} className="w-full">
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
          </div>
        )}

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <h3 className="text-xl md:text-2xl font-bold font-clash">Personal Projects</h3>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            {/* Grille flexible adaptée à 608px : 1 colonne par défaut, 2 si la place */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full mx-auto gap-x-6 gap-y-12">
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
          </div>
        )}

        {/* Open Source Contributions (Grille de Dépôts) */}
        {openSourceProjects.length > 0 && (
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <h3 className="text-xl md:text-2xl font-bold font-clash">Open Source</h3>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            {/* Grille OS réduite à un stack vertical fluide sur petite largeur */}
            <div className="flex flex-col w-full mx-auto gap-y-6">
              {openSourceProjects.map((project, id) => {
                const projectLinks = project.links?.map((link) => ({
                  ...link,
                  icon: link.type.toLowerCase() === "source" || link.type.toLowerCase() === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />,
                })) || [];

                return (
                  <BlurFade key={project.slug} delay={BLUR_FADE_DELAY * 16 + id * 0.05} className="w-full">
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
          </div>
        )}

        <div className="flex justify-center pt-10">
          <Link href={`/${lang}/projects`}>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full transition-all group px-6 h-10 text-sm font-semibold text-muted-foreground bg-muted/40 border border-border/40 hover:bg-muted/80 hover:text-foreground shadow-sm hover:shadow"
            >
              {dict.projects.viewAll || "View all projects"}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
