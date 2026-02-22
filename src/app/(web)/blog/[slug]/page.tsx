import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorCard } from "@/components/blog/author-card";
import { HashScrollHandler } from "@/components/blog/hash-scroll-handler";
import { getAuthor, isValidAuthor } from "@/lib/authors";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkCodeMeta } from "@/lib/remark-code-meta";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const author =
    post.author && isValidAuthor(post.author)
      ? getAuthor(post.author)
      : null;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <HashScrollHandler />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <article className="min-w-0">
            <header className="mb-10 pb-10 border-b border-border">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>

              {post.summary && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                {author && <AuthorCard author={author} />}
                <time className="text-sm text-muted-foreground">
                  {formattedDate}
                </time>
              </div>
            </header>

            {/* MDX Body rendered via next-mdx-remote */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
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
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
