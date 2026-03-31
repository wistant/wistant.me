"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import { Icons } from "@/components/ui/icons";

import { ShoppingCart, Wallet, Cloud, Box, PlaySquare, Webhook, ChartBar } from "lucide-react";

const getTechIcon = (tech: string) => {
  const norm = tech.toLowerCase();
  
  // Custom SVG Brands
  if (norm.includes("next")) return <Icons.nextjs className="size-3" />;
  if (norm.includes("react")) return <Icons.react className="size-3 text-[#61DAFB]" />;
  if (norm.includes("typescript") || norm === "ts") return <Icons.typescript className="size-3 text-[#3178C6]" />;
  if (norm.includes("tailwind")) return <Icons.tailwindcss className="size-3 text-[#06B6D4]" />;
  if (norm.includes("framer")) return <Icons.framermotion className="size-3" />;
  if (norm.includes("openai") || norm.includes("ai")) return <Icons.openai className="size-3" />;
  if (norm.includes("github")) return <Icons.github className="size-3" />;
  if (norm.includes("nestjs") || norm.includes("nest")) return <Icons.nestjs className="size-3" />;
  if (norm.includes("postgres") || norm.includes("sql")) return <Icons.postgresql className="size-3" />;
  if (norm.includes("prisma")) return <Icons.prisma className="size-3" />;
  if (norm.includes("redis")) return <Icons.redis className="size-3" />;
  
  // Extended Ecosystem via Lucide
  if (norm.includes("webgl") || norm.includes("3d")) return <Box className="size-3 text-purple-400" />;
  if (norm.includes("gsap") || norm.includes("animation")) return <PlaySquare className="size-3 text-green-400" />;
  if (norm.includes("webhook") || norm.includes("api")) return <Webhook className="size-3 text-blue-400" />;
  if (norm.includes("fintech") || norm.includes("bank")) return <Wallet className="size-3 text-emerald-400" />;
  if (norm.includes("commerce")) return <ShoppingCart className="size-3 text-orange-400" />;
  if (norm.includes("saas") || norm.includes("cloud")) return <Cloud className="size-3 text-sky-400" />;
  if (norm.includes("analytics") || norm.includes("data")) return <ChartBar className="size-3 text-indigo-400" />;

  return null;
};

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  // Next.js Image requires absolute path or absolute URL
  const validSrc = (!src.startsWith("http") && !src.startsWith("/")) ? `/${src}` : src;

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={validSrc}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  variant?: "default" | "blog";
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
  variant = "default",
}: Props) {
  const isBlogGrid = variant === "blog";

  return (
    <div
      className={cn(
        "group flex flex-col h-full transition-all duration-300 cursor-pointer overflow-hidden",
        isBlogGrid
          ? "bg-background rounded-none"
          : "bg-muted/10 p-2.5 rounded-4xl border border-border/50 hover:border-border/80 hover:shadow-sm",
        className
      )}
    >
      <div className={cn(
        "relative shrink-0 overflow-hidden",
        isBlogGrid
          ? "flex-col border-b-2 border-border"
          : "rounded-3xl border border-border/30"
      )}>
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className={cn(
        "flex flex-col gap-3 flex-1 transition-colors",
        isBlogGrid 
          ? "p-6 bg-background group-hover:bg-muted/10" 
          : "p-4 bg-background/50 rounded-2xl mt-2.5 border border-transparent group-hover:bg-background/80"
      )}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className={cn(
              "font-semibold font-cal tracking-tight",
              isBlogGrid ? "text-xl group-hover:underline underline-offset-4" : "text-lg"
            )}>{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border/50 bg-background hover:bg-muted text-muted-foreground flex items-center h-6 w-fit px-2 transition-colors"
                variant="outline"
              >
                {getTechIcon(tag) && <span className="mr-1.5">{getTechIcon(tag)}</span>}
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
