import { DATA } from "@/data/resume";
import { getDictionary } from "@/lib/dictionary";
import { OG_ASSETS } from "./opengraph/assets";
import { Language, LOCALES, LOCALE_MAP } from "@/types/locale";

// Dynamic base URL detection for Vercel previews and production
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return DATA.url;
};

export const SITE_CONFIG = {
  name: DATA.name,
  url: getBaseUrl(),
  links: {
    X: "https://x.com/wistantkode",
    github: "https://github.com/wistantkode",
    LinkedIn: "https://linkedin.com/in/wistantkode",
  },
};

export const truncateTo160 = (text?: string): string => {
  if (!text) return "";
  const stripped = text.replace(/<[^>]*>?/gm, "").replace(/[#*`_]/g, ""); // Strip HTML & basic markdown
  return stripped.length > 160 ? stripped.substring(0, 157) + "..." : stripped;
};

interface PageSeo {
  title?: string;
  description?: string;
  keywords?: string | string[];
  url?: string;
  image?: string;
}

export type { Language };
export { LOCALES, LOCALE_MAP };

export const getPageMetadata = async (lang: string, pageSeo?: PageSeo) => {
  const dict = await getDictionary(lang as Language);
  const globalSeo = dict.global.seo;

  const title = pageSeo?.title || globalSeo.title;
  const rawDescription = pageSeo?.description || globalSeo.description;
  const description = pageSeo?.description ? truncateTo160(rawDescription) : rawDescription;
  const keywords = pageSeo?.keywords || globalSeo.keywords;
  const url = pageSeo?.url || "";
  
  // Ensure we use the detected SITE_CONFIG.url to avoid absolute URL issues on previews
  const baseUrl = SITE_CONFIG.url;
  const ogImage = pageSeo?.image || `${baseUrl}${OG_ASSETS.home}`;

  // Robust absolute URL for canonical
  const fullUrl = `${baseUrl}${url}`;

  // Dynamically build language alternates
  const languageAlternates = LOCALES.reduce((acc, l) => {
    const locale = LOCALE_MAP[l] || l;
    acc[locale] = `${baseUrl}/${l}${url}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: DATA.name, url: DATA.url }],
    creator: DATA.name,
    publisher: DATA.name,
    category: "technology",
    alternates: {
      canonical: fullUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      title: title,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
          // Explicitly set type based on extension
          type: ogImage.endsWith(".webp") ? "image/webp" : "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
      creator: "@wistantkode",
      site: "@wistantkode",
    },
    icons: {
      icon: "/me/me.png",
      shortcut: "/me/me.png",
      apple: "/me/me.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    // Adding JSON-LD for Local SEO (Cameroun)
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: DATA.name,
        image: `${baseUrl}${DATA.avatarUrl}`,
        url: baseUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Douala",
          addressCountry: "CM",
        },
        sameAs: [
          SITE_CONFIG.links.github,
          SITE_CONFIG.links.X,
          SITE_CONFIG.links.LinkedIn,
        ],
        jobTitle: "Senior Software Engineer",
        priceRange: "$$$",
      }),
    },
  };
};
