import { DATA } from "@/data/resume";

export const SITE_CONFIG = {
  name: DATA.name,
  url: DATA.url,
  links: {
    twitter: "https://twitter.com/wistantkode",
    github: "https://github.com/wistantkode",
  },
  locales: {
    en: {
      title: `${DATA.name} | Senior Software Engineer & Architect`,
      description: "Senior Software Engineer specializing in high-performance web systems and scalable architectures. Crafting premium digital experiences with TypeScript, Next.js, and Node.js.",
      keywords: ["Software Engineer", "Next.js", "React", "TypeScript", "System Architecture"],
    },
    fr: {
      title: `${DATA.name} | Ingénieur Logiciel Senior & Architecte`,
      description: "Ingénieur Logiciel Senior spécialisé en systèmes web haute performance au Cameroun (Douala). Expert Next.js, TypeScript et architectures cloud premium.",
      keywords: ["Développeur Cameroun", "Expert Next.js Douala", "Freelance Web Cameroun", "Architecte logiciel"],
    }
  },
  ogImage: `${DATA.url}/opengraph-image`,
};

export const getMetadata = (lang: "en" | "fr" = "en") => {
  const config = SITE_CONFIG.locales[lang] || SITE_CONFIG.locales.en;
  
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: config.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: DATA.name, url: DATA.url }],
    creator: DATA.name,
    publisher: DATA.name,
    category: "technology",
    alternates: {
      canonical: SITE_CONFIG.url,
      languages: {
        "en-US": `${SITE_CONFIG.url}/en`,
        "fr-FR": `${SITE_CONFIG.url}/fr`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: config.title,
      description: config.description,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [SITE_CONFIG.ogImage],
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
        "name": DATA.name,
        "image": `${SITE_CONFIG.url}${DATA.avatarUrl}`,
        "url": SITE_CONFIG.url,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Douala",
          "addressCountry": "CM"
        },
        "sameAs": [
          SITE_CONFIG.links.github,
          SITE_CONFIG.links.twitter,
          "https://linkedin.com/in/wistantkode"
        ],
        "jobTitle": "Senior Software Engineer",
        "priceRange": "$$$"
      })
    }
  };
};

export const DEFAULT_METADATA = getMetadata("en");
