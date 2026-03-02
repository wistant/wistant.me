import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";
import Link from "next/link";
import React from "react";
import {ThemeToggleIcon} from "@/components/dock/floating-dock";

type DockItem = { title: string; icon: React.ReactNode; href: string };


export const FloatingDockMobile = ({items, className,}: Readonly<{
    items: DockItem[];
    className?: string;

}>) => {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <div
            className={cn(
                'flex md:hidden items-center justify-center flex-wrap gap-1.5 px-3 py-2 rounded-2xl',
                'bg-card/90 dark:bg-card/95 backdrop-blur-2xl',
                'border border-border/60',
                'shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50',
                className,
            )}
        >
            {items.map((item) => {
                const isExternal = item.href.startsWith('http');
                return (
                    <motion.div key={item.title} whileTap={{ scale: 0.82 }}>
                        <Link
                            href={item.href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/70 dark:bg-muted/40 border border-border/50 text-foreground/80"
                        >
                            <div className="h-4 w-4">{item.icon}</div>
                        </Link>
                    </motion.div>
                );
            })}

            {/* Separator */}
            <div className="mx-0.5 h-4 w-px bg-border/50" />

            {/* Theme toggle */}
            <motion.button
                type="button"
                whileTap={{ scale: 0.82 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/70 dark:bg-muted/40 border border-border/50 text-foreground/80"
            >
                <div className="h-4 w-4">
                    <ThemeToggleIcon />
                </div>
            </motion.button>
        </div>
    );
};