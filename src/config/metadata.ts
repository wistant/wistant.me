import { DATA } from "@/data/resume";
import { getDictionary } from "@/lib/dictionary";
import { Language, LOCALES, LOCALE_MAP } from "@/types/locale";

// Dynamic base URL detection for Vercel previews and production
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return DATA.url.replace(/\/$/, "");
};

const baseUrl = getBaseUrl();

export const SITE_CONFIG = {
  name: DATA.name,
  url: baseUrl,
  links: {
    X: "https://x.com/wistant",
    github: "https://github.com/wistantkode",
    LinkedIn: "https://linkedin.com/in/wistantkode",
  },
};

export const truncateTo160 = (text?: string): string => {
  if (!text) return "";
  // Strip HTML, markdown and redundant spaces
  const stripped = text
    .replace(/<[^>]*>?/gm, "")
    .replace(/[#*`_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  // Google typically shows ~155-160 chars. 
  // We truncate at 155 to be safe and avoid cut-off words if possible.
  if (stripped.length <= 160) return stripped;
  
  const truncated = stripped.substring(0, 157);
  // Try to avoid cutting mid-word if reasonable
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 140) {
    return truncated.substring(0, lastSpace) + "...";
  }
  return truncated + "...";
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
  const description = truncateTo160(rawDescription);
  const keywords = pageSeo?.keywords || globalSeo.keywords;
  const url = pageSeo?.url || "";
  
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, ""); // Ensure no trailing slash
  const fullUrl = `${baseUrl}/${lang}${url}`;

  // Dynamically build language alternates
  const languageAlternates = LOCALES.reduce((acc, l) => {
    acc[l] = `${baseUrl}/${l}${url}`;
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
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@wistantkode",
      site: "@wistantkode",
    },
    icons: {
      icon: "/me/me.webp?v=2",
      shortcut: "/me/me.webp?v=2",
      apple: "/me/me.png?v=2",
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
    verification: {
      google: "XVF3LaVsnlk2hGWOSNWwElX4AoXLKlVmeaz1kDxHRJY",
    },
    // Adding JSON-LD for Local SEO (Cameroun)
    other: {
      "og:image:alt": title,
      "twitter:image:alt": title,
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
