import { getDictionary } from "@/lib/dictionary";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { Icons } from "@/components/ui/icons";
import NextImage from "next/image";
import Link from "next/link";
import { Language } from "@/types/locale";

const BLUR_FADE_DELAY = 0.04;

export default async function CertLayout({ 
  cert, 
  lang,
  children
}: { 
  cert: { title: string; date: string; image?: string; issuer: string; slug: string; href?: string; description?: string }; 
  lang: Language;
  children: React.ReactNode;
}) {
  const dict = await getDictionary(lang);

  return (
    <article className="max-w-2xl mx-auto py-16 min-h-screen flex flex-col gap-10 pb-32">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-10">
          {/* Back Link */}
          <Link
            href="/certifications"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit group"
          >
            <Icons.arrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{dict.navigation.certifications || "certifications"}</span>
          </Link>

          {/* HEADER */}
          <header className="flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-pretty font-sans">
              {cert.title}
            </h1>

            <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <span className="text-foreground font-medium">@wistant</span>
              <span>|</span>
              <time dateTime={cert.date} suppressHydrationWarning>
                {new Date(cert.date).toLocaleDateString(dict.ui.dateLocale, {
                   month: "short",
                   year: "numeric"
                })}
              </time>
              <span>|</span>
              <span className="text-primary/80">{cert.issuer}</span>
            </div>
          </header>

          {/* Showcase */}
          {cert.image && (
            <div className="relative w-full aspect-video flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 border border-border/40 overflow-hidden rounded-md shadow-sm">
                <div 
                  className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
                />
                
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 z-10 transition-transform duration-700 hover:scale-[1.02]">
                  <NextImage 
                    src={cert.image} 
                    alt={cert.title} 
                    fill
                    className="w-full h-full object-contain filter drop-shadow-md" 
                    priority
                  />
                </div>
            </div>
          )}

          {/* Content */}
          <main className="prose prose-neutral dark:prose-invert font-sans max-w-none 
            prose-p:leading-relaxed prose-p:mb-6
            prose-headings:font-clash prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-2xl
            prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl
            prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700 hover:prose-a:decoration-foreground transition-colors prose-a:underline-offset-[3px]
            prose-li:marker:text-neutral-400 dark:prose-li:marker:text-neutral-600
            prose-img:rounded-md prose-img:border prose-img:border-border prose-img:shadow-sm">
            {children}
          </main>

          {/* Verification CTA */}
          {cert.href && (
            <div className="pt-10 border-t border-border/20 flex flex-col items-start gap-4">
               <a 
                 href={cert.href} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
               >
                 <Icons.externalLink className="h-4 w-4" />
                 <span>{dict.certifications.viewCertificate || "Verify Official Credential"}</span>
                 <Icons.arrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
               </a>
            </div>
          )}
        </div>
      </BlurFade>
    </article>
  );
}
