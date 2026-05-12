import type { MDXComponents } from "mdx/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImageViewer } from "./media-viewer";
import { Callout } from "./callout";
import { AICloudChart } from "@/components/mdx/charts/AICloudChart";
import { CodeBlock } from "./code-block";
import { TechBadge } from "./tech-badge";
import { CodeComparison } from "@/components/ui/magicui/code-comparison";
import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";

import { 
  BlogCaption as Caption, 
  BlogTweet as Tweet, 
  BlogYouTube as YouTube, 
  BlogFigure as Figure, 
  BlogSnippet as Snippet,
  BlogFootNote as FootNote,
  BlogFootNotes as FootNotes,
  BlogRef as Ref
} from "./BlogElements";

// Slugify function for headings
function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(children?.toString() || "");
    return React.createElement(
      `h${level}`,
      { id: slug, className: "group relative" },
      children,
      React.createElement("a", {
        href: `#${slug}`,
        className: "absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/50 hover:text-primary",
      }, "#")
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

export const mdxComponents: MDXComponents = {
  // Minimal HTML mapping to let 'prose' handle the rest
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href?.startsWith("/");
    const isAnchor = href?.startsWith("#");

    if (isInternal && href) {
      return (
        <Link 
          href={href!} 
          {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
        >
          {children}
        </Link>
      );
    }
    if (isAnchor) {
      return <a href={href} {...props}>{children}</a>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },

  // Media Viewers
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <div className="my-8">
      <ImageViewer
        src={props.src as string}
        alt={props.alt || ""}
        width={props.width ? Number(props.width) : 1200}
        height={props.height ? Number(props.height) : 675}
      />
    </div>
  ),
  Image: (props: ComponentPropsWithoutRef<typeof ImageViewer>) => (
    <div className="my-8">
      <ImageViewer
        {...props}
        width={props.width ? Number(props.width) : 1200}
        height={props.height ? Number(props.height) : 675}
      />
    </div>
  ),

  // Custom Components
  Caption,
  Tweet,
  YouTube,
  Figure,
  Snippet,
  FootNote,
  FootNotes,
  Ref,
  Demo: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 p-6 rounded-xl border border-border/50 bg-muted/10">
      {children}
    </div>
  ),
  Diagram: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 p-6 rounded-xl border-2 border-dashed border-border/50 bg-muted/20 flex flex-col items-center justify-center text-muted-foreground italic text-sm text-center">
      <div className="mb-2 font-bold not-italic">📊 Diagram Placeholder</div>
      {children}
    </div>
  ),
  CodeBlock,
  CodeComparison,
  TechBadge,
  Callout,
  Chart: AICloudChart,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,

  // Shiki code coloring is handled by rehype-pretty-code, 
  // but we ensure the pre/code tags are clean.
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre className="bg-transparent p-0" {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => {
    const isInline = !props["data-language" as keyof typeof props];
    if (isInline) {
      return (
        <code 
          className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-[0.9em]" 
          {...props} 
        />
      );
    }
    return <code {...props} />;
  },

  // Shadcn aliases
  Table: (props: ComponentPropsWithoutRef<"table">) => <div className="my-6 w-full overflow-y-auto"><table className="w-full" {...props} /></div>,
};
