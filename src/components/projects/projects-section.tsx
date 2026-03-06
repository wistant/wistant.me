import BlurFade from "@/components/ui/magicui/blur-fade";
import { ProjectCard } from "@/components/projects/project-card";
import { projectsData } from "@/data/projects";

const BLUR_FADE_DELAY = 0.04;

type Language = "en" | "fr";

export default function ProjectsSection({
  limit,
  lang,
}: {
  limit?: number;
  lang: Language;
}) {
  const projects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-12">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium uppercase tracking-widest">
                Creations
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-clash italic text-center uppercase">
              Engineered Solutions
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed max-w-[700px] text-center font-cabinet">
              Une collection de systèmes web haute performance, de bibliothèques
              open-source et d&apos;architectures scalables.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-200 mx-auto auto-rows-fr">
          {projects.map((project, id) => {
            if (!project) return null;
            return (
              <BlurFade
                key={project.slug}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                className="h-full"
              >
                <ProjectCard
                  href={project.href}
                  title={project.title[lang]}
                  description={project.description[lang]}
                  dates={project.dates}
                  tags={project.technologies.filter((t): t is string => Boolean(t))}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
