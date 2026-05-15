import { getCurrentLanguage } from "@/lib/dictionary";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import HackathonsSection from "@/components/home/hackathons-section";
import ProjectsSection from "@/components/projects/projects-section";
import { getDictionary } from "@/lib/dictionary";
import { ShowMore } from "@/components/ui/show-more";
import { Metadata } from "next";
import { getPageMetadata } from "@/config/metadata";
import { GallerySection } from "@/components/home/gallery-section";
import BlogHome from "@/components/blog/blog-home";
import { siteConfig } from "@/config/site";
import { hackathonsData } from "@/data/hackathons";
import { GlobalImpactSection } from "@/components/home/global-impact-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCurrentLanguage();
  return getPageMetadata(lang, {
    image: "/og.png",
    url: "/",
  });
}

export default async function Home() {
   const lang = await getCurrentLanguage();
  const dict = await getDictionary();


  return (
    <main className="min-h-dvh flex flex-col gap-6 relative">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.3}
          flickerChance={0.05}
        />
      </div>

      <section className="flex flex-col gap-1 sm:gap-2 mt-4">
        <HeroSection
          title={dict.hero.title}
          description={dict.hero.description}
        />
      </section>

      <GlobalImpactSection />

      <section className="flex flex-col gap-1 sm:gap-2 mt-4">
        <AboutSection
          title={dict.about.title}
          content={dict.about.content}
          blurFadeDelay={BLUR_FADE_DELAY}
        />
        <GallerySection
          lang={lang}
          seeMoreText={dict.ui.seeMore}
          showLessText={dict.ui.showLess}
          aboutLinkText={dict.navigation.about || "About me"}
          blurFadeDelay={BLUR_FADE_DELAY}
        />
      </section>

      {/* <section id="skills">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <SkillsSection title={dict.skills.title} />
          </BlurFade>
      </section> */}

      <section className="flex flex-col gap-1 sm:gap-2">
        <ShowMore
          initialHeight={850}
          initialHeightMobile={1500}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href="/blog"
          linkText={dict.blog.viewAll || "View All Stories"}
        >
          <BlogHome />
        </ShowMore>
      </section>
      <br/>

      <section id="projects">
        <ShowMore
          initialHeight={1200}
          buttonTextShow={dict.ui.seeMore}
          buttonTextHide={dict.ui.showLess}
          href="/projects"
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
          href="/hackathons"
          linkText={dict.navigation.hackathons || "All hackathons"}
        >
          <HackathonsSection
            data={hackathonsData}
            title={dict.hackathons.title}
            subtitle={dict.hackathons.subtitle}
            description={dict.hackathons.description}
          />
        </ShowMore>
      </section>


      
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection dict={dict} whatsappUrl={siteConfig.links.whatsapp} />
        </BlurFade>
      </section>

      <TestimonialsSection />
    </main>
  );
}
