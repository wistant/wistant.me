import { AnimatedShinyText } from "@/components/ui/magicui/animated-shiny-text";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { TextReveal } from "@/components/ui/magicui/text-reveal";
import ContactSection from "@/components/home/contact-section";
import HackathonsSection from "@/components/home/hackathons-section";
import ProjectsSection from "@/components/projects/projects-section";
import WorkSection from "@/components/home/work-section";
import Gallery from "@/components/home/gallery";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { getDictionary } from "@/lib/dictionary";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ShowMore } from "@/components/ui/show-more";

const BLUR_FADE_DELAY = 0.04;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
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

      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-6 flex flex-col md:flex-row items-start justify-between">
            <div className="gap-4 flex flex-col flex-1 order-2 md:order-1">
              <TextReveal
                delay={0.1}
                className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-5xl font-cal leading-tight"
              >
                {dict.hero.title}
              </TextReveal>
              <div className="flex items-center gap-2">
                <AnimatedShinyText className="text-muted-foreground max-w-150 md:text-xl font-medium">
                  {dict.hero.description}
                </AnimatedShinyText>
              </div>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="flex-none order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted relative overflow-hidden">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  fill
                  priority
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold font-cal">
                  {DATA.initials}
                </AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold font-clash">{dict.about.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{dict.about.content}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="gallery">
        <ShowMore 
          initialHeight="h-[400px]" 
          buttonTextShow={lang === 'fr' ? 'Voir plus de photos' : 'View more photos'}
          buttonTextHide={lang === 'fr' ? 'Voir moins' : 'Show less'}
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
            <WorkSection />
          </BlurFade>
          <div className="flex justify-center mt-4">
            <Link href={`/${lang}/about`}>
              <Button variant="ghost" className="group text-muted-foreground hover:text-foreground">
                {lang === 'fr' ? 'Voir mon parcours complet' : 'View full journey'}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="projects">
        <ShowMore
          initialHeight="h-[800px]"
          buttonTextShow={dict.projects.viewAll}
          buttonTextHide={lang === 'fr' ? 'Réduire' : 'Show less'}
        >
          <ProjectsSection limit={4} />
        </ShowMore>
      </section>

      <section id="hackathons">
        <ShowMore
          initialHeight="h-[600px]"
          buttonTextShow={lang === 'fr' ? 'Voir tous les hackathons' : 'View all hackathons'}
          buttonTextHide={lang === 'fr' ? 'Réduire' : 'Show less'}
        >
          <HackathonsSection limit={4} />
        </ShowMore>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
