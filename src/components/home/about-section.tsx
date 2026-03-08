"use client";

import BlurFade from "@/components/ui/magicui/blur-fade";
import Markdown from "react-markdown";

interface AboutSectionProps {
  title: string;
  content: string;
  blurFadeDelay: number;
}

export function AboutSection({ title, content, blurFadeDelay }: AboutSectionProps) {
  return (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={blurFadeDelay * 3}>
          <h2 className="text-xl font-bold font-clash">{title}</h2>
        </BlurFade>
        <BlurFade delay={blurFadeDelay * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{content}</Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
