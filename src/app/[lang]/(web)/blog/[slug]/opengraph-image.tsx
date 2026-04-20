import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og/og-image";
import { allPosts } from "content-collections";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ 
  params 
}: { 
  params: Promise<{ lang: Language; slug: string }> 
}) {
  const { lang, slug } = await params;
  const post = allPosts.find((p) => p.slug === slug && p.lang === lang) 
            || allPosts.find((p) => p.slug === slug && p.lang === "en");

  if (!post) {
    return new ImageResponse(
      <OgImage title="Blog" type="blog" lang={lang} />,
      { ...size }
    );
  }

  return new ImageResponse(
    <OgImage 
      title={post.title} 
      description={post.summary || post.description} 
      type="blog" 
      lang={lang} 
      label="Article"
    />,
    { ...size }
  );
}
