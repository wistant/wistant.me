"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";
import { ThemeToggleIcon } from "./theme-toggle-icon";

const SPRING = { mass: 0.07, stiffness: 200, damping: 14 };

export function ThemeToggleContainer({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-180, 0, 180], [52, 96, 52]);
  const heightTransform = useTransform(distance, [-180, 0, 180], [52, 96, 52]);
  const iconWTransform = useTransform(distance, [-180, 0, 180], [24, 44, 24]);
  const iconHTransform = useTransform(distance, [-180, 0, 180], [24, 44, 24]);

  const width = useSpring(widthTransform, SPRING);
  const height = useSpring(heightTransform, SPRING);
  const widthIcon = useSpring(iconWTransform, SPRING);
  const heightIcon = useSpring(iconHTransform, SPRING);

  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      suppressHydrationWarning
      whileTap={{ scale: 0.88 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-full bg-muted/70 dark:bg-muted/40 border border-border/50 hover:bg-muted transition-colors duration-150"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.1 }}
            className="absolute -top-9 left-1/2 z-50 w-fit whitespace-nowrap rounded-lg border border-border/60 bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-md"
          >
            {isDark ? "Light mode" : "Dark mode"}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center text-foreground/75"
      >
        <ThemeToggleIcon />
      </motion.div>
    </motion.div>
  );
}
