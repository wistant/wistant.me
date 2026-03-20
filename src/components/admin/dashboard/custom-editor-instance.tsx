"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { 
  MDXEditor, 
  MDXEditorMethods,
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin,
  markdownShortcutPlugin, 
  toolbarPlugin,
  BlockTypeSelect,
  UndoRedo,
  BoldItalicUnderlineToggles,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  ListsToggle,
  InsertThematicBreak,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertImage,
  CreateLink,
  imagePlugin,
  linkPlugin,
  linkDialogPlugin,
  InsertTable
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface CustomEditorInstanceProps {
  markdown: string;
  onChange: (markdown: string) => void;
}

const CustomEditorInstance = forwardRef<MDXEditorMethods, CustomEditorInstanceProps>(({ markdown, onChange }, ref) => {
  const internalRef = useRef<MDXEditorMethods>(null);
  
  useImperativeHandle(ref, () => internalRef.current!);

  const safeMarkdown = (markdown || "").replace(/```N\/A/g, '```text');

  return (
    <div className="flex flex-col h-full w-full bg-background relative border rounded-md">
      <MDXEditor
        ref={internalRef}
        markdown={safeMarkdown}
        onChange={onChange}
        className="prose dark:prose-invert max-w-none w-full h-full"
        contentEditableClassName="outline-none p-6 min-h-full"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "typescript" }),
          codeMirrorPlugin({ 
            codeBlockLanguages: { 
                typescript: "TypeScript", 
                javascript: "JavaScript", 
                css: "CSS", 
                html: "HTML", 
                bash: "Bash", 
                json: "JSON", 
                markdown: "Markdown" 
            } 
          }),
          directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
          diffSourcePlugin({ diffMarkdown: "Version Originale", viewMode: "rich-text" }),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/20">
                <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === 'codeblock',
                        contents: () => <ChangeCodeMirrorLanguage />
                      },
                      {
                        fallback: () => (
                          <>
                            <UndoRedo />
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            <ListsToggle />
                            <div className="w-px h-4 bg-border mx-1" />
                            <InsertTable />
                            <InsertImage />
                            <CreateLink />
                            <InsertThematicBreak />
                          </>
                        )
                      }
                    ]}
                />
              </div>
            )
          })
        ]}
      />
    </div>
  );
});

CustomEditorInstance.displayName = "CustomEditorInstance";

export default CustomEditorInstance;
