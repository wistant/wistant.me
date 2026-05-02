"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import { Icons } from "@/components/ui/icons";

interface Props {
  title: string;
  description: string;
  dates: string;
  tags: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function OpenSourceCard({
  title,
  description,
  links,
  className,
}: Props) {
  const githubLink = links?.find((l) => l.type.toLowerCase() === "github") || links?.[0];

  return (
    <Link
      href={githubLink?.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col items-start w-full gap-4 p-5 rounded-none transition-colors duration-300 hover:bg-muted/30 border border-transparent hover:border-border/50",
        className
      )}
    >
      {/* Icône GitHub */}
      <div className="relative">
        <div className="size-10 rounded-none bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <Icons.github className="size-6" />
        </div>
      </div>

      <div className="flex flex-col items-start gap-1.5 w-full mt-2">
        {/* Nom du Repo + Flèche */}
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-base text-foreground tracking-tight group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-blue-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Description courte en gris */}
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {description}
        </p>
      </div>

      {/* Footer URL Link */}
      <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
        <LinkIcon className="size-3.5" />
        <span>github.com</span>
      </div>
    </Link>
  );
}
