import { Metadata } from "next";
import { Language } from "@/types/locale";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

export type CustomMetadata = Partial<Metadata> & { url?: string };

export async function getPageMetadata(lang: Language = "en", override?: CustomMetadata): Promise<Metadata> {
  const dict = await getDictionary(lang);
  const isEn = lang === "en";
  
  const base: Metadata = {
    title: typeof override?.title === 'string'
      ? { absolute: override.title }
      : (override?.title ?? {
          default: dict.global.seo.title,
          template: ``,
        }),
    description: override?.description || dict.global.seo.description,
    keywords: dict.global.seo.keywords.split(",").map(k => k.trim()),
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "fr_FR",
      url: siteConfig.url,
      title: override?.title?.toString() || dict.global.seo.title,
      description: override?.description || dict.global.seo.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: override?.title?.toString() || dict.global.seo.title,
      description: override?.description || dict.global.seo.description,
      images: [siteConfig.ogImage],
      creator: "@wistant",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/wistant-logo.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };

  const finalOpenGraph: Metadata["openGraph"] = {
    ...base.openGraph,
    ...(override?.openGraph || {}),
  } as Metadata["openGraph"];

  // If a generic URL is passed, map it to the OpenGraph block automatically
  if (override?.url) {
    // We prepend the baseUrl if it's a relative path just in case
    const path = override.url.startsWith("/") ? `${siteConfig.url}${override.url}` : override.url;
    if (finalOpenGraph) finalOpenGraph.url = path;
  }

  // Purge the arbitrary url field from being placed at the root of the standard Metadata response
  const { ...validOverride } = override || {};

  return {
    ...base,
    ...validOverride,
    openGraph: finalOpenGraph,
    twitter: {
      ...base.twitter,
      ...(override?.twitter || {}),
    },
  };
}
