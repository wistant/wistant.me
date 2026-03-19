"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserGroupIcon } from "@hugeicons/core-free-icons";

export function ProfileSettings() {
  return (
    <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={UserGroupIcon} className="size-5 text-primary" />
        <h2 className="text-lg font-semibold">Profile Settings</h2>
      </div>
      <div className="space-y-4">
         <div className="space-y-1">
           <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
           <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" defaultValue="Wistant Kode" />
         </div>
         <div className="space-y-1">
           <label className="text-xs font-bold uppercase text-muted-foreground">Professional Role</label>
           <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" defaultValue="Full-Stack IT Architect" />
         </div>
         <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-95 w-fit">
           Save Profile
         </button>
      </div>
    </div>
  );
}
