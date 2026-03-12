"use client";

import { useState } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorBubble,
  EditorBubbleItem,
} from "novel";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Language, AdminDictionary } from "@/types/locale";

// Basic Tiptap Extensions
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
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

const defaultExtensions = [
  StarterKit.configure({
    bulletList: { HTMLAttributes: { class: "list-disc list-outside leading-3 -mt-2" } },
    orderedList: { HTMLAttributes: { class: "list-decimal list-outside leading-3 -mt-2" } },
    listItem: { HTMLAttributes: { class: "leading-normal -mb-2" } },
    blockquote: { HTMLAttributes: { class: "border-l-4 border-primary pl-4 italic" } },
    codeBlock: { HTMLAttributes: { class: "rounded-sm bg-muted p-5 font-mono font-medium text-foreground" } },
    code: { HTMLAttributes: { class: "rounded-md bg-muted px-1.5 py-1 font-mono font-medium text-foreground" } },
    horizontalRule: false,
    dropcursor: { color: "#DBEAFE", width: 4 },
    gapcursor: false,
  }),
  Underline,
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  TaskList.configure({ HTMLAttributes: { class: "not-prose pl-2" } }),
  TaskItem.configure({ HTMLAttributes: { class: "flex items-start my-4" }, nested: true }),
  Markdown.configure({ html: false, transformPastedText: true })
];

interface MdxEditorProps {
  initialContent?: string;
  isNew?: boolean;
  contentType?: "projects" | "blog";
  dict?: AdminDictionary;
  lang?: Language;
}

export function MdxEditor({
  initialContent = "",
  isNew = false,
  contentType = "blog",
  dict,
  lang,
}: MdxEditorProps) {
  const [saveStatus, setSaveStatus] = useState(isNew ? "Draft" : "Saved");
  const [title, setTitle] = useState(isNew ? "" : "Nouveau document");

  return (
    <div className="flex flex-col h-full bg-background rounded-md border shadow-sm overflow-hidden">
      {/* 1. Word-style Top Toolbar Container */}
      <div className="flex flex-col border-b bg-card z-10 sticky top-0">
        
        {/* Top Header: Title & Actions */}
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

        {/* Traditional Formatting Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-muted/30 overflow-x-auto scrollbar-hide">
          <ToolbarButton icon={<Heading1 className="size-4" />} tooltip="Heading 1" />
          <ToolbarButton icon={<Heading2 className="size-4" />} tooltip="Heading 2" />
          <ToolbarButton icon={<Heading3 className="size-4" />} tooltip="Heading 3" />
          <div className="w-px h-4 bg-border mx-1" />
          <ToolbarButton icon={<Bold className="size-4" />} tooltip="Bold" />
          <ToolbarButton icon={<Italic className="size-4" />} tooltip="Italic" />
          <ToolbarButton icon={<UnderlineIcon className="size-4" />} tooltip="Underline" />
          <ToolbarButton icon={<Strikethrough className="size-4" />} tooltip="Strikethrough" />
          <ToolbarButton icon={<Code className="size-4" />} tooltip="Code" />
          <div className="w-px h-4 bg-border mx-1" />
          <ToolbarButton icon={<List className="size-4" />} tooltip="Bullet List" />
          <ToolbarButton icon={<ListOrdered className="size-4" />} tooltip="Numbered List" />
          <ToolbarButton icon={<Quote className="size-4" />} tooltip="Blockquote" />
        </div>
      </div>

      {/* 2. Edge-to-Edge Responsive Editing Area */}
      <div className="flex-1 overflow-y-auto bg-muted/10 relative">
        <EditorRoot>
          <EditorContent
            initialContent={initialContent && !isNew ? JSON.parse(initialContent) : undefined}
            extensions={defaultExtensions as any}
            className="w-full max-w-[800px] mx-auto min-h-screen pt-8 pb-32 px-6 sm:px-12 bg-background shadow-md border-x sm:my-8"
            editorProps={{
              handleDOMEvents: {
                keydown: () => false,
              },
              attributes: {
                class: "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full min-h-[500px]",
              },
            }}
            onUpdate={({ editor }) => {
              setSaveStatus(dict?.editor?.unsaved || "Unsaved changes");
            }}
          >
            {/* Contextual Action Bubble */}
            <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-background shadow-xl">
               <div className="flex items-center p-1">
                 <button className="p-2 hover:bg-muted text-foreground transition-colors"><Bold className="size-4" /></button>
                 <button className="p-2 hover:bg-muted text-foreground transition-colors"><Italic className="size-4" /></button>
                 <button className="p-2 hover:bg-muted text-foreground transition-colors"><UnderlineIcon className="size-4" /></button>
                 <button className="p-2 hover:bg-muted text-foreground transition-colors"><Code className="size-4" /></button>
               </div>
            </EditorBubble>

            {/* Notion-style Slash Commands Menu */}
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-background p-1 shadow-md transition-all w-64">
              <EditorCommandEmpty className="px-2 py-3 text-center text-sm text-muted-foreground">Aucun résultat trouvé</EditorCommandEmpty>
              <EditorCommandList>
                <EditorCommandItem
                  value="text"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).setNode("paragraph").run();
                  }}
                >
                  <p className="font-medium">Texte normal</p>
                </EditorCommandItem>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Titres</div>
                <EditorCommandItem
                  value="heading1"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
                  }}
                >
                  <Heading1 className="size-4 text-muted-foreground mr-2" />
                  <p className="font-medium">Titre 1</p>
                </EditorCommandItem>
                <EditorCommandItem
                  value="heading2"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
                  }}
                >
                   <Heading2 className="size-4 text-muted-foreground mr-2" />
                   <p className="font-medium">Titre 2</p>
                </EditorCommandItem>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Listes</div>
                <EditorCommandItem
                  value="bulletList"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).toggleBulletList().run();
                  }}
                >
                  <List className="size-4 text-muted-foreground mr-2" />
                  <p className="font-medium">Liste à puces</p>
                </EditorCommandItem>
              </EditorCommandList>
            </EditorCommand>
          </EditorContent>
        </EditorRoot>
      </div>
    </div>
  );
}

// Helper component for identical toolbar buttons
function ToolbarButton({ icon, tooltip, onClick }: { icon: React.ReactNode; tooltip: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      title={tooltip}
      onClick={onClick}
      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
    >
      {icon}
    </button>
  );
}
