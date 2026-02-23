import { DATA } from "@/data/resume";

export const SITE_CONFIG = {
  name: DATA.name,
  title: `${DATA.name} | Elite Senior Software Engineer & Architect`,
  description: "Senior Software Engineer specializing in high-performance web systems and scalable architectures. Crafting premium digital experiences with Next.js, React and modern DevOps practices.",
  url: DATA.url,
  ogImage: `${DATA.url}/og-images/home-og.png`,
  links: {
    twitter: "https://twitter.com/wistantkode",
    github: "https://github.com/wistantkode",
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
    creator: "@wistantkode",
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
};
