import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { TagFilter } from "@/components/blog/tag-filter";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import React, { Suspense } from "react";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";

type Language = "en" | "fr";

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
  searchParams,
}: {
  params: Promise<{ lang: Language }>;
  searchParams: Promise<{ tag?: string }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);
  const BLUR_FADE_DELAY = 0.04;

  // Extract unique tags from active projects
  const activeProjects = projectsData.filter((p) => p.active);
  const allTags = [
    dict.ui.allFilter,
    ...Array.from(
      new Set(
        activeProjects.flatMap(
          (project) => project.technologies.filter(Boolean) as string[],
        ),
      ),
    ).sort(),
  ];

  // Filter logic
  const selectedTag = resolvedSearchParams.tag || dict.ui.allFilter;
  const filteredProjects =
    selectedTag === dict.ui.allFilter
      ? activeProjects
      : activeProjects.filter((project) =>
          project.technologies.includes(selectedTag),
        );

  // Compute tag counts
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === dict.ui.allFilter) {
        acc[tag] = activeProjects.length;
      } else {
        acc[tag] = activeProjects.filter((project) =>
          project.technologies.includes(tag),
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen bg-background relative pt-12 md:pt-16">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 z-0 w-full h-[300px] mask-[linear-gradient(to_top,transparent_10%,black_80%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* Header Section */}
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              {dict.projects.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl">
              {dict.projects.seo.description}
            </p>
          </div>
        </div>

        {/* Filters */}
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0 py-8 md:py-12">
        <Suspense
          fallback={
            <div className="text-center py-20 text-muted-foreground">
              {lang === "fr" ? "Chargement des projets..." : "Loading projects..."}
            </div>
          }
        >
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {filteredProjects.map((project, id) => (
                <BlurFade
                  key={project.slug}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                  className="h-full"
                >
                  <ProjectCard
                    href={project.href}
                    title={project.title[lang]}
                    description={project.description[lang]}
                    dates={project.dates}
                    tags={project.technologies.filter((t): t is string =>
                      Boolean(t),
                    )}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                    className="h-full"
                  />
                </BlurFade>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl">
              {lang === "fr"
                ? "Aucun projet trouvé avec cette technologie."
                : "No projects found using this technology."}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
