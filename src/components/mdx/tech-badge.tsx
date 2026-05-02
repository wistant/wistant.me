import Image from "next/image";

// Map of tech names to icon paths + brand colors
const TECH_MAP: Record<string, { icon: string; color: string; label: string }> = {
  TypeScript: { icon: "/icons/typescript.svg", color: "#3178C6", label: "TypeScript" },
  JavaScript: { icon: "/icons/javascript.svg", color: "#F7DF1E", label: "JavaScript" },
  NestJS:     { icon: "/icons/nestjs.svg",     color: "#E0234E", label: "NestJS" },
  PostgreSQL: { icon: "/icons/postgresql.svg", color: "#336791", label: "PostgreSQL" },
  Next:       { icon: "/icons/nextjs.svg",     color: "#000000", label: "Next.js" },
  React:      { icon: "/icons/react.svg",      color: "#61DAFB", label: "React" },
  Prisma:     { icon: "/icons/prisma.svg",     color: "#2D3748", label: "Prisma" },
  Redis:      { icon: "/icons/redis.svg",      color: "#DC382D", label: "Redis" },
  Linux:      { icon: "/icons/linux.svg",      color: "#FCC624", label: "Linux" },
  Vercel:     { icon: "/icons/vercel.svg",     color: "#000000", label: "Vercel" },
  Python:     { icon: "/icons/python.svg",     color: "#3776AB", label: "Python" },
  Three:      { icon: "/icons/threejs.svg",    color: "#000000", label: "Three.js" },
  Bash:       { icon: "/icons/bash.svg",       color: "#4EAA25", label: "Bash" },
};

interface TechBadgeProps {
  name: keyof typeof TECH_MAP;
}

export function TechBadge({ name }: TechBadgeProps) {
  const tech = TECH_MAP[name];
  if (!tech) return <span className="font-semibold">{name}</span>;

  return (
    <span
      className="inline-flex items-center gap-[0.3em] px-[0.5em] py-[0.1em] rounded-[0.3em] font-mono font-bold mx-[0.1em] transition-colors border"
      style={{
        fontSize: '0.85em',
        backgroundColor: `${tech.color}12`,
        color: tech.color,
        borderColor: `${tech.color}30`,
      }}
    >
      <Image
        src={tech.icon}
        alt={name}
        width={16}
        height={16}
        className="w-[1.1em] h-[1.1em] shrink-0 object-contain"
        style={{ filter: "none" }}
      />
      <span className="leading-none">{tech.label}</span>
    </span>
  );
}
