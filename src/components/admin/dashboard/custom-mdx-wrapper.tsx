"use client";

import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { MDXEditorMethods } from "@mdxeditor/editor";

// Dynamically load the Lexical MDXEditor wrapper (SSR disabled)
const ForwardRefEditor = dynamic(
  () => import("./custom-editor-instance"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-12 border rounded-xl bg-card min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary opacity-50 mb-4" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Chargement de l&apos;éditeur avancé...</p>
      </div>
    )
  }
);

interface CustomMdxWrapperProps {
  markdown: string;
  onChange: (markdown: string) => void;
}

export const CustomMdxWrapper = forwardRef<MDXEditorMethods, CustomMdxWrapperProps>(({ markdown, onChange }, ref) => {
  return <ForwardRefEditor ref={ref} markdown={markdown} onChange={onChange} />;
});

CustomMdxWrapper.displayName = "CustomMdxWrapper";
