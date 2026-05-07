"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Icons } from "@/components/ui/icons";
import TechIconMap from "./tech-icon-map.json";

import { useState, useEffect, useMemo } from "react";

interface Props {
  href: string;
  title: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  images?: string[];
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  category?: "client" | "opensource" | "personal";
  reverse?: boolean;
}

// SLIDESHOW INTERVAL IN SECONDS
const SLIDESHOW_INTERVAL_SECONDS = 1.5;

export function ProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  images = [],
  video,
  links,
  className,
  href,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine image and images to get all available pictures
  const allImages = useMemo(() => {
    const list: string[] = [];
    if (image) list.push(image);
    if (images && images.length > 0) {
      images.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [image, images]);

  useEffect(() => {
    if (allImages.length <= 1 || video) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, SLIDESHOW_INTERVAL_SECONDS * 1000);
    return () => clearInterval(interval);
  }, [allImages.length, video]);

  const githubLink = links?.find((l) => l.type.toLowerCase() === "github" || l.type.toLowerCase() === "source");
  const liveLink = links?.find((l) => l.type.toLowerCase() === "website" || l.type.toLowerCase() === "live" || l.type.toLowerCase() === "preview") || links?.[0];

  return (
    <div className={cn("flex flex-col w-full relative items-start", className)}>
      {/* 1. Large Image (1280x640 ratio = 2:1) Clickable & Animated */}
      <Link 
        href={href || "#"} 
        className="w-full relative rounded-2xl overflow-hidden bg-muted/20 border border-border/40 block transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.01] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.03)]" 
        style={{ aspectRatio: "2/1" }}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
          />
        ) : allImages.length > 0 ? (
          allImages.map((img, idx) => (
            <Image
              key={img}
              src={img}
              alt={`${title} - image ${idx + 1}`}
              fill
              className={cn(
                "object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:brightness-110",
                idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            />
          ))
        ) : (
          <div className="w-full h-full bg-muted/20 transition-transform duration-1000 group-hover:scale-105" />
        )}
        {allImages.length > 1 && !video && (
          <div className="absolute bottom-3 right-3 z-20 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center justify-center transition-opacity duration-300">
            <span className="text-[10px] font-mono font-medium tracking-widest">{currentImageIndex + 1} / {allImages.length}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-col w-full mt-5 px-1">
        {/* Title & Date */}
        <div className="flex items-end gap-3 mb-3 mt-1">
          <Link href={href || "#"} className="group/title">
            <h3 className="text-xl font-bold font-clash tracking-tight text-foreground leading-none group-hover/title:text-blue-500 transition-colors">
              {title}
            </h3>
          </Link>
          {dates && (
            <div className="flex items-center text-[10px] font-mono text-muted-foreground/60 mb-0.5">
              {dates}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="text-sm text-muted-foreground leading-relaxed w-full dark:text-muted-foreground/90 mb-6">
          <Markdown>{description}</Markdown>
        </div>

        {/* Action Buttons & Techs : CONTINUOUS FLOW SAME LINE NO WRAP */}
        <div className="flex items-center w-full gap-3 mt-auto overflow-hidden flex-nowrap">
          {/* Buttons (Left side) */}
          {liveLink && liveLink.href !== githubLink?.href && (
            <Link 
              href={liveLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center shrink-0 gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Icons.globe className="size-3.5" />
              Live Preview
            </Link>
          )}
          {githubLink && (
            <Link 
              href={githubLink.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center shrink-0 gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground bg-secondary border border-border/50 hover:bg-secondary/80 transition-colors whitespace-nowrap"
            >
              <Icons.github className="size-3.5" />
              Source Code
            </Link>
          )}

          <div className="w-px h-6 bg-border mx-1 shrink-0" /> {/* Petit séparateur */}

          {/* Tech Icons (Flow right after buttons) */}
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-2.5 overflow-hidden shrink flex-nowrap">
              {tags.map((tag) => {
                const tagKey = tag.toLowerCase().replace(/[\s.]/g, '');
                const mappedImage = (TechIconMap as Record<string, string>)[tagKey];
                const IconComp = Icons[tagKey as keyof typeof Icons];
                
                const needsInvert = ["nextjs", "github", "vercel", "prisma", "notebook", "eclipse", "express"].includes(tagKey);

                return mappedImage ? (
                  <div key={tag} title={tag} className="flex items-center justify-center shrink-0 transition-transform hover:scale-110">
                    <Image 
                      src={mappedImage} 
                      alt={tag} 
                      width={16} 
                      height={16} 
                      className={cn("object-contain", needsInvert && "dark:invert dark:opacity-90")}
                    />
                  </div>
                ) : IconComp ? (
                  <div key={tag} title={tag} className="flex items-center justify-center shrink-0 transition-transform hover:scale-110">
                    <IconComp className={cn("size-4 text-neutral-700 dark:text-neutral-300", needsInvert && "dark:text-white")} />
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
