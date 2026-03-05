import { DATA } from "@/data/resume";
import { getDictionary } from "@/lib/dictionary"; // Import getDictionary

export const SITE_CONFIG = {
  name: DATA.name,
  url: process.env.NEXT_PUBLIC_SITE_URL || DATA.url,
  links: {
    X: "https://x.com/wistantkode",
    github: "https://github.com/wistantkode",
    LinkedIn: "https://linkedin.com/in/wistantkode",
  },
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || DATA.url}/opengraph`,
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

export const getPageMetadata = async (lang: string, pageSeo?: PageSeo) => {
  const dict = await getDictionary(lang);
  const globalSeo = dict.global.seo;

  const title = pageSeo?.title || globalSeo.title;
  // Truncate dynamically provided description, fallback to dictionary
  const rawDescription = pageSeo?.description || globalSeo.description;
  const description = pageSeo?.description ? truncateTo160(rawDescription) : rawDescription;
  const keywords = pageSeo?.keywords || globalSeo.keywords;
  const url = pageSeo?.url || "";
  const ogImage = pageSeo?.image || SITE_CONFIG.ogImage;

  // Use the env base or fallback to avoid canonical mismatch on vercel branches
  const base = new URL(SITE_CONFIG.url);
  const fullUrl = `${SITE_CONFIG.url}${url}`;

  return {
    metadataBase: base,
    title: {
      default: title,
      template: `%s 🏆`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: DATA.name, url: DATA.url }],
    creator: DATA.name,
    publisher: DATA.name,
    category: "technology",
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-US": `${SITE_CONFIG.url}/en`,
        "fr-FR": `${SITE_CONFIG.url}/fr`,
      },
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
          type: "image/png",
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
        image: `${SITE_CONFIG.url}${DATA.avatarUrl}`,
        url: SITE_CONFIG.url,
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
