"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggleIcon } from "./theme-toggle-icon";

// Types
type DockItem = { title: string; icon: React.ReactNode; href: string };

// Public API
export const FloatingDock = ({
  items,
  mobileItems,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  /** Subset of items shown on mobile. Falls back to `items` if not provided. */
  mobileItems?: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile
        items={mobileItems ?? items}
        className={mobileClassName}
      />
    </>
  );
};

// Mobile — always-visible horizontal bar
export const FloatingDockMobile = ({
  items,
  className,
}: Readonly<{
  items: DockItem[];
  className?: string;
}>) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex md:hidden items-center justify-center flex-nowrap gap-1 px-3 py-2.5 rounded-2xl",
        "bg-card/90 dark:bg-card/95 backdrop-blur-2xl",
        "border border-border/60",
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50",
        className,
      )}
    >
      {items.map((item) => {
        const isExternal = item.href.startsWith("http");
        const isActive = item.href === pathname || (item.href.length > 3 && pathname.startsWith(item.href));
        return (
          <motion.div key={item.title} whileTap={{ scale: 0.82 }}>
            <Link
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border overflow-hidden",
                isActive 
                  ? "bg-primary/20 border-primary/50 text-primary dark:bg-primary/20 dark:text-primary" 
                  : "bg-muted/70 dark:bg-muted/40 border-border/50 text-foreground/80 hover:bg-muted"
              )}
            >
              {typeof item.icon === "string" ? (
                <img src={item.icon} alt={item.title} className={cn("size-full object-contain", item.title !== "WhatsApp" && "dark:invert")} />
              ) : (
                <div className="h-5 w-5">{item.icon}</div>
              )}
            </Link>
          </motion.div>
        );
      })}

      {/* Language switcher */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/70 dark:bg-muted/40 border border-border/50 text-foreground/80">
        <LanguageSwitcher />
      </div>

      {/* Theme toggle */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.82 }}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/70 dark:bg-muted/40 border border-border/50 text-foreground/80"
      >
        <div className="h-5 w-5">
          <ThemeToggleIcon />
        </div>
      </motion.button>
    </div>
  );
};

// Desktop
const FloatingDockDesktop = ({
  items,
  className,
}: Readonly<{
  items: DockItem[];
  className?: string;
}>) => {
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
};

// Shared spring config
const SPRING = { mass: 0.07, stiffness: 200, damping: 14 };

// Link icon container
function IconContainer({
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

// Theme toggle container (magnifiable like other icons)
function ThemeToggleContainer({ mouseX }: { mouseX: MotionValue<number> }) {
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

// Language toggle container
function LanguageToggleContainer({ mouseX }: { mouseX: MotionValue<number> }) {
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
      {/* Tooltip removed as per user request */}
      <LanguageSwitcher />
    </motion.div>
  );
}
