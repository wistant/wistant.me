"use client";

import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { AdminDictionary } from "@/types/locale";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Save,
  Wand2,
} from "lucide-react";
import { MetadataDrawer } from "./metadata-drawer";
import { Frontmatter } from "@/lib/admin/schemas";

export function EditorToolbar({
  title,
  setTitle,
  metadata,
  setMetadata,
  saveStatus,
  isSaving,
  isTranslating,
  onSave,
  onTranslate,
  dict,
  lang,
  hideTitle,
}: {
  title: string;
  setTitle: (t: string) => void;
  metadata: Frontmatter;
  setMetadata: (m: Frontmatter) => void;
  saveStatus: string;
  isSaving?: boolean;
  isTranslating?: boolean;
  onSave?: () => void;
  onTranslate?: (targetLang: string) => void;
  dict?: AdminDictionary;
  lang?: string;
  hideTitle?: boolean;
}) {
  const { editor } = useCurrentEditor();

  return (
    <div className="flex flex-col border-b bg-card z-10 sticky top-0 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4 flex-1">
          {!hideTitle && (
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder={dict?.editor?.placeholder || "Enter document title..."}
              className="max-w-md font-semibold text-lg border-transparent hover:border-input focus-visible:ring-0 bg-transparent px-2 h-auto py-1"
            />
          )}
          {hideTitle && <span className="font-semibold text-lg px-2">Mode Éditeur de Projet</span>}
          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border">
            {saveStatus}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MetadataDrawer metadata={metadata} onChange={setMetadata} dict={dict} />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 h-8" 
            onClick={onSave}
            disabled={isSaving || isTranslating}
          >
            <Save className={cn("size-3.5", isSaving && "animate-spin")} />
            <span>{isSaving ? (dict?.editor?.saving || "Saving...") : (dict?.actions?.save || "Save Draft")}</span>
          </Button>
          
          <Button 
            size="sm" 
            className="gap-2 h-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            disabled={isTranslating || isSaving}
            onClick={() => onTranslate?.(lang === "en" ? "fr" : "en")}
          >
            <Wand2 className={cn("size-3.5", isTranslating && "animate-spin")} />
            <span>
              {isTranslating 
                ? (lang === "en" ? "Traduire..." : "Translating...") 
                : `${dict?.actions?.publish || "Translate to"} ${lang === "en" ? "French" : "English"}`
              }
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 px-4 py-2 bg-muted/30 overflow-x-auto scrollbar-hide">
        <ToolbarButton 
          icon={<Heading1 className="size-4" />} 
          isActive={editor?.isActive("heading", { level: 1 })} 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
          tooltip="Heading 1" 
        />
        <ToolbarButton 
          icon={<Heading2 className="size-4" />} 
          isActive={editor?.isActive("heading", { level: 2 })} 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
          tooltip="Heading 2" 
        />
        <ToolbarButton 
          icon={<Heading3 className="size-4" />} 
          isActive={editor?.isActive("heading", { level: 3 })} 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
          tooltip="Heading 3" 
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton 
          icon={<Bold className="size-4" />} 
          isActive={editor?.isActive("bold")} 
          onClick={() => editor?.chain().focus().toggleBold().run()} 
          tooltip="Bold" 
        />
        <ToolbarButton 
          icon={<Italic className="size-4" />} 
          isActive={editor?.isActive("italic")} 
          onClick={() => editor?.chain().focus().toggleItalic().run()} 
          tooltip="Italic" 
        />
        <ToolbarButton 
          icon={<UnderlineIcon className="size-4" />} 
          isActive={editor?.isActive("underline")} 
          onClick={() => editor?.chain().focus().toggleUnderline().run()} 
          tooltip="Underline" 
        />
        <ToolbarButton 
          icon={<Strikethrough className="size-4" />} 
          isActive={editor?.isActive("strike")} 
          onClick={() => editor?.chain().focus().toggleStrike().run()} 
          tooltip="Strikethrough" 
        />
        <ToolbarButton 
          icon={<Code className="size-4" />} 
          isActive={editor?.isActive("code")} 
          onClick={() => editor?.chain().focus().toggleCode().run()} 
          tooltip="Code" 
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton 
          icon={<List className="size-4" />} 
          isActive={editor?.isActive("bulletList")} 
          onClick={() => editor?.chain().focus().toggleBulletList().run()} 
          tooltip="Bullet List" 
        />
        <ToolbarButton 
          icon={<ListOrdered className="size-4" />} 
          isActive={editor?.isActive("orderedList")} 
          onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
          tooltip="Numbered List" 
        />
        <ToolbarButton 
          icon={<Quote className="size-4" />} 
          isActive={editor?.isActive("blockquote")} 
          onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
          tooltip="Blockquote" 
        />
      </div>
    </div>
  );
}

function ToolbarButton({ 
  icon, 
  tooltip, 
  isActive,
  onClick 
}: { 
  icon: React.ReactNode; 
  tooltip: string; 
  isActive?: boolean;
  onClick?: () => void 
}) {
  return (
    <button
      type="button"
      title={tooltip}
      onClick={onClick}
      className={cn(
        "p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
        isActive && "bg-accent text-foreground"
      )}
    >
      {icon}
    </button>
  );
}
