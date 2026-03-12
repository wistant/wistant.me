"use client";

import { StatsCards } from "./stats-cards";
import { MonthlyViewsChart } from "./monthly-views-chart";
import { RecentUploads } from "./recent-uploads";
import { ContentTable } from "./content-table";
import { AdminDictionary } from "@/types/locale";

export function DashboardContent({ dict, stats }: { dict: AdminDictionary; stats: { totalViews: number; totalProjects: number; totalPosts: number; activeUsers: number; } }) {
  return (
    <main className="w-full overflow-y-auto overflow-x-hidden p-4 h-full">
      <div className="mx-auto w-full space-y-4">
        <StatsCards dict={dict} stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MonthlyViewsChart dict={dict} />
          <RecentUploads dict={dict} />
        </div>
        <ContentTable dict={dict} contentType="projects" />
      </div>
    </main>
  );
}
