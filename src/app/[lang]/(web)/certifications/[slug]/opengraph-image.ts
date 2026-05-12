import { getOgImage } from '@/components/og/response';
import { allCertifications } from 'content-collections';
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
  if (!slug) return getOgImage('certifications');
  const cert = allCertifications.find((c) => c.slug === slug && c.lang === lang);
  if (!cert) return getOgImage('certifications');
  return getOgImage('certifications', cert.title, cert.image);
}
