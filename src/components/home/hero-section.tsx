"use client";

import BlurFade from "@/components/ui/magicui/blur-fade";
import BlurFadeText from "@/components/ui/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { BadgeCheck, MapPin, Github, Twitter } from "lucide-react";
import { RealTimeClock } from "./real-time-clock";

const BLUR_FADE_DELAY = 0.04;

interface HeroSectionProps {
  title: string;
  description: string;
  blurFadeDelay: number;
}

export function HeroSection({ title, description, blurFadeDelay }: HeroSectionProps) {
  return (
    <section id="hero" className="mb-0">
      <div className="mx-auto w-full space-y-8">
        <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between pt-0 md:pt-4">
          {/* Text Content */}
          <div className="gap-2 flex flex-col order-2 md:order-1">
            <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
              <h1 className="text-2xl font-semibold tracking-tighter sm:text-3xl lg:text-4xl leading-tight font-clash">
                <span>{DATA.name}</span>
                <BadgeCheck
                  className="inline-block ml-2 size-6 md:size-8 text-[#1DA1F2] -mt-1"
                  fill="currentColor"
                  stroke="white"
                />
              </h1>
            </BlurFade>
            
            <BlurFadeText
              className="text-muted-foreground max-w-[600px] text-sm md:text-base lg:text-lg font-medium leading-relaxed"
              delay={BLUR_FADE_DELAY}
              text={description}
            />
            
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-[10px] md:text-xs text-muted-foreground pt-3">
                <div className="flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  <span>{DATA.location}</span>
                </div>
                <div className="flex items-center gap-1 border-l pl-3 border-border ml-0.5">
                  <span className="font-mono">
                    <RealTimeClock />
                  </span>
                </div>
                <Link 
                   href={DATA.contact.social.GitHub.url} 
                   target="_blank"
                   className="flex items-center gap-1 hover:text-foreground transition-colors border-l pl-3 border-border ml-0.5"
                >
                  <Github className="size-3" />
                  <span>github</span>
                </Link>
                <Link 
                   href={DATA.contact.social.X.url} 
                   target="_blank"
                   className="flex items-center gap-1 hover:text-foreground transition-colors border-l pl-3 border-border ml-0.5"
                >
                  <Twitter className="size-3" />
                  <span>iamwistant</span>
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Avatar Area */}
          <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 flex justify-start md:justify-end md:mt-9 -mb-4 md:mb-0">
             <Avatar className="size-20 md:size-36 border rounded-full shadow-lg ring-2 ring-muted transform transition-transform duration-300">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback className="text-xl font-bold">{DATA.initials}</AvatarFallback>
              </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
