"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { TechBadge } from "@/components/mdx/tech-badge";
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
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg pt-0 transition-all duration-300 ease-out h-full rounded-xl"
      }
    >
      <Link 
        href={href || "#"} 
        className={cn("block cursor-pointer group/card")}
      >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
            />
          )}
          {image && !video && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
              priority
            />
          )}

        <CardHeader className="px-4 py-5 gap-y-2">
            <CardTitle className="text-xl font-clash font-bold leading-tight tracking-tight group-hover/card:text-primary transition-colors">
              {title}
            </CardTitle>
            <time className="font-sans text-xs">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
             {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown>
              {description}
            </Markdown>
        </CardHeader>
      </Link>

      {links && links.length > 0 && (
        <div className="absolute top-3 right-3 z-40 flex flex-row gap-2 pointer-events-auto">
          {links?.map((link, idx) => {
            const isSource = link.type?.toLowerCase() === "source" || link.type?.toLowerCase() === "github";
            const label = isSource ? "Source Code" : "Website";
            
            return (
              <Link 
                key={idx} 
                href={link?.href} 
                target="_blank"
                className="h-8 px-3 flex items-center gap-2 rounded-full bg-background/95 backdrop-blur-md border border-border shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/link"
              >
                <div className="size-3.5 flex items-center justify-center shrink-0">
                  {link.icon}
                </div>
                <span className="text-[8px] font-black tracking-tight uppercase whitespace-nowrap">{label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <TechBadge key={tag} name={tag} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
