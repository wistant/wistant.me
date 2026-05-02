import BlurFade from "@/components/ui/magicui/blur-fade";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { getPageMetadata } from "@/config/metadata";
import { Language } from "@/types/locale";
import React from "react";
import Image from "next/image";
import { getResumeData } from "@/data/resume";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return getPageMetadata(lang, {
    ...dict.contact.seo,
    url: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const resume = getResumeData(lang);

  return (
    <main className="min-h-dvh flex flex-col gap-6 relative px-4 sm:px-6 lg:px-0 py-12 sm:py-24 max-w-3xl mx-auto">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.35}
          flickerChance={0.05}
        />
      </div>
      <section className="w-full flex justify-center">
        <div className="w-full max-w-2xl p-8 sm:p-12 lg:p-16">
          <BlurFade delay={0.04}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20">
                  {dict.navigation.contact}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl font-clash">
                  {dict.contact.title}
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dict.contact.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto mt-12">
              {Object.entries(resume.contact.social).map(([key, social]) => (
                <a
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition-all duration-300 group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background border border-border/50 text-foreground group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                    <Image 
                      src={`/icons/${social.name.toLowerCase()}.svg`} 
                      alt={social.name} 
                      fill 
                      className={cn("object-contain p-2", social.name !== "WhatsApp" && "dark:invert")} 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{social.name}</span>
                    <span className="text-sm text-muted-foreground line-clamp-1">{social.url.replace("mailto:", "").replace("https://", "")}</span>
                  </div>
                </a>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
