"use client";

import { useCurrentEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Bold, Italic, Underline as UnderlineIcon, Code } from "lucide-react";

export function EditorBubbleMenuClient() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex items-center p-1">
      <button 
        className={cn("p-2 hover:bg-muted text-foreground transition-colors rounded-sm", editor.isActive("bold") && "bg-muted")} 
        onClick={() => editor.chain().focus().toggleMark("bold").run()}
      >
        <Bold className="size-4" />
      </button>
      <button 
        className={cn("p-2 hover:bg-muted text-foreground transition-colors rounded-sm", editor.isActive("italic") && "bg-muted")} 
        onClick={() => editor.chain().focus().toggleMark("italic").run()}
      >
        <Italic className="size-4" />
      </button>
      <button 
        className={cn("p-2 hover:bg-muted text-foreground transition-colors rounded-sm", editor.isActive("underline") && "bg-muted")} 
        onClick={() => editor.chain().focus().toggleMark("underline").run()}
      >
        <UnderlineIcon className="size-4" />
      </button>
      <button 
        className={cn("p-2 hover:bg-muted text-foreground transition-colors rounded-sm", editor.isActive("code") && "bg-muted")} 
        onClick={() => editor.chain().focus().toggleMark("code").run()}
      >
        <Code className="size-4" />
      </button>
    </div>
  );
}
