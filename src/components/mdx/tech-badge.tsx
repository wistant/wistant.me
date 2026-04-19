import Image from "next/image";

// Map of tech names to icon paths + brand colors
const TECH_MAP: Record<string, { icon: string; color: string; label: string }> = {
  TypeScript: { icon: "/icons/typescript.svg", color: "#3178C6", label: "TS" },
  NestJS:     { icon: "/icons/nestjs.svg",     color: "#E0234E", label: "Nest" },
  PostgreSQL: { icon: "/icons/postgresql.svg", color: "#336791", label: "PG" },
  Next:       { icon: "/icons/nextjs.svg",     color: "#000000", label: "Next" },
  React:      { icon: "/icons/react.svg",      color: "#61DAFB", label: "React" },
  Prisma:     { icon: "/icons/prisma.svg",     color: "#2D3748", label: "Prisma" },
  Redis:      { icon: "/icons/redis.svg",      color: "#DC382D", label: "Redis" },
  Linux:      { icon: "/icons/linux.svg",      color: "#FCC624", label: "Linux" },
  Vercel:     { icon: "/icons/vercel.svg",     color: "#000000", label: "Vercel" },
};

interface TechBadgeProps {
  name: keyof typeof TECH_MAP;
}

export function TechBadge({ name }: TechBadgeProps) {
  const tech = TECH_MAP[name];
  if (!tech) return <span className="font-semibold">{name}</span>;

  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold mx-0.5 align-middle"
      style={{
        backgroundColor: `${tech.color}18`,
        color: tech.color,
        border: `1px solid ${tech.color}30`,
      }}
    >
      <Image
        src={tech.icon}
        alt={name}
        width={11}
        height={11}
        className="inline-block shrink-0"
        style={{ filter: "none" }}
      />
      {tech.label}
    </span>
  );
}
