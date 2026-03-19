"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Settings01Icon, ImageAdd01Icon } from "@hugeicons/core-free-icons";

export function BrandingAssets({ siteSettings }: { siteSettings: any }) {
  return (
    <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm md:col-span-2">
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={Settings01Icon} className="size-5 text-primary" />
        <h2 className="text-lg font-semibold">Branding Assets</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <div className="space-y-2">
           <label className="text-xs font-bold uppercase text-muted-foreground">Favicon (.ico)</label>
           <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-xl bg-muted/20 border-dashed">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={siteSettings?.frontmatter?.favicon || "/favicon.ico"} className="size-10 object-contain" alt="Favicon" />
             <button className="flex items-center gap-2 text-xs font-bold bg-background p-2 rounded-lg border hover:bg-muted transition-colors">
               <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" /> Change Favicon
             </button>
           </div>
         </div>
         <div className="space-y-2">
           <label className="text-xs font-bold uppercase text-muted-foreground">Site Logo</label>
           <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-xl bg-muted/20 border-dashed">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={siteSettings?.frontmatter?.logo || "/logo.png"} className="h-10 w-auto object-contain" alt="Logo" />
             <button className="flex items-center gap-2 text-xs font-bold bg-background p-2 rounded-lg border hover:bg-muted transition-colors">
               <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" /> Change Logo
             </button>
           </div>
         </div>
      </div>
      <div className="pt-4 border-t flex justify-end">
         <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-95">
           Update Site Config
         </button>
      </div>
    </div>
  );
}
