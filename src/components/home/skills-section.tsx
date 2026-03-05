"use client";

import { motion } from "framer-motion";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { skillsData } from "@/data/skills";
import { ElementType } from "react";

// Accent colors per tech for the glow/tint effect
const SKILL_ACCENTS: Record<string, string> = {
  TypeScript: "#3178c6",
  "Next.js": "#000000",
  NestJS: "#e0234e",
  React: "#61dafb",
  Vite: "#646cff",
  PostgreSQL: "#336791",
  MariaDB: "#00758f",
  Prisma: "#5a67d8",
  Redis: "#dc382d",
};

type SkillCardProps = {
  name: string;
  icon: ElementType;
  index: number;
};

function SkillCard({ name, icon: Icon, index }: SkillCardProps) {
  const accent = SKILL_ACCENTS[name] ?? "#888888";

  return (
    <BlurFade delay={0.04 * index}>
      <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="group relative flex flex-col items-center justify-center gap-3 w-24 h-24 rounded-2xl cursor-default select-none overflow-hidden"
        style={{
          background: `color-mix(in srgb, ${accent} 8%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
          boxShadow: `0 2px 12px color-mix(in srgb, ${accent} 10%, transparent)`,
        }}
      >
        {/* Glow burst on hover via CSS */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 30%, color-mix(in srgb, ${accent} 25%, transparent), transparent 70%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 size-9 flex items-center justify-center"
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="size-full" />
        </motion.div>

        {/* Name */}
        <span className="relative z-10 text-[11px] font-bold tracking-wide text-foreground/70 group-hover:text-foreground transition-colors duration-200 leading-tight text-center px-1">
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
