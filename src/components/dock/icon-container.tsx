"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";

const SPRING = { mass: 0.07, stiffness: 200, damping: 14 };

export function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: Readonly<{
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const isActive = href === pathname || (href.length > 3 && pathname.startsWith(href));

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

  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full border transition-colors duration-150",
          isActive 
            ? "bg-primary/20 border-primary/50 text-primary dark:bg-primary/20 dark:text-primary" 
            : "bg-muted/70 dark:bg-muted/40 border-border/50 hover:bg-muted"
        )}
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
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn("flex items-center justify-center", isActive ? "text-primary" : "text-foreground/75")}
        >
          {typeof icon === "string" ? (
            <img src={icon} alt={title} className={cn("size-full object-contain", title !== "WhatsApp" && "dark:invert")} />
          ) : (
            icon
          )}
        </motion.div>
      </motion.div>
    </Link>
  );
}
