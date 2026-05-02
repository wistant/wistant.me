"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Icons } from "@/components/ui/icons";

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
      <div className="w-full sm:w-[45%] relative aspect-4/3 rounded-2xl shrink-0 perspective-[1000px]">
        {/* Background Layer (décalé gauche/haut) */}
        <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-2xl shadow-xl overflow-hidden opacity-60 dark:opacity-30 transform-gpu transition-transform duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 bg-muted">
          {image && (
            <Image
              src={image}
              alt={`${title} background`}
              fill
              className="object-cover grayscale blur-[2px]"
            />
          )}
        </div>
        
        {/* Foreground Layer (décalé bas/droite) */}
        <div className="absolute bottom-0 right-0 w-[85%] h-[85%] rounded-2xl z-10 shadow-[0_20px_50px_rgb(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgb(255,255,255,0.05)] overflow-hidden transform-gpu transition-all duration-700 group-hover:scale-[1.03] bg-background border border-border/50">
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
      <div className="flex flex-col items-start justify-center w-full sm:w-[55%] relative z-20">
        {/* Label de catégorie & Date */}
        <div className="flex items-center justify-between w-full mb-2">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span
              className="size-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: getCategoryColor(category) }}
            />
            {categoryLabels[category as keyof typeof categoryLabels] || "Project"}
          </span>
          {dates && (
            <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:block">
              {dates}
            </span>
          )}
        </div>

        {/* Titre du projet */}
        <h3 className="text-xl lg:text-2xl font-extrabold font-clash tracking-tight text-foreground leading-none mb-3 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>

        {/* Stack Technique avec Icônes (miniaturisé) */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 w-full mb-3">
            {tags.map((tag) => {
              const tagKey = tag.toLowerCase().replace(/[\s.]/g, '') as keyof typeof Icons;
              const IconComp = Icons[tagKey];
              return (
                <div key={tag} className="flex items-center justify-center p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 shadow-sm transition-transform hover:scale-110" title={tag}>
                  {IconComp ? (
                    <IconComp className="size-3.5 text-neutral-700 dark:text-neutral-300" />
                  ) : (
                    <span className="text-[9px] font-mono font-semibold uppercase px-1">{tag}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Description courte */}
        <div className="text-xs md:text-sm prose prose-neutral dark:prose-invert text-muted-foreground leading-relaxed w-full mb-5 line-clamp-3">
          <Markdown>{description}</Markdown>
        </div>

        {/* Action Buttons (Live & GitHub) */}
        <div className="flex items-center gap-2 mt-auto">
          {githubLink && (
            <Link 
              href={githubLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 shadow-xs hover:bg-neutral-50 hover:text-black dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white transition-all"
            >
              <Icons.github className="size-3" />
              Source
            </Link>
          )}
          {liveLink && liveLink.href !== githubLink?.href && (
            <Link 
              href={liveLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white bg-blue-600 shadow-md hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
            >
              <Icons.globe className="size-3" />
              Live Preview
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
