import { NextRequest, NextResponse } from "next/server";
import { listContent, saveContent, ContentType } from "@/lib/admin/server/cms/engine";

import { z } from "zod";

// Validation for content types
const ContentTypeSchema = z.enum(["projects", "blog"]);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const lang = searchParams.get("lang") || "en";

  const parsedType = ContentTypeSchema.safeParse(type);
  if (!parsedType.success) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const content = await listContent(parsedType.data, lang);
  return NextResponse.json({ data: content });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, slug, lang, frontmatter, content } = body;

    const parsedType = ContentTypeSchema.safeParse(type);
    
    if (!parsedType.success || !slug || !lang || !frontmatter) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const success = await saveContent(parsedType.data, slug, lang, frontmatter, content || "");
    
    if (success) {
      return NextResponse.json({ success: true, message: "Content created successfully" });
    } else {
      return NextResponse.json({ error: "Failed to write file" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
