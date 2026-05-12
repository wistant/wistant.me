import Image from "next/image";
import { cn } from "@/lib/utils";

// Map of tech names to icon paths + brand colors
export const TECH_MAP: Record<string, { icon: string; color: string; label: string }> = {
  // Languages
  TypeScript: { icon: "/icons/typescript.svg", color: "#3178C6", label: "TypeScript" },
  JavaScript: { icon: "/icons/javascript.svg", color: "#F7DF1E", label: "JavaScript" },
  Python:     { icon: "/icons/python.svg",     color: "#3776AB", label: "Python" },
  Bash:       { icon: "/icons/bash.svg",       color: "#4EAA25", label: "Bash" },
  Dart:       { icon: "/icons/dart.svg",       color: "#0175C2", label: "Dart" },
  PHP:        { icon: "/icons/php.png",        color: "#777BB4", label: "PHP" },
  Go:         { icon: "/icons/go.svg",         color: "#00ADD8", label: "Go" },
  Rust:       { icon: "/icons/rust.svg",       color: "#DEA584", label: "Rust" },
  "C#":       { icon: "/icons/c#.svg",         color: "#239120", label: "C#" },
  "C++":      { icon: "/icons/c++.svg",        color: "#00599C", label: "C++" },
  
  // Frameworks & Libraries
  React:      { icon: "/icons/react.svg",      color: "#61DAFB", label: "React" },
  "Next.js":  { icon: "/icons/nextjs.svg",     color: "#000000", label: "Next.js" },
  Next:       { icon: "/icons/nextjs.svg",     color: "#000000", label: "Next.js" },
  NestJS:     { icon: "/icons/nestjs.svg",     color: "#E0234E", label: "NestJS" },
  Tailwind:   { icon: "/icons/tailwindcss.svg", color: "#06B6D4", label: "Tailwind" },
  TailwindCSS: { icon: "/icons/tailwindcss.svg", color: "#06B6D4", label: "Tailwind" },
  "Framer Motion": { icon: "/icons/framer.svg", color: "#0055FF", label: "Framer" },
  Framer:     { icon: "/icons/framer.svg",     color: "#000000", label: "Framer" },
  GSAP:       { icon: "/icons/javascript.svg", color: "#88CE02", label: "GSAP" },
  Three:      { icon: "/icons/threejs.svg",    color: "#000000", label: "Three.js" },
  "Three.js": { icon: "/icons/threejs.svg",    color: "#000000", label: "Three.js" },
  Redux:      { icon: "/icons/redux.svg",      color: "#764ABC", label: "Redux" },
  Query: { icon: "/icons/react-query-icon.svg", color: "#FF4154", label: "Query" },
  Svelte:     { icon: "/icons/frameworks/vuejs.svg", color: "#FF3E00", label: "Svelte" },
  Vue:        { icon: "/icons/frameworks/vuejs.svg", color: "#4FC08D", label: "Vue" },
  
  // Databases & Backend
  PostgreSQL: { icon: "/icons/databases/postgresql.svg", color: "#336791", label: "PostgreSQL" },
  Prisma:     { icon: "/icons/prisma.svg",     color: "#2D3748", label: "Prisma" },
  Redis:      { icon: "/icons/databases/redis.svg", color: "#DC382D", label: "Redis" },
  MongoDB:    { icon: "/icons/databases/mongodb.svg", color: "#47A248", label: "MongoDB" },
  MySQL:      { icon: "/icons/databases/mysql.svg", color: "#4479A1", label: "MySQL" },
  Drizzle:    { icon: "/icons/drizzle-icon.svg", color: "#C5F74F", label: "Drizzle" },
  Firebase:   { icon: "/icons/cloud/firebase.svg", color: "#FFCA28", label: "Firebase" },
  Supabase:   { icon: "/icons/nextjs.svg",     color: "#3ECF8E", label: "Supabase" },
  
  // Infrastructure & Tools
  Vercel:     { icon: "/icons/vercel.svg",     color: "#000000", label: "Vercel" },
  Docker:     { icon: "/icons/pm2.svg",        color: "#2496ED", label: "Docker" },
  Kubernetes: { icon: "/icons/kubernetes.svg", color: "#326CE5", label: "K8s" },
  Linux:      { icon: "/icons/linux.svg",      color: "#FCC624", label: "Linux" },
  Stripe:     { icon: "/icons/ SocialIcons/stripe.svg", color: "#008CDD", label: "Stripe" },
  OpenAI:     { icon: "/icons/openai.svg",     color: "#412991", label: "OpenAI" },
  Anthropic:  { icon: "/icons/anthropic.svg",  color: "#D97757", label: "Claude" },
  AWS:        { icon: "/icons/aws/aws.svg",    color: "#FF9900", label: "AWS" },
  Git:        { icon: "/icons/git.svg",        color: "#F05032", label: "Git" },
  Github:     { icon: "/icons/github.svg",     color: "#181717", label: "Github" },
  Figma:      { icon: "/icons/ SocialIcons/figma.svg", color: "#F24E1E", label: "Figma" },
  "Lucide React": { icon: "/icons/ SocialIcons/lucide.svg", color: "#F24E1E", label: "Lucide" },
  Lucide:     { icon: "/icons/ SocialIcons/lucide.svg", color: "#F24E1E", label: "Lucide" },
  Vite:       { icon: "/icons/frameworks/vuejs.svg", color: "#646CFF", label: "Vite" },
};

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  const tech = TECH_MAP[name];
  
  const fallbackKey = Object.keys(TECH_MAP).find(k => k.toLowerCase() === name.toLowerCase());
  const finalTech = tech || (fallbackKey ? TECH_MAP[fallbackKey] : null);

  if (!finalTech) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-bold bg-muted/30 text-muted-foreground border border-border/50">
        {name}
      </span>
    );
  }

  const isDarkColor = ["#000000", "#2D3748"].includes(finalTech.color);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.4em] px-[0.6em] py-[0.15em] rounded-[0.4em] font-mono font-bold mx-[0.1em] transition-all border",
        isDarkColor 
          ? "bg-black/5 text-black border-black/20 dark:bg-white/10 dark:text-white dark:border-white/30" 
          : "dark:bg-opacity-20 dark:brightness-125"
      )}
      style={{
        fontSize: '0.65em',
        ...(isDarkColor ? {} : {
          backgroundColor: `${finalTech.color}15`,
          color: finalTech.color,
          borderColor: `${finalTech.color}30`,
        })
      }}
    >
      <Image
        src={finalTech.icon.replace("SocialIcons", "/SocialIcons")} // Fix for the leading space issue in find output
        alt={name}
        width={14}
        height={14}
        className={cn("w-[1.2em] h-[1.2em] shrink-0 object-contain", isDarkColor && "dark:invert dark:opacity-90")}
      />
      <span className="leading-none whitespace-nowrap">{finalTech.label}</span>
    </span>
  );
}
