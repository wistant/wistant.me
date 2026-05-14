import { getAllBlogs } from "@/lib/mdx-registry";
import { BlogPostItem } from "./blog-post-item";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { getDictionary, getCurrentLanguage } from "@/lib/dictionary";

const BLUR_FADE_DELAY = 0.04;

export default async function BlogHome() {
  const posts = getAllBlogs().slice(0, 3);
  const dict = await getDictionary();
  const lang = await getCurrentLanguage();

  if (posts.length === 0) return null;

  return (
    <section id="blog-home" className="py-12 border-t border-border/40">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
           <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl font-cal">
             {dict.blog.latestTitle || "Latest Stories"}
           </h2>
           <p className="text-muted-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
             {dict.blog.latestSubtitle || "Insights & Reflections"}
           </p>
        </div>

        <div className="flex flex-col gap-2">
          {posts.map((post, id) => (
            <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
              <BlogPostItem post={post} lang={lang} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
