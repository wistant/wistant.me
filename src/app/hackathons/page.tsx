import { getCurrentLanguage } from "@/lib/dictionary";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { TextReveal } from "@/components/ui/magicui/text-reveal";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { hackathonsData } from "@/data/hackathons";
import HackathonsItem from "@/components/hackatons/hackatonsItem";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();
  return getPageMetadata(lang, {
    ...dict.hackathons.seo,
    url: "/hackathons",
  });
}

export default async function HackathonsPage() {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();

  return (
    <main className="min-h-dvh flex flex-col gap-6 relative lg:px-0 py-24 max-w-2xl mx-auto">
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
            {dict.hackathons.title || "Hackathons"}
          </TextReveal>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-prose">
              {dict.hackathons.description}
            </p>
          </BlurFade>
        </div>
      </section>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <HackathonsItem data={hackathonsData} />
      </BlurFade>
    </main>
  );
}
