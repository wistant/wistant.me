import { MetadataRoute } from "next";
import { 
  allPosts, 
  allProjects, 
  allCertifications 
} from "../../.content-collections/generated";
import { SITE_CONFIG } from "@/config/metadata";
import { LOCALES } from "@/types/locale";

/**
 * Generates a comprehensive, multilingual sitemap for the application.
 * Utilizes content-collections to dynamically index blog posts, projects, and certifications.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
    "/certifications",
  ];

  const staticEntries = staticRoutes.flatMap((route) =>
    LOCALES.map((locale) => {
      const url = `${baseUrl}/${locale}${route}`;
      
      // Generate language alternates (hreflang)
      const languages = LOCALES.reduce((acc, l) => {
        acc[l] = `${baseUrl}/${l}${route}`;
        return acc;
      }, {} as Record<string, string>);

      return {
        url,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : 0.8,
        languages,
      };
    })
  );

  // 2. Dynamic Blog Posts
  const blogEntries = allPosts.map((post) => {
    const route = `/blog/${post.slug}`;
    const url = `${baseUrl}/${post.lang}${route}`;

    // Find alternates for this specific post slug in other languages
    const languages = LOCALES.reduce((acc, l) => {
      // We assume slugs are consistent across languages for the same content
      acc[l] = `${baseUrl}/${l}${route}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url,
      lastModified: new Date(post.date || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      languages,
    };
  });

  // 3. Dynamic Projects
  const projectEntries = allProjects.map((project) => {
    const route = `/projects/${project.slug}`;
    const url = `${baseUrl}/${project.lang}${route}`;

    const languages = LOCALES.reduce((acc, l) => {
      acc[l] = `${baseUrl}/${l}${route}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url,
      lastModified: new Date(), // Projects usually don't have a date field in this schema
      changeFrequency: "monthly" as const,
      priority: 0.6,
      languages,
    };
  });

  // 4. Dynamic Certifications
  const certificationEntries = allCertifications.map((cert) => {
    const route = `/certifications/${cert.slug}`;
    const url = `${baseUrl}/${cert.lang}${route}`;

    const languages = LOCALES.reduce((acc, l) => {
      acc[l] = `${baseUrl}/${l}${route}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url,
      lastModified: new Date(cert.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
      languages,
    };
  });

  return [
    ...staticEntries,
    ...blogEntries,
    ...projectEntries,
    ...certificationEntries,
  ];
}