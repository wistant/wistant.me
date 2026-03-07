import { allProjects } from "content-collections";

type Language = "en" | "fr";

/**
 * Get all active projects for a specific language, sorted by their order frontmatter property.
 */
export function getProjectsByLang(lang: Language) {
  const projectsBySlug = new Map<string, typeof allProjects[0][]>();
  
  // Group all projects by their slug
  allProjects.forEach(project => {
    if (project.active !== false) {
      if (!projectsBySlug.has(project.slug)) {
        projectsBySlug.set(project.slug, []);
      }
      projectsBySlug.get(project.slug)!.push(project);
    }
  });

  const resolvedProjects = [];

  for (const versions of projectsBySlug.values()) {
    // Try to find the requested language version
    const requestedLangVersion = versions.find(v => v.lang === lang);
    if (requestedLangVersion) {
      resolvedProjects.push(requestedLangVersion);
    } else if (versions.length > 0) {
      // Fallback to whatever version is available
      resolvedProjects.push(versions[0]);
    }
  }

  return resolvedProjects.sort((a, b) => {
    // Sort by assigned order first, then alphabetically by title
    const orderA = a.order ?? 99;
    const orderB = b.order ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return (a.title || "").localeCompare(b.title || "");
  });
}

/**
 * Get a specific project by its slug, with fallback to other languages if missing.
 */
export function getProjectBySlug(slug: string, lang: Language) {
  const versions = allProjects.filter((p) => p.slug === slug);
  if (versions.length === 0) return undefined;
  
  const requested = versions.find(p => p.lang === lang);
  return requested || versions[0];
}
