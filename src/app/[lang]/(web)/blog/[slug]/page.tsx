import { allPosts } from "content-collections";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { Metadata } from "next";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { remarkImageSize } from "@/lib/remark-image-size";
import rehypePrettyCode from "rehype-pretty-code";
import { getDictionary } from "@/lib/dictionary";
import { redis } from "@/lib/redis";

interface BlogSlugPageProps {
  params: Promise<{ slug: string; lang: Language }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
    lang: post.lang || "en",
  }));
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = allPosts.find((p) => p.slug === slug && p.lang === lang);

  if (!post) {
    return getPageMetadata(lang);
  }

  const pageSeo = {
    title: post.title,
    description: post.summary || post.description || "",
    keywords: post.tags ?? [],
    url: `/${lang}/blog/${slug}`,
    image: post.image,
  };

  return getPageMetadata(lang, pageSeo);
}

import { Header } from "@/components/blog/slug/header";
import { ShareButton } from "@/components/blog/slug/share-button";
import { Reactions } from "@/components/blog/slug/reactions";

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { lang, slug } = await params;
  
  let post = allPosts.find((p) => p.slug === slug && p.lang === lang);
  if (!post && lang !== "en") {
    post = allPosts.find((p) => p.slug === slug && p.lang === "en");
  }

  if (!post) notFound();
  
  const dict = await getDictionary(lang);
  const wordCount = post.content?.split(/\s+/).length || 500;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  let views = 0;
  if (redis) {
    try {
      views = await redis.get<number>(`blog:views:${slug}`) || 0;
    } catch (error) {
      console.error("Failed to fetch views from Redis:", error);
    }
  }

  return (
    <article className="max-w-2xl mx-auto px-6 py-16 min-h-screen flex flex-col gap-10">
      
      <Header 
        post={{ title: post.title, summary: post.summary, date: post.date }}
        lang={lang}
        dict={dict}
        readingTime={readingTime}
        views={views}
      />

      {post.image && (
        <div className="w-full">
          <div className="relative aspect-[2/1] w-full rounded-md overflow-hidden border border-border/50 bg-neutral-100 dark:bg-neutral-900">
             <Image 
               src={post.image} 
               alt={post.title} 
               fill 
               className="object-cover" 
               priority 
             />
          </div>
        </div>
      )}

      <main className="prose prose-neutral dark:prose-invert font-sans max-w-none 
        prose-p:leading-relaxed prose-p:mb-6
        prose-headings:font-clash prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-2xl
        prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl
        prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700 hover:prose-a:decoration-foreground transition-colors prose-a:underline-offset-[3px]
        prose-li:marker:text-neutral-400 dark:prose-li:marker:text-neutral-600
        prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-sm">
        <MDXRemote
          source={post.content ?? ""}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkCodeMeta, remarkImageSize],
              rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
            },
          }}
        />
      </main>
      
      <hr className="m-0 border-none h-px bg-neutral-200 dark:bg-neutral-800 -my-6 -mx-6 w-auto sm:mx-0 sm:w-full" />
      
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center justify-between sm:gap-4 mt-8 pb-32">
        <div className="flex flex-row items-center gap-2.5 sm:gap-3">
          <ShareButton title="Share blog post" slug={slug || ""} />
          <a
            title="Edit blog post"
            href={`https://github.com/wistantkode/wistant.me/edit/main/src/content/blog/${slug}.${lang}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
            <span>Edit on GitHub</span>
          </a>
        </div>
        <Reactions slug={slug} />
      </div>
    </article>
  );
}
