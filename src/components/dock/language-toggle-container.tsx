"use client";

import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

const SPRING = { mass: 0.07, stiffness: 200, damping: 14 };

export function LanguageToggleContainer({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-180, 0, 180], [52, 96, 52]);
  const heightTransform = useTransform(distance, [-180, 0, 180], [52, 96, 52]);

  const width = useSpring(widthTransform, SPRING);
  const height = useSpring(heightTransform, SPRING);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-muted/70 dark:bg-muted/40 border border-border/50 hover:bg-muted transition-colors duration-150"
    >
      <LanguageSwitcher />
    </motion.div>
  );
}
