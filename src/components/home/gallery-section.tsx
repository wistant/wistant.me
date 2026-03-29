import fs from "fs";
import path from "path";
import Gallery from "@/components/home/gallery";
import BlurFade from "@/components/ui/magicui/blur-fade";
import { ShowMore } from "@/components/ui/show-more";

export async function GallerySection({
  lang,
  seeMoreText,
  showLessText,
  aboutLinkText,
  blurFadeDelay,
}: {
  lang: string;
  seeMoreText: string;
  showLessText: string;
  aboutLinkText: string;
  blurFadeDelay: number;
}) {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let galleryImages: { src: string; alt: string; className?: string }[] = [];
  try {
    const files = fs.readdirSync(galleryDir);
    const imageFiles = files
      .filter((file) => /\.(png|jpe?g|webp|avif|gif)$/i.test(file))
      .sort((a, b) => {
        const hash = (str: string) => {
          let h = 0;
          for (let i = 0; i < str.length; i++) {
            h = Math.imul(31, h) + str.charCodeAt(i) | 0;
          }
          return h;
        };
        return hash(a) - hash(b);
      });
    galleryImages = imageFiles.map((file, index) => ({
      src: `/gallery/${file}`,
      alt: `Highlight ${index + 1}`,
    }));
  } catch (error) {
    console.error("Failed to load gallery images:", error);
  }

  return (
    <section id="gallery">
      <div className="flex flex-col gap-y-2 mb-4">
        <BlurFade delay={blurFadeDelay * 5.5}>
          <h2 className="text-xl font-bold font-clash">
            My Gallery <span className="text-muted-foreground font-medium text-base">({galleryImages.length} captures)</span>
          </h2>
        </BlurFade>
      </div>
      <ShowMore
        initialHeight={600}
        buttonTextShow={seeMoreText}
        buttonTextHide={showLessText}
        href={`/${lang}/about`}
        linkText={aboutLinkText}
      >
        <Gallery images={galleryImages} />
      </ShowMore>
    </section>
  );
}
