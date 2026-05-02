"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { Hackathon } from "@/types/resume";
import { useParams } from "next/navigation";
import { getResumeData } from "@/data/resume";
import { Language } from "@/types/locale";

export default function HackathonsSection({
  data,
  title = "Hackathons",
  subtitle = "I like building things",
  description
}: {
  data?: Hackathon[];
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  const params = useParams();
  const lang = (params?.lang as Language) || "en";
  const resume = getResumeData(lang);
  
  const hackathons = data && data.length > 0 ? data : resume.hackathons;

  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border border-border bg-black z-10 rounded-xl px-4 py-1 shadow-sm">
              <span className="text-white text-sm font-medium">{title}</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold font-clash tracking-tighter italic sm:text-5xl">{subtitle}</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              {description}
            </p>
          </div>
        </div>
        <Timeline>
          {hackathons.map((hackathon: Hackathon) => (
            <TimelineItem key={hackathon.title + hackathon.dates} className="w-full flex items-start justify-between gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <div className="relative size-10 flex-none bg-card z-10 shrink-0 border rounded-full shadow ring-2 ring-border overflow-hidden">
                    <Image
                      src={hackathon.image}
                      alt={hackathon.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
                )}
                {hackathon.title && (
                  <h3 className="font-semibold leading-none">{hackathon.title}</h3>
                )}
                {hackathon.location && (
                  <p className="text-sm text-muted-foreground">{hackathon.location}</p>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {hackathon.links.map((link, idx: number) => (
                      <Link
                        href={link.href}
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                          {link.icon}
                          {link.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
