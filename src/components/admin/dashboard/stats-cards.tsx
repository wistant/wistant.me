import { cn } from "@/lib/admin/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewIcon,
  Wallet02Icon,
  Money01Icon,
  UserMultiple02Icon,
  ChartUpIcon,
  ChartDownIcon,
} from "@hugeicons/core-free-icons";

import { AdminDictionary } from "@/types/locale";

export function StatsCards({ dict, stats }: { dict: AdminDictionary; stats: { totalContent: number; totalProjects: number; totalPosts: number; totalTags: number; } }) {
  const statsConfig = [
    {
      key: "totalContent" as const,
      label: "Total Content",
      icon: ViewIcon,
      format: (v: number) => v.toString(),
      value: stats.totalContent,
      change: 3, 
      trend: "up"
    },
    {
      key: "totalProjects" as const,
      label: dict?.stats?.totalProjects || "Projects",
      icon: Wallet02Icon,
      format: (v: number) => v.toString(),
      value: stats.totalProjects,
      change: 8,
      trend: "up"
    },
    {
      key: "totalPosts" as const,
      label: dict?.stats?.totalPosts || "Posts",
      icon: Money01Icon,
      format: (v: number) => v.toString(),
      value: stats.totalPosts,
      change: 0,
      trend: "up"
    },
    {
      key: "totalTags" as const,
      label: "SEO Tags",
      icon: UserMultiple02Icon,
      format: (v: number) => v.toString(),
      value: stats.totalTags,
      change: 12,
      trend: "up"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {statsConfig.map(({ key, label, icon: Icon, format, value, change, trend }) => {
        const isUp = trend === "up";

        return (
          <div
            key={key}
            className="rounded-lg border bg-muted/30 p-3 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <HugeiconsIcon icon={Icon} className="size-3.5 text-muted-foreground" />
            </div>
            <div className="rounded-md border bg-card p-3 flex items-center justify-between">
              <span className="text-2xl font-semibold tracking-tight">
                {key === "totalProjects" || key === "totalPosts" ? value : format(value)}
              </span>
              <div className="flex items-center gap-1">
                {isUp ? (
                  <HugeiconsIcon icon={ChartUpIcon} className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <HugeiconsIcon icon={ChartDownIcon} className="size-3.5 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    isUp
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  )}
                >
                  {change}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
