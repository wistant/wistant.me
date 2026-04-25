"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ReactionsProps {
  slug: string;
}

export function Reactions({ slug }: ReactionsProps) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetch("/api/blog/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: "view" })
    }).catch(() => {});
  }, [slug]);

  useEffect(() => {
    fetch(`/api/blog/analytics?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views);
        setLikes(data.likes);
      })
      .catch(console.error);
    
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem(`blog-liked-${slug}`);
      if (liked) {
        setTimeout(() => setHasLiked(true), 0);
      }
    }
  }, [slug]);

  const handleLike = useCallback(async () => {
    if (hasLiked) return;
    
    setLikes((prev) => (prev || 0) + 1);
    setHasLiked(true);
    localStorage.setItem(`blog-liked-${slug}`, "true");

    try {
      await fetch("/api/blog/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action: "like" })
      });
    } catch (error) {
      console.error(error);
      setLikes((prev) => Math.max(0, (prev || 1) - 1));
      setHasLiked(false);
      localStorage.removeItem(`blog-liked-${slug}`);
    }
  }, [hasLiked, slug]);

  return (
    <div className="flex items-center gap-6 text-sm font-mono text-neutral-500">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>{typeof views === "number" ? views.toLocaleString() : "..."} views</span>
      </div>

      <button 
        onClick={handleLike}
        disabled={hasLiked}
        aria-label="Like post"
        className={cn(
          "flex items-center gap-2 transition-colors",
          hasLiked 
            ? "text-red-500" 
            : "hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={hasLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform active:scale-95", hasLiked && "scale-110")}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>{typeof likes === "number" ? likes.toLocaleString() : "..."}</span>
      </button>
    </div>
  );
}
