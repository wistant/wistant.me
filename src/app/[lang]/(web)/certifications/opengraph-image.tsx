import { getOgImage } from "@/components/og/response";
import { getDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const alt = "Wistant Certifications";
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return getOgImage({
    title: dict.certifications?.title || "Certifications",
    description: dict.certifications?.description || "",
    type: "home",
    lang,
    label: "Certifications"
  });
}
