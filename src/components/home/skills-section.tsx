"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { skillsData } from "@/data/skills";
import { IconProps } from "@/components/ui/icons";

type SkillCardProps = {
  name: string;
  icon: (props: IconProps) => ReactElement;
  index: number;
};

function SkillCard({ name, icon: Icon, index }: SkillCardProps) {
  return (
    <BlurFade delay={0.04 * index}>
      <motion.div
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className="group flex flex-col items-center justify-center gap-2.5 w-[88px] h-[88px] rounded-2xl cursor-default select-none bg-background border border-border/50 hover:border-border hover:shadow-md transition-shadow duration-200"
      >
        <div className="size-9 flex items-center justify-center">
          <Icon className="size-full" />
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-150 leading-tight text-center">
          {name}
        </span>
      </motion.div>
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
