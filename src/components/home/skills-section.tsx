import { skillsData } from "@/data/skills";
import BlurFade from "@/components/ui/magicui/blur-fade";

export default function SkillsSection({ title }: { title?: string }) {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={0.05}>
        <h2 className="text-xl font-bold font-clash">{title || "Skills"}</h2>
      </BlurFade>
      <div className="flex flex-wrap gap-3">
        {skillsData.map((skill, id) => (
          <BlurFade key={skill.name} delay={0.05 * id}>
            <div className="flex items-center gap-2 bg-muted/20 border border-border/50 rounded-full px-4 py-2 hover:bg-muted/40 transition-colors cursor-default">
              <skill.icon className="size-5" />
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
