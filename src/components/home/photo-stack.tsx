"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTOS = [
  { 
    src: "/me/me.png",  
    alt: "Wistant Photo 1", 
    baseClass: "-rotate-6 -translate-x-4 sm:-translate-x-6 mt-2",
    hoverClass: "hover:-translate-y-4 hover:-rotate-2 hover:scale-105"
  },
  { 
    src: "/me/me.webp", 
    alt: "Wistant Photo 2", 
    baseClass: "rotate-2 z-10 -mt-2", 
    hoverClass: "hover:-translate-y-6 hover:rotate-0 hover:scale-105"
  },
  { 
    src: "/me/me2.webp",
    alt: "Wistant Photo 3", 
    baseClass: "rotate-8 translate-x-4 sm:translate-x-6 mt-4",   
    hoverClass: "hover:-translate-y-4 hover:rotate-4 hover:scale-105"
  },
];

export function PhotoStack() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center py-6 select-none group perspective-1000">
      {PHOTOS.map((photo, idx) => {
        const isHovered = hovered === idx;
        const isOtherHovered = hovered !== null && !isHovered;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className={[
              "relative w-[110px] h-[140px] sm:w-[130px] sm:h-[160px] shrink-0",
              "transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "bg-white ring-1 ring-black/10 dark:ring-white/10 shadow-xl",
              "p-2 pb-6 sm:p-2 sm:pb-8 rounded-sm", // Realistic polaroid thick bottom border
              isHovered ? "z-30 shadow-2xl" : "z-0 shadow-md",
              photo.baseClass,
              photo.hoverClass,
              // Soft push back / dim effect on unhovered photos
              isOtherHovered ? "scale-95 brightness-75 blur-[1px]" : "grayscale-[0.2]",
              isHovered ? "grayscale-0" : "",
            ].join(" ")}
            style={{ transformOrigin: "bottom center" }}
          >
            <div className="relative w-full h-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-[2px] ring-1 ring-inset ring-black/5">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 110px, 130px"
                className="object-cover object-center transition-transform duration-700 hover:scale-110"
                priority={idx === 1}
              />
              {/* Subtle glass glare overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
