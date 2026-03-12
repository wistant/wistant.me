
import { getAdminDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Settings01Icon,
  ImageAdd01Icon,
  GlobalIcon
} from "@hugeicons/core-free-icons";
import { getContent } from "@/lib/admin/server/cms/engine";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getAdminDictionary(lang);
  const siteSettings = await getContent("settings", "site", lang);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{dict.settings.title}</h1>
        <p className="text-muted-foreground">Manage your portfolio configurations and global site appearance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={UserGroupIcon} className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">{dict.settings.profile}</h2>
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
             <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-95">
               Save Profile
             </button>
          </div>
        </div>

        {/* Site Identity */}
        <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={GlobalIcon} className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">Site Identity</h2>
          </div>
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-muted-foreground">Site Title</label>
               <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" defaultValue={siteSettings?.frontmatter.title as string || ""} />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-muted-foreground">Meta Description</label>
               <textarea className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden min-h-[80px]" defaultValue={siteSettings?.frontmatter.description as string || ""} />
             </div>
          </div>
        </div>

        {/* Assets & Branding */}
        <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm md:col-span-2">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Settings01Icon} className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">Branding Assets</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-muted-foreground">Favicon (.ico)</label>
               <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/20 border-dashed">
                 <img src={siteSettings?.frontmatter.favicon as string || "/favicon.ico"} className="size-10 object-contain" alt="Favicon" />
                 <button className="flex items-center gap-2 text-xs font-bold bg-background p-2 rounded-lg border hover:bg-muted transition-colors">
                   <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" /> Change
                 </button>
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-muted-foreground">Site Logo</label>
               <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/20 border-dashed">
                 <img src={siteSettings?.frontmatter.logo as string || "/logo.png"} className="h-10 w-auto object-contain" alt="Logo" />
                 <button className="flex items-center gap-2 text-xs font-bold bg-background p-2 rounded-lg border hover:bg-muted transition-colors">
                   <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" /> Change
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
      </div>
    </div>
  );
}
