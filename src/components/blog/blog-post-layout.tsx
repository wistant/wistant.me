import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";
import { Header } from "@/components/blog/slug/header";
import { Language } from "@/types/locale";
import React from "react";

export default async function BlogPostLayout({ 
  post, 
  lang, 
  children 
}: { 
  post: { title: string; date: string; image?: string; slug: string; description?: string }; 
  lang: Language; 
  children: React.ReactNode 
}) {
  const dict = await getDictionary(lang);
  const readingTime = 5;

  return (
    <article className="max-w-2xl mx-auto py-16 min-h-screen flex flex-col gap-10 pb-32">
      <Header 
        post={{ title: post.title, summary: post.description, date: post.date }}
        lang={lang}
        dict={dict}
        readingTime={readingTime}
      />

      {post.image && post.image !== "" && (
        <div className="w-full">
          <div className="relative aspect-2/1 w-full rounded-md overflow-hidden border border-border/50 bg-neutral-100 dark:bg-neutral-900">
             <Image 
               src={post.image} 
               alt={post.title} 
               fill 
               className="object-cover" 
               priority 
             />
          </div>
        </div>
      )}

      <main className="prose prose-neutral dark:prose-invert font-sans max-w-none 
        prose-p:leading-relaxed prose-headings:font-clash prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700 hover:prose-a:decoration-foreground transition-colors prose-a:underline-offset-[3px]
        prose-li:marker:text-neutral-400 dark:prose-li:marker:text-neutral-600
        prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-sm">
        {children}
      </main>
    </article>
  );
}
