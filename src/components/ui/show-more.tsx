"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ShowMoreProps {
  children: React.ReactNode;
  initialHeight?: number;
  className?: string;
  buttonTextShow?: string;
  buttonTextHide?: string;
  href?: string; // Link to the full page
  linkText?: string; // Text for the full page link
  buttonClassName?: string; // Additional classes for the button container
}

export function ShowMore({
  children,
  initialHeight = 400,
  className,
  buttonTextShow = "Show More",
  buttonTextHide = "Show Less",
  href,
  linkText = "View All",
  buttonClassName,
}: ShowMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        animate={{ height: isExpanded ? "auto" : initialHeight }}
        initial={{ height: initialHeight }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden relative"
      >
        {children}

        {/* The blur overlay is now just a standard div with opacity transition, completely bypassing framer-motion exit conflicts */}
        <div 
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 h-72 pointer-events-none transition-opacity duration-500",
            "bg-linear-to-t from-background via-background/80 to-transparent",
            isExpanded ? "opacity-0" : "opacity-100"
          )}
        />
      </motion.div>

      <div className={cn(
        "relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500",
        isExpanded ? "mt-8" : cn("-mt-12", buttonClassName)
      )}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full transition-all group px-5 h-9 text-sm font-medium text-muted-foreground bg-muted/30 hover:bg-muted/70 hover:text-foreground shadow-none border border-border/40"
        >
          {isExpanded ? (
            <>
              {buttonTextHide}
              <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              {buttonTextShow}
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </>
          )}
        </Button>

        {href && (
          <Link href={href}>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full transition-all group px-5 h-9 text-sm font-medium text-muted-foreground bg-muted/30 border border-border/40 hover:bg-muted/70 hover:text-foreground shadow-none ml-2"
            >
              {linkText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
