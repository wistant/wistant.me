/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { TextReveal } from "@/components/magicui/text-reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/portfolio/section/contact-section";
import HackathonsSection from "@/components/portfolio/section/hackathons-section";
import ProjectsSection from "@/components/portfolio/section/projects-section";
import WorkSection from "@/components/portfolio/section/work-section";
import { ArrowUpRight } from "lucide-react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import Testimonials from "@/components/mvpblocks/testimonials-marquee";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col gap-24 relative px-6 lg:px-0 py-24 max-w-2xl mx-auto">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.15}
          flickerChance={0.2}
        />
      </div>


      <section id="hero">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-6 flex flex-col md:flex-row items-center justify-between">
            <div className="gap-4 flex flex-col order-2 md:order-1 flex-1">
              <TextReveal
                delay={0.1}
                className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-7xl font-cal leading-tight"
              >
                {`Hi, I'm ${DATA.name.split(" ")[0]}`}
              </TextReveal>
              <div className="flex items-center gap-2">
                <AnimatedShinyText className="text-muted-foreground max-w-[600px] md:text-xl font-medium">
                  {DATA.description}
                </AnimatedShinyText>
              </div>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 flex-none">
              <Avatar
                  // className="size-32 md:size-48 border border-border shadow-xl ring-4 ring-primary/5"
                  className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted"
              >
                <AvatarImage src={DATA.avatarUrl} alt={DATA.name} className="object-cover" />
                <AvatarFallback className="text-2xl font-bold font-cal">{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>




      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold font-clash">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>




      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold font-clash">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>



      <section id="testimonials">
        <Testimonials />
      </section>



      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold font-clash">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>



      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold font-clash">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>



      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
        <div className="flex justify-center mt-8">
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-all hover:underline underline-offset-4 text-sm font-medium">
                View all projects
            </Link>
        </div>
      </section>



      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>



      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}