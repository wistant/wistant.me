"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Feature {
    title: string;
    items: string[];
}

interface InstallationStep {
    title: string;
    code: string;
    type: string;
}

interface ChallengeSolution {
    problem: string;
    solution: string;
}

interface ProjectData {
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    tools: string[];
    status?: string;
    repoUrl?: string;
    demoUrl?: string;
    startDate?: string;
    customTimeline?: string;
    role?: string;
    team?: string;
    highlights: string[];
    category?: string;
    images: string[];
    features: Feature[];
    installation: InstallationStep[];
    challengesAndSolutions: ChallengeSolution[];
}

interface ProjectDetailClientProps {
    project: ProjectData;
    dict: Record<string, unknown>;
    lang: string;
    prevProject?: { slug: string; title: string };
    nextProject?: { slug: string; title: string };
}

export default function ProjectDetailClient({
    project,
    dict,
    lang,
    prevProject,
    nextProject,
}: ProjectDetailClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    const images = project.images || [];

    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [images.length]);

    const displayImage = images[currentIndex];
    
    // Fallback date string logic similar to original
    const dateStr = project.customTimeline || project.startDate || "";

    const projectDict = (dict.projects || {}) as Record<string, string>;
    const t = projectDict;
    const uiDict = (dict.ui || {}) as Record<string, string>;
    const pDict = (dict.project || {}) as Record<string, string>;

    return (
        <div className="flex flex-col gap-8">
            {/* Back Navigation */}
            <Link
                href={`/${lang}/projects`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 w-fit group"
            >
                <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
                {t.backToProjects}
            </Link>

            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    {project.category && (
                        <Badge variant="outline" className="text-xs">
                            {project.category}
                        </Badge>
                    )}
                    {project.status && (
                        <Badge
                            variant="outline"
                            className={
                                project.status === "completed"
                                    ? "text-xs border-green-500/30 text-green-700 dark:text-green-400"
                                    : "text-xs border-amber-500/30 text-amber-700 dark:text-amber-400"
                            }
                        >
                            {project.status === "completed" ? t.completed : t.inProgress}
                        </Badge>
                    )}
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    {project.title}
                </h1>
                <p className="text-muted-foreground text-lg">{project.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{dateStr}</span>
                    {project.team && <span>• {pDict.team || "Team"}: {project.team}</span>}
                    {project.role && <span>• {pDict.role || "Role"}: {project.role}</span>}
                </div>
            </div>

            {/* Project Image Carousel */}
            {images.length > 0 && !imageError && (
                <div className="relative w-full aspect-video sm:aspect-21/9 rounded-2xl overflow-hidden bg-muted border border-border">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={displayImage}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{
                                duration: 1,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                           <Image 
                             src={displayImage} 
                             alt={project.title} 
                             fill 
                             className="object-cover"
                             onError={() => setImageError(true)}
                           />
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3">
                {project.demoUrl && project.demoUrl !== "#" && (
                    <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <ExternalLink className="size-4" />
                        {uiDict.liveDemo || "Live Demo"}
                    </Link>
                )}
                {project.repoUrl && (
                    <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                    >
                        <Github className="size-4" />
                        {uiDict.sourceCode || "Source Code"}
                    </Link>
                )}
            </div>

            {/* Long Description */}
            {project.longDescription && (
                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold">{t.aboutThisProject}</h2>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                        {project.longDescription}
                    </p>
                </section>
            )}

            {/* Tech Stack */}
            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">{t.techStack}</h2>
                <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </section>

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold">{t.toolsUsed}</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tools?.map((tool) => (
                            <Badge key={tool} variant="outline" className="text-xs">
                                {tool}
                            </Badge>
                        ))}
                    </div>
                </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">{t.keyFeatures}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {project.features.map((feature) => (
                            <div
                                key={feature.title}
                                className="border border-border rounded-xl p-4 flex flex-col gap-3 bg-background"
                            >
                                <h3 className="font-semibold text-foreground">
                                    {feature.title}
                                </h3>
                                <ul className="space-y-2">
                                    {feature.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                                        >
                                            <span className="text-muted-foreground/50 mt-1.5 text-xs">▸</span>
                                            <span>{item.replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold">{t.highlights}</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                                {highlight}
                            </Badge>
                        ))}
                    </div>
                </section>
            )}

            {/* Installation */}
            {project.installation && project.installation.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">{t.installation}</h2>
                    {project.installation.map((step) => (
                        <div key={step.title} className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold text-muted-foreground">
                                {step.title}
                            </h3>
                            <pre className="bg-muted/50 dark:bg-muted/30 border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
                                <code>{step.code}</code>
                            </pre>
                        </div>
                    ))}
                </section>
            )}

            {/* Challenges & Solutions */}
            {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">{t.challengesSolutions}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {project.challengesAndSolutions.map((cs, idx) => (
                            <div
                                key={idx}
                                className="border border-border rounded-xl p-4 flex flex-col gap-3 bg-background"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                                        {t.challenge}
                                    </span>
                                    <p className="text-sm text-muted-foreground">{cs.problem}</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                        {t.solution}
                                    </span>
                                    <p className="text-sm text-muted-foreground">{cs.solution}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Next/Prev Navigation */}
            <section className="pt-12 sm:pt-16 border-t border-border/60 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                        {prevProject ? (
                            <Link
                                href={`/${lang}/projects/${prevProject.slug}`}
                                className="group flex flex-col gap-2 p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-muted/10 transition-all duration-300 h-full"
                            >
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                    <ChevronLeft className="size-3 group-hover:-translate-x-1 transition-transform" />
                                    {t.previous}
                                </div>
                                <span className="font-bold text-base md:text-lg group-hover:text-primary transition-colors line-clamp-1">
                                    {prevProject.title}
                                </span>
                            </Link>
                        ) : <div />}
                    </div>
                    <div className="min-w-0">
                        {nextProject ? (
                            <Link
                                href={`/${lang}/projects/${nextProject.slug}`}
                                className="group flex flex-col items-end gap-2 p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-muted/10 transition-all duration-300 h-full text-right"
                            >
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                    {t.next}
                                    <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <span className="font-bold text-base md:text-lg group-hover:text-primary transition-colors line-clamp-1">
                                    {nextProject.title}
                                </span>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>
        </div>
    );
}
