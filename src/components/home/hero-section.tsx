"use client";

import { AnimatedShinyText } from "@/components/ui/magicui/animated-shiny-text";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { TextReveal } from "@/components/ui/magicui/text-reveal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  description: string;
  blurFadeDelay: number;
}

export function HeroSection({ title, description, blurFadeDelay }: HeroSectionProps) {
  return (
    <section id="hero" className="mb-0">
      <div className="mx-auto w-full space-y-8">
        <div className="gap-6 flex flex-col md:flex-row items-start justify-between">
          <div className="gap-4 flex flex-col flex-1 order-2 md:order-1">
            <TextReveal
              delay={0.1}
              className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-5xl font-cal leading-tight"
            >
              {title}
            </TextReveal>
            <div className="flex items-center gap-2">
              <AnimatedShinyText className="text-muted-foreground max-w-150 md:text-xl font-medium">
                {description}
              </AnimatedShinyText>
            </div>
          </div>
          <BlurFade
            delay={blurFadeDelay}
            className="flex-none order-1 md:order-2"
          >
            <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted relative overflow-hidden">
              <Image
                src={DATA.avatarUrl}
                alt={DATA.name}
                fill
                priority
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold font-cal">
                {DATA.initials}
              </AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
