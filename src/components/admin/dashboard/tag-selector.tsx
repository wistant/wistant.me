"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Badge } from "@/components/admin/ui/badge";
import { X } from "lucide-react";

interface TagSelectorProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const COMMON_TAGS = [
  "React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "NestJS", 
  "PostgreSQL", "Prisma", "Redis", "Framer Motion", "UI/UX", "Open-Source",
  "Design System", "Architecture", "Cybersecurity", "Zero-Trust", "Docker"
];

export function TagSelector({ tags = [], onChange }: TagSelectorProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const cleanTag = tag.trim().replace(/^,+|,+$/g, "");
    if (cleanTag && !tags.includes(cleanTag)) {
      onChange([...tags, cleanTag]);
    }
    setInput("");
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const filteredSuggestions = COMMON_TAGS.filter(
    t => t.toLowerCase().includes(input.toLowerCase()) && !tags.includes(t)
  ).slice(0, 6); // Limit to 6 suggestions visible

  return (
    <div className="space-y-3">
      <div 
        className={`flex flex-wrap items-center gap-2 p-2 rounded-md border bg-background transition-colors ${
          isFocused ? "border-primary ring-1 ring-primary focus-within:ring-1" : "border-input"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1 px-2 py-0.5 text-sm font-medium">
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
              className="rounded-full hover:bg-muted p-0.5"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={tags.length === 0 ? "Ex: React, Architecture..." : "Ajouter un tag..."}
          className="flex-1 min-w-[120px] bg-transparent outline-none border-none text-sm placeholder:text-muted-foreground h-7 px-1"
        />
      </div>

      {isFocused && filteredSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
          {filteredSuggestions.map((suggestion) => (
            <Badge 
              key={suggestion} 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => addTag(suggestion)}
            >
              + {suggestion}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
