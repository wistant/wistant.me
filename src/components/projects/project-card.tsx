"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { ArrowUpRight } from "lucide-react";
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
    <div className={cn("group flex flex-col items-start w-full relative", className)}>
      <Link href={href || "#"} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
        <span className="sr-only">View {title}</span>
      </Link>

      <div className="w-full relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.06)]">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : image ? (
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-muted/20" />
        )}
        
        {/* Badge de lien en bas à droite */}
        <div className="absolute bottom-4 right-4 size-10 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="flex flex-col items-start mt-6 w-full gap-3">
        {/* Label de catégorie */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className={cn("size-2 rounded-full", getCategoryColor(category))} />
            {categoryLabels[category]}
          </span>
        </div>

        {/* Stack Technique avec Icônes */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2 w-full text-muted-foreground/80">
            {tags.map((tag) => {
              const tagKey = tag.toLowerCase().replace(/[\s.]/g, '') as keyof typeof Icons;
              const IconComp = Icons[tagKey];
              return (
                <div key={tag} className="flex items-center gap-1.5" title={tag}>
                  {IconComp ? (
                    <IconComp className="size-4" />
                  ) : (
                    <span className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded-md">{tag}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Titre du projet et Date */}
        <div className="w-full flex items-center justify-between gap-2 mt-1">
          <h3 className="text-2xl font-bold font-clash tracking-tight text-foreground">
            {title}
          </h3>
          {dates && (
            <span className="text-xs text-muted-foreground/60 whitespace-nowrap hidden sm:block">
              {dates}
            </span>
          )}
        </div>

        {/* Description courte */}
        <div className="text-sm prose prose-neutral dark:prose-invert text-muted-foreground leading-relaxed w-full">
          <Markdown>{description}</Markdown>
        </div>

        {/* Action Buttons (Live & GitHub) */}
        <div className="flex items-center gap-3 mt-2 relative z-20">
          {githubLink && (
            <Link 
              href={githubLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 flex items-center gap-1.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <ArrowUpRight className="size-3" />
              GitHub
            </Link>
          )}
          {liveLink && liveLink.href !== githubLink?.href && (
            <Link 
              href={liveLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 flex items-center gap-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30 transition-colors"
            >
              <ArrowUpRight className="size-3" />
              Live Preview
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
