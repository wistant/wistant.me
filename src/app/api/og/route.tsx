import { NextRequest, NextResponse } from "next/server";

// Legacy OG API route — Satori system removed.
// Static images are now used for all OG previews.
// This route is kept as a stub to avoid 404s.
export const runtime = "edge";

export function GET(_req: NextRequest) {
  return NextResponse.json(
    { message: "OG image generation is now handled via static images." },
    { status: 410 }
  );
}
