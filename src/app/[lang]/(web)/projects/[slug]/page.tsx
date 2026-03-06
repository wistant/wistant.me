import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { getPageMetadata, SITE_CONFIG } from "@/config/metadata";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { allProjects } from "content-collections";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { ProjectStickyHeader } from "@/components/projects/project-sticky-header";

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
    title: project.title[lang],
    description: project.description[lang],
    url: `/${lang}/projects/${slug}`,
    // Fire our cool Edge Satori Architecture through the API
    image: project.image ? `${SITE_CONFIG.url}/api/og?type=project&img=${encodeURIComponent(project.image)}` : undefined,
  };

  return getPageMetadata(lang, pageSeo);
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { lang, slug } = await params;
  
  // Get base metadata from projects.tsx
  const project = projectsData.find((p) => p.slug === slug);
  
  // Get rich content from MDX collections
  const post = allProjects.find((p) => p.slug === slug && p.lang === lang);

  if (!project) {
    notFound();
  }

  // Find github and live links
  const sourceLink = project.links?.find(l => l.type === "Source");
  const websiteLink = project.links?.find(l => l.type === "Website");

  return (
    <>
      <ProjectStickyHeader title={project.title[lang]} lang={lang} />
      <div className="min-h-screen bg-background relative pt-16 md:pt-20">
        <JsonLd
        type="SoftwareSourceCode"
        title={project.title[lang]}
        description={project.description[lang]}
        url={sourceLink?.href || `/${lang}/projects/${slug}`}
        image={project.image}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <Button
            variant="ghost"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors -ml-4"
          >
            <Link href={`/${lang}/projects`}>
              <ArrowLeft className="size-4" />
              {lang === "fr" ? "Retour aux projets" : "Back to Projects"}
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cal tracking-tighter mb-6 text-balance">
            {project.title[lang]}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl text-balance">
            {project.description[lang]}
          </p>
        </div>

        {project.image && (
          <div className="relative w-full aspect-21/9 md:aspect-3/1 overflow-hidden rounded-3xl border border-border mb-12 shadow-sm">
            <Image
              src={project.image}
              alt={project.title[lang]}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Main Content (MDX) */}
          <main className="flex-1 min-w-0">
            {post ? (
              <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-cal prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:shadow-sm">
                <MDXRemote
                  source={post.content ?? ""}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkCodeMeta],
                    },
                  }}
                />
              </div>
            ) : (
              <div className="py-20 text-center border rounded-2xl bg-muted/20 border-border/50">
                <p className="text-muted-foreground">
                  {lang === "fr" 
                    ? "L'étude de cas détaillée pour ce projet est en cours de rédaction."
                    : "The detailed case study for this project is currently being written."}
                </p>
              </div>
            )}
          </main>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-28 flex flex-col gap-8">
              
              {/* Links Card */}
              <div className="flex flex-col gap-3 p-6 rounded-3xl bg-card border border-border shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  {lang === "fr" ? "Ressources" : "Resources"}
                </h3>
                
                {websiteLink && (
                  <Button asChild className="w-full justify-between group rounded-xl" size="lg">
                    <a href={websiteLink.href} target="_blank" rel="noopener noreferrer">
                      <span>{lang === "fr" ? "Voir le site" : "Visit Website"}</span>
                      <ArrowUpRight className="size-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                )}
                
                {sourceLink && (
                  <Button asChild variant={websiteLink ? "outline" : "default"} className="w-full justify-between group rounded-xl" size="lg">
                    <a href={sourceLink.href} target="_blank" rel="noopener noreferrer">
                      <span>{lang === "fr" ? "Code source" : "Source Code"}</span>
                      <Github className="size-4 opacity-70 group-hover:scale-110 transition-transform" />
                    </a>
                  </Button>
                )}

                {(!websiteLink && !sourceLink) && (
                  <p className="text-sm text-muted-foreground italic">
                    {lang === "fr" ? "Liens privés/confidentiels" : "Links are private/confidential"}
                  </p>
                )}
              </div>

              {/* Stack Card */}
              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-muted/30 border border-border/50">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  {lang === "fr" ? "Technologies" : "Tech Stack"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-background text-foreground px-3 py-1.5 rounded-lg text-sm border font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date / Metadata Info */}
              <div className="flex justify-between items-center py-4 border-t border-border/50">
                <span className="text-muted-foreground text-sm">
                  {lang === "fr" ? "Date de sortie" : "Release Date"}
                </span>
                <span className="font-medium text-sm">
                  {project.dates}
                </span>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
    </>
  );
}
