import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  post: {
    title: string;
    summary?: string;
    date: string;
  };
  lang: string;
  dict: {
    blog: {
      back?: string;
      backToAll?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  readingTime: number;
}

export function Header({ post, lang, dict, readingTime }: HeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div className="flex flex-col gap-6">
      <Link
        title={dict.blog?.back || "Go back"}
        href={`/${lang}/blog`}
        className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.blog?.back || "blog"}</span>
      </Link>
      
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-pretty">
          {post.title}
        </h1>
        {post.summary && (
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {post.summary}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
        <span className="text-foreground font-medium">@wistant</span>
        <span>|</span>
        <time dateTime={post.date} suppressHydrationWarning>
          {formattedDate}
        </time>
        <span>|</span>
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
}
