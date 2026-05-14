"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectStickyHeaderProps {
  title: string;
  lang: "en" | "fr";
}

export function ProjectStickyHeader({ title, lang }: ProjectStickyHeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show header when scrolled past the main hero title (approx 300px)
    if (latest > 300) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      // z-50 to stay above content but below Lightbox (which is z-100)
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2 text-muted-foreground hover:text-foreground transition-colors -ml-2"
        >
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">
              {lang === "fr" ? "Retour" : "Back"}
            </span>
          </Link>
        </Button>
        <h2 className="font-cal text-sm md:text-base tracking-tight truncate max-w-[200px] sm:max-w-md md:max-w-xl text-center">
          {title}
        </h2>
        {/* Placeholder for symmetry */}
        <div className="w-[60px] sm:w-[80px]" /> 
      </div>
    </motion.div>
  );
}
