import { notFound } from "next/navigation";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { Metadata } from "next";
import { allProjects } from "content-collections";
import { getDictionary } from "@/lib/dictionary";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

interface ProjectSlugPageProps {
  params: Promise<{ slug: string; lang: Language }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
    lang: project.lang,
  }));
}

export async function generateMetadata({
  params,
}: ProjectSlugPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  let project = allProjects.find((p) => p.slug === slug && p.lang === lang);
  if (!project && lang !== "en") {
     project = allProjects.find((p) => p.slug === slug && p.lang === "en");
  }

  if (!project) {
    return getPageMetadata(lang);
  }

  const pageSeo = {
    title: project.title || "",
    description: project.description || "",
    keywords: project.tags || [],
    url: `/${lang}/projects/${slug}`,
    image: project.image ? (project.image.startsWith("/") ? project.image : `/project/${project.image}`) : undefined,
  };

  return getPageMetadata(lang, pageSeo);
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  
  let project = allProjects.find((p) => p.slug === slug && p.lang === lang);
  if (!project && lang !== "en") {
     project = allProjects.find((p) => p.slug === slug && p.lang === "en");
  }

  if (!project) {
    notFound();
  }

  // Pre-calculate navigation data
  const sortedProjects = allProjects.filter(p => p.lang === lang || (p.lang === 'en' && !allProjects.some(x => x.slug === p.slug && x.lang === lang)));
  const projectIndex = sortedProjects.findIndex((p) => p.slug === slug);
  
  const totalProjects = sortedProjects.length;
  const prev = projectIndex !== -1 ? sortedProjects[(projectIndex - 1 + totalProjects) % totalProjects] : undefined;
  const next = projectIndex !== -1 ? sortedProjects[(projectIndex + 1) % totalProjects] : undefined;

  const websiteLink = project.links?.find(l => ["website", "demo", "live"].includes(l.type.toLowerCase()));
  const repoLink = project.links?.find(l => ["github", "source", "repo"].includes(l.type.toLowerCase()));

  // Map Content Collections project to the interface expected by ProjectDetailClient
  const projectData = {
    slug: project.slug,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    techStack: project.tags || [],
    tools: project.tools || [],
    status: project.status,
    demoUrl: websiteLink?.href,
    repoUrl: repoLink?.href,
    startDate: project.dates, // using dates as startDate string
    role: project.role,
    team: project.team,
    highlights: project.highlights || [],
    category: project.tags?.[0], // using first tag as category
    images: project.images || (project.image ? [project.image] : []),
    features: (project.features || []).map(f => ({
        title: f.title,
        items: f.items || []
    })),
    installation: (project.installation || []).map(i => ({
        title: i.title,
        code: i.code,
        type: i.type
    })),
    challengesAndSolutions: (project.challengesAndSolutions || []).map(cs => ({
        problem: cs.problem,
        solution: cs.solution
    }))
  };

  return (
    <main className="min-h-dvh py-12 pb-24 sm:py-20 px-6 max-w-2xl mx-auto relative z-10">
      <ProjectDetailClient 
        project={projectData} 
        dict={dict} 
        lang={lang}
        prevProject={prev ? { slug: prev.slug, title: prev.title } : undefined}
        nextProject={next ? { slug: next.slug, title: next.title } : undefined}
      />
    </main>
  );
}
