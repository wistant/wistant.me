import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || "build-dummy-key",
    });

    const body = await req.json();
    const { content, targetLang, contentType } = body;

    if (!content || !targetLang) {
      return NextResponse.json({ error: "Missing content or targetLang" }, { status: 400 });
    }

    const systemPrompt = `You are a professional translator and MDX expert. 
    Translate the following content to ${targetLang}. 
    Maintain all MDX components, frontmatter structure, and formatting. 
    The content is for a ${contentType} piece on a professional developer portfolio.
    Return ONLY the translated content, no preamble.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const translated = completion.choices[0]?.message?.content;

    return NextResponse.json({ translated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Groq Translation Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
