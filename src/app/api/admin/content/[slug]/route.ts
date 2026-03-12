import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, deleteContent } from "@/lib/admin/server/cms/engine";
import { ContentTypeSchema } from "@/lib/admin/schemas";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const lang = searchParams.get("lang") || "en";

  const validation = ContentTypeSchema.safeParse(type);
  if (!validation.success) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const content = await getContent(validation.data, slug, lang);
    return NextResponse.json({ data: content });
  } catch (error: unknown) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const body = await req.json();
    const { type, lang, frontmatter, content } = body;

    const validation = ContentTypeSchema.safeParse(type);
    if (!validation.success) {
        return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    await saveContent(validation.data, slug, lang, frontmatter, content);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const lang = searchParams.get("lang") || "en";

  const validation = ContentTypeSchema.safeParse(type);
  if (!validation.success) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    await deleteContent(validation.data, slug, lang);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
