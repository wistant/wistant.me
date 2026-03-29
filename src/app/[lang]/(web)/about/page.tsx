import BlurFade from "@/components/ui/magicui/blur-fade";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { TextReveal } from "@/components/ui/magicui/text-reveal";
import WorkSection from "@/components/home/work-section";
import EducationSection from "@/components/home/education-section";
import SkillsSection from "@/components/home/skills-section";
import Markdown from "react-markdown";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return getPageMetadata(lang, dict.about.seo);
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-dvh flex flex-col gap-16 relative px-6 lg:px-0 py-24 max-w-2xl mx-auto">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.35}
          flickerChance={0.05}
        />
      </div>

      <section id="header">
        <div className="w-full space-y-4 text-left">
          <TextReveal
            delay={0.1}
            className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-cal leading-tight"
          >
            {dict.about.title}
          </TextReveal>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="prose prose-lg md:prose-xl max-w-prose text-muted-foreground font-medium dark:prose-invert">
              <Markdown
                components={{
                  p: ({ node: _node, ...props }) => <p {...props} className="m-0" />,
                  strong: ({ node: _node, ...props }) => (
                    <u className="underline underline-offset-4 decoration-border/80 text-foreground font-normal" {...props} />
                  ),
                }}
              >
                {dict.about.content}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SkillsSection title={dict.skills.title} />
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-2xl font-bold font-clash">{dict.work.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <WorkSection presentLabel={dict.work.present} />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-2xl font-bold font-clash">{dict.education.title}</h2>
          </BlurFade>
          <EducationSection />
        </div>
      </section>
    </main>
  );
}
