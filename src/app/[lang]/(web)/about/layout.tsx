import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);
  
  return getPageMetadata(lang as Language, {
    title: dict.about.seo.title,
    description: dict.about.seo.description,
    image: "/og.png",
  });
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-justify">{children}</div>;
}
