"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/gallery-data";
import { cn } from "@/lib/utils";
import { Maximize2, X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-border/80",
              image.className
            )}
            onClick={() => setSelectedImage(image.src)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
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
              className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            >
              <Image
                src={selectedImage}
                alt="Full preview"
                width={1000}
                height={1000}
                unoptimized
                className="rounded-xl object-contain shadow-2xl"
                priority
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute -top-10 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
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
