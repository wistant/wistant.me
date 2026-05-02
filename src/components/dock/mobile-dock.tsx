"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const pathname = usePathname();

  return (
    <div className={cn("relative block md:hidden", className)}>
      <motion.div
        layoutId="nav"
        className="flex flex-col items-center gap-2"
      >
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              layoutId="menu"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full mb-4 flex flex-col gap-2 bg-card/95 backdrop-blur-xl p-3 rounded-2xl border border-border/50 shadow-2xl min-w-[180px]"
            >
              {items.map((item, idx) => {
                const isActive = item.href === pathname || (item.href.length > 3 && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl transition-all",
                        isActive 
                          ? "bg-primary/10 text-primary border border-primary/20 shadow-xs" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className="size-5 flex items-center justify-center shrink-0">
                        {typeof item.icon === "string" ? (
                          <Image src={item.icon} alt={item.title} width={20} height={20} className={cn("object-contain", item.title !== "WhatsApp" && "dark:invert")} />
                        ) : (
                          item.icon
                        )}
                      </div>
                      <span className="text-sm font-medium tracking-tight whitespace-nowrap">{item.title}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="h-px bg-border/40 my-1 px-2" />
              
              <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex-1 flex justify-center py-2 rounded-xl bg-muted/30 border border-border/30">
                  <LanguageSwitcher />
                </div>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="flex-1 flex items-center justify-center py-2 rounded-xl bg-muted/30 border border-border/30 text-foreground/70"
                >
                  <div className="h-4 w-4">
                    <ThemeToggleIcon />
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "h-12 w-12 flex items-center justify-center rounded-full bg-card/95 backdrop-blur-xl border border-border/60 shadow-xl transition-all active:scale-90 relative z-[60]",
            open ? "bg-primary/10" : ""
          )}
        >
          <div className="relative size-6 flex items-center justify-center">
             <motion.div 
               animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
               className="absolute h-0.5 w-5 bg-foreground" 
             />
             <motion.div 
               animate={open ? { opacity: 0 } : { opacity: 1 }}
               className="h-0.5 w-5 bg-foreground" 
             />
             <motion.div 
               animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
               className="absolute h-0.5 w-5 bg-foreground" 
             />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
