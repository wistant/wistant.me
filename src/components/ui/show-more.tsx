"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShowMoreProps {
  children: React.ReactNode;
  initialHeight?: string;
  expandedHeight?: string;
  className?: string;
  buttonTextShow?: string;
  buttonTextHide?: string;
}

export function ShowMore({
  children,
  initialHeight = "h-96",
  className,
  buttonTextShow = "Show More",
  buttonTextHide = "Show Less",
}: ShowMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        animate={{ height: isExpanded ? "auto" : undefined }}
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          !isExpanded && initialHeight
        )}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full bg-background/50 backdrop-blur-md border border-border/50 shadow-sm hover:bg-accent transition-all group"
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
      </div>
    </div>
  );
}
