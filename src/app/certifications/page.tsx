import { getCurrentLanguage } from "@/lib/dictionary";
import { getDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { getAllCertifications } from "@/lib/mdx-registry";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { getPageMetadata } from "@/config/metadata";
import NextImage from "next/image";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata() {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();
  return getPageMetadata(lang, {
    title: dict.certifications.seo.title,
    description: dict.certifications.seo.description,
    image: "/og.png",
    url: "/certifications",
  });
}

export default async function CertificationsPage() {
  const lang = await getCurrentLanguage();
  const dict = await getDictionary();
  const certifications = getAllCertifications();

  return (
    <article className="max-w-[608px] mx-auto py-12 md:py-24 mb-32">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col space-y-12">
          {/* Supreme Module Header */}
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-clash">
              {dict.certifications.title}
            </h1>
            <p className="text-muted-foreground/80 leading-relaxed text-lg italic font-serif">
              {dict.certifications.subtitle}
            </p>
            <p className="text-muted-foreground/90 max-w-[540px] text-md leading-relaxed">
              {dict.certifications.description}
            </p>
          </section>

          {/* Certification Grid - Optimized for Supreme Visibility */}
          <div className="grid grid-cols-1 gap-6">
            {certifications.map((cert, idx) => (
              <BlurFade key={cert.slug} delay={BLUR_FADE_DELAY * 2 + idx * 0.05}>
                <Link 
                  href="/certifications/${cert.slug}"
                  className="group relative flex flex-col sm:flex-row gap-6 p-6 bg-neutral-50/50 dark:bg-neutral-900/40 border border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Badge Container - Centered on Mobile, Start on Desktop */}
                  <div className="relative shrink-0 w-24 h-24 mx-auto sm:mx-0 p-3 bg-background border border-border/40 shadow-sm transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 z-10">
                    {cert.image && (
                      <NextImage 
                        src={cert.image} 
                        alt={cert.title} 
                        fill
                        className="w-full h-full object-contain filter contrast-110 p-2" 
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center gap-2 z-10 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                       <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                         {cert.title}
                       </h2>
                       <div className="px-2 py-0.5 bg-accent/30 border border-border/50 text-[9px] font-mono uppercase tracking-widest text-muted-foreground w-fit mx-auto sm:mx-0">
                         {cert.issuer}
                       </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-1 text-[10px] font-mono text-muted-foreground/50">
                      <span className="flex items-center gap-1">
                        <Icons.calendar className="h-2.5 w-2.5" />
                        {new Date(cert.date).toLocaleDateString(dict.ui.dateLocale, {
                           month: "short",
                           year: "numeric"
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="group-hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-tighter">
                        Verify <Icons.externalLink className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>
    </article>
  );
}
