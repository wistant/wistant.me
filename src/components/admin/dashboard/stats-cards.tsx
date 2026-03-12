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

function formatNumber(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return value.toLocaleString();
  return value.toString();
}

function formatCurrency(value: number): string {
  return "$" + value.toLocaleString();
}

import { AdminDictionary } from "@/types/locale";

export function StatsCards({ dict, stats }: { dict: AdminDictionary; stats: { totalViews: number; totalProjects: number; totalPosts: number; activeUsers: number; } }) {
  const statsConfig = [
    {
      key: "totalViews" as const,
      label: dict?.stats?.totalViews || "Views",
      icon: ViewIcon,
      format: formatNumber,
      value: stats.totalViews,
      change: 12, // Placeholder trend
      trend: "up"
    },
    {
      key: "totalProjects" as const,
      label: dict?.stats?.totalProjects || "Projects",
      icon: Wallet02Icon,
      format: formatCurrency,
      value: stats.totalProjects,
      change: 8,
      trend: "up"
    },
    {
      key: "totalPosts" as const,
      label: dict?.stats?.totalPosts || "Posts",
      icon: Money01Icon,
      format: formatCurrency,
      value: stats.totalPosts,
      change: -2,
      trend: "down"
    },
    {
      key: "activeUsers" as const,
      label: dict?.stats?.activeUsers || "Users",
      icon: UserMultiple02Icon,
      format: (v: number) => v.toString(),
      value: stats.activeUsers,
      change: 0,
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
