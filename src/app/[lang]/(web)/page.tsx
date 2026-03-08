import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import SkillsSection from "@/components/home/skills-section";
import ContactSection from "@/components/home/contact-section";
import HackathonsSection from "@/components/home/hackathons-section";
import ProjectsSection from "@/components/projects/projects-section";
import WorkSection from "@/components/home/work-section";
import Gallery from "@/components/home/gallery";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ShowMore } from "@/components/ui/show-more";
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
  return getPageMetadata(lang);
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-dvh flex flex-col gap-12 relative px-6 lg:px-0 py-24 max-w-2xl mx-auto">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.35}
          flickerChance={0.05}
        />
      </div>

      <HeroSection 
        title={dict.hero.title} 
        description={dict.hero.description} 
        blurFadeDelay={BLUR_FADE_DELAY} 
      />

      <AboutSection 
        title={dict.about.title} 
        content={dict.about.content} 
        blurFadeDelay={BLUR_FADE_DELAY} 
      />

      <section id="skills">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <SkillsSection title={dict.skills.title} />
        </BlurFade>
      </section>

      <section id="gallery">
        <ShowMore
          initialHeight={600}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href={`/${lang}/about`}
          linkText={dict.navigation.about || "About me"}
        >
          <Gallery />
        </ShowMore>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold font-clash">{dict.work.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <WorkSection presentLabel={dict.work.present} />
          </BlurFade>
          <div className="flex justify-center mt-4">
            <Link href={`/${lang}/about`}>
              <Button
                variant="default"
                className="group rounded-full shadow-sm font-medium px-6 h-10 border border-transparent bg-white text-black hover:bg-neutral-200"
              >
                {dict.work.viewMore || "View full journey"}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="projects">
        <ShowMore
          initialHeight={1650}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href={`/${lang}/projects`}
          linkText={dict.projects.viewAll || "View All"}
        >
          <ProjectsSection limit={6} lang={lang} />
        </ShowMore>
      </section>

      <section id="hackathons">
        <ShowMore
          initialHeight={450}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href={`/${lang}/hackathons`}
          linkText={dict.navigation.hackathons || "All hackathons"}
        >
          <HackathonsSection 
            limit={4} 
            title={dict.hackathons.title}
            subtitle={dict.hackathons.subtitle}
            description={dict.hackathons.description}
          />
        </ShowMore>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection dict={dict} />
        </BlurFade>
      </section>
    </main>
  );
}
