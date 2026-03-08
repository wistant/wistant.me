export const OG_ASSETS = {
  home: "/me/me.webp",
  blog: "/opengraph/blog.webp",
  project: "/opengraph/",
  fallback: "/opengraph/",
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
