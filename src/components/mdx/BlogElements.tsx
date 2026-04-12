"use client";

import React from "react";
import { Tweet as ReactTweet } from "react-tweet";
import YouTubePlayer from "react-youtube";
import Link from "next/link";

// A (Link)
export const BlogA = ({
  href,
  children,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href || "#"}
    className="text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 transition-colors dark:text-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-100"
    {...props}
  >
    {children}
  </Link>
);

// P (Paragraph)
export const BlogP = ({ children }: { children: React.ReactNode }) => (
  <p className="my-5 leading-relaxed">{children}</p>
);

// Headers
export const BlogH1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-2xl font-bold tracking-tight my-8">{children}</h1>
);
export const BlogH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold tracking-tight my-6">{children}</h2>
);
export const BlogH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-bold tracking-tight my-4">{children}</h3>
);

// Lists
export const BlogUL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-outside ml-6 my-5 space-y-2">{children}</ul>
);
export const BlogOL = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal list-outside ml-6 my-5 space-y-2">{children}</ol>
);
export const BlogLI = ({ children }: { children: React.ReactNode }) => (
  <li className="pl-1">{children}</li>
);

// Table
export const BlogTable = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-lg">
    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 border-collapse">
      {children}
    </table>
  </div>
);
export const BlogTHead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-neutral-50 dark:bg-neutral-900/50">{children}</thead>
);
export const BlogTBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
    {children}
  </tbody>
);
export const BlogTR = ({ children }: { children: React.ReactNode }) => (
  <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
    {children}
  </tr>
);
export const BlogTH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
    {children}
  </th>
);
export const BlogTD = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
    {children}
  </td>
);

// Quote
export const BlogBlockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-neutral-200 dark:border-neutral-800 pl-4 py-1 my-6 italic text-neutral-600 dark:text-neutral-400">
    {children}
  </blockquote>
);

// Media
export const BlogFigure = ({ children }: { children: React.ReactNode }) => (
  <figure className="my-8">{children}</figure>
);
export const BlogCaption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className="text-center text-sm text-neutral-500 dark:text-neutral-500 mt-2">
    {children}
  </figcaption>
);

// Tweet & YouTube
export const BlogTweet = ({ id, caption }: { id: string; caption?: React.ReactNode }) => (
  <div className="tweet my-6">
    <div className="flex justify-center">
      <ReactTweet id={id} />
    </div>
    {caption && <BlogCaption>{caption}</BlogCaption>}
  </div>
);
export const BlogYouTube = ({ 
  videoId, 
  caption, 
  id,
  opts,
  ...props 
}: { 
  videoId?: string; 
  id?: string;
  caption?: React.ReactNode; 
  opts?: Record<string, any>;
  [key: string]: unknown 
}) => (
  <div className="my-6">
    <div className="aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
      <YouTubePlayer
        videoId={videoId || id}
        opts={{ width: "100%", height: "100%", ...opts }}
        className="w-full h-full"
        {...props}
      />
    </div>
    {caption && <BlogCaption>{caption}</BlogCaption>}
  </div>
);

// Footnotes
export const BlogFootNotes = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-sm">
    {children}
  </div>
);
export const BlogRef = ({ id }: { id: string | number }) => (
  <a
    href={`#f${id}`}
    id={`s${id}`}
    className="relative text-[10px] top-[-5px] no-underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
  >
    [{id}]
  </a>
);
export const BlogFootNote = ({
  id,
  children,
}: {
  id: string | number;
  children: React.ReactNode;
}) => (
  <div className="flex gap-2 my-2 text-neutral-500">
    <span>{id}.</span>
    <div className="grow">
      {children}
      <a href={`#s${id}`} id={`f${id}`} className="ml-1 no-underline opacity-50 hover:opacity-100">
        ↩
      </a>
    </div>
  </div>
);

// Snippet (Code blocks with captions)
export const BlogSnippet = ({
  children,
  scroll = true,
  caption = null,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  caption?: string | null;
}) => (
  <div className="my-6">
    <div
      className={`
      p-4 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800
      bg-neutral-50 text-neutral-800
      dark:bg-neutral-900 dark:text-neutral-300
      ${
        scroll
          ? "overflow-x-auto"
          : "whitespace-pre-wrap break-all overflow-hidden"
      }
    `}
    >
      {children}
    </div>
    {caption && <BlogCaption>{caption}</BlogCaption>}
  </div>
);
