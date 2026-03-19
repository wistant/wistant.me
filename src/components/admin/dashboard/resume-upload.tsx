"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { File02Icon } from "@hugeicons/core-free-icons";
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";

export function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setSuccess(false);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subfolder", ""); // Root public folder (for cv.pdf for example)

    try {
      const res = await fetch("/api/admin/assets", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const error = await res.json();
        alert("Upload failed: " + error.error);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setUploading(false);
      if (e.target) e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={File02Icon} className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Curriculum Vitae (CV)</h2>
        </div>
        {success && <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="size-4" /> Mis à jour</span>}
      </div>
      
      <p className="text-sm text-muted-foreground">
        Uploadez votre CV au format PDF. Remplacera le CV existant dans la base si le nom est le même (ex: cv.pdf).
      </p>

      <div className="relative overflow-hidden mt-2">
        <button 
          disabled={uploading} 
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/20 px-4 py-8 text-sm font-semibold transition-colors hover:bg-muted/50 hover:border-primary/50"
        >
          {uploading ? (
             <><Loader2 className="size-5 animate-spin text-muted-foreground" /> Upload en cours...</>
          ) : (
             <><UploadCloud className="size-5 text-primary" /> Glisser ou Sélectionner le PDF</>
          )}
        </button>
        <input 
          type="file" 
          accept="application/pdf"
          onChange={handleUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
