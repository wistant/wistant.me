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
import Image from "next/image";
import { DATA } from "@/data/resume";

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
    <main className="min-h-screen flex flex-col gap-16 relative px-6 lg:px-0 py-12 pb-24 max-w-[608px] mx-auto">
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
        <div className="w-full space-y-8 text-left">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-cal leading-tight">
              {dict.about.title}
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="relative">
              <a href={DATA.contact.social.X.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  width={160}
                  height={160}
                  className="rounded-full bg-muted block mt-2 mb-5 size-32 sm:size-40 mx-auto sm:float-right sm:ml-5 sm:mb-5 object-cover object-center ring-1 ring-border shadow-sm transition-all grayscale hover:grayscale-0 duration-500"
                  priority
                />
              </a>

              <div className="prose prose-neutral dark:prose-invert max-w-none font-sans leading-relaxed text-muted-foreground">
                <Markdown
                  components={{
                    p: ({ node: _node, ...props }) => <p {...props} className="mb-5 last:mb-0" />,
                    strong: ({ node: _node, ...props }) => (
                      <strong className="font-semibold text-foreground decoration-neutral-300 dark:decoration-neutral-700 underline underline-offset-[3px]" {...props} />
                    ),
                    a: ({ node: _node, ...props }) => (
                      <a className="text-foreground font-medium underline decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-foreground transition-colors underline-offset-[3px]" {...props} />
                    ),
                  }}
                >
                  {dict.about.bio || dict.about.content}
                </Markdown>
              </div>
            </div>
          </BlurFade>

          {dict.about.contributions && (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="space-y-6 mt-16 prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold font-clash tracking-tight text-foreground">{dict.about.contributionsTitle || "Technical contributions"}</h2>
                <ul className="list-disc list-outside ml-6 space-y-4 prose-p:my-0">
                  {(dict.about.contributions as string[]).map((contribution, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed pl-1">
                      <Markdown components={{
                         p: ({ node: _node, ...props }) => <span {...props} />,
                         strong: ({ node: _node, ...props }) => <strong className="font-semibold text-foreground underline underline-offset-[2px]" {...props} />,
                         a: ({ node: _node, ...props }) => <a className="text-foreground underline decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-foreground transition-colors underline-offset-[2px]" {...props} />
                      }}>
                        {contribution}
                      </Markdown>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          )}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SkillsSection title={dict.skills.title} />
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-2xl font-bold font-clash tracking-tight text-foreground">{dict.work.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <WorkSection presentLabel={dict.work.present} />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-2xl font-bold font-clash tracking-tight text-foreground">{dict.education.title}</h2>
          </BlurFade>
          <EducationSection />
        </div>
      </section>
    </main>
  );
}
