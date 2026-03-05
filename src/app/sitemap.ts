import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/metadata";
import { allPosts, allProjects } from "content-collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const locales = ["en", "fr"];
  const staticRoutes = ["", "/blog", "/projects", "/about", "/contact", "/hackathons", "/llms.txt"];

  const entries: MetadataRoute.Sitemap = [];

  // 1. Static Routes
  locales.forEach((lang) => {
    staticRoutes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "monthly" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  // 2. Dynamic Blog Posts
  allPosts.forEach((post) => {
    // Determine last modified date from post.date (if exists) or fallback
    const lastModified = post.date ? new Date(post.date) : new Date();
    // Assuming posts have a valid lang. Check for it or default to en.
    const lang = post.lang || "en";
    entries.push({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // 3. Dynamic Projects
  locales.forEach((lang) => {
    allProjects.forEach((project) => {
      const lastModified = project.date ? new Date(project.date) : new Date();
      entries.push({
        url: `${baseUrl}/${lang}/projects/${project.slug}`,
        lastModified: lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return entries;
}