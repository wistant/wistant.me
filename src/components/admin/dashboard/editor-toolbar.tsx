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

export function EditorToolbar({
  title,
  setTitle,
  saveStatus,
  dict,
}: {
  title: string;
  setTitle: (t: string) => void;
  saveStatus: string;
  dict?: AdminDictionary;
}) {
  const { editor } = useCurrentEditor();

  return (
    <div className="flex flex-col border-b bg-card z-10 sticky top-0">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4 flex-1">
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter document title..."
            className="max-w-md font-semibold text-lg border-transparent hover:border-input focus-visible:ring-0 bg-transparent px-2 h-auto py-1"
          />
          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border">
            {saveStatus}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-8">
            <Save className="size-3.5" />
            <span>{dict?.actions?.save || "Save Draft"}</span>
          </Button>
          <Button size="sm" className="gap-2 h-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            <Wand2 className="size-3.5" />
            <span>{dict?.actions?.publish || "Publish & AI Translate"}</span>
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
