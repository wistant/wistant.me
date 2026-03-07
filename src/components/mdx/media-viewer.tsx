"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

interface MediaViewerProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  className?: string;
  width?: number;
  height?: number;
}

export function MediaViewer({
  src,
  alt = "",
  type = "image",
  className,
  width,
  height,
}: MediaViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mediaProps = {
    src,
    alt,
    className: cn(
      "w-full h-full object-contain rounded-2xl overflow-hidden",
      className
    ),
    ...(width && height ? { width, height } : {}),
  };

  if (type === "video") {
    return (
      <div className="my-6 w-full relative aspect-video overflow-hidden rounded-lg border border-border shadow-sm">
        <video {...mediaProps} controls loop className="w-full h-full object-cover">
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // IMAGE MODE (With Lightbox)
  return (
    <>
      <div className="my-8 w-full">
        <div 
          className="group relative w-full overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 border border-border bg-muted/20"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={src}
            alt={alt}
            className={cn("w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]", className)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Maximize2 className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        {alt && <p className="text-center text-sm text-muted-foreground mt-3 italic">{alt}</p>}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 p-4 md:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              className="relative flex items-center justify-center mb-12 md:mb-24 w-full h-full max-w-7xl"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={src}
                  alt={alt || "Full preview"}
                  fill
                  className="rounded-xl object-contain shadow-2xl"
                  priority
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="absolute top-0 right-0 md:top-4 md:right-4 p-3 text-muted-foreground hover:text-foreground bg-background/50 hover:bg-background/80 rounded-full transition-colors z-110 backdrop-blur-md border border-border/50 shadow-md transform hover:scale-105"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper components for easier MDX usage
export function ImageViewer(props: Omit<MediaViewerProps, "type">) {
  return <MediaViewer {...props} type="image" />;
}

export function VideoViewer(props: Omit<MediaViewerProps, "type">) {
  return <MediaViewer {...props} type="video" />;
}
