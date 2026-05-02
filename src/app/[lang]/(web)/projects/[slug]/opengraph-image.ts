import { getOgImage } from '@/components/og/response';
import { allProjects } from 'content-collections';
import { config } from '@/utils/og';

export const runtime = 'edge';
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
  if (!slug) return getOgImage('projects');
  const project = allProjects.find((p) => p.slug === slug && p.lang === lang);
  if (!project) return getOgImage('projects');
  return getOgImage('projects', project.title, project.image);
}
