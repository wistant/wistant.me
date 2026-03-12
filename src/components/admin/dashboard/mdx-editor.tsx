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
} from "novel";
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
import { Heading1, Heading2, List } from "lucide-react";

// Moduler Components
import { EditorToolbar } from "./editor-toolbar";
import { EditorBubbleMenuClient } from "./editor-bubble";

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

import { ContentType, Frontmatter } from "@/lib/admin/schemas";

interface MdxEditorProps {
  initialContent?: string;
  initialFrontmatter?: Frontmatter;
  slug?: string;
  isNew?: boolean;
  contentType: ContentType;
  dict: AdminDictionary;
  lang: Language;
}

export function MdxEditor({
  initialContent = "",
  initialFrontmatter = {},
  slug: initialSlug = "",
  isNew = false,
  contentType,
  dict,
  lang,
}: MdxEditorProps) {
  const [saveStatus, setSaveStatus] = useState(isNew ? "Draft" : "Saved");
  const [title, setTitle] = useState<string>(String(initialFrontmatter?.title || initialFrontmatter?.name || (isNew ? "" : "Nouveau document")));
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleTranslate = async (targetLang: string) => {
    if (!content) return;
    setIsTranslating(true);
    try {
      const res = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          targetLang,
          contentType,
        }),
      });
      if (res.ok) {
        const { translated } = await res.json();
        if (translated) {
           setContent(translated);
           setSaveStatus(dict?.editor?.unsaved || "Translated - Unsaved");
        }
      }
    } catch (err) {
      console.error("Translation failed", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = async () => {
    if (!title) {
        alert("Please enter a title before saving.");
        return;
    }

    setIsSaving(true);
    setSaveStatus("Saving...");

    try {
      // For new content, generate slug from title if not provided
      const finalSlug = initialSlug || (typeof title === 'string' ? title : "document").toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      
      const payload = {
        type: contentType,
        slug: finalSlug,
        lang: lang || "en",
        frontmatter: {
          ...initialFrontmatter,
          title: title,
          date: initialFrontmatter.date || new Date().toISOString(),
          published: initialFrontmatter.published ?? true,
        },
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
        setSaveStatus("Saved");
        if (isNew) {
           window.location.href = `/admin/${contentType}/${finalSlug}`;
        }
      } else {
        const err = await res.json();
        setSaveStatus("Error");
        console.error("Save error:", err);
      }
    } catch (error) {
       setSaveStatus("Error");
       console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-md border shadow-sm overflow-hidden">
      <EditorRoot>
        <EditorToolbar 
          title={title} 
          setTitle={setTitle} 
          saveStatus={saveStatus} 
          isSaving={isSaving}
          isTranslating={isTranslating}
          onSave={handleSave}
          onTranslate={handleTranslate}
          dict={dict} 
          lang={lang}
        />

        {/* 2. Edge-to-Edge Responsive Editing Area */}
        <div className="flex-1 overflow-y-auto bg-muted/10 relative">
          <EditorContent
            initialContent={undefined} // Handled via content state and markdown extension
            extensions={defaultExtensions as any[]}
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
              setContent(editor.storage.markdown.getMarkdown());
              setSaveStatus(dict?.editor?.unsaved || "Unsaved changes");
            }}
          >
            {/* Contextual Action Bubble */}
            <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-background shadow-xl">
               <EditorBubbleMenuClient />
            </EditorBubble>

            {/* Notion-style Slash Commands Menu */}
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-background p-1 shadow-md transition-all w-64">
              <EditorCommandEmpty className="px-2 py-3 text-center text-sm text-muted-foreground">{dict?.editor?.empty || "No results found"}</EditorCommandEmpty>
              <EditorCommandList>
                <EditorCommandItem
                  value="text"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).setNode("paragraph").run();
                  }}
                >
                  <p className="font-medium">{dict?.editor?.slashMenu?.text || "Normal Text"}</p>
                </EditorCommandItem>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">{dict?.editor?.slashMenu?.heading || "Headings"}</div>
                <EditorCommandItem
                  value="heading1"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
                  }}
                >
                  <Heading1 className="size-4 text-muted-foreground mr-2" />
                  <p className="font-medium">H1</p>
                </EditorCommandItem>
                <EditorCommandItem
                  value="heading2"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
                  }}
                >
                   <Heading2 className="size-4 text-muted-foreground mr-2" />
                   <p className="font-medium">H2</p>
                </EditorCommandItem>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">{dict?.editor?.slashMenu?.list || "Lists"}</div>
                <EditorCommandItem
                  value="bulletList"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).toggleBulletList().run();
                  }}
                >
                  <List className="size-4 text-muted-foreground mr-2" />
                  <p className="font-medium">{dict?.editor?.slashMenu?.list || "Bullet List"}</p>
                </EditorCommandItem>
              </EditorCommandList>
            </EditorCommand>
          </EditorContent>
        </div>
      </EditorRoot>
    </div>
  );
}
