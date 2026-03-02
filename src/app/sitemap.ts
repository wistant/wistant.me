import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const locales = ["en", "fr"];
  const routes = ["", "/blog", "/projects", "/posts"];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    routes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/blog" || route === "/posts" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  return entries;
}