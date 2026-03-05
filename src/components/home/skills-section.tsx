"use client";
import dynamic from "next/dynamic";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { skillsData } from "@/data/skills";

// Lazy-load the 3D canvas — zero Three.js at SSR, only shipped to client when used
const Skills3D = dynamic(() => import("./skills-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] md:h-[480px] rounded-2xl bg-muted/20 border border-border/30 animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground text-sm">Loading 3D...</span>
    </div>
  ),
});

const skillNames = skillsData.map((s) => s.name);

export default function SkillsSection({ title }: { title?: string }) {
  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={0.05}>
        <h2 className="text-xl font-bold font-clash">{title || "Skills"}</h2>
      </BlurFade>
      <BlurFade delay={0.08}>
        <Skills3D skills={skillNames} />
      </BlurFade>
    </div>
  );
}
