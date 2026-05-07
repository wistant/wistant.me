import { Metadata } from "next";
import { Language } from "@/types/locale";
import { siteConfig } from "@/config/site";

export type CustomMetadata = Partial<Metadata> & { url?: string };

export function getPageMetadata(lang: Language = "en", override?: CustomMetadata): Metadata {
  const isEn = lang === "en";
  
  const base: Metadata = {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: isEn 
      ? siteConfig.description 
      : "Ingénieur Full Stack Senior & Architecte IA spécialisé dans les solutions numériques haut de gamme.",
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "AI Architecture",
      "Full Stack Engineer",
      "Portfolio",
    ],
    authors: [
      {
        name: "Wistant",
        url: "https://wistant.me",
      },
    ],
    creator: "Wistant",
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "fr_FR",
      url: siteConfig.url,
      title: siteConfig.name,
      description: isEn ? siteConfig.description : "Ingénieur Full Stack Senior & Architecte IA.",
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
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@wistant",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };

  const finalOpenGraph = {
    ...base.openGraph,
    ...(override?.openGraph as any),
  };

  // If a generic URL is passed, map it to the OpenGraph block automatically
  if (override?.url) {
    // We prepend the baseUrl if it's a relative path just in case
    const path = override.url.startsWith("/") ? `${siteConfig.url}${override.url}` : override.url;
    finalOpenGraph.url = path;
  }

  // Purge the arbitrary url field from being placed at the root of the standard Metadata response
  const { url: _url, ...validOverride } = override || {};

  return {
    ...base,
    ...validOverride,
    openGraph: finalOpenGraph,
    twitter: {
      ...base.twitter,
      ...(override?.twitter as any),
    },
  };
}
