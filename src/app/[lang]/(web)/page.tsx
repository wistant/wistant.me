import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import HackathonsSection from "@/components/home/hackathons-section";
import ProjectsSection from "@/components/projects/projects-section";
import WorkSection from "@/components/home/work-section";
import EducationSection from "@/components/home/education-section";
import SkillsSection from "@/components/home/skills-section";

import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ShowMore } from "@/components/ui/show-more";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import { GallerySection } from "@/components/home/gallery-section";
import { getResumeData } from "@/data/resume";

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
  const resume = getResumeData(lang);


  return (
    <main className="min-h-dvh flex flex-col gap-6 relative px-6 lg:px-0 pt-12 pb-17 max-w-[608px] mx-auto">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.45}
          flickerChance={0.05}
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2 mt-4">
        <HeroSection
          title={resume.description}
          description={resume.about}
          blurFadeDelay={BLUR_FADE_DELAY}
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2 mt-4">
      <AboutSection
        title={dict.about.title}
        content={dict.about.content}
        blurFadeDelay={BLUR_FADE_DELAY}
      />

      {/* <section id="skills">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <SkillsSection title={dict.skills.title} />
        </BlurFade>
      </section> */}

        <GallerySection
          lang={lang}
          seeMoreText={dict.ui.seeMore}
          showLessText={dict.ui.showLess}
          aboutLinkText={dict.navigation.about || "About me"}
          blurFadeDelay={BLUR_FADE_DELAY}
        />
      </div>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold font-clash">{dict.work.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <WorkSection data={resume.work} presentLabel={dict.work.present} />
          </BlurFade>
          <div className="flex justify-center mt-4">
            <Link href={`/${lang}/about`}>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full transition-all group px-5 h-9 text-sm font-medium text-muted-foreground bg-muted/30 border border-border/40 hover:bg-muted/70 hover:text-foreground shadow-none"
              >
                {dict.work.viewMore || "View full journey"}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold font-clash">{dict.education.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <EducationSection data={resume.education} presentLabel={dict.work.present} />
          </BlurFade>
        </div>
      </section> */}

      <section id="projects">
        <ShowMore
          initialHeight={1200}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href={`/${lang}/projects`}
          linkText={dict.projects.viewAll || "View All"}
        >
          <ProjectsSection lang={lang} />
        </ShowMore>
      </section>

      <section id="hackathons">
        <ShowMore
          initialHeight={350}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href={`/${lang}/hackathons`}
          linkText={dict.navigation.hackathons || "All hackathons"}
        >
          <HackathonsSection
            data={resume.hackathons}
            title={dict.hackathons.title}
            subtitle={dict.hackathons.subtitle}
            description={dict.hackathons.description}
          />
        </ShowMore>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection dict={dict} whatsappUrl={resume.contact.social.WhatsApp.url} />
        </BlurFade>
      </section>
    </main>
  );
}
