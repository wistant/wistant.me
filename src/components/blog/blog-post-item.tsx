import Link from "next/link";
import Image from "next/image";
import { type BlogPost } from "@/lib/mdx-registry";
import { Language } from "@/types/locale";

interface BlogPostItemProps {
  post: BlogPost;
  lang: Language;
}

export function BlogPostItem({ post, lang }: BlogPostItemProps) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );


  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="group block w-full py-3 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
        {/* Horizontal Image */}
        <div className="relative w-full sm:w-48 aspect-video sm:h-28 overflow-hidden rounded-xl border border-border/40 shrink-0 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center opacity-40">
                <span className="font-mono text-xs uppercase tracking-tighter">{post.title.substring(0, 3)}</span>
             </div>
          )}
        </div>

        {/* Content Side */}
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-col gap-1">
             <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
               {post.title}
               <svg 
                 className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
               >
                 <path d="M7 17L17 7M17 7H7M17 7V17" />
               </svg>
             </h3>
             <time className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest" dateTime={post.date}>
               {formattedDate}
             </time>
          </div>

          <p className="text-sm text-muted-foreground/80 line-clamp-2 max-w-2xl leading-relaxed">
            {post.description}
          </p>

          {/* Minimal Tags */}
          {post.tags && (
             <div className="flex flex-wrap gap-2 mt-1">
                {post.tags.slice(0, 4).map(tag => (
                   <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-border/50 text-muted-foreground font-medium uppercase tracking-tighter">
                      {tag}
                   </span>
                ))}
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
