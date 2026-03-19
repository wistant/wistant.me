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
import { Heading1, Heading2, List, Code, ImageIcon, FolderOpen } from "lucide-react";
import Image from "next/image";

// Moduler Components
import { EditorToolbar } from "./editor-toolbar";
import { EditorBubbleMenuClient } from "./editor-bubble";
import { ContentType, Frontmatter } from "@/lib/admin/schemas";
import { MediaPickerModal } from "./media-picker-modal";

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

interface ProjectEditorProps {
  initialContent?: string;
  initialFrontmatter?: Frontmatter;
  slug?: string;
  isNew?: boolean;
  contentType: ContentType;
  dict: AdminDictionary;
  lang: Language;
}

export function ProjectEditor({
  initialContent = "",
  initialFrontmatter = {},
  slug: initialSlug = "",
  isNew = false,
  contentType,
  dict,
  lang,
}: ProjectEditorProps) {
  const [saveStatus, setSaveStatus] = useState(isNew ? "Draft" : "Saved");
  const [title, setTitle] = useState<string>(String(initialFrontmatter?.title || initialFrontmatter?.name || (isNew ? "" : "Nouveau projet")));
  const [metadata, setMetadata] = useState<Frontmatter>(initialFrontmatter);
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [content, setContent] = useState(initialContent);

  // Custom States for Project Editor
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [inlineMediaPickerOpen, setInlineMediaPickerOpen] = useState(false);

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
      const finalSlug = initialSlug || (typeof title === 'string' ? title : "document").toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      
      const payload = {
        type: contentType,
        slug: finalSlug,
        lang: lang || "en",
        frontmatter: {
          ...metadata,
          title: title,
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
          metadata={metadata}
          setMetadata={setMetadata}
          saveStatus={saveStatus} 
          isSaving={isSaving}
          isTranslating={isTranslating}
          onSave={handleSave}
          onTranslate={handleTranslate}
          dict={dict} 
          lang={lang}
          hideTitle={true} // Mode custom où le titre est dans le corps
        />

        <div className="flex-1 overflow-y-auto bg-muted/10 relative">
          
          <div className="w-full max-w-4xl mx-auto pt-10 px-6 sm:px-12 flex flex-col gap-6">
             {/* Thumbnail Interactive Area */}
             <div 
               onClick={() => setMediaPickerOpen(true)}
               className="group relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-background border-2 border-dashed flex items-center justify-center cursor-pointer transition-all hover:border-primary/50 shadow-sm"
             >
                 {metadata.image ? (
                     <div className="absolute inset-0 w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={metadata.image.startsWith('/') || metadata.image.startsWith('http') ? metadata.image : `/${metadata.image}`} alt="Cover" className="w-full h-full object-cover" />
                     </div>
                 ) : (
                     <div className="text-center text-muted-foreground flex flex-col items-center gap-3">
                        <ImageIcon className="size-10 opacity-50" />
                        <span className="font-medium text-sm">Ajouter une Superbe Couverture (21:9)</span>
                     </div>
                 )}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-xl"><FolderOpen className="size-4" /> Parcourir les dossiers</span>
                 </div>
             </div>
             
             {/* Gigantic Title Input */}
             <div>
               <input 
                   type="text" 
                   value={title} 
                   onChange={(e)=> setTitle(e.target.value)}
                   placeholder="Titre de votre projet magistral..." 
                   className="w-full text-4xl sm:text-5xl font-black bg-transparent border-none outline-none text-foreground placeholder-muted-foreground focus:ring-0 leading-tight" 
               />
               <p className="text-muted-foreground text-sm font-mono mt-2 flex items-center gap-2">
                 <span>/projets/{title.toLowerCase().trim().replace(/[^\\w\\s-]/g, '').replace(/[\\s_-]+/g, '-')}</span>
                 <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">slug</span>
               </p>
             </div>
          </div>

          <EditorContent
            // @ts-expect-error type
            initialContent={initialContent} 
            // @ts-expect-error type
            extensions={defaultExtensions}
            className="w-full max-w-[900px] mx-auto min-h-screen pb-32 px-6 sm:px-12 bg-transparent mt-8"
            editorProps={{
              handleDOMEvents: { keydown: () => false },
              attributes: { class: "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full min-h-[500px]" },
            }}
            onUpdate={({ editor }) => {
              setContent(editor.storage.markdown.getMarkdown());
              setSaveStatus(dict?.editor?.unsaved || "Unsaved changes");
            }}
          >
            <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-background shadow-xl">
               <EditorBubbleMenuClient />
            </EditorBubble>

            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-background p-1 shadow-md transition-all w-64">
              <EditorCommandEmpty className="px-2 py-3 text-center text-sm text-muted-foreground">{dict?.editor?.empty || "No results found"}</EditorCommandEmpty>
              <EditorCommandList>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Actions Rapides</div>
                <EditorCommandItem
                  value="image_injection"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={() => {
                     setInlineMediaPickerOpen(true);
                  }}
                >
                  <ImageIcon className="size-4 text-emerald-500 mr-2" />
                  <p className="font-medium">Insérer une Illustration</p>
                </EditorCommandItem>
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
                
                <div className="px-2 py-1 text-xs font-semibold text-purple-600/80 uppercase tracking-wider mt-2">MagicUI Components</div>
                <EditorCommandItem
                  value="codeComparison"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    const codeSnippet = `\\n<CodeComparison\\n  beforeCode={\`const a = 1;\`}\\n  afterCode={\`const a = 1;\\\\nconst b = 2;\`}\\n  language="typescript"\\n  filename="example.ts"\\n  lightTheme="github-light"\\n  darkTheme="github-dark"\\n/>\\n`;
                    editor.chain().focus().deleteRange(range).insertContent(codeSnippet).run();
                  }}
                >
                  <Code className="size-4 text-purple-500 mr-2" />
                  <p className="font-medium">Code Comparison</p>
                </EditorCommandItem>

                <EditorCommandItem
                  value="codeBlock"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  onCommand={({ editor, range }) => {
                    const codeSnippet = `\\n\`\`\`typescript\\n// Your code here\\n\`\`\`\\n`;
                    editor.chain().focus().deleteRange(range).insertContent(codeSnippet).run();
                  }}
                >
                  <Code className="size-4 text-primary mr-2" />
                  <p className="font-medium">Code Block</p>
                </EditorCommandItem>
              </EditorCommandList>
            </EditorCommand>
          </EditorContent>
        </div>
      </EditorRoot>

      {/* Media Picker for Cover */}
      <MediaPickerModal 
        open={mediaPickerOpen} 
        onOpenChange={setMediaPickerOpen} 
        onSelect={(url) => setMetadata({...metadata, image: url})} 
      />

      {/* Media Picker for Inline Injection using document.execCommand strategy via Tiptap */}
      <MediaPickerModal 
        open={inlineMediaPickerOpen} 
        onOpenChange={setInlineMediaPickerOpen} 
        onSelect={(url) => {
           // On utilise Markdown direct syntax in the textarea or use editor chain if we had a ref
           // Since we can't easily access the editor instance globally without a ref, we'll just insert at end or rely on custom hook...
           // Actually, since we don't have direct access here, we could use the global \`window\` trick or just let the user copy-paste.
           // A better way is capturing editor ref. Let's do a simple workaround: append to content state... No, that resets tip tap.
           // Tiptap exposes `window.editor` in Novel ? No.
           // We will copy the markdown to clipboard and notify.
           navigator.clipboard.writeText(`![Illustration](${url})`);
           alert("Lien de l'image copié ! Faites un CTRL+V (ou CMD+V) où vous voulez dans l'éditeur.");
        }} 
      />
    </div>
  );
}
