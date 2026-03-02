"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  const images = [
    "/gallery/IMG-20250705-WA0048.jpg",
    "/gallery/IMG-20250705-WA0088.jpg",
    "/gallery/IMG-20250705-WA0126.jpg",
    "/gallery/IMG-20251129-WA0164.jpg",
    "/gallery/IMG-20251129-WA0165.jpg",
    "/gallery/IMG_3016.JPG",
    "/gallery/IMG_3052.JPG",
    "/gallery/IMG_3058.JPG",
    "/gallery/photo_2025-05-11_00-40-57.jpg",
    "/gallery/photo_2025-05-11_00-42-46.jpg",
    "/gallery/photo_2025-05-11_00-45-56.jpg",
  ];

  return (
    <div className="py-10 lg:py-20 w-full overflow-hidden">
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main large card */}
        <FeatureCard className="col-span-1 md:col-span-2 lg:col-span-2 bg-muted/30">
          <FeatureTitle>Moments & Memories</FeatureTitle>
          <FeatureDescription>
            A glimpse into my journey, hackathons, and the people who make it all worthwhile.
          </FeatureDescription>
          <div className="relative h-60 md:h-80 w-full mt-8 overflow-hidden rounded-xl border border-border/50">
             <Image
                src={images[5]}
                alt="Highlight"
                fill
                className="object-cover"
              />
          </div>
        </FeatureCard>

        {/* Stacked images card */}
        <FeatureCard className="col-span-1 bg-muted/20">
          <FeatureTitle>On the Road</FeatureTitle>
          <FeatureDescription>Capturing bits of life between commits.</FeatureDescription>
          <SkeletonTwo images={images.slice(0, 5)} />
        </FeatureCard>

         {/* Grid card */}
         <FeatureCard className="col-span-1 lg:col-span-3 bg-muted/10 border-none px-0">
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
             {images.slice(6).map((img, idx) => (
               <motion.div
                 key={idx}
                 whileHover={{ scale: 1.05, zIndex: 10 }}
                 className="relative aspect-square rounded-lg overflow-hidden border border-border/50 group"
               >
                 <Image
                   src={img}
                   alt={`Gallery item ${idx}`}
                   fill
                   className="object-cover transition-transform duration-500 group-hover:scale-110"
                 />
               </motion.div>
             ))}
           </div>
         </FeatureCard>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`relative overflow-hidden p-6 rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h3 className="text-xl font-bold font-clash tracking-tight text-foreground">
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm font-medium text-muted-foreground mt-2 max-w-xs">
      {children}
    </p>
  );
};

const SkeletonTwo = ({ images }: { images: string[] }) => {
  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  const rotations = [-10, 5, -5, 10, -2];

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-10 overflow-hidden py-12">
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-stack" + idx}
            style={{
              rotate: rotations[idx % rotations.length],
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="-mr-4 shrink-0 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl"
          >
            <Image
              src={image}
              alt="travels"
              width={120}
              height={120}
              className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-28 md:w-28"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
