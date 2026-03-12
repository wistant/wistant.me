"use client";

import { StatsCards } from "./stats-cards";
import { MonthlyViewsChart } from "./monthly-views-chart";
import { RecentUploads } from "./recent-uploads";
import { ContentTable } from "./content-table";
import { Language, AdminDictionary } from "@/types/locale";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Analytics01Icon, 
  DashboardSquare01Icon,
  Layers01Icon,
  Megaphone01Icon
} from "@hugeicons/core-free-icons";

export function DashboardContent({ 
  dict, 
  stats, 
  lang,
  activities = []
}: { 
  dict: AdminDictionary; 
  stats: { totalViews: number; totalProjects: number; totalPosts: number; activeUsers: number; }; 
  lang: Language;
  activities?: { action: string; item: string; time: string; image?: string; }[];
}) {
  return (
    <main className="w-full overflow-y-auto overflow-x-hidden p-2 md:p-4 h-full bg-linear-to-b from-background to-muted/20">
      <div className="w-full space-y-6">
        <StatsCards dict={dict} stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="lg:col-span-2 xl:col-span-3 min-h-[400px]">
            <MonthlyViewsChart dict={dict} />
          </div>
          <div className="h-full">
            <RecentUploads dict={dict} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
           <div className="rounded-xl border bg-card p-6 flex flex-col gap-4">
             <h2 className="text-lg font-semibold flex items-center gap-2">
               <HugeiconsIcon icon={Analytics01Icon} className="size-4" />
               Recent Activity
             </h2>
             <div className="space-y-4">
               {activities.length > 0 ? activities.map((act, i) => (
                 <div key={i} className="flex justify-between items-center text-sm border-b border-muted/20 pb-2 last:border-0 last:pb-0 group">
                   <div className="flex items-center gap-3">
                     {act.image && (
                       <img src={act.image} className="size-10 rounded-lg object-cover border border-muted/30 group-hover:border-primary/50 transition-colors" alt="" />
                     )}
                     <div className="flex flex-col">
                       <span className="font-semibold text-foreground/90">{act.action}</span>
                       <span className="text-muted-foreground text-xs truncate max-w-[150px]">{act.item}</span>
                     </div>
                   </div>
                   <span className="text-muted-foreground text-[10px] font-medium italic opacity-70">{act.time}</span>
                 </div>
               )) : (
                 <p className="text-xs text-muted-foreground italic text-center py-4">Aucune activité récente.</p>
               )}
             </div>
           </div>

           <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 text-center">
             <h2 className="text-lg font-semibold flex items-center gap-2 justify-center">
               <HugeiconsIcon icon={DashboardSquare01Icon} className="size-4" />
               Quick Management
             </h2>
             <div className="grid grid-cols-2 gap-3">
               <button className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20">
                 <div className="p-2 rounded-full bg-primary/20">
                    <HugeiconsIcon icon={Layers01Icon} className="size-5 text-primary" />
                 </div>
                 <span className="text-xs font-semibold">New Project</span>
               </button>
               <button className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors border-emerald-500/20">
                 <div className="p-2 rounded-full bg-emerald-500/20">
                    <HugeiconsIcon icon={Megaphone01Icon} className="size-5 text-emerald-600" />
                 </div>
                 <span className="text-xs font-semibold">Write Blog</span>
               </button>
               <button className="flex items-center justify-center gap-2 p-4 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors col-span-2">
                 <span className="text-xs font-medium">Rebuild Production Site</span>
               </button>
             </div>
           </div>
        </div>
        <ContentTable dict={dict} contentType="projects" lang={lang} />
      </div>
    </main>
  );
}
