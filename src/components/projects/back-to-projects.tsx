"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export function BackToProjects({ label }: { label?: string }) {
  const params = useParams();
  const lang = params?.lang || "en";
  
  return (
    <Link
      title={label || "Back to projects"}
      href="/projects"
      className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit mb-8 not-prose"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label || "projects"}</span>
    </Link>
  );
}
