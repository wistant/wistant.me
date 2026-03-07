import { allProjects } from "content-collections";

type Language = "en" | "fr";

/**
 * Get all active projects for a specific language, sorted by their order frontmatter property.
 */
export function getProjectsByLang(lang: Language) {
  return allProjects
    .filter((project) => project.lang === lang && project.active !== false)
    .sort((a, b) => {
      // Sort by assigned order first, then alphabetically by title
      const orderA = a.order ?? 99;
      const orderB = b.order ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return (a.title || "").localeCompare(b.title || "");
    });
}

/**
 * Get a specific project by its slug and language.
 */
export function getProjectBySlug(slug: string, lang: Language) {
  return allProjects.find((p) => p.slug === slug && p.lang === lang);
}
