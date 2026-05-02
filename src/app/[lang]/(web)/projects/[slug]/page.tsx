import { allProjects } from "content-collections";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { Metadata } from "next";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { remarkImageSize } from "@/lib/remark-image-size";
import rehypePrettyCode from "rehype-pretty-code";
import { getDictionary } from "@/lib/dictionary";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

interface ProjectSlugPageProps {
  params: Promise<{ slug: string; lang: Language }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
    lang: project.lang || "en",
  }));
}

export async function generateMetadata({
  params,
}: ProjectSlugPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = allProjects.find((p) => p.slug === slug && p.lang === lang);

  if (!project) {
    return getPageMetadata(lang);
  }

  const pageSeo = {
    title: project.title,
    description: project.description,
    keywords: project.tags ?? [],
    url: `/${lang}/projects/${slug}`,
    image: project.image,
  };

  return getPageMetadata(lang, pageSeo);
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { lang, slug } = await params;
  
  let project = allProjects.find((p) => p.slug === slug && p.lang === lang);
  if (!project && lang !== "en") {
    project = allProjects.find((p) => p.slug === slug && p.lang === "en");
  }

  if (!project) notFound();

  const currentIndex = allProjects.findIndex(p => p.slug === slug && (p.lang === lang || p.lang === "en"));
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined;

  const dict = await getDictionary(lang);

  const projectData = {
    slug: project.slug,
    title: project.title,
    description: project.description,
    images: project.images || [],
    image: project.image,
    date: project.dates,
    category: project.category,
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 min-h-screen">
      <ProjectDetailClient
        project={projectData}
        dict={dict}
        lang={lang}
        prevProject={prevProject ? { slug: prevProject.slug, title: prevProject.title } : undefined}
        nextProject={nextProject ? { slug: nextProject.slug, title: nextProject.title } : undefined}
      >
          <MDXRemote
            source={project.content ?? ""}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkCodeMeta, remarkImageSize],
                rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
              },
            }}
          />
      </ProjectDetailClient>
    </main>
  );
}
