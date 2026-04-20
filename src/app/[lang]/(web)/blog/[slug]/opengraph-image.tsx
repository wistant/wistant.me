import { getOgImage } from "@/components/og/response";
import { allPosts } from "content-collections";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const alt = "Wistant Blog";
export const contentType = "image/png";

export default async function Image({ 
  params 
}: { 
  params: Promise<{ lang: Language; slug: string }> 
}) {
  const { lang, slug } = await params;
  const post = allPosts.find((p) => p.slug === slug && p.lang === lang) 
            || allPosts.find((p) => p.slug === slug && p.lang === "en");

  return getOgImage({
    title: post?.title || "Blog",
    description: post?.summary || post?.description || "",
    type: "blog",
    lang,
    label: "Article"
  });
}
