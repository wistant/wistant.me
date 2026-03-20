
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

import { pushToGithub } from "@/lib/admin/server/cms/engine";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string || "gallery";
    const customFilename = formData.get("filename") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name);
    const filename = customFilename ? `${customFilename}${extension}` : `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    
    // Determine target subfolder in public/
    const subfolder = type === "projects" ? "portfolio" : type;
    const relativePath = `public/${subfolder}/${filename}`;
    const absolutePath = path.join(process.cwd(), relativePath);

    if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      // PROD: Use GitHub API for Double-Push (main and dev)
      const success = await pushToGithub(
        process.env.GITHUB_TOKEN,
        process.env.GITHUB_REPO,
        relativePath,
        `feat(media): upload ${filename} via dashboard`,
        buffer
      );
      
      if (!success) {
        return NextResponse.json({ error: "Failed to upload to production" }, { status: 500 });
      }

      return NextResponse.json({ 
        url: `/${subfolder}/${filename}`,
        githubUrl: `https://raw.githubusercontent.com/${process.env.GITHUB_REPO}/main/${relativePath}`,
        success: true 
      });
    }

    // LOCAL: Direct File System
    // Ensure directory exists
    const dir = path.dirname(absolutePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(absolutePath, buffer);

    return NextResponse.json({ 
      url: `/${subfolder}/${filename}`,
      success: true 
    });

  } catch (error) {
    console.error("Asset API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
