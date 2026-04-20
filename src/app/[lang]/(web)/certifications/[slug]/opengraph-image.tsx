import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og/og-image";
import { allCertifications } from "content-collections";
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
  const cert = allCertifications.find((p) => p.slug === slug && p.lang === lang);
  
  if (!cert) {
     return new ImageResponse(
       <OgImage title="Certification" type="about" lang={lang} label="Certification" />,
       { ...size }
     );
  }
  
  return new ImageResponse(
    <OgImage 
      title={cert.title} 
      description={cert.description || ""} 
      type="about" 
      lang={lang} 
      label="Certification"
    />,
    { ...size }
  );
}
