import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og/og-image";
import { getDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";

export const runtime = "edge";
export const alt = "Wistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return new ImageResponse(
    <OgImage 
      title={dict.global.seo.title} 
      description={dict.global.seo.description} 
      type="home" 
      lang={lang} 
    />,
    { ...size }
  );
}
