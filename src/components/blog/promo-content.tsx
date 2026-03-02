import React from "react";
import { cn } from "@/lib/utils";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("border-t border-border bg-muted/20 p-3", className)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
            WK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/90 truncate">
              Wistant Kode
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Engineering Excellence
            </p>
          </div>
          <a
            href="https://github.com/WistantKode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Explore
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border border-border rounded-lg p-4 bg-card shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="w-full h-40 rounded-md bg-muted flex items-center justify-center overflow-hidden border border-border">
          <div className="text-4xl font-bold font-cal text-muted-foreground/20">
            WK
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tighter">
            Wistant Kode Architecture
          </h3>
          <p className="text-sm text-muted-foreground">
            Building performance-first applications with Next.js, Rust and
            modern software design patterns.
          </p>
        </div>
        <a
          href="https://github.com/WistantKode"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full h-9 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Check GitHub
        </a>
      </div>
    </div>
  );
}
