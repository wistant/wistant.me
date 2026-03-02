"use client";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BlurFade from "@/components/ui/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <div className="relative size-8 md:size-10 flex-none border rounded-full shadow ring-2 ring-border overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-1"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function EducationSection() {
  return (
    <div className="flex flex-col gap-8">
      {DATA.education.map((education, index) => (
        <BlurFade
          key={education.school}
          delay={BLUR_FADE_DELAY * 8 + index * 0.05}
        >
          <Link
            href={education.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-3 justify-between group"
          >
            <div className="flex items-center gap-x-3 flex-1 min-w-0">
              <LogoImage src={education.logoUrl} alt={education.school} />
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="font-semibold leading-none flex items-center gap-2">
                  {education.school}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    aria-hidden
                  />
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {education.degree}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
              <span>
                {education.start} - {education.end}
              </span>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
