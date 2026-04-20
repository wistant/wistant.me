import { getOgImage } from "@/components/og/response";
import { allProjects } from "content-collections";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const alt = "Wistant Project";
export const contentType = "image/png";

export default async function Image({ 
  params 
}: { 
  params: Promise<{ lang: Language; slug: string }> 
}) {
  const { lang, slug } = await params;
  const project = allProjects.find((p) => p.slug === slug && p.lang === lang)
               || allProjects.find((p) => p.slug === slug && p.lang === "en");
  
  return getOgImage({
    title: project?.title || "Project",
    description: project?.description || "",
    type: "projects",
    lang,
    label: "Portfolio"
  });
}
