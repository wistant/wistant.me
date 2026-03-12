
"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ImageAdd01Icon, Loading03Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

interface AssetUploadProps {
  type: "gallery" | "projects" | "blog";
  onSuccess?: (url: string) => void;
  variant?: "outline" | "default" | "ghost";
  className?: string;
  label?: string;
}

export function AssetUpload({ type, onSuccess, variant = "outline", className, label }: AssetUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setIsSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/admin/assets", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setIsSuccess(true);
        if (onSuccess) onSuccess(data.url);
        // Reset success state after 3s
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        const err = await res.json();
        console.error("Upload failed", err);
      }
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
      <Button
        variant={variant}
        size="sm"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="gap-2"
      >
        {isUploading ? (
          <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" />
        ) : isSuccess ? (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 text-emerald-500" />
        ) : (
          <HugeiconsIcon icon={ImageAdd01Icon} className="size-4" />
        )}
        {label || "Upload Image"}
      </Button>
    </div>
  );
}
