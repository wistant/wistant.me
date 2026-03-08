import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { LOCALES } from "@/types/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
    "/hackathons",
    "/posts",
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DATA.url;

  const sitemapEntries = routes.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  return sitemapEntries;
}