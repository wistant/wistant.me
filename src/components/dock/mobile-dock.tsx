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
        "flex md:hidden items-center justify-center w-fit gap-0.5 px-2 py-1.5 rounded-2xl",
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
          <motion.div key={item.title} whileTap={{ scale: 0.9 }} className="flex-1">
            <Link
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-colors",
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full overflow-hidden transition-all",
                isActive ? "scale-110" : ""
              )}>
                {/* Special case for avatar image */}
                {typeof item.icon === "string" ? (
                  <Image src={item.icon} alt={item.title} className={cn("size-full object-contain", item.title !== "WhatsApp" && "dark:invert")} />
                ) : (
                  <div className="h-5 w-5">{item.icon}</div>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all",
                isActive ? "opacity-100" : "opacity-80"
              )}>
                {item.title}
              </span>
            </Link>
          </motion.div>
        );
      })}

      {/* Utilities Container (Language + Theme) */}
      <div className="flex items-center gap-1 ml-1 pl-2 border-l border-border/40">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/40 border border-border/30 text-foreground/70 scale-90">
          <LanguageSwitcher />
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.82 }}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/40 border border-border/30 text-foreground/70 scale-90"
        >
          <div className="h-4 w-4">
            <ThemeToggleIcon />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
