import { OG_ASSETS, OgAssetType } from "@/config/opengraph/assets";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const type = (searchParams.get("type") || "default") as OgAssetType | "default";
    const imgParam = searchParams.get("img");

    // If a specific image URL is provided (e.g. from MDX frontmatter), 
    // we try to use it if it's an absolute internal path or remote.
    if (imgParam) {
       if (imgParam.startsWith("/")) {
          return Response.redirect(`${origin}${imgParam}`, 302);
       }
       if (imgParam.startsWith("http")) {
          return Response.redirect(imgParam, 302);
       }
    }

    // Fallback to our mapped static assets
    const targetAsset = OG_ASSETS[type as OgAssetType] || OG_ASSETS.fallback;
    return Response.redirect(`${origin}${targetAsset}`, 302);

  } catch (error) {
    console.error("OG Redirect Error:", error);
    return Response.redirect(`${new URL(request.url).origin}${OG_ASSETS.fallback}`, 302);
  }
}
