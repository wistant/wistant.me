"use client";

import { SidebarTrigger } from "@/components/admin/ui/sidebar";
import { ThemeToggle } from "@/components/admin/theme-toggle";
import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardSquare01Icon } from "@hugeicons/core-free-icons";
import { AdminDictionary } from "@/types/locale";

export function DashboardHeader({ dict }: { dict: AdminDictionary }) {
  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b bg-card sticky top-0 z-10 w-full shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2" />
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={DashboardSquare01Icon} className="size-4 text-muted-foreground" />
          <span className="text-sm font-semibold">{dict.sidebar.dashboard}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
