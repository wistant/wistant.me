"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import { DockItem } from "./types";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggleIcon } from "./theme-toggle-icon";
import Image from "next/image";

export function FloatingDockMobile({
  items,
  className,
}: Readonly<{
  items: DockItem[];
  className?: string;
}>) {
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
                <Image src={item.icon} alt={item.title} className={cn("size-full object-contain", item.title !== "WhatsApp" && "dark:invert")} />
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
}
