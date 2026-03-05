import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { getPageMetadata, SITE_CONFIG } from "@/config/metadata";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Language = "en" | "fr";

interface ProjectSlugPageProps {
  params: Promise<{ slug: string; lang: Language }>;
}

export async function generateStaticParams() {
  return projectsData.flatMap((project) =>
    ["en", "fr"].map((lang) => ({
      slug: project.slug,
      lang,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProjectSlugPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return getPageMetadata(lang);
  }

  const pageSeo = {
    title: project.seo.title[lang],
    description: project.seo.description[lang],
    url: `/${lang}/projects/${slug}`,
    // Fire our cool Edge Satori Architecture through the API
    image: project.image ? `${SITE_CONFIG.url}/api/og?type=project&img=${encodeURIComponent(project.image)}` : undefined,
  };

  return getPageMetadata(lang, pageSeo);
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { lang, slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background relative pt-16 md:pt-20">
      <JsonLd
        type="SoftwareSourceCode"
        title={project.title[lang]}
        description={project.description[lang]}
        url={project.links?.[0]?.href || `/${lang}/projects/${slug}`} // Provide the repository or project link
        image={project.image}
      />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link href={`/${lang}/projects`}>
              Back to Projects
            </Link>
          </Button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          {project.title[lang]}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {project.description[lang]}
        </p>

        {project.image && (
          <div className="relative w-full h-96 overflow-hidden rounded-lg border border-border mb-8">
            <Image
              src={project.image}
              alt={project.title[lang]}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold">Technologies Used</h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="bg-muted text-muted-foreground px-3 py-1 rounded-md text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
