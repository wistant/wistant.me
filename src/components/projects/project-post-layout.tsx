import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Language } from "@/types/locale";
import { getDictionary } from "@/lib/dictionary";
import { TechBadge } from "@/components/mdx/tech-badge";

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  image?: string;
  dates?: string;
  category?: string;
  tags?: string[];
  links?: { type: string; href: string }[];
}

export default async function ProjectPostLayout({
  project,
  lang,
  children,
}: {
  project: ProjectData;
  lang: Language;
  children: React.ReactNode;
}) {
  const dict = await getDictionary(lang);
  const projectDict = (dict.projects || {}) as unknown as Record<string, string>;

  return (
    <article className="max-w-[608px] mx-auto py-12 min-h-screen flex flex-col gap-10 pb-32">
      {/* ← Back Link */}
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit group -mb-4"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{projectDict.backToProjects || "Projects"}</span>
      </Link>

      {/* ── HERO HEADER ── */}
      <header className="flex flex-col gap-4">
        {/* Category Badge */}
        {project.category && (
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
            {project.category} · {project.dates}
          </span>
        )}

        {/* Title */}
        <h1 className="font-clash font-bold text-3xl sm:text-4xl tracking-tight text-foreground leading-tight">
          {project.title}
        </h1>

        {/* Description */}
        {project.description && (
          <p className="text-base text-muted-foreground font-serif italic leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <TechBadge key={tag} name={tag} />
            ))}
          </div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-1">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline underline-offset-[3px] decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-foreground transition-colors"
              >
                {link.type === "github" || link.type === "source" ? (
                  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                ) : (
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                )}
                {link.type === "github" || link.type === "source" ? "Source" : "Website"}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO IMAGE ── */}
      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden border border-border/50 bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ── MDX CONTENT ── */}
      <main className="prose prose-neutral dark:prose-invert font-sans max-w-none
        prose-p:leading-relaxed prose-p:mb-6
        prose-headings:font-clash prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mb-8 prose-h1:font-clash
        prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-2xl
        prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl
        prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700 hover:prose-a:decoration-foreground transition-colors prose-a:underline-offset-[3px]
        prose-li:marker:text-neutral-400 dark:prose-li:marker:text-neutral-600
        prose-img:rounded-md prose-img:border prose-img:border-border prose-img:shadow-sm">
        {children}
      </main>
    </article>
  );
}
