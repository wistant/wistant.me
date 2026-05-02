"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Calendar } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import TechIconMap from "./tech-icon-map.json";

interface Props {
  href: string;
  title: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  category?: "client" | "opensource" | "personal";
}

export function ProjectCard({
  href,
  title,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
  category = "personal",
}: Props) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "client":
        return "bg-emerald-500";
      case "opensource":
        return "bg-orange-500";
      default:
        return "bg-blue-500";
    }
  };

  const categoryLabels = {
    client: "Client Work",
    opensource: "Open Source",
    personal: "Personal",
  };

  const githubLink = links?.find((l) => l.type.toLowerCase() === "github" || l.type.toLowerCase() === "source");
  const liveLink = links?.find((l) => l.type.toLowerCase() === "website" || l.type.toLowerCase() === "live" || l.type.toLowerCase() === "preview") || links?.[0];

  return (
    <div className={cn("group flex flex-col sm:flex-row w-full relative gap-6 sm:gap-8 lg:gap-10 items-stretch", className)}>
      <Link href={href || "#"} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
        <span className="sr-only">View {title}</span>
      </Link>

      {/* --- Left Pane : Superposed Media --- */}
      <div className="w-full sm:w-[45%] relative aspect-4/3 rounded-2xl shrink-0 perspective-[1000px] overflow-visible">
        {/* Background Layer (décalé gauche/haut) */}
        <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-2xl shadow-sm overflow-hidden opacity-50 dark:opacity-20 transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-4 group-hover:-translate-y-4 group-hover:-rotate-2 bg-muted">
          {image && (
            <Image
              src={image}
              alt={`${title} background`}
              fill
              className="object-cover grayscale blur-[3px] scale-110"
            />
          )}
        </div>
        
        {/* Foreground Layer (décalé bas/droite) */}
        <div className="absolute bottom-0 right-0 w-[85%] h-[85%] rounded-2xl z-10 shadow-[0_15px_40px_rgb(0,0,0,0.12)] dark:shadow-[0_15px_40px_rgb(255,255,255,0.03)] overflow-hidden transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:rotate-1 bg-background border border-border/40">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted/20" />
          )}
        </div>
      </div>

      {/* --- Right Pane : Content --- */}
      <div className="flex flex-col items-start justify-center w-full sm:w-[55%] relative z-20 py-1">
        {/* Label de catégorie & Date */}
        <div className="flex items-center gap-3 mb-3 w-full">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: getCategoryColor(category) }}
            />
            {categoryLabels[category as keyof typeof categoryLabels] || "Project"}
          </div>
          {dates && (
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60">
              <Calendar className="size-3" />
              {dates}
            </div>
          )}
        </div>

        {/* Titre du projet */}
        <h3 className="text-xl lg:text-2xl font-bold font-clash tracking-tight text-foreground leading-none mb-3 group-hover:text-blue-500 transition-colors duration-500">
          {title}
        </h3>

        {/* Description (Priorisée avec lineHeight agréable) */}
        <div className="text-xs text-muted-foreground leading-[1.65] w-full mb-4 line-clamp-4 dark:text-muted-foreground/90">
          <Markdown>{description}</Markdown>
        </div>

        {/* Stack Technique avec Icônes intelligentes */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 w-full mb-5">
            {tags.map((tag) => {
              const tagKey = tag.toLowerCase().replace(/[\s.]/g, '');
              const mappedImage = (TechIconMap as Record<string, string>)[tagKey];
              const IconComp = Icons[tagKey as keyof typeof Icons];
              
              const needsInvert = ["nextjs", "github", "vercel", "prisma", "notebook", "eclipse"].includes(tagKey);

              return (
                <div key={tag} className="flex items-center justify-center p-1.5 rounded-md bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 transition-all duration-300 hover:scale-110 hover:bg-neutral-100 dark:hover:bg-neutral-800" title={tag}>
                  {mappedImage ? (
                    <Image 
                      src={mappedImage} 
                      alt={tag} 
                      width={16} 
                      height={16} 
                      className={cn("object-contain", needsInvert && "dark:invert dark:opacity-90")}
                    />
                  ) : IconComp ? (
                    <IconComp className="size-4 text-neutral-600 dark:text-neutral-400" />
                  ) : (
                    <span className="text-[10px] font-mono font-medium uppercase px-1 text-neutral-500">{tag}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons (Live & GitHub) finement placés */}
        <div className="flex items-center gap-2 mt-auto">
          {githubLink && (
            <Link 
              href={githubLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium text-neutral-600 bg-transparent border border-neutral-200 hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white transition-all duration-300"
            >
              <Icons.github className="size-2.5" />
              Source
            </Link>
          )}
          {liveLink && liveLink.href !== githubLink?.href && (
            <Link 
              href={liveLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white bg-blue-500 shadow-xs hover:bg-blue-600 hover:shadow-md dark:bg-blue-500/90 dark:hover:bg-blue-500 transition-all duration-300"
            >
              <Icons.globe className="size-2.5" />
              Live
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
