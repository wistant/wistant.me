import { allPosts } from "content-collections";

type Language = "en" | "fr" | "es" | "ar" | "wo";

/**
 * Get all blog posts for a specific language.
 * Features a fallback mechanism: if a post doesn't exist in the requested language,
 * it safely falls back to any available language (preventing missing content).
 */
export function getPostsByLang(lang: Language) {
  const postsBySlug = new Map<string, typeof allPosts[0][]>();
  
  // Group all posts by their slug
  allPosts.forEach(post => {
    if (!postsBySlug.has(post.slug)) {
      postsBySlug.set(post.slug, []);
    }
    postsBySlug.get(post.slug)!.push(post);
  });

  const resolvedPosts = [];

  for (const versions of postsBySlug.values()) {
    // Try to find the requested language version
    const requestedLangVersion = versions.find(v => v.lang === lang);
    if (requestedLangVersion) {
      resolvedPosts.push(requestedLangVersion);
    } else if (versions.length > 0) {
      // Fallback to whatever version is available (usually the other language)
      resolvedPosts.push(versions[0]);
    }
  }

  // Sort by date (newest first)
  return resolvedPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a specific blog post by its slug, with fallback to other languages if missing.
 */
export function getPostBySlug(slug: string, lang: Language) {
  const versions = allPosts.filter((p) => p.slug === slug);
  if (versions.length === 0) return undefined;
  
  const requested = versions.find(p => p.lang === lang);
  return requested || versions[0];
}
