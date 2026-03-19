import Link from "next/link";

import { cn } from "@/lib/utils";

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
}

export function BlogCard({
  url,
  title,
  description,
  date,
  thumbnail,
}: BlogCardProps) {
  return (
    <Link
      href={url}
      className={cn(
        "block h-full group bg-background",
      )}
    >
      <div className="flex flex-col">
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail.startsWith("/") || thumbnail.startsWith("http") ? thumbnail : `/${thumbnail}`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-card-foreground group-hover:underline underline-offset-4">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
          <time className="block text-sm font-medium text-muted-foreground">
            {date}
          </time>
        </div>
      </div>
    </Link>
  );
}
