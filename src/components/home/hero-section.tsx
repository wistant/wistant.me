"use client";

import BlurFade from "@/components/ui/magicui/blur-fade";
import BlurFadeText from "@/components/ui/magicui/blur-fade-text";
import { siteConfig } from "@/config/site";
import { BadgeCheck, MapPin,} from "lucide-react";
import { RealTimeClock } from "./real-time-clock";
import { cn } from "@/lib/utils";
import { skillsData } from "@/data/skills";

const BLUR_FADE_DELAY = 0.04;

// Colors for icons
const BRAND_ICON_COLORS: Record<string, string> = {
  GitHub: "text-[#24292e] dark:text-white",
  LinkedIn: "text-[#0077b5]",
  X: "text-black dark:text-white",
  Twitter: "text-[#1da1f2]",
  WhatsApp: "text-[#25d366]",
  TypeScript: "text-[#3178c6]",
  "Next.js": "text-black dark:text-white",
  React: "text-[#61dafb]",
  NestJS: "text-[#e0234e]",
  PostgreSQL: "text-[#336791]",
  Redis: "text-[#d82c20]",
};

export function HeroSection({ description }: { title: string; description: string }) {
  // Use all skills from data as requested
  const allSkills = skillsData;

  const sharedBadgeClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-muted/20 text-[10px] font-bold uppercase text-muted-foreground transition-all duration-300 hover:bg-muted/40 hover:border-border/60";

  return (
    <section id="hero" className="mb-0">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-start text-justify space-y-6 pt-8 md:pt-12">
          {/* Text Content */}
          <div className="flex flex-col items-start gap-1 w-full"> {/* Reduced gap-3 to gap-1 */}
            <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl leading-tight font-clash">
                <span>{siteConfig.name}</span>
                <BadgeCheck
                  className="inline-block ml-3 size-8 md:size-10 text-[#00ff22] -mt-1.5"
                  fill="currentColor"
                  stroke="white"
                />
              </h1>
            </BlurFade>
            
            <BlurFadeText
              className="text-muted-foreground max-w-[650px] text-base md:text-lg lg:text-xl font-medium leading-relaxed"
              delay={BLUR_FADE_DELAY}
              text={description}
            />
            
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap items-center gap-2 pt-2 w-full"> {/* Reduced pt-4 to pt-2 */}
                
                {/* Location & Time Group */}
                <div className={sharedBadgeClasses}>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-2.5 text-red-500" />
                    <span>{siteConfig.location}</span>
                  </div>
                  <div className="w-px h-3 bg-border/60" />
                  <div className="flex items-center gap-1.5 font-mono">
                    <RealTimeClock />
                  </div>
                </div>

                {/* All Skills from skills.ts */}
                {allSkills.map((skill) => {
                  const iconColor = BRAND_ICON_COLORS[skill.name] || "";
                  return (
                    <div 
                      key={skill.name}
                      className={sharedBadgeClasses}
                    >
                      {skill.icon && (
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className={cn(
                            "size-2.5 object-contain", 
                            skill.name === "Next.js" && "dark:invert",
                            !iconColor && "grayscale brightness-125"
                          )} 
                        />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
