import React from "react";
import { cn } from "@/lib/utils";

interface LargestProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  className?: string;
}

/**
 * Largest component allows content to extend beyond the standard container width.
 * Useful for images, mockups, or featured sections that need a "Cyber-Premium" wide look.
 * @param maxWidth - The maximum width for the desktop view (default: 800px)
 */
export function Largest({ children, maxWidth = 800, className }: LargestProps) {
  const widthValue = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

  return (
    <div className={cn("relative w-full flex justify-center", className)}>
      <div 
        className="w-full sm:w-[150%] max-w-none sm:max-w-(--largest-width) relative sm:left-1/2 sm:-translate-x-1/2"
        style={{ 
          // @ts-expect-error Custom CSS variable for dynamic max-width
          "--largest-width": widthValue 
        }}
      >
        {children}
      </div>
    </div>
  );
}
