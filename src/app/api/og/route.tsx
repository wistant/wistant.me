import { NextRequest } from "next/server";
import { getOgImage } from "@/components/og/response";
import type { PathName } from "@/components/og/og";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const path = (searchParams.get("type") || null) as PathName;
    const title = searchParams.get("title") || null;
    const hero = searchParams.get("hero") || null;

    return getOgImage(path, title, hero);
  } catch (error) {
    console.error("OG generation failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
