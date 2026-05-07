"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Maximize2, X } from "lucide-react";

interface GalleryProps {
  images: Array<{
    src: string;
    alt: string;
    className?: string;
  }>;
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayImages = [...(images || [])].sort((a, b) => a.src.localeCompare(b.src));

  return (
    <div className="w-full">
      <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {displayImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "group relative overflow-hidden rounded-xl bg-muted/20 transition-all duration-500 hover:z-10 shadow-sm break-inside-avoid",
              image.className
            )}
            onClick={() => setSelectedImage(image.src)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={800}
              unoptimized
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 p-4 md:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center mb-12 md:mb-24"
            >
              <Image
                src={selectedImage}
                alt="Full preview"
                width={1200}
                height={1200}
                unoptimized
                className="rounded-xl object-contain shadow-2xl max-w-[95vw] max-h-[75vh] md:max-w-[80vw] md:max-h-[70vh] w-auto h-auto"
                priority
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="fixed top-4 right-4 md:top-8 md:right-8 p-3 text-muted-foreground hover:text-foreground bg-background/50 hover:bg-background/80 rounded-full transition-colors z-50 backdrop-blur-md border border-border/50 shadow-md"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
