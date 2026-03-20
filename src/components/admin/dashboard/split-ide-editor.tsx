"use client";

import { useState, useRef } from "react";
import { Language } from "@/types/locale";
import { ContentType, Frontmatter } from "@/lib/admin/schemas";
import { 
  Save, 
  Loader2, 
  ChevronLeft, 
  Settings2, 
  Terminal,
  Columns,
  Eye,
  Type,
  Image as ImageIcon,
  PanelRightOpen,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CustomMdxWrapper } from "./custom-mdx-wrapper";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { MediaPickerModal } from "./media-picker-modal";

interface SplitIdeEditorProps {
  initialContent?: string;
  initialFrontmatter?: Frontmatter;
  slug?: string;
  isNew?: boolean;
  contentType: ContentType;
  lang: Language;
}

export function SplitIdeEditor({
  initialContent = "",
  initialFrontmatter = {},
  slug: initialSlug = "",
  isNew = false,
  contentType,
  lang,
}: SplitIdeEditorProps) {
  const [saveStatus, setSaveStatus] = useState(isNew ? "Draft" : "Saved");
  const [isSaving, setIsSaving] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // States pour la configuration
  const [title, setTitle] = useState<string>(String(initialFrontmatter?.title || ""));
  const [description, setDescription] = useState<string>(String(initialFrontmatter?.description || ""));
  const [image, setImage] = useState<string>(String(initialFrontmatter?.image || ""));
  const [dates, setDates] = useState<string>(String(initialFrontmatter?.dates || ""));
  const [tagsInput, setTagsInput] = useState<string>((initialFrontmatter?.tags as string[])?.join(", ") || "");
  
  const existingWebsite = (initialFrontmatter?.links as {type: string, href: string}[])?.find(l => l.type === "website")?.href || "";
  const existingGithub = (initialFrontmatter?.links as {type: string, href: string}[])?.find(l => l.type === "github")?.href || "";
  const [websiteLink, setWebsiteLink] = useState(existingWebsite);
  const [githubLink, setGithubLink] = useState(existingGithub);

  const [content, setContent] = useState(initialContent);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);

  const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");

  const handleSave = async () => {
    if (!title) {
        alert("Le titre est obligatoire.");
        return;
    }
    setIsSaving(true);
    setSaveStatus("Sauvegarde...");
    try {
      const finalSlug = initialSlug || title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      const payloadLinks = [];
      if (websiteLink) payloadLinks.push({ type: "website", href: websiteLink });
      if (githubLink) payloadLinks.push({ type: "github", href: githubLink });
      const frontmatterPayload: Record<string, unknown> = {
        title,
        description,
        image,
        active: true,
      };
      if (contentType === "projects") {
          frontmatterPayload.dates = dates;
          frontmatterPayload.tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
          frontmatterPayload.links = payloadLinks;
      }
      const payload = {
        type: contentType,
        slug: finalSlug,
        lang: lang || "en",
        frontmatter: frontmatterPayload,
        content: content,
      };
      const url = isNew ? "/api/admin/content" : `/api/admin/content/${finalSlug}?type=${contentType}&lang=${lang}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveStatus("Enregistré");
        if (isNew) window.location.href = `/${lang}/admin/${contentType}/${finalSlug}`;
      } else {
        setSaveStatus("Erreur");
      }
    } catch {
       setSaveStatus("Erreur");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden relative">
      
      {/* Header Minimaliste */}
      <div className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-4 flex-1">
           <Link href={`/${lang}/admin/${contentType}`}>
             <Button variant="ghost" size="sm" className="gap-2 shrink-0">
               <ChevronLeft className="size-4" /> Retour
             </Button>
           </Link>
           <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="font-bold text-lg bg-transparent border-none outline-none focus:ring-0 truncate max-w-xl" 
              placeholder="Titre..."
           />
        </div>

        <div className="flex items-center gap-2">
           <div className="hidden md:flex items-center bg-muted rounded-md p-1 mr-2">
              <Button variant={viewMode === 'edit' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-[11px]" onClick={() => setViewMode("edit")}>
                <Type className="size-3 mr-1.5" /> Éditeur
              </Button>
              <Button variant={viewMode === 'split' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-[11px]" onClick={() => setViewMode("split")}>
                <Columns className="size-3 mr-1.5" /> Split
              </Button>
              <Button variant={viewMode === 'preview' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-[11px]" onClick={() => setViewMode("preview")}>
                <Eye className="size-3 mr-1.5" /> Aperçu
              </Button>
           </div>
           
           <Button variant="outline" size="sm" className={`h-8 gap-2 border-primary/20 text-primary hover:bg-primary/5 ${showConfig ? 'bg-primary/5' : ''}`} onClick={() => setShowConfig(true)}>
             <Settings2 className="size-4" /> Config
           </Button>

           <div className="h-4 w-px bg-border mx-1" />
           <span className="text-[10px] text-muted-foreground mr-2 font-black bg-muted/50 px-2 py-0.5 rounded uppercase">{saveStatus}</span>
           <Button size="sm" disabled={isSaving} onClick={handleSave} className="gap-2 h-8 font-bold">
             {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
             PUBLIER
           </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         <div className={`h-full border-r overflow-hidden flex flex-col transition-all duration-300 ${viewMode === 'preview' ? 'w-0 opacity-0 overflow-hidden' : viewMode === 'edit' ? 'w-full' : 'w-1/2'}`}>
            <div className="h-8 bg-muted/30 border-b flex items-center px-4 shrink-0 transition-none">
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                   <Terminal className="size-3" /> Zone de Rédaction
                </span>
            </div>
            <div className="flex-1 overflow-hidden transition-none">
               <CustomMdxWrapper ref={editorRef} markdown={content} onChange={setContent} />
            </div>
         </div>

         <div className={`h-full bg-background overflow-hidden flex flex-col transition-all duration-300 ${viewMode === 'edit' ? 'w-0 opacity-0 overflow-hidden' : viewMode === 'preview' ? 'w-full' : 'w-1/2'}`}>
            <div className="h-8 bg-muted/30 border-b flex items-center px-4 shrink-0 transition-none">
                <span className="text-[10px] font-bold uppercase text-primary/70 tracking-widest flex items-center gap-1">
                   <PanelRightOpen className="size-3" /> Preview
                </span>
            </div>
            <div className="flex-1 overflow-y-auto p-12 transition-none">
                <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto">
                   <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                     {content || "*Aperçu en direct...*"}
                   </ReactMarkdown>
                </article>
            </div>
         </div>
      </div>

      {/* CONFIGURATION MODAL (CENTRAL OVERLAY) */}
      {showConfig && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setShowConfig(false)} />
           <div className="relative bg-card border shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="h-14 border-b flex items-center justify-between px-6 shrink-0 bg-muted/30">
                 <h3 className="font-black text-sm uppercase tracking-widest">Configuration Globale</h3>
                 <Button variant="ghost" size="icon" onClick={() => setShowConfig(false)}>
                    <X className="size-4" />
                 </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Résumé / Extrait</label>
                  <textarea 
                    value={description} onChange={e => setDescription(e.target.value)}
                    className="w-full bg-muted/20 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm min-h-[120px] resize-none transition-all" 
                    placeholder="Entrez un court résumé..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex justify-between px-1">
                     Image de Couverture
                     {image && <span className="text-red-500 cursor-pointer hover:underline" onClick={() => setImage("")}>Effacer</span>}
                  </label>
                  <div 
                    onClick={() => setMediaPickerOpen(true)}
                    className="group relative w-full aspect-21/9 rounded-2xl overflow-hidden bg-muted/40 border-2 border-dashed border-muted flex items-center justify-center cursor-pointer transition-all hover:border-primary/50"
                  >
                      {image ? (
                          <Image src={image.startsWith('/') || image.startsWith('http') ? image : `/${image}`} alt="Cover" fill className="object-cover" />
                      ) : (
                          <div className="text-center text-muted-foreground flex flex-col items-center gap-3">
                             <ImageIcon className="size-10 opacity-10" />
                             <span className="font-black text-[10px] tracking-tighter">PARCOURIR LA GALERIE</span>
                          </div>
                      )}
                  </div>
                </div>

                {contentType === "projects" && (
                  <div className="space-y-8 pt-4 border-t border-muted">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest px-1">Période</label>
                        <input 
                          type="text" value={dates} onChange={e => setDates(e.target.value)}
                          className="w-full bg-muted/20 border px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                          placeholder="Ex: 2024"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest px-1">Tags</label>
                        <input 
                          type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)}
                          className="w-full bg-muted/20 border px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                          placeholder="React, GSAP..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase text-primary tracking-widest px-1">Liens Externes</label>
                       <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="text" value={websiteLink} onChange={e => setWebsiteLink(e.target.value)}
                            className="w-full bg-muted/10 border px-3 py-2 rounded-lg text-xs outline-none focus:border-primary/50" placeholder="🌐 Site Web"
                          />
                          <input 
                            type="text" value={githubLink} onChange={e => setGithubLink(e.target.value)}
                            className="w-full bg-muted/10 border px-3 py-2 rounded-lg text-xs outline-none focus:border-primary/50" placeholder="🐙 GitHub"
                          />
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t bg-muted/10 flex justify-end">
                 <Button onClick={() => setShowConfig(false)} className="px-10 font-black text-xs uppercase">Valider</Button>
              </div>
           </div>
        </div>
      )}

      <MediaPickerModal 
        open={mediaPickerOpen} 
        onOpenChange={setMediaPickerOpen} 
        onSelect={(url) => {
           if (showConfig && !image) {
               setImage(url);
           } else {
               if (editorRef.current) {
                   editorRef.current.insertMarkdown(`\n![Image](${url})\n`);
               } else {
                   setContent(prev => prev + `\n![Image](${url})\n`);
               }
           }
        }} 
      />
    </div>
  );
}
