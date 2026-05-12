import { getOgImage } from '@/components/og/response';
import { allPosts } from 'content-collections';
import { config } from '@/utils/og';


export const dynamic = 'force-static';
export const size = {
  width: config.size.width,
  height: config.size.height,
};
export const contentType = config.contentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  if (!slug) return getOgImage('blog');
  const post = allPosts.find((p) => p.slug === slug && p.lang === lang);
  if (!post) return getOgImage('blog');
  return getOgImage('blog', post.title, post.image);
}
