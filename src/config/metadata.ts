import { DATA } from "@/data/resume";

export const SITE_CONFIG = {
  name: DATA.name,
  title: `${DATA.name} | Senior Software Engineer & Architect`,
  description:
    "Senior Software Engineer specializing in high-performance web systems and scalable architectures. Crafting premium digital experiences with TypeScript, Next.js, Bun, Nodejs, NestJS React and modern DevOps practices.",
  url: DATA.url,
  // Points to the dynamic Edge-rendered OG image (Next.js route convention)
  ogImage: `${DATA.url}/opengraph-image`,
  links: {
    twitter: "https://twitter.com/wistantkode",
    github: "https://github.com/wistantkode",
  },
  keywords: [
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Web Performance",
    "Full-Stack Developer",
    "System Architecture",
    "Node.js",
    "DevOps",
    "Douala",
    "Cameroon",
  ],
};

export const DEFAULT_METADATA = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  category: "technology",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
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
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
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
};
