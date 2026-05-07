import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

    return (
        <div className="flex flex-col gap-10 max-w-[608px] mx-auto px-6 sm:px-0">
            {/* Minimal Navigation Header */}
            <div className="flex flex-col gap-6">
                <Link
                    href={`/${lang}/projects`}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{t.backToProjects || "projects"}</span>
                </Link>
            </div>

            {/* ORGANIC MDX CONTENT - USER DRIVEN */}
            <article className="prose prose-neutral dark:prose-invert font-sans max-w-none 
                prose-p:leading-relaxed prose-p:mb-6
                prose-headings:font-clash prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mb-8 prose-h1:font-clash
                prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-2xl
                prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl
                prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700 hover:prose-a:decoration-foreground transition-colors prose-a:underline-offset-[3px]
                prose-li:marker:text-neutral-400 dark:prose-li:marker:text-neutral-600
                prose-img:rounded-md prose-img:border prose-img:border-border prose-img:shadow-sm
            ">
                {children}
            </article>

            {/* Next/Prev Navigation - Subtle Industrial */}
            <section className="pt-12 border-t border-border mt-12 mb-20 px-4 sm:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="min-w-0">
                        {prevProject ? (
                            <Link
                                href={`/${lang}/projects/${prevProject.slug}`}
                                className="group flex flex-col gap-2 hover:opacity-70 transition-opacity h-full"
                            >
                                <div className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                                    {t.previous || "Previous"}
                                </div>
                                <span className="font-bold text-base truncate">
                                    {prevProject.title}
                                </span>
                            </Link>
                        ) : null}
                    </div>
                    <div className="min-w-0 text-right">
                        {nextProject ? (
                            <Link
                                href={`/${lang}/projects/${nextProject.slug}`}
                                className="group flex flex-col items-end gap-2 hover:opacity-70 transition-opacity h-full"
                            >
                                <div className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                                    {t.next || "Next"}
                                </div>
                                <span className="font-bold text-base truncate">
                                    {nextProject.title}
                                </span>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    );
}
