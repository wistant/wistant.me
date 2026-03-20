"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Search01Icon, Image01Icon } from "@hugeicons/core-free-icons";
import { Language, AdminDictionary } from "@/types/locale";
import { ContentType, CMSContent } from "@/lib/admin/schemas";
import { AssetUpload } from "./asset-upload";

// Imported Refactored Components
import { ContentCard } from "./content-card";

interface ContentTableProps {
  dict: AdminDictionary;
  contentType: ContentType;
  lang: Language;
}

export function ContentTable({ contentType, lang }: ContentTableProps) {
  const [data, setData] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/content?type=${contentType}&lang=${lang}`);
        const result = await res.json();
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [contentType, lang]);

  const filteredData = data.filter(item => {
    const title = (item.frontmatter.title || item.frontmatter.name || item.slug).toLowerCase();
    const tags = (item.frontmatter.tags as string[] || []).join(" ").toLowerCase();
    const query = globalFilter.toLowerCase();
    return title.includes(query) || tags.includes(query);
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={`Rechercher un ${contentType === "projects" ? "projet" : "article"}...`}
            className="pl-9 h-10 w-full bg-background rounded-full border-muted-foreground/20 focus-visible:ring-primary/50"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {contentType === "gallery" && (
            <AssetUpload 
              type="gallery" 
              label="Upload Photo"
              onSuccess={() => window.location.reload()}
            />
          )}
          <Link href={`/${lang}/admin/${contentType}/new`} className="w-full sm:w-auto">
            <Button className="h-10 px-5 gap-2 rounded-full shadow-sm w-full sm:w-auto">
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
              <span>Créer {contentType === "projects" ? "un projet" : "un article"}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Content Grid Area */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
             <div key={i} className="rounded-2xl border bg-muted/20 animate-pulse aspect-4/3" />
          ))}
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-2xl bg-muted/10">
          <HugeiconsIcon icon={Image01Icon} className="size-10 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground text-center max-w-[300px]">Aucun contenu trouvé. Créez votre première entrée pour commencer.</p>
          <Link href={`/${lang}/admin/${contentType}/new`} className="mt-6">
            <Button variant="outline" className="rounded-full">Créer maintenant</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <ContentCard 
              key={item.slug} 
              item={item} 
              lang={lang} 
              contentType={contentType} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
