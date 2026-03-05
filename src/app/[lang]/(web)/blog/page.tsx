import { Suspense } from "react";
import { allPosts } from "content-collections";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { getDictionary } from "@/lib/dictionary";
import { getPageMetadata } from "@/config/metadata";

type Language = "en" | "fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return getPageMetadata(lang, dict.blog.seo);
}

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Language }>;
  searchParams: Promise<{ tag?: string }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  // Sort blog by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Extract unique tags
  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedPosts.flatMap((post) => post.tags || [])),
    ).sort(),
  ];

  // Filter logic
  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredPosts =
    selectedTag === "All"
      ? sortedPosts
      : sortedPosts.filter((post) => post.tags?.includes(selectedTag));

  // Compute tag counts
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === "All") {
        acc[tag] = sortedPosts.length;
      } else {
        acc[tag] = sortedPosts.filter((post) =>
          post.tags?.includes(tag),
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen bg-background relative pt-12 md:pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="size-4" />
            Retour à l&lsquo;accueil
          </Link>
        </Button>
      </div>

      {/* Hero Background */}
      <div className="absolute top-0 left-0 z-0 w-full h-[250px] mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* Header Section */}
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              {dict.blog.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl">
              {dict.blog.description}
            </p>
          </div>
        </div>

        {/* Filters */}
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense
          fallback={
            <div className="text-center py-20">Loading articles...</div>
          }
        >
          {filteredPosts.length > 0 ? (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
                filteredPosts.length < 4 ? "border-b" : "border-b-0"
              }`}
            >
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post._meta.path}
                  url={`/${lang}/blog/${post.slug}`}
                  title={post.title}
                  description={post.summary}
                  date={formatDate(post.date)}
                  thumbnail={post.image}
                  showRightBorder={filteredPosts.length < 3}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground border-x border-b border-border">
              Aucun article trouvé pour le tag &quot;{selectedTag}&quot;.
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
