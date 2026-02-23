import { Metadata } from "next";
import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/portfolio/project-card";
import BlurFade from "@/components/magicui/blur-fade";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | Wistant Kode",
  description: "A collection of my projects and creations.",
  openGraph: {
    title: "Projects | Wistant Kode",
    description: "A collection of my projects and creations.",
    type: "website",
    url: `${DATA.url}/projects`,
    images: [
      {
        url: "/og-images/projects-og-img.png",
        width: 1200,
        height: 630,
        alt: "Projects | Wistant Kode",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects |  Wistant Kode",
    description: "A collection of my projects and creations.",
    images: ["/og-images/projects-og-img.png"],
  },
};

interface Project {
  title: string;
  href?: string;
  dates: string;
  technologies: readonly string[];
  description: string;
  image?: string;
  video?: string;
  links?: readonly {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export default function ProjectsPage() {
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen bg-background relative">
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
      <div className="pt-32 pb-10 px-6 border-b border-border flex flex-col gap-6 justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl md:text-5xl tracking-tighter font-cal">
              Projects & Creations
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl">
              A collection of projects I&apos;ve built, ranging from simple tools to complex web applications and platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {(DATA.projects as unknown as Project[]).map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              className="h-full"
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
                className="h-full"
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}
