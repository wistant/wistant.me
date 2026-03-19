import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit01Icon, EyeIcon, Image01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { CMSContent } from "@/lib/admin/schemas";
import { Language } from "@/types/locale";

interface ContentCardProps {
  item: CMSContent;
  lang: Language;
  contentType: string;
}

export function ContentCard({ item, lang, contentType }: ContentCardProps) {
  const title = item.frontmatter.title || item.frontmatter.name || item.slug;
  const image = item.frontmatter.image as string | undefined;
  const tags = item.frontmatter.tags as string[] | undefined;
  const published = item.frontmatter.published;
  const isExternal = !!(item.frontmatter as Record<string, unknown>).link;

  return (
    <div className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail Header */}
      <div className="relative w-full aspect-16/10 bg-muted/50 overflow-hidden border-b">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={image.startsWith("/") || image.startsWith("http") ? image : `/${image}`} 
            alt={title as string} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="flex w-full h-full items-center justify-center flex-col text-muted-foreground/30">
             <HugeiconsIcon icon={Image01Icon} className="size-8 mb-2" />
             <span className="text-xs font-medium uppercase tracking-widest text-[10px]">No Thumbnail</span>
          </div>
        )}
        
        {/* Status Badge Overlays */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant={published ? "default" : "secondary"} className="shadow-sm font-semibold tracking-wide text-[10px] h-6 px-2.5 uppercase backdrop-blur-md bg-background/80 text-foreground border-transparent">
            {published ? "Publié" : "Brouillon"}
          </Badge>
        </div>

        {/* Hover Edit Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <Link href={`/${lang}/admin/${contentType}/${item.slug}`}>
             <Button size="icon" className="rounded-full size-12 shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary-foreground/20 transform hover:scale-105 transition-transform">
                <HugeiconsIcon icon={Edit01Icon} className="size-5" />
             </Button>
          </Link>
          {isExternal && (
            <Link href={((item.frontmatter as Record<string, unknown>).link as string) || "#"} target="_blank">
              <Button size="icon" variant="secondary" className="rounded-full size-12 shadow-2xl bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-transform">
                  <HugeiconsIcon icon={EyeIcon} className="size-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Body details */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-lg leading-tight tracking-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          <Link href={`/${lang}/admin/${contentType}/${item.slug}`} className="outline-none focus-visible:underline">
            {title}
          </Link>
        </h3>
        
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <HugeiconsIcon icon={Calendar03Icon} className="size-3.5 mr-1.5" />
          <span>{item.frontmatter.date || new Date(item.lastModified).toLocaleDateString('fr-FR')}</span>
        </div>

        {/* Tags */}
        <div className="mt-auto pt-4 flex flex-wrap gap-1.5 border-t border-muted/50">
          {tags?.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-[10px] bg-muted/30 text-muted-foreground border-border/50 font-medium px-1.5 py-0">
              {tag}
            </Badge>
          ))}
          {tags && tags.length > 3 && (
            <Badge variant="outline" className="text-[10px] bg-muted/30 text-muted-foreground border-border/50 font-medium px-1.5 py-0">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
