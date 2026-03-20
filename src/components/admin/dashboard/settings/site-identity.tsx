"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { GlobalIcon } from "@hugeicons/core-free-icons";

export function SiteIdentity({ siteSettings }: { siteSettings: any }) {
  return (
    <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={GlobalIcon} className="size-5 text-primary" />
        <h2 className="text-lg font-semibold">Site Identity</h2>
      </div>
      <div className="space-y-4">
         <div className="space-y-1">
           <label className="text-xs font-bold uppercase text-muted-foreground">Site Title</label>
           <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" defaultValue={siteSettings?.frontmatter?.title || ""} />
         </div>
         <div className="space-y-1">
           <label className="text-xs font-bold uppercase text-muted-foreground">Meta Description</label>
           <textarea className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden min-h-[80px]" defaultValue={siteSettings?.frontmatter?.description || ""} />
         </div>
      </div>
    </div>
  );
}
