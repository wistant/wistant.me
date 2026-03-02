import { personalData } from "@/data/personal";
import { type Author } from "@/lib/authors";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ className }: AuthorCardProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <div className="relative size-8 flex-none border border-border rounded-full overflow-hidden">
        <Image
          src={personalData.avatarUrl}
          alt={personalData.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-sm tracking-tight text-balance font-semibold">
          {personalData.name}
        </h3>
        <p className="text-xs text-muted-foreground text-balance">
          {personalData.post}
        </p>
      </div>
    </div>
  );
}
