import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ogImageSchema } from "@/lib/og/schema";
import { OgImage } from "@/components/og/og-image";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Validate search params with Zod
    const result = ogImageSchema.safeParse({
      title: searchParams.get("title") || undefined,
      description: searchParams.get("description") || undefined,
      type: searchParams.get("type") || undefined,
      lang: searchParams.get("lang") || undefined,
      label: searchParams.get("label") || undefined,
    });

    if (!result.success) {
      return new Response("Invalid OG parameters", { status: 400 });
    }

    const { title, description, type, lang, label } = result.data;

    return new ImageResponse(
      <OgImage title={title} description={description} type={type} lang={lang} label={label} />,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG generation failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
