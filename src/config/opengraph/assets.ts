export const OG_ASSETS = {
  home: "/opengraph/me.png",
  blog: "/opengraph/blog.png",
  project: "/opengraph/projects.png",
  fallback: "/opengraph/me.png",
} as const;

export type OgAssetType = keyof typeof OG_ASSETS;

 // Helper to build a complete OG URL using the API router.
export function getOgImageUrl(baseUrl: string, type: OgAssetType, customImg?: string) {
  const url = new URL(`${baseUrl}/api/og`);
  url.searchParams.set("type", type);
  if (customImg) {
    url.searchParams.set("img", customImg);
  }
  return url.toString();
}
