import { getOgImage } from "@/components/og/response";
import { getDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const alt = "Wistant Hackathons";
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return getOgImage({
    title: dict.hackathons?.title || "Hackathons",
    description: dict.global.seo.description,
    type: "home",
    lang,
    label: "Awards"
  });
}
