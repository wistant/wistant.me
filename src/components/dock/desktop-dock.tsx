"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "framer-motion";
import React from "react";
import { DockItem } from "./types";
import { IconContainer } from "./icon-container";
import { LanguageToggleContainer } from "./language-toggle-container";
import { ThemeToggleContainer } from "./theme-toggle-container";

export function FloatingDockDesktop({
  items,
  className,
}: Readonly<{
  items: DockItem[];
  className?: string;
}>) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-18 items-end gap-3 rounded-2xl px-4 pb-3 md:flex",
        "bg-card/80 dark:bg-card/90 backdrop-blur-xl",
        "border border-border/60",
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
      {/* Separator */}
      <div className="mx-1 h-7 w-px bg-border/50 self-center" />
      {/* Language switcher */}
      <LanguageToggleContainer mouseX={mouseX} />
      {/* Theme toggle */}
      <ThemeToggleContainer mouseX={mouseX} />
    </motion.div>
  );
}
