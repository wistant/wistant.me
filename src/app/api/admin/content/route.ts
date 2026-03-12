import { NextRequest, NextResponse } from "next/server";
import { listContent, saveContent } from "@/lib/admin/server/cms/engine";
import { ContentTypeSchema } from "@/lib/admin/schemas";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const lang = searchParams.get("lang") || "en";

  const validation = ContentTypeSchema.safeParse(type);
  if (!validation.success) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const content = await listContent(validation.data, lang);
    return NextResponse.json({ data: content });
  } catch (_err: unknown) {
    console.error("List Error:", _err);
    return NextResponse.json({ error: "Failed to list content" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, slug, lang, frontmatter, content } = body;

    const validation = ContentTypeSchema.safeParse(type);
    if (!validation.success) {
        return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    await saveContent(validation.data, slug, lang, frontmatter, content);
    return NextResponse.json({ success: true });
  } catch (_error: unknown) {
    const message = _error instanceof Error ? _error.message : "Save failed";
    console.error("Save Error:", _error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
