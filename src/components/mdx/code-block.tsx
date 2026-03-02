"use client";

import { useState, useRef, useEffect, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { codeToHtml } from "shiki/bundle/web";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre">;

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [{ html, className, title }, setRenderState] = useState<{
    html: string;
    className: string;
    title: string | null;
  }>({ html: "", className: "", title: null });
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    const codeEl = pre?.querySelector("code");
    if (!pre || !codeEl) return;

    const codeText = codeEl.textContent || "";
    const lang = extractLanguage(codeEl.className);
    const nextTitle = codeEl.getAttribute("data-title");
    const nextClassName = codeEl.className || "";

    void codeToHtml(codeText, {
      lang: lang as unknown as string,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        setRenderState({
          html: doc.querySelector("code")?.innerHTML ?? "",
          className: nextClassName,
          title: nextTitle,
        });
      })
      .catch((error) => {
        console.error("Failed to highlight code:", error);
        setRenderState({ html: "", className: nextClassName, title: nextTitle });
      });
  }, [children]);

  const handleCopy = async () => {
    const code = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-border my-6">
      {title && (
        <div className="px-4 py-2 text-xs font-medium border-b border-border bg-muted/30 text-muted-foreground flex items-center justify-between">
          <span>{title}</span>
          <span className="opacity-50 uppercase">{className.replace('language-', '')}</span>
        </div>
      )}
      <div className="relative">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="icon"
          className={cn(
            "absolute size-8 text-muted-foreground cursor-pointer z-10 right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm border-border",
            copied && "text-green-500"
          )}
          aria-label="Copy code"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
        <pre
          ref={preRef}
          {...props}
          className={cn("p-4! m-0! overflow-x-auto text-sm leading-relaxed", props.className)}
        >
          {html && (
            <code
              className={`shiki ${className} block`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {!html && (
            <code className={className}>
              {children}
            </code>
          )}
        </pre >
      </div>
    </div >
  );
}

