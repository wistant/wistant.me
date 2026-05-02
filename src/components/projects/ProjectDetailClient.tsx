import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectData {
    slug: string;
    title: string;
    description: string;
    image?: string;
    images: string[];
    date?: string;
    category?: string;
}

interface ProjectDetailClientProps {
    project: ProjectData;
    dict: Record<string, unknown>;
    lang: string;
    prevProject?: { slug: string; title: string };
    nextProject?: { slug: string; title: string };
    children: React.ReactNode;
}

export default function ProjectDetailClient({
    project,
    dict,
    lang,
    prevProject,
    nextProject,
    children,
}: ProjectDetailClientProps) {
    const projectDict = (dict.projects || {}) as Record<string, string>;
    const t = projectDict;
    
    const heroImage = project.image || project.images?.[0];

    return (
        <div className="flex flex-col gap-10">
            {/* Header section matching Blog style */}
            <div className="flex flex-col gap-6">
                <Link
                    href={`/${lang}/projects`}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{t.backToProjects || "projects"}</span>
                </Link>
                
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-pretty">
                        {project.title}
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                    <span className="text-foreground font-medium">@wistant</span>
                    <span>|</span>
                    <span className="uppercase">{project.category || "General"}</span>
                    {project.date && (
                        <>
                            <span>|</span>
                            <span>{project.date}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Singular Hero Image - Static industrial look */}
            {heroImage && (
                <div className="w-full">
                    <div className="relative aspect-2/1 w-full border border-border/50 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                       <Image 
                         src={heroImage} 
                         alt={project.title} 
                         fill 
                         className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                         priority 
                       />
                    </div>
                </div>
            )}

            {/* MDX CONTENT */}
            <article className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-h1:hidden
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg
                prose-strong:text-foreground prose-strong:font-bold
                prose-img:rounded-none prose-img:border prose-img:border-border
                prose-code:before:content-none prose-code:after:content-none
            ">
                {children}
            </article>

            {/* Next/Prev Navigation */}
            <section className="pt-12 border-t border-border mt-12 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
                    <div className="bg-background min-w-0">
                        {prevProject ? (
                            <Link
                                href={`/${lang}/projects/${prevProject.slug}`}
                                className="group flex flex-col gap-3 p-8 hover:bg-muted/30 transition-all duration-500 h-full"
                            >
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <ChevronLeft className="size-3 group-hover:-translate-x-2 transition-transform" />
                                    {t.previous || "Previous"}
                                </div>
                                <span className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                    {prevProject.title}
                                </span>
                            </Link>
                        ) : <div className="p-8 h-full bg-background" />}
                    </div>
                    <div className="bg-background min-w-0 text-right">
                        {nextProject ? (
                            <Link
                                href={`/${lang}/projects/${nextProject.slug}`}
                                className="group flex flex-col items-end gap-3 p-8 hover:bg-muted/30 transition-all duration-500 h-full"
                            >
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {t.next || "Next"}
                                    <ChevronRight className="size-3 group-hover:translate-x-2 transition-transform" />
                                </div>
                                <span className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                    {nextProject.title}
                                </span>
                            </Link>
                        ) : <div className="p-8 h-full bg-background" />}
                    </div>
                </div>
            </section>
        </div>
    );
}
