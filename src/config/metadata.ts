import { DATA } from "@/data/resume";

export const SITE_CONFIG = {
  name: DATA.name,
  title: `${DATA.name} | Software Engineer & Entrepreneur`,
  description: DATA.description,
  url: DATA.url,
  ogImage: `${DATA.url}/og.png`, // Fallback image
  links: {
    twitter: "https://twitter.com/dillionverma", // Update with real handle if in DATA
    github: "https://github.com/dillionverma",
  },
};

export const DEFAULT_METADATA = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@dillionverma",
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
};
