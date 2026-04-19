import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (!redis) {
      // Fallback if Redis is not configured
      return NextResponse.json({ views: 0, likes: 0 });
    }

    const [views, likes] = await Promise.all([
      redis.get<number>(`blog:views:${slug}`),
      redis.get<number>(`blog:likes:${slug}`)
    ]);

    return NextResponse.json({ 
      views: views || 0,
      likes: likes || 0 
    });
  } catch (error) {
    console.error("Analytics GET error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, action } = await req.json();

    if (!slug || !action) {
      return NextResponse.json({ error: "Slug and action are required" }, { status: 400 });
    }

    if (!redis) {
      return NextResponse.json({ success: false, error: "Redis not configured" }, { status: 500 });
    }

    let newValue = 0;
    if (action === "view") {
      newValue = await redis.incr(`blog:views:${slug}`);
    } else if (action === "like") {
      newValue = await redis.incr(`blog:likes:${slug}`);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, count: newValue });
  } catch (error) {
    console.error("Analytics POST error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
