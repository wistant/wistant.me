/* eslint-disable @typescript-eslint/no-require-imports */
import type { MDXComponents } from 'mdx/types'
import { mdxComponents as customMdxComponents } from '@/components/mdx/mdx-components'
import { TechBadge } from '@/components/mdx/tech-badge'
import BlurFade from "@/components/ui/magicui/blur-fade"
import { PhotoStack } from "@/components/home/photo-stack"
import { GithubCalendar } from "@/components/home/github-calendar"
import WorkSection from "@/components/home/work-section"
import EducationSection from "@/components/home/education-section"
import Image from "next/image"
import { CodeComparison } from "@/components/ui/magicui/code-comparison"
import { BackToProjects } from "@/components/projects/back-to-projects"
import { ImageViewer } from '@/components/mdx/media-viewer'; // Correct import for ImageViewer
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customMdxComponents,
    TechBadge,
    BlurFade,
    PhotoStack,
    GithubCalendar,
    WorkSection: (props) => {
      const { workData } = require("@/data/work");
      // For now, default to 'en' in MDX if no data is provided
      return <WorkSection data={props.data || workData.en} {...props} />;
    },
    EducationSection: (props) => {
      const { educationData } = require("@/data/education");
      return <EducationSection data={props.data || educationData.en} {...props} />;
    },
    ProjectsSection: (props) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const ProjectsSectionComponent = require("@/components/projects/projects-section").default;
      // MDX components can't easily get the 'lang' from params here, so we default to 'en' 
      // or we can potentially parse it from the URL in a client-side wrapper if needed.
      // But ProjectsSection is a server component normally.
      return <ProjectsSectionComponent lang="en" {...props} />;
    },
    CodeComparison,
    Image,
    BackToProjects,
    ImageViewer, 
    L: ({ en, fr }: { en: React.ReactNode, fr: React.ReactNode }) => {
      // Small client-side or server-side bridge for language
      return (
        <span className="inline">
          <span className="hidden in-[:lang(en)]:inline">{en}</span>
          <span className="hidden in-[:lang(fr)]:inline">{fr}</span>
        </span>
      );
    },
    // Add custom structural styling for the about page
    h1: (props) => <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-cal leading-tight mb-8" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold font-clash tracking-tight text-foreground mt-16 mb-6" {...props} />,
    ul: (props) => <ul className="not-prose list-none m-0 p-0 space-y-4" {...props} />,
    li: (props) => (
      <li className="relative pl-4 text-muted-foreground leading-relaxed before:content-['-'] before:absolute before:left-0 before:text-foreground" {...props} />
    ),
    p: ({ children, ...props }) => {
      // MDX wraps standalone images in a <p> tag, but if we replace <img> with a block
      // element like ImageViewer (a <div>), we get an invalid <div> inside <p>.
      // Solution: if the only child is an image-like element, render as <div> instead.
      const child = React.Children.toArray(children);
      const isSoleBlockChild =
        child.length === 1 &&
        React.isValidElement(child[0]) &&
        (
          (child[0] as React.ReactElement<{ src?: string }>).type === 'img' ||
          (child[0] as React.ReactElement).type === ImageViewer
        );
      if (isSoleBlockChild) {
        return <div className="mb-5 last:mb-0" {...props}>{children}</div>;
      }
      return <p className="mb-5 last:mb-0 leading-relaxed text-muted-foreground" {...props}>{children}</p>;
    },
    a: (props) => (
      <a
        className="text-foreground font-medium underline decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-foreground transition-colors underline-offset-[3px]"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    wrapper: ({ children }) => (
      <div className="prose prose-neutral dark:prose-invert font-sans w-full">
        {children}
      </div>
    ),
    ...components,
  }
}
