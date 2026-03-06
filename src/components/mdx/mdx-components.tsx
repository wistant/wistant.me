import * as React from "react";
import type { MDXComponents } from "mdx/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageViewer, VideoViewer } from "@/components/mdx/media-viewer";
import { CodeBlock } from "@/components/mdx/code-block";

// Universal fallback: renders unknown MDX components as a neutral div
// so a missing component never crashes the build
function UnknownComponent({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { [key: string]: unknown }) {
  return <div {...(props as React.ComponentPropsWithoutRef<"div">)}>{children}</div>;
}

/**
 * All custom JSX components available inside MDX blog via next-mdx-remote.
 * Add any new component used in content files here.
 */
export const mdxComponents: MDXComponents = {
  // HTML elements mapping
  pre: (props) => <CodeBlock {...props} />,
  img: (props) => (
    <ImageViewer
      src={props.src as string}
      alt={props.alt}
      width={props.width ? Number(props.width) : undefined}
      height={props.height ? Number(props.height) : undefined}
    />
  ),
  // Shadcn UI
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  // Media viewers (used directly in MDX)
  ImageViewer,
  VideoViewer,
  // Aliases used in some blog
  MediaContainer: ImageViewer, // used in typescript-best-practices.mdx
  // Next.js Image wrapper mapping to our Lightbox
  Image: (props: React.ComponentPropsWithoutRef<"img">) => <ImageViewer {...(props as any)} />,
  // Fallback for unknown components
  ...new Proxy({} as MDXComponents, {
    get: (_target, prop) => {
      if (typeof prop === "string" && /^[A-Z]/.test(prop)) {
        return UnknownComponent;
      }
      return undefined;
    },
  }),
};
