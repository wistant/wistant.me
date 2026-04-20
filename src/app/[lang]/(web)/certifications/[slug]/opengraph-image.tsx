import { getOgImage } from "@/components/og/response";
import { allCertifications } from "content-collections";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const alt = "Wistant Certification";
export const contentType = "image/png";

export default async function Image({ 
  params 
}: { 
  params: Promise<{ lang: Language; slug: string }> 
}) {
  const { lang, slug } = await params;
  const cert = allCertifications.find((c) => c.slug === slug && c.lang === lang)
            || allCertifications.find((c) => c.slug === slug && c.lang === "en");
  
  return getOgImage({
    title: cert?.title || "Certification",
    description: cert?.issuer || "",
    type: "home",
    lang,
    label: "Credential"
  });
}
