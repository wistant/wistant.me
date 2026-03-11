import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, deleteContent, ContentType } from "@/lib/admin/server/cms/engine";

import { z } from "zod";

const ContentTypeSchema = z.enum(["projects", "blog"]);

export async function GET(
  req: NextRequest, 
  context: { params: Promise<{ slug: string }> } // In Next.js App Router, dynamic params from `route.ts` are a promise
) {
  const { slug } = await context.params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const lang = searchParams.get("lang") || "en";

  const parsedType = ContentTypeSchema.safeParse(type);
  if (!parsedType.success) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const content = await getContent(parsedType.data, slug, lang);
  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json({ data: content });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const body = await req.json();
    const { type, lang, frontmatter, content } = body;

    const parsedType = ContentTypeSchema.safeParse(type);
    if (!parsedType.success || !lang || !frontmatter) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const success = await saveContent(parsedType.data, slug, lang, frontmatter, content || "");
    
    if (success) {
      return NextResponse.json({ success: true, message: "Content updated successfully" });
    } else {
      return NextResponse.json({ error: "Failed to update file" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const lang = searchParams.get("lang") || "en";

    const parsedType = ContentTypeSchema.safeParse(type);
    if (!parsedType.success) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const success = await deleteContent(parsedType.data, slug, lang);
    if (success) {
      return NextResponse.json({ success: true, message: "Content deleted successfully" });
    } else {
      return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
