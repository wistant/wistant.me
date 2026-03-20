"use client";

import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Checkbox } from "@/components/admin/ui/checkbox";
import { Frontmatter } from "@/lib/admin/schemas";
import { Settings2, ImageIcon, FolderOpen, Tags, X } from "lucide-react";
import { AdminDictionary } from "@/types/locale";
import { MediaPickerModal } from "./media-picker-modal";
import { TagSelector } from "./tag-selector";
import { useState, useEffect } from "react";

interface MetadataDrawerProps {
  metadata: Frontmatter;
  onChange: (meta: Frontmatter) => void;
  dict?: AdminDictionary;
}

export function MetadataDrawer({ metadata, onChange }: MetadataDrawerProps) {
  const [open, setOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<"image" | "video" | null>(null);

  // Empêcher le scroll du body quand on ouvre
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  const updateField = (field: keyof Frontmatter, value: Frontmatter[keyof Frontmatter]) => {
    onChange({ ...metadata, [field]: value });
  };

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2 h-8" onClick={() => setOpen(true)}>
        <Settings2 className="size-3.5" />
        <span className="hidden sm:inline">Configuration</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-background/40 backdrop-blur-md transition-opacity"
            onClick={() => setOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative z-50 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-3xl border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl animate-in zoom-in-95 fade-in duration-200">
            
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-background/60 backdrop-blur-xl">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold tracking-tight">Paramètres Globaux du Fichier</h2>
                <p className="text-sm text-muted-foreground">Méta-données intégrées au fichier (Frontmatter Markdown)</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full size-8" onClick={() => setOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Description Longue (SEO)</label>
            <Input 
              value={metadata.description || ""}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Ex: Découvrez ce superbe projet..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image de couverture absolue (Thumbnail)</label>
            <div className="flex gap-2">
              <Input 
                value={metadata.image || ""}
                onChange={(e) => updateField('image', e.target.value)}
                placeholder="/portfolio/image.png"
                className="flex-1"
              />
              <Button 
                variant="secondary" 
                onClick={() => { setActiveMediaTarget("image"); setMediaPickerOpen(true); }}
                className="shrink-0"
              >
                <FolderOpen className="size-4 mr-2" /> Parcourir
              </Button>
            </div>
            {metadata.image && (
              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <ImageIcon className="size-3" /> Image d&apos;entête configurée
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Vidéo de présentation (optionnel)</label>
            <div className="flex gap-2">
              <Input 
                value={metadata.video || ""}
                onChange={(e) => updateField('video', e.target.value)}
                placeholder="/portfolio/video.webm"
                className="flex-1"
              />
              <Button 
                variant="secondary" 
                onClick={() => { setActiveMediaTarget("video"); setMediaPickerOpen(true); }}
                className="shrink-0"
              >
                <FolderOpen className="size-4 mr-2" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Ordre de tri (Dashboard)</label>
              <Input 
                type="number"
                value={metadata.order ?? ""}
                onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
                placeholder="1"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <label className="text-sm font-medium flex items-center gap-2">
              <Tags className="size-4 text-muted-foreground" /> Mots-clés (SEO & Filtrage)
            </label>
            <TagSelector 
              tags={metadata.tags || []} 
              onChange={(newTags) => updateField('tags', newTags)} 
            />
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="published" 
                checked={metadata.published !== false}
                onCheckedChange={(c) => updateField('published', !!c)}
              />
              <label
                htmlFor="published"
                className="text-sm font-medium leading-none"
              >
                Publié (Visible au public)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="active" 
                checked={metadata.active === true}
                onCheckedChange={(c) => updateField('active', !!c)}
              />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none"
              >
                Actif (Mode Vedette)
              </label>
            </div>
          </div>
        </div>
          </div>
        </div>
      )}

      <MediaPickerModal 
        open={mediaPickerOpen} 
        onOpenChange={setMediaPickerOpen} 
        onSelect={(url) => {
          if (activeMediaTarget) {
            updateField(activeMediaTarget, url);
          }
        }} 
      />
    </>
  );
}
