"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts: Record<string, number>;
}

export function TagFilter({ tags, selectedTag, tagCounts }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === tags[0]) { // Assuming first tag is "All"
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = tag === selectedTag;
        const count = tagCounts[tag] || 0;

        return (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-all border",
              isSelected
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-background text-muted-foreground border-border hover:border-neutral-400 dark:hover:border-neutral-600"
            )}
          >
            {tag}
            <span className={cn(
              "ml-1.5 opacity-60",
              isSelected ? "text-background/80" : "text-muted-foreground/80"
            )}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
