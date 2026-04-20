import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og/og-image";
import { getProjectsByLang } from "@/data/projects";
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
  const projects = getProjectsByLang(lang);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      <OgImage title="Projects" type="projects" lang={lang} />,
      { ...size }
    );
  }

  return new ImageResponse(
    <OgImage 
      title={project.title} 
      description={project.description} 
      type="projects" 
      lang={lang} 
      label="Project"
    />,
    { ...size }
  );
}
