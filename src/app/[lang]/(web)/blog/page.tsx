import { getAllBlogs } from "@/lib/mdx-registry";
import { getDictionary } from "@/lib/dictionary";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { Metadata } from "next";
import { BlogPostItem } from "@/components/blog/blog-post-item";
import { redis } from "@/lib/redis";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return getPageMetadata(lang, dict.blog.seo);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Get and sort posts directly from our custom pure MDX registry
  const posts = getAllBlogs();

  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const viewsMap: Record<string, number> = {};
  if (redis && posts.length > 0) {
    try {
      const keys = posts.map(post => `blog:views:${post.slug}`);
      const viewsData = await redis.mget<number[]>(...keys);
      if (viewsData) {
        posts.forEach((post, i) => {
          viewsMap[post.slug] = viewsData[i] || 0;
        });
      }
    } catch (error) {
      console.warn("Redis fetch failed (views). Disabling view counters locally.");
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-20 min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-4 items-center justify-between">
           <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-cal leading-tight">{dict.blog.title || "Blog"}</h1>
        </div>
        
        <ol className="flex flex-col gap-6 w-full">
          {years.map((year) => (
            <li className="block w-full" key={year}>
              <section id={`posts-from-${year}`} aria-label={`Posts from ${year}`}>
                <div className="flex items-end gap-3 mt-3 w-full">
                  <h2 className="text-lg font-clash font-bold leading-none">{year}</h2>
                  <hr className="w-full border-none m-0 -mt-0.5 h-px bg-neutral-200 dark:bg-neutral-800 flex-1" />
                </div>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-6 mb-12 w-full">
                  {postsByYear[year].map((post) => (
                    <li className="block w-full h-full" key={post.slug}>
                      <BlogPostItem post={post} lang={lang} views={viewsMap[post.slug] || 0} />
                    </li>
                  ))}
                </ol>
              </section>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
