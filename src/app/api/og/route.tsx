import { ImageResponse } from "next/og";

// Default Next.js Edge Runtime configuration
export const runtime = "edge";

// Satori JSX Component for the actual visual rendering
import { OgVisualArchitect } from "./components/og-visual-architect";
import { fetchImageWithFallback } from "./utils/fetch-image";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Validate & Parse parameters
    const imgUrl = searchParams.get("img");
    const type = searchParams.get("type") || "default"; // e.g. 'blog', 'project'

    // 2. Fetch the image robustly (with timeout & fallback)
    const validImageUrl = await fetchImageWithFallback(imgUrl);

    // 3. Render the Pure PNG
    return new ImageResponse(
      (
        <OgVisualArchitect imageUrl={validImageUrl} type={type} />
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          // Aggressive caching as OG images shouldn't change dynamically per URL
          "Cache-Control": "public, immutable, no-transform, max-age=31536000",
        },
      }
    );
  } catch (error) {
    console.error("Critical OG Generation Error:", error);
    // Returning a basic fallback image response to prevent social sharing from crashing (500)
    return new Response(`Failed to generate the image`, {
      status: 200, // Returning 200 instead of 500 so social parsers don't fail completely
      headers: {
        "Content-Type": "text/plain",
      },
      // Ideally here we return an ImageResponse of a pure black fallback PNG.
      // But text is safer if generating ImageResponse crashed.
    });
  }
}
