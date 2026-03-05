import BlurFade from "@/components/ui/magicui/blur-fade";
import { skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";
import { ElementType } from "react";

type SkillCardProps = {
  name: string;
  icon: ElementType;
  index: number;
};

function SkillCard({ name, icon: Icon, index }: SkillCardProps) {
  return (
    <BlurFade delay={0.03 * index}>
      <div
        className={cn(
          "group relative flex flex-col items-center justify-center gap-2.5",
          "w-24 h-24 rounded-2xl",
          "border border-border/60 bg-background",
          "shadow-sm hover:shadow-md",
          "hover:border-border hover:bg-muted/30",
          "transition-all duration-200 ease-out",
          "cursor-default select-none"
        )}
      >
        {/* Icon */}
        <div className="size-9 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <Icon className="size-full" />
        </div>
        {/* Name */}
        <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-tight text-center px-1">
          {name}
        </span>
      </div>
    </BlurFade>
  );
}

export default function SkillsSection({ title }: { title?: string }) {
  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={0.02}>
        <h2 className="text-xl font-bold font-clash">{title || "Skills"}</h2>
      </BlurFade>
      <div className="flex flex-wrap gap-3">
        {skillsData.map((skill, i) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
