import { allPosts } from "content-collections";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { Metadata } from "next";

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
  
  // Get and sort posts
  const posts = allPosts
    .filter((p) => p.lang === lang || (p.lang === "en" && !allPosts.some(x => x.slug === p.slug && x.lang === lang)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="max-w-2xl mx-auto px-6 py-20 min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
           <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        </div>
        
        <ul className="flex flex-col gap-1">
          {posts.map((post, i) => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const firstOfYear = !posts[i - 1] || new Date(posts[i - 1].date).getFullYear() !== year;
            
            return (
              <li key={post.slug} className="group">
                <Link href={`/${lang}/blog/${post.slug}`} className="flex items-center py-2 h-10">
                  <span className="w-12 md:w-16 shrink-0 text-neutral-500 text-xs mt-0.5">
                    {firstOfYear ? year : ""}
                  </span>
                  <span className="grow">
                    <span className="group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800 transition-all rounded px-1.5 py-0.5 -ml-1.5">
                      {post.title}
                    </span>
                  </span>
                  {/* Views could go here if implemented */}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
