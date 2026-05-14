"use client";

import BlurFade from "@/components/ui/magicui/blur-fade";
import Markdown from "react-markdown";

interface AboutSectionProps {
  title: string;
  content: string;
  blurFadeDelay: number;
}

export function AboutSection({ content, blurFadeDelay }: AboutSectionProps) {
  return (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-1">
        <BlurFade delay={blurFadeDelay * 4}>
          <div className="prose prose-sm text-justify md:prose-base max-w-full text-balance font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                strong: ({ node: _node, ...props }) => (
                  <u className="underline underline-offset-4 decoration-border/80 text-foreground font-normal" {...props} />
                ),
              }}
            >
              {content}
            </Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
