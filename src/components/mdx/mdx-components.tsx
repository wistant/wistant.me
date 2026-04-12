import type { MDXComponents } from "mdx/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImageViewer } from "./media-viewer";
import { Callout } from "./callout";
import { AICloudChart } from "@/components/mdx/charts/AICloudChart";
import * as Blog from "./BlogElements";

export const mdxComponents: MDXComponents = {
  // HTML elements mapping (Lowercase)
  p: Blog.BlogP,
  a: Blog.BlogA,
  h1: Blog.BlogH1,
  h2: Blog.BlogH2,
  h3: Blog.BlogH3,
  ul: Blog.BlogUL,
  ol: Blog.BlogOL,
  li: Blog.BlogLI,
  table: Blog.BlogTable,
  thead: Blog.BlogTHead,
  tbody: Blog.BlogTBody,
  tr: Blog.BlogTR,
  th: Blog.BlogTH,
  td: Blog.BlogTD,
  blockquote: Blog.BlogBlockquote,
  hr: (props) => <hr className="my-8 border-neutral-200 dark:border-neutral-800" {...props} />,
  code: (props) => <code className="bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-sm" {...props} />,
  pre: Blog.BlogSnippet,

  // Capitalized Aliases (Legacy/React tags support)
  P: Blog.BlogP,
  A: Blog.BlogA,
  H1: Blog.BlogH1,
  H2: Blog.BlogH2,
  H3: Blog.BlogH3,
  UL: Blog.BlogUL,
  OL: Blog.BlogOL,
  LI: Blog.BlogLI,
  Table: Blog.BlogTable,
  THead: Blog.BlogTHead,
  TBody: Blog.BlogTBody,
  TR: Blog.BlogTR,
  TH: Blog.BlogTH,
  TD: Blog.BlogTD,
  Blockquote: Blog.BlogBlockquote,
  HR: (props) => <hr className="my-8 border-neutral-200 dark:border-neutral-800" {...props} />,
  Code: (props) => <code className="bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-sm" {...props} />,

  // Blog Specific components
  Callout,
  Chart: AICloudChart,
  Tweet: Blog.BlogTweet,
  YouTube: Blog.BlogYouTube,
  Figure: Blog.BlogFigure,
  Caption: Blog.BlogCaption,
  Snippet: Blog.BlogSnippet,
  Diagram: Blog.BlogSnippet,
  Demo: Blog.BlogSnippet,
  Demos: Blog.BlogSnippet,
  Ref: Blog.BlogRef,
  FootNodes: Blog.BlogFootNotes,
  FootNotes: Blog.BlogFootNotes,
  FootNote: Blog.BlogFootNote,
  
  // Media Viewers
  ImageViewer: (props: any) => (
    <ImageViewer
      src={props.src as string}
      alt={props.alt}
      width={props.width ? Number(props.width) : undefined}
      height={props.height ? Number(props.height) : undefined}
      {...props}
    />
  ),
  img: (props) => (
    <ImageViewer
      src={props.src as string}
      alt={props.alt}
      width={props.width ? Number(props.width) : undefined}
      height={props.height ? Number(props.height) : undefined}
    />
  ),
  Image: (props: any) => (
    <ImageViewer
      src={props.src as string}
      alt={props.alt}
      width={props.width ? Number(props.width) : undefined}
      height={props.height ? Number(props.height) : undefined}
    />
  ),
  // Shadcn UI
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  // Fallback for unknown components
  ...new Proxy({} as MDXComponents, {
    get: (_target, prop) => {
      // Return a dummy component for any missing upper-case component
      if (typeof prop === "string" && /^[A-Z]/.test(prop)) {
        const UnknownComponent = (props: any) => {
          console.warn(`MDX component "${prop}" is not defined.`);
          return <div {...props} />;
        };
        UnknownComponent.displayName = `UnknownComponent(${prop})`;
        return UnknownComponent;
      }
      return undefined;
    },
  }),
};
