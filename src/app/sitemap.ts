import { MetadataRoute } from "next";
import { getAllBlogs, getAllProjects, getAllCertifications } from "@/lib/mdx-registry";
import { siteConfig as SITE_CONFIG } from "@/config/site";

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

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Blog Posts
  const blogEntries = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Dynamic Projects
  const projectEntries = allProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 4. Dynamic Certifications
  const certificationEntries = allCertifications.map((cert) => ({
    url: `${baseUrl}/certifications/${cert.slug}`,
    lastModified: new Date(cert.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...projectEntries,
    ...certificationEntries,
  ];
}