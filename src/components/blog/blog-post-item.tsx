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

  const readingTime = 5;

  return (
    <Link href={`/${lang}/blog/${post.slug}`} className="block group outline-none h-full">
      <div className="flex flex-col h-full bg-card/40 hover:bg-card/60 border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group/card relative">
        {/* Subtle Gradient Glow on Hover */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
        
        {/* Prominent Image Section */}
        <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border/30 bg-muted/20">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-1000 group-hover/card:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
              <span className="text-neutral-400 dark:text-neutral-600 font-mono text-[14px] uppercase tracking-widest">
                {post.title.substring(0, 3)}
              </span>
              <div>
                {post.description}
              </div>
            </div>
          )}
          
          {/* Top Meta Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-background/80 backdrop-blur-md border border-border/50 rounded-none shadow-sm z-10">
             <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
               {formattedDate}
             </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 gap-3 z-10">
          <h3 className="font-clash font-bold text-lg sm:text-xl text-foreground group-hover/card:text-primary transition-colors leading-tight tracking-tight">
            {post.title}
          </h3>
          
          <p className="text-sm text-muted-foreground/90 line-clamp-2 font-serif italic leading-relaxed flex-1">
            {post.description}
          </p>
          
          {/* Footer Meta */}
          <div className="flex items-center justify-between pt-2 border-t border-border/20 mt-auto">
             <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-tighter">
                <span className="flex items-center gap-1.5">
                   <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                   {readingTime} min
                </span>
             </div>
             
             <div className="size-5 flex items-center justify-center rounded-full border border-border/40 group-hover/card:border-primary/50 transition-colors">
                <svg className="size-2.5 text-muted-foreground group-hover/card:text-primary transition-all group-hover/card:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
