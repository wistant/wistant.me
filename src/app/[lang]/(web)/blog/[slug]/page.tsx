import { allPosts } from "content-collections";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { Metadata } from "next";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { remarkImageSize } from "@/lib/remark-image-size";
import { getDictionary } from "@/lib/dictionary";
import { AICloudChart } from "@/components/mdx/charts/AICloudChart";

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

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { lang, slug } = await params;
  
  let post = allPosts.find((p) => p.slug === slug && p.lang === lang);
  if (!post && lang !== "en") {
    post = allPosts.find((p) => p.slug === slug && p.lang === "en");
  }

  if (!post) notFound();
  
  const dict = await getDictionary(lang);
  const blogDict = dict.blog as Record<string, unknown>;

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="max-w-2xl mx-auto px-6 py-20 min-h-screen relative">
      <div className="mb-10">
        <Link 
          href={`/${lang}/blog`} 
          className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 text-sm mb-8 inline-block transition-colors"
        >
          {(blogDict.back as string) || "← blog"}
        </Link>
        
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span className="shrink-0">@wistant</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <time dateTime={post.date} suppressHydrationWarning>{formattedDate}</time>
          </div>
        </header>
      </div>

      <main className="prose prose-neutral dark:prose-invert max-w-none 
        prose-p:my-5 prose-p:leading-relaxed 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-a:text-neutral-900 dark:prose-a:text-neutral-100 prose-a:underline decoration-neutral-300 hover:decoration-neutral-900 dark:decoration-neutral-700 dark:hover:decoration-neutral-300
        prose-img:rounded-xl prose-img:border prose-img:border-neutral-200 dark:prose-img:border-neutral-800">
        <MDXRemote
          source={post.content ?? ""}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkCodeMeta, remarkImageSize],
            },
          }}
        />
      </main>
      
      <footer className="mt-20 pt-10 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center text-sm text-neutral-500">
        <Link href={`/${lang}/blog`} className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors">
          {(blogDict.backToAll as string) || "← Back to all posts"}
        </Link>
      </footer>
    </article>
  );
}
