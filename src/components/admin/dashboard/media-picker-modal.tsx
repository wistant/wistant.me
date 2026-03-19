"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/admin/ui/button";
import { UploadCloud, Image as ImageIcon, Search, Folder, Loader2, Check, Edit2, X, ChevronRight, CornerLeftUp } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/admin/ui/input";
import { MediaFile } from "@/app/api/admin/media/route";

interface MediaPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ open, onOpenChange, onSelect }: MediaPickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [renameDialog, setRenameDialog] = useState<{ open: boolean; file: MediaFile | null; newName: string }>({ open: false, file: null, newName: "" });
  const [currentFolder, setCurrentFolder] = useState<string>("");

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to fetch media", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchMedia();
    }
  }, [open, fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subfolder", currentFolder || "gallery"); // Par défaut on range dans le dossier courant ou gallery

    try {
      const res = await fetch("/api/admin/assets", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // Rafraîchir la liste après upload
        await fetchMedia();
        if (data.url) onSelect(data.url);
      } else {
        alert("Erreur lors de l'upload: " + await res.text());
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRename = async () => {
    if (!renameDialog.file || !renameDialog.newName) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldUrl: renameDialog.file.url, newFilename: renameDialog.newName })
      });
      if (res.ok) {
        await fetchMedia();
        setRenameDialog({ open: false, file: null, newName: "" });
      } else {
        const err = await res.json();
        alert("Rename failed: " + err.error);
      }
    } catch(e) { 
      console.error("Rename error", e); 
    }
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.path.toLowerCase().includes(search.toLowerCase())
  );

  // Dossiers et Fichiers
  const currentFolders = new Set<string>();
  const currentItems: MediaFile[] = [];

  const prefix = currentFolder ? (currentFolder.endsWith("/") ? currentFolder : `${currentFolder}/`) : "";

  filteredFiles.forEach(f => {
    if (f.path.startsWith(prefix)) {
      const remainingPath = f.path.slice(prefix.length);
      const isFileInDir = !remainingPath.includes("/");
      if (isFileInDir) {
        currentItems.push(f);
      } else {
        const folderName = remainingPath.split("/")[0];
        currentFolders.add(folderName);
      }
    }
  });

  const folders = Array.from(currentFolders);
  const folderParts = currentFolder.split("/").filter(Boolean);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="fixed left-[50%] top-[50%] z-[60] grid w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-2xl sm:rounded-2xl duration-200 animate-in fade-in-0 zoom-in-95 h-[85vh] flex-col overflow-hidden">
        
        <div className="flex items-start justify-between mb-2 shrink-0">
           <div className="flex flex-col gap-1">
             <h2 className="text-xl font-semibold flex items-center gap-2">
               <ImageIcon className="size-5" /> Media Manager (Explorateur de Fichiers)
             </h2>
             <p className="text-sm text-muted-foreground">Naviguez dans le dossier public et uploadez (Push Auto Github).</p>
           </div>
           <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="size-5" />
           </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-2 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher par nom..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          <div className="relative overflow-hidden shrink-0">
            <Button disabled={uploading} className="gap-2 h-10 w-full">
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
              {uploading ? "Envoi..." : "Uploader vers: " + (currentFolder || "public")}
            </Button>
            <input 
              type="file" 
              accept="image/*,video/mp4,video/webm" 
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 px-1 py-2 text-sm text-muted-foreground bg-muted/30 rounded-md border shrink-0">
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setCurrentFolder("")}>public</Button>
          {folderParts.map((part, index) => {
             const pathToHere = folderParts.slice(0, index + 1).join("/");
             return (
               <div key={part} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 opacity-50" />
                  <Button variant="ghost" size="sm" className="h-7 px-2 font-medium text-foreground" onClick={() => setCurrentFolder(pathToHere)}>
                    {part}
                  </Button>
               </div>
             )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-muted/10 border rounded-xl p-4 mt-2">
          {loading ? (
            <div className="flex w-full h-full items-center justify-center">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : folders.length === 0 && currentItems.length === 0 ? (
            <div className="flex flex-col w-full h-full items-center justify-center text-muted-foreground gap-3">
               <ImageIcon className="size-12 opacity-20" />
               <p>Dossier vide. Rien à afficher.</p>
               {currentFolder && (
                 <Button variant="outline" size="sm" className="mt-2" onClick={() => setCurrentFolder("")}>Retour à la racine</Button>
               )}
            </div>
          ) : (
             <div className="space-y-6">
                {/* Folders List */}
                {folders.length > 0 && (
                   <div>
                     <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Dossiers</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {currentFolder && (
                          <div 
                            onClick={() => setCurrentFolder(folderParts.slice(0, -1).join("/"))}
                            className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                          >
                            <CornerLeftUp className="size-5 opacity-70" />
                            <span className="text-sm font-medium">Retour</span>
                          </div>
                        )}
                        {folders.map(folder => (
                          <div 
                            key={folder}
                            onClick={() => setCurrentFolder(prefix + folder)}
                            className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:border-primary hover:text-primary cursor-pointer transition-colors group"
                          >
                            <Folder className="size-5 text-blue-500 group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium truncate">{folder}</span>
                          </div>
                        ))}
                     </div>
                   </div>
                )}

                {/* Media Cards */}
                {currentItems.length > 0 && (
                   <div>
                     <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Fichiers ({currentItems.length})</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                       {currentItems.map((file, i) => {
                         const isVideo = file.url.endsWith(".mp4") || file.url.endsWith(".webm");
                         const rawSize = file.size ? (file.size / 1024).toFixed(0) + " KB" : "";
                         
                         return (
                           <div 
                             key={i} 
                             className="group relative rounded-xl border bg-background overflow-hidden hover:border-primary hover:shadow-md transition-all flex flex-col"
                           >
                             <div className="relative w-full aspect-square bg-muted">
                                {!isVideo ? (
                                  <Image 
                                    src={file.url} 
                                    alt={file.name} 
                                    fill 
                                    className="object-cover transition-transform group-hover:scale-105" 
                                    sizes="(max-width: 600px) 50vw, 25vw"
                                  />
                                ) : (
                                  <video src={file.url} className="w-full h-full object-cover" muted />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                   <Button variant="secondary" size="icon" className="rounded-full size-10 shadow-lg" onClick={(e) => { e.stopPropagation(); onSelect(file.url); onOpenChange(false); }}>
                                     <Check className="size-5" />
                                   </Button>
                                   <Button variant="outline" size="icon" className="rounded-full size-10 shadow-lg border-white/20 bg-black/50 text-white hover:bg-black/70 hover:text-white" onClick={(e) => { e.stopPropagation(); setRenameDialog({ open: true, file, newName: file.name }); }}>
                                     <Edit2 className="size-4" />
                                   </Button>
                                </div>
                             </div>
                             <div className="p-2 text-xs border-t bg-background">
                               <p className="font-medium truncate" title={file.name}>{file.name}</p>
                               {rawSize && <p className="text-muted-foreground mt-0.5 text-[10px]">{rawSize}</p>}
                             </div>
                           </div>
                         );
                       })}
                     </div>
                   </div>
                )}
             </div>
          )}
        </div>
      </div>

      {/* RENAME OVERLAY MINI DIALOG */}
      {renameDialog.open && renameDialog.file && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
           <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setRenameDialog({ open: false, file: null, newName: "" })} />
           <div className="relative bg-card border shadow-2xl p-6 rounded-2xl w-full max-w-sm animate-in zoom-in-95">
              <h3 className="text-lg font-semibold mb-2">Renommer et Auto-Refactor</h3>
              <p className="text-sm text-muted-foreground mb-4">Le composant va chercher partout dans votre MDX où cette image est utilisée et réécrire le lien silencieusement.</p>
              <Input 
                value={renameDialog.newName} 
                onChange={(e) => setRenameDialog(prev => ({ ...prev, newName: e.target.value }))} 
                className="mb-4"
              />
              <div className="flex justify-end gap-2">
                 <Button variant="ghost" onClick={() => setRenameDialog({ open: false, file: null, newName: "" })}>Annuler</Button>
                 <Button onClick={handleRename}>Valider (Auto-Rewrite)</Button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
