"use client";
import { useState } from "react";
import Image from "next/image";
import { DATA } from "@/data/resume";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function WorkSection({ presentLabel = "Present" }: { presentLabel?: string }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-6 w-full mt-2">
      {DATA.work.map((work) => (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="border-none group shadow-none"
        >
          <AccordionTrigger className="hover:no-underline py-0 w-full flex items-start text-left group-data-[state=open]:mb-4 transition-all">
            <div className="w-full flex flex-col cursor-pointer sm:flex-row gap-4 sm:gap-5">
              <div className="flex-none mt-1">
                <LogoImage src={work.logoUrl} alt={work.company} />
              </div>
              <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 w-full text-left">
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-base leading-snug text-foreground">
                        {work.title}
                    </h3>
                    <span className="text-sm font-medium text-muted-foreground mt-0.5">
                        {work.company}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap pt-0.5">
                    {work.start} - {work.end ?? presentLabel}
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="ml-0 sm:ml-16 pb-0">
            <div className="pl-4 sm:pl-1 border-l sm:border-l-0 border-border/50">
              <p className="text-sm text-muted-foreground/90 leading-relaxed text-pretty">
                {work.description}
              </p>
              
              {work.icons && work.icons.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-3 mt-4">
                  {work.icons.map((icon) => (
                    <div 
                      key={icon} 
                      className="p-1.5 rounded-md border border-border/50 bg-muted/30 shadow-sm flex items-center justify-center"
                      title={icon}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`https://cdn.simpleicons.org/${icon}`} 
                        alt={icon} 
                        className="h-4 w-4" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

