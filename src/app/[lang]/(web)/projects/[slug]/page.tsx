import { notFound } from "next/navigation";
import { getPageMetadata, SITE_CONFIG } from "@/config/metadata";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Github, Home, LayoutGrid } from "lucide-react";
import { allProjects } from "content-collections";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { Icons } from "@/components/ui/icons";

const getTechIcon = (tech: string) => {
  const normalized = tech.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalized.includes("react")) return <Icons.react className="size-4" />;
  if (normalized.includes("next")) return <Icons.nextjs className="size-4" />;
  if (normalized.includes("tailwind")) return <Icons.tailwindcss className="size-4" />;
  if (normalized.includes("typescript") || normalized.includes("ts")) return <Icons.typescript className="size-4" />;
  if (normalized.includes("framer")) return <Icons.framermotion className="size-4" />;
  if (normalized.includes("nest")) return <Icons.nestjs className="size-4" />;
  if (normalized.includes("postgres")) return <Icons.postgresql className="size-4" />;
  if (normalized.includes("prisma")) return <Icons.prisma className="size-4" />;
  if (normalized.includes("linux")) return <Icons.linux className="size-4" />;
  if (normalized.includes("vercel")) return <Icons.vercel className="size-4" />;
  return null;
};

type Language = "en" | "fr";

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
  const project = allProjects.find((p) => p.slug === slug && p.lang === lang);

  if (!project) {
    return getPageMetadata(lang);
  }

  const pageSeo = {
    title: project.title || "",
    description: project.description || "",
    keywords: project.tags || [],
    url: `/${lang}/projects/${slug}`,
    image: project.image ? `${SITE_CONFIG.url}/api/og?type=project&img=${encodeURIComponent(project.image)}` : undefined,
  };

  return getPageMetadata(lang, pageSeo);
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { lang, slug } = await params;
  
  // Get rich content and metadata from MDX collections
  const project = allProjects.find((p) => p.slug === slug && p.lang === lang);

  if (!project) {
    notFound();
  }

  // Find github and live links safely with lowercase match
  const sourceLink = project.links?.find(l => l.type.toLowerCase() === "source" || l.type.toLowerCase() === "github");
  const websiteLink = project.links?.find(l => l.type.toLowerCase() === "website");

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.35}
          flickerChance={0.05}
        />
      </div>
      <div className="min-h-screen bg-transparent relative pt-16 md:pt-20 z-10">
        <JsonLd
        type="SoftwareSourceCode"
        title={project.title || ""}
        description={project.description || ""}
        url={sourceLink?.href || `/${lang}/projects/${slug}`}
        image={project.image}
      />
      
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cal tracking-tighter mb-6 text-balance">
            {project.title || ""}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl text-balance">
            {project.description || ""}
          </p>
        </div>

        {project.image && (
          <div className="relative w-full aspect-video overflow-hidden rounded-3xl mb-12 flex items-center justify-center">
            <Image
              src={project.image}
              alt={project.title || "Project thumbnail"}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Main Content (MDX) */}
          <main className="flex-1 min-w-0">
            {project.content ? (
              <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-cal prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
                <MDXRemote
                  source={project.content}
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
            <div className="sticky top-20 flex flex-col gap-4">

              {/* Navigation Card */}
              <div className="flex flex-col gap-2 p-4 rounded-3xl bg-card/60 backdrop-blur-md border border-border/60 shadow-sm">
                <Button variant="ghost" asChild className="justify-start gap-3 w-full rounded-xl hover:bg-muted/50 transition-colors">
                  <Link href={`/${lang}`}>
                    <Home className="size-4 text-muted-foreground" />
                    <span>{lang === "fr" ? "Accueil" : "Home"}</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start gap-3 w-full rounded-xl hover:bg-muted/50 transition-colors">
                  <Link href={`/${lang}/projects`}>
                    <LayoutGrid className="size-4 text-muted-foreground" />
                    <span>{lang === "fr" ? "Tous les Projets" : "All Projects"}</span>
                  </Link>
                </Button>
              </div>
              
              {/* Links Card */}
              <div className="flex flex-col gap-3 p-4 rounded-3xl bg-card/60 backdrop-blur-md border border-border/60 shadow-sm">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1">
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
              <div className="flex flex-col gap-3 p-4 rounded-3xl bg-card/60 backdrop-blur-md border border-border/60 shadow-sm">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  {lang === "fr" ? "Technologies" : "Tech Stack"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-2 rounded-xl text-xs border font-medium shadow-sm transition-colors hover:bg-muted/50"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
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
