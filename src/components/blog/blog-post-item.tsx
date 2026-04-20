import Link from "next/link";
import Image from "next/image";
import { type Post } from "content-collections";
import { Language } from "@/types/locale";

interface BlogPostItemProps {
  post: Post;
  lang: Language;
  views?: number;
}

export function BlogPostItem({ post, lang, views }: BlogPostItemProps) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const wordCount = post.content?.split(/\s+/).length || 500;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group flex gap-4 py-3 items-center transition-opacity hover:opacity-80 outline-none"
    >
      <div className="relative overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900 w-16 h-12 sm:w-24 sm:h-16 rounded-[4px] ring-1 ring-border/50">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 64px, 96px"
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-neutral-400 dark:text-neutral-600 font-mono text-[10px]">
              {post.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
          {post.summary}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-0.5">
          <time dateTime={date.toISOString()}>{formattedDate}</time>
          <span className="font-bold">·</span>
          <span>{readingTime} min read</span>
          {views !== undefined && (
            <>
              <span className="font-bold">·</span>
              <span className="flex items-center gap-1">
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                {views.toLocaleString()}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
