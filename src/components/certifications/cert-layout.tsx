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
    <article className="max-w-[608px] mx-auto py-12 md:py-24 px-6 lg:px-0 mb-32">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col space-y-12">
          {/* Supreme Header */}
          <div className="space-y-8">
             <Link 
                href={`/${lang}/certifications`}
                className="flex items-center gap-2 group cursor-pointer w-fit text-muted-foreground hover:text-primary transition-colors text-xs font-mono tracking-[0.2em] uppercase"
             >
                <Icons.chevronLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                <span>{dict.projects.backToProjects.replace(/Projects/i, "Certifications").replace(/Projets/i, "Certifications")}</span>
             </Link>
             
             <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                   <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-clash leading-[1.1]">
                      {cert.title}
                   </h1>
                   
                   <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground/70 uppercase tracking-widest border-y border-border/20 py-6">
                      <div className="flex items-center gap-2">
                         <Icons.calendar className="h-3.5 w-3.5" />
                         <span>{new Date(cert.date).toLocaleDateString(dict.ui.dateLocale, {
                            month: "long",
                            year: "numeric"
                         })}</span>
                      </div>
                      <div className="flex items-center gap-2 border-l border-border/30 pl-6">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                         <span>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center gap-2 border-l border-border/30 pl-6 group">
                         <Icons.globe className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                         <a 
                           href={cert.href || "#"} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:text-primary transition-colors cursor-pointer"
                         >
                           Official Credential
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Supreme Badge Showcase */}
          {cert.image && (
            <div className="relative group">
              <div className="absolute -inset-2 bg-linear-to-tr from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-2xl" />
              <div className="relative aspect-video w-full flex items-center justify-center p-12 bg-neutral-100/20 dark:bg-neutral-900/40 border border-border/30 overflow-hidden shadow-2xl backdrop-blur-md">
                 <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.1]" 
                      style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} 
                 />
                 <div className="absolute inset-6 border border-border/30 rounded-sm pointer-events-none" />
                 
                 <div className="relative w-56 h-56 sm:w-80 sm:h-80 z-10 transition-all duration-1000 group-hover:scale-[1.03] group-hover:-rotate-1">
                    <NextImage 
                      src={cert.image} 
                      alt={cert.title} 
                      fill
                      className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_60px_rgba(255,255,255,0.08)]" 
                      priority
                    />
                 </div>

                 <div className="absolute bottom-6 left-10 flex items-center gap-4">
                    <div className="w-8 h-px bg-border/40" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50">
                       Verified Technical Archive // {cert.issuer.split(' ')[0]}
                    </span>
                 </div>
              </div>
            </div>
          )}

          {/* Pro-Markdown Content */}
          <div className="prose prose-neutral dark:prose-invert font-sans max-w-none 
            prose-p:leading-relaxed prose-p:mb-8 prose-p:text-muted-foreground/90 prose-p:text-lg
            prose-headings:font-clash prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-3
            prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-xl
            prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700 hover:prose-a:decoration-foreground transition-colors prose-a:underline-offset-[3px]
            prose-li:text-muted-foreground/90 prose-li:marker:text-primary prose-li:my-2
            prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-sm">
            {children}
          </div>

          {/* Verification CTA */}
          {cert.href && (
            <div className="pt-12 flex flex-col items-center gap-4">
               <a 
                 href={cert.href} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 rounded-none w-full sm:w-auto justify-center group"
               >
                 <Icons.externalLink className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                 <span>{dict.certifications.viewCertificate || "Voir le Certificat"}</span>
               </a>
               <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                 Délivré par {cert.issuer} • ID: {cert.slug.toUpperCase()}
               </p>
            </div>
          )}
        </div>
      </BlurFade>
    </article>
  );
}
