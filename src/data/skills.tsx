import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";

export const skillsData = [
  // Core TypeScript Architecture
  { name: "TypeScript", icon: Typescript },
  { name: "Next.js", icon: NextjsIconDark },
  { name: "NestJS", icon: Nodejs },
  { name: "React", icon: ReactLight },
  { name: "Vite", icon: ReactLight }, // Using ReactLight as fallback pattern for frontend tooling

  // Databases & Tooling
  { name: "PostgreSQL", icon: Postgresql },
  { name: "MariaDB", icon: Postgresql }, // Fallback icon for DB
  { name: "Prisma", icon: Typescript }, // Fallback for TS ORM
  { name: "Redis", icon: Nodejs }, // Fallback for datastore
];
