import Link from "next/link";
import Image from "next/image";
import { type ProjectEntry } from "@/lib/mdx-registry";
import { Language } from "@/types/locale";

interface ProjectItemProps {
  project: ProjectEntry;
  lang: Language;
}

export function ProjectItem({ project, lang }: ProjectItemProps) {
  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="group block w-full py-5 transition-all duration-300 border-b border-transparent hover:border-border/40"
    >
      <div className="flex flex-col sm:flex-row gap-8 sm:items-start h-full min-h-32">
        {/* Horizontal Image */}
        <div className="relative w-full sm:w-64 aspect-video sm:aspect-16/10 overflow-hidden rounded-xl border border-border/40 shrink-0 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center opacity-40">
                <span className="font-mono text-xs uppercase tracking-tighter">{project.title.substring(0, 3)}</span>
             </div>
          )}
        </div>

        {/* Content Side */}
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-col gap-0.5">
             <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
               {project.title}
               <svg 
                 className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
               >
                 <path d="M7 17L17 7M17 7H7M17 7V17" />
               </svg>
             </h3>
             <time className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
               {project.dates}
             </time>
          </div>

          <p className="text-sm text-muted-foreground/80 line-clamp-2 max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* tech stack */}
          {project.tags && project.tags.length > 0 && (
             <div className="flex items-center flex-wrap gap-1 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mr-1.5">Stack:</span>
                {project.tags.slice(0, 8).map(tag => (
                   <span key={tag} className="text-[8px] px-2 py-0.5 rounded-md bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-widest">
                      {tag}
                   </span>
                ))}
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
