import { AuthorCard } from "@/components/blog/author-card";
import { HashScrollHandler } from "@/components/blog/hash-scroll-handler";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAuthor, isValidAuthor } from "@/lib/authors";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { allPosts } from "content-collections";
import { getPostBySlug } from "@/data/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { ReadMoreSection } from "@/components/blog/read-more-section";
import { PromoContent } from "@/components/blog/promo-content";
import { MobileTableOfContents } from "@/components/blog/mobile-toc";
import { getPageMetadata, SITE_CONFIG } from "@/config/metadata";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

type Language = "en" | "fr" | "es" | "ar" | "wo";

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
  const post = getPostBySlug(slug, lang);

  if (!post) {
    return getPageMetadata(lang);
  }

  const pageSeo = {
    title: post.title,
    description: post.summary,
    keywords: post.tags ?? [],
    url: `/${lang}/blog/${slug}`,
    // Fire our cool Edge Satori Architecture through the API
    image: post.image ? `${SITE_CONFIG.url}/api/og?type=blog&img=${encodeURIComponent(post.image)}` : undefined,
  };

  return getPageMetadata(lang, pageSeo);
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, lang);

  if (!post) notFound();

  const author =
    post.author && isValidAuthor(post.author) ? getAuthor(post.author) : null;

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="min-h-screen bg-background relative pt-16 md:pt-20">
      <JsonLd
        type="Article"
        title={post.title}
        description={post.summary}
        url={`/${lang}/blog/${slug}`}
        image={post.image}
        publishDate={post.date}
        authorName={author?.name}
      />
      <HashScrollHandler />

      {/* Background with Grid */}
      <div className="absolute top-0 left-0 z-0 w-full h-62.5 mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* Hero / Header Section */}
      <div className="space-y-4 border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-6 px-2.5 text-[10px] sm:text-xs font-medium bg-muted/60 text-muted-foreground rounded-lg border border-border/40 flex items-center justify-center backdrop-blur-sm uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <time className="font-medium text-muted-foreground ml-1">
              {formattedDate}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance leading-relaxed">
              {post.summary}
            </p>
          )}
        </div>
      </div>

      {/* Layout Content + Sidebar */}
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10 border-b border-border">
        {/* Background visual continuity lines */}
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none -z-10" />

        <main className="w-full p-0 overflow-hidden min-h-screen">
          {post.image && (
            <div className="relative w-full h-75 md:h-125 overflow-hidden border-b border-border">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 lg:p-10">
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-lg transition-colors">
              <MDXRemote
                source={post.content ?? ""}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkCodeMeta],
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-10">
            <ReadMoreSection currentSlug={post.slug} currentTags={post.tags} />
          </div>
        </main>

        <aside className="hidden lg:block w-87.5 shrink-0 p-6 lg:p-8 bg-muted/20 dark:bg-muted/10 border-r border-border backdrop-blur-sm">
          <div className="sticky top-20 space-y-4">
            {/* Navigation Card */}
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
              <Button variant="ghost" asChild className="justify-start gap-3 w-full rounded-xl hover:bg-muted/50 transition-colors">
                <Link href={`/${lang}`}>
                  <Home className="size-4 text-muted-foreground" />
                  <span>{lang === "fr" ? "Accueil" : "Home"}</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start gap-3 w-full rounded-xl hover:bg-muted/50 transition-colors">
                <Link href={`/${lang}/blog`}>
                  <BookOpen className="size-4 text-muted-foreground" />
                  <span>{lang === "fr" ? "Tous les Articles" : "All Articles"}</span>
                </Link>
              </Button>
            </div>

            {author && (
              <div className="border border-border/60 rounded-xl p-4 bg-card/60 backdrop-blur-md shadow-sm">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Auteur
                </h4>
                <AuthorCard author={author} />
              </div>
            )}

            <div className="border border-border/60 rounded-xl p-4 bg-card/60 backdrop-blur-md shadow-sm">
              <TableOfContents />
            </div>

            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
    </div>
  );
}
