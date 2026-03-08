import { OG_ASSETS, OgAssetType } from "@/config/opengraph/assets";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const type = (searchParams.get("type") || "default") as OgAssetType | "default";
    const imgParam = searchParams.get("img");

    // 1. If explicit img param provided (MDX / specific pages)
    if (imgParam) {
       if (imgParam.startsWith("/")) {
          return Response.redirect(`${origin}${imgParam}`, 302);
       }
       if (imgParam.startsWith("http")) {
          return Response.redirect(imgParam, 302);
       }
    }

    // 2. Automatic mapping: check if a dedicated image exists for this type
    // We only redirect if it looks like a file (contains a dot).
    const pageImage = OG_ASSETS[type as OgAssetType];
    if (pageImage && pageImage.includes(".")) {
      return Response.redirect(`${origin}${pageImage}`, 302);
    }

    // 3. Smart Fallback: if fallback is a directory or missing, use global avatar
    const fallback = OG_ASSETS.fallback;
    if (fallback && fallback.includes(".")) {
      return Response.redirect(`${origin}${fallback}`, 302);
    }

    return Response.redirect(`${origin}${OG_ASSETS.home}`, 302);

  } catch (error) {
    console.error("OG Redirect Error:", error);
    return Response.redirect(`${new URL(request.url).origin}${OG_ASSETS.home}`, 302);
  }
}
