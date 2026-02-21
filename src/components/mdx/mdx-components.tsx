import * as React from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageViewer, VideoViewer } from "@/components/mdx/media-viewer";

// Universal fallback: renders unknown MDX components as a neutral div
// so a missing component never crashes the build
function UnknownComponent({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { [key: string]: unknown }) {
  return <div {...(props as React.ComponentPropsWithoutRef<"div">)}>{children}</div>;
}

/**
 * All custom JSX components available inside MDX posts via next-mdx-remote.
 * Add any new component used in content files here.
 */
export const mdxComponents: MDXComponents = {
  // Shadcn UI
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  // Media viewers (used directly in MDX)
  ImageViewer,
  VideoViewer,
  // Aliases used in some posts
  MediaContainer: ImageViewer, // used in typescript-best-practices.mdx
  // Next.js Image (for <Image /> in MDX)
  Image,
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
