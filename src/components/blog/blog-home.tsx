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
    <section id="blog-home" className="py-20 border-t border-border/40">
      <div className="flex flex-col gap-y-12 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border border-border bg-black z-10 rounded-xl px-4 py-1 shadow-sm">
              <span className="text-white text-sm font-medium">{dict.blog.latestTitle || "Latest Stories"}</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold font-clash tracking-tighter italic sm:text-5xl">{dict.blog.latestSubtitle || "Insights & Reflections"}</h2>
            {dict.blog.latestDescription && (
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                {dict.blog.latestDescription}
              </p>
            )}
          </div>
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
