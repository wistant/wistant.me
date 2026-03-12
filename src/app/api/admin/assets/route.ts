
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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
    // portfolio/ is used for projects in public/ based on ls -F
    const subfolder = type === "projects" ? "portfolio" : type;
    const relativePath = `public/${subfolder}/${filename}`;
    const absolutePath = path.join(process.cwd(), relativePath);

    if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      // PROD: Use GitHub API
      const githubToken = process.env.GITHUB_TOKEN;
      const githubRepo = process.env.GITHUB_REPO;
      const url = `https://api.github.com/repos/${githubRepo}/contents/${relativePath}`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `assets: upload ${filename} via admin dashboard`,
          content: buffer.toString("base64"),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Github Asset Upload Error:", errText);
        return NextResponse.json({ error: "Failed to upload to production" }, { status: 500 });
      }

      const data = await res.json();
      return NextResponse.json({ 
        url: `/${subfolder}/${filename}`,
        githubUrl: data.content.download_url,
        success: true 
      });

    } else {
      // LOCAL: Direct File System
      // Ensure directory exists
      const dir = path.dirname(absolutePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(absolutePath, buffer);

      return NextResponse.json({ 
        url: `/${subfolder}/${filename}`,
        success: true 
      });
    }

  } catch (error) {
    console.error("Asset API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
