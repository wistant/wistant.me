"use client";
import { useState } from "react";
import Image from "next/image";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/ui/magicui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BLUR_FADE_DELAY = 0.04;

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-10 md:size-12 p-1 border rounded-lg shadow-sm ring-1 ring-border bg-muted flex-none" />
    );
  }

  return (
    <div className="relative size-10 md:size-12 flex-none border rounded-lg shadow-sm ring-1 ring-border overflow-hidden bg-white">
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
    <Accordion type="single" collapsible className="flex flex-col gap-6 w-full mt-2">
      {DATA.education.map((education, index) => (
        <BlurFade
          key={education.school}
          delay={BLUR_FADE_DELAY * 8 + index * 0.05}
        >
          <AccordionItem
            value={education.school}
            className="border-none group shadow-none"
          >
            <AccordionTrigger className="hover:no-underline py-0 w-full flex items-start text-left group-data-[state=open]:mb-4 transition-all">
              <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="flex-none mt-1">
                  <LogoImage src={education.logoUrl} alt={education.school} />
                </div>
                <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 w-full text-left">
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-base md:text-lg leading-snug text-foreground">
                          {education.degree}
                      </h3>
                      <span className="text-sm font-medium text-muted-foreground mt-0.5">
                          {education.school}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap pt-0.5">
                      {education.start} - {education.end || "Present"}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="ml-0 sm:ml-16 pb-0">
              <div className="pl-4 sm:pl-1 border-l sm:border-l-0 border-border/50">
                <p className="text-sm text-muted-foreground/90 leading-relaxed text-pretty">
                  Academic curriculum and coursework related to {education.degree}.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </BlurFade>
      ))}
    </Accordion>
  );
}
