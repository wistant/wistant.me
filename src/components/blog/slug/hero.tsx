import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  image?: string;
}

export function Hero({ title, image }: HeroProps) {
  if (!image) return null;
  return (
    <figure
      className={cn(
        "overflow-hidden -z-10",
        "absolute top-0 pointer-events-none blur-3xl sm:blur-[60px] transition duration-1000",
        "saturate-[1.5] opacity-40 dark:opacity-60",
        "[mask-image:linear-gradient(to_bottom,rgb(0,0,0)_0%,transparent_100%)]"
      )}
      style={{ height: "70vh", maxHeight: 400, width: "100%", left: 0 }}
    >
      <Image
        src={image}
        alt={`Cover image for blog post: "${title}"`}
        fill
        className="object-cover"
        priority
      />
    </figure>
  );
}
