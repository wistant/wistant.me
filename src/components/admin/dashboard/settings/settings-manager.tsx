"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserGroupIcon, GlobalIcon, Settings01Icon, ImageAdd01Icon } from "@hugeicons/core-free-icons";
import { MediaPickerModal } from "../media-picker-modal";
import { Loader2, Save } from "lucide-react";
import Image from "next/image";
import { CMSContent } from "@/lib/admin/schemas";

export function SettingsManager({ initialSiteSettings, lang }: { initialSiteSettings: CMSContent | null, lang: string }) {
  const [settings, setSettings] = useState({
     title: initialSiteSettings?.frontmatter?.title || "",
     description: initialSiteSettings?.frontmatter?.description || "",
     favicon: initialSiteSettings?.frontmatter?.favicon || "/favicon.ico",
     logo: initialSiteSettings?.frontmatter?.logo || "/logo-wistant.png",
     authorName: initialSiteSettings?.frontmatter?.authorName || "Wistant Kode",
     authorRole: initialSiteSettings?.frontmatter?.authorRole || "Full-Stack IT Architect",
     ogHome: initialSiteSettings?.frontmatter?.ogHome || "/opengraph/me.png",
     ogBlog: initialSiteSettings?.frontmatter?.ogBlog || "/opengraph/blog.png",
     ogProject: initialSiteSettings?.frontmatter?.ogProject || "/opengraph/projects.png",
  });

  const [saving, setSaving] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<"favicon" | "logo" | "ogHome" | "ogBlog" | "ogProject" | null>(null);

  const handleUpdate = (field: string, value: string) => {
    setSettings(s => ({ ...s, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
         type: "settings",
         slug: "site",
         lang: "en", // fallback site settings to EN unless localized
         frontmatter: {
           ...initialSiteSettings?.frontmatter,
           ...settings
         },
         content: initialSiteSettings?.content || ""
      }
      
      const res = await fetch(`/api/admin/content/site?type=settings&lang=${lang}`, { 
         method: "PUT", 
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
         // Si le fichier n'existe pas, on tente un POST (création)
         if (res.status === 404) {
            await fetch(`/api/admin/content`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(payload)
            });
         }
      }
      
      alert("Settings successfully saved!");
    } catch (e) { 
      console.error(e);
      alert("Error while saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative pb-20">
      
      {/* Profile Settings */}
      <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={UserGroupIcon} className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </div>
        <div className="space-y-4">
           <div className="space-y-1">
             <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
             <input 
               value={settings.authorName}
               onChange={(e) => handleUpdate("authorName", e.target.value)}
               className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" 
             />
           </div>
           <div className="space-y-1">
             <label className="text-xs font-bold uppercase text-muted-foreground">Professional Role</label>
             <input 
               value={settings.authorRole}
               onChange={(e) => handleUpdate("authorRole", e.target.value)}
               className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" 
             />
           </div>
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
             <input 
               value={settings.title}
               onChange={(e) => handleUpdate("title", e.target.value)}
               className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden" 
             />
           </div>
           <div className="space-y-1">
             <label className="text-xs font-bold uppercase text-muted-foreground">Meta Description</label>
             <textarea 
               value={settings.description}
               onChange={(e) => handleUpdate("description", e.target.value)}
               className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-hidden min-h-[80px]" 
             />
           </div>
        </div>
      </div>

      {/* Branding Assets */}
      <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm md:col-span-2">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Settings01Icon} className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Branding Assets</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase text-muted-foreground">Favicon (.ico, .png)</label>
             <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-xl bg-muted/20 border-dashed">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={settings.favicon || "/favicon.ico"} className="size-10 object-contain" alt="Favicon" />
               <button 
                 onClick={() => { setActiveTarget("favicon"); setMediaPickerOpen(true); }}
                 className="flex items-center gap-2 text-xs font-bold bg-background p-2 rounded-lg border hover:bg-muted transition-colors"
               >
                 <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" /> Change Favicon
               </button>
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase text-muted-foreground">Site Logo</label>
             <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-xl bg-muted/20 border-dashed">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={settings.logo || "/logo.png"} className="h-10 w-auto object-contain" alt="Logo" />
               <button 
                 onClick={() => { setActiveTarget("logo"); setMediaPickerOpen(true); }}
                 className="flex items-center gap-2 text-xs font-bold bg-background p-2 rounded-lg border hover:bg-muted transition-colors"
               >
                 <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" /> Change Logo
               </button>
             </div>
           </div>
        </div>
      </div>

      {/* SEO & Social Sharing */}
      <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm md:col-span-2">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={GlobalIcon} className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">SEO & Social Sharing (OG Images)</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Ces images s&apos;afficheront sur LinkedIn, WhatsApp et Twitter si aucun visuel spécifique n&apos;est défini.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* OG HOME */}
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Home OG Image</label>
             <div className="group relative aspect-video border rounded-xl overflow-hidden bg-muted/20 border-dashed hover:border-primary/50 transition-all cursor-pointer" onClick={() => { setActiveTarget("ogHome"); setMediaPickerOpen(true); }}>
                {settings.ogHome ? (
                  <Image src={settings.ogHome} alt="Home OG" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic">Default</div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-black">CHANGER</div>
             </div>
           </div>

           {/* OG BLOG */}
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Blog OG Image</label>
             <div className="group relative aspect-video border rounded-xl overflow-hidden bg-muted/20 border-dashed hover:border-primary/50 transition-all cursor-pointer" onClick={() => { setActiveTarget("ogBlog"); setMediaPickerOpen(true); }}>
                {settings.ogBlog ? (
                  <Image src={settings.ogBlog} alt="Blog OG" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic">Default</div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-black">CHANGER</div>
             </div>
           </div>

           {/* OG PROJECT */}
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Project OG Image</label>
             <div className="group relative aspect-video border rounded-xl overflow-hidden bg-muted/20 border-dashed hover:border-primary/50 transition-all cursor-pointer" onClick={() => { setActiveTarget("ogProject"); setMediaPickerOpen(true); }}>
                {settings.ogProject ? (
                  <Image src={settings.ogProject} alt="Project OG" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic">Default</div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-black">CHANGER</div>
             </div>
           </div>
        </div>

        {/* Global Action Bar */}
        <div className="pt-8 border-t flex justify-end">
           <button 
             disabled={saving}
             onClick={handleSave}
             className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-50"
           >
             {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
             {saving ? "Sauvegarde en cours..." : "Sauvegarder les configurations"}
           </button>
        </div>
      </div>
      
      {/* Media Picker */}
      <MediaPickerModal 
        open={mediaPickerOpen} 
        onOpenChange={setMediaPickerOpen} 
        onSelect={(url) => {
          if (activeTarget) handleUpdate(activeTarget, url);
        }} 
      />
    </div>
  );
}
