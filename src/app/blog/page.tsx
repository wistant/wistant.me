import { getCurrentLanguage } from "@/lib/dictionary";
import { getAllBlogs } from "@/lib/mdx-registry";
import { getDictionary } from "@/lib/dictionary";
import { getPageMetadata } from "@/config/metadata";
import { Metadata } from "next";
import { BlogPostItem } from "@/components/blog/blog-post-item";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();
  return getPageMetadata(lang, { ...dict.blog.seo, image: "/og.png", url: "/blog" });
}

export default async function BlogPage() {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();
  
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

  return (
    <main className="max-w-2xl mx-auto py-20 min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-4 items-center justify-between">
           <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-cal leading-tight">{dict.blog.title || "Blog"}</h1>
        </div>
        
        <ol className="flex flex-col gap-16 w-full mt-12">
          {years.map((year) => (
            <li className="flex flex-col gap-4 w-full mb-12" key={year}>
              <div className="h-fit">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl font-cal opacity-50">
                  {year}
                </h2>
              </div>
              <div className="flex flex-col">
                <ol className="flex flex-col divide-y divide-border/40 w-full">
                  {postsByYear[year].map((post) => (
                    <li key={post.slug} className="block w-full">
                      <BlogPostItem post={post} lang={lang} />
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
