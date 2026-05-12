"use client";

import BlurFade from "@/components/ui/magicui/blur-fade";
import { Skill } from "@/types/resume";
import { skillsData } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

const BRAND_COLORS: Record<string, { bg: string; text: string }> = {
  TypeScript: { bg: "bg-[#3178c6]", text: "text-white" },
  "Next.js": { bg: "bg-black", text: "text-white" },
  NestJS: { bg: "bg-[#e0234e]", text: "text-white" },
  React: { bg: "bg-[#61dafb]", text: "text-black" },
  PostgreSQL: { bg: "bg-[#336791]", text: "text-white" },
  Redis: { bg: "bg-[#d82c20]", text: "text-white" },
  Prisma: { bg: "bg-[#2d3748]", text: "text-white" },
  Vercel: { bg: "bg-black", text: "text-white" },
  Linux: { bg: "bg-[#fcc624]", text: "text-black" },
};

export default function SkillsSection({ 
  title, 
  data 
}: { 
  title?: string; 
  data?: Skill[] 
}) {
  const skillsDataToUse = data && data.length > 0 ? data : skillsData;

  return (
    <section id="skills" className="py-2">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold font-clash">{title || "Skills"}</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-2">
          {skillsDataToUse.map((skill: Skill, i: number) => {
            const color = BRAND_COLORS[skill.name] || { bg: "bg-secondary/50", text: "text-foreground" };
            return (
              <BlurFade 
                key={skill.name} 
                delay={BLUR_FADE_DELAY * 10 + i * 0.05}
              >
                <Badge 
                  variant="secondary"
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-tight border-transparent transition-all duration-300 pointer-events-none",
                    color.bg,
                    color.text,
                    "hover:opacity-80 shadow-sm"
                  )}
                >
                  {skill.icon && (
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className={cn("size-3.5 object-contain", skill.name === "Next.js" && "dark:invert")} 
                    />
                  )}
                  <span>{skill.name}</span>
                </Badge>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
