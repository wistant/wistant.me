import { MetadataRoute } from "next";
import { getAllBlogs, getAllProjects, getAllCertifications } from "@/lib/mdx-registry";
import { siteConfig as SITE_CONFIG } from "@/config/site";
import { LOCALES } from "@/types/locale";

/**
 * Generates a comprehensive, multilingual sitemap for the application.
 * Utilizes the custom MDX registry to dynamically index blog posts, projects, and certifications.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  const allPosts = getAllBlogs();
  const allProjects = getAllProjects();
  const allCertifications = getAllCertifications();

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
  const blogEntries = allPosts.flatMap((post) => {
    return LOCALES.map((lang) => {
      const route = `/blog/${post.slug}`;
      const url = `${baseUrl}/${lang}${route}`;

      const languages = LOCALES.reduce((acc, l) => {
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
  });

  // 3. Dynamic Projects
  const projectEntries = allProjects.flatMap((project) => {
    return LOCALES.map((lang) => {
      const route = `/projects/${project.slug}`;
      const url = `${baseUrl}/${lang}${route}`;

      const languages = LOCALES.reduce((acc, l) => {
        acc[l] = `${baseUrl}/${l}${route}`;
        return acc;
      }, {} as Record<string, string>);

      return {
        url,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        languages,
      };
    });
  });

  // 4. Dynamic Certifications
  const certificationEntries = allCertifications.flatMap((cert) => {
    return LOCALES.map((lang) => {
      const route = `/certifications/${cert.slug}`;
      const url = `${baseUrl}/${lang}${route}`;

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
  });

  return [
    ...staticEntries,
    ...blogEntries,
    ...projectEntries,
    ...certificationEntries,
  ];
}