import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface MediaFile {
  name: string;
  path: string;
  url: string;
  type: "file" | "directory";
  size?: number;
}

const PUBLIC_DIR = path.join(process.cwd(), "public");

// Images and media extensions supported
const ALLOWED_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".webm", ".mp4"]);

async function readDirectoryRecursive(dir: string, baseDir: string = PUBLIC_DIR): Promise<MediaFile[]> {
  let results: MediaFile[] = [];
  try {
    const list = await fs.readdir(dir, { withFileTypes: true });

    for (const dirent of list) {
      const fullPath = path.join(dir, dirent.name);
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      const url = `/${relativePath}`;

      if (dirent.isDirectory()) {
        const children = await readDirectoryRecursive(fullPath, baseDir);
        results = results.concat(children);
      } else {
        const ext = path.extname(dirent.name).toLowerCase();
        if (ALLOWED_EXTS.has(ext)) {
          const stats = await fs.stat(fullPath);
          results.push({
            name: dirent.name,
            path: relativePath,
            url,
            type: "file",
            size: stats.size,
          });
        }
      }
    }
  } catch (err) {
    console.error(`Failed to read directory: ${dir}`, err);
  }
  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetFolder = searchParams.get("folder") || "";

  // 1. PRODUCTION GITHUB API FALLBACK
  // En production, Vercel ne compile pas le `public` dynamics.
  // Une vraie app serverless utiliserait AWS S3. Pour le moment, 
  // on lit via l'API GitHub si on est en prod pour voir tout le dossier public.
  if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
    try {
      const ghPath = `public${targetFolder ? `/${targetFolder}` : ""}`;
      const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${ghPath}?ref=main`;
      
      const res = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        const files: MediaFile[] = data
          .filter((item: any) => item.type === "file" && ALLOWED_EXTS.has(path.extname(item.name).toLowerCase()))
          .map((item: any) => ({
            name: item.name,
            path: item.path.replace("public/", ""),
            url: `/${item.path.replace("public/", "")}`,
            type: "file",
            size: item.size,
          }));
        
        // Attention: l'API GitHub n'est pas récursive naturellement pour `contents`
        // Pour un picker riche en prod, on pourrait utiliser le tree API. 
        // Mais restons basique pour le moment.
        return NextResponse.json({ files });
      } else {
         console.warn("GitHub API failed for media list. Fallback to local FS.");
      }
    } catch (e) {
      console.error("GitHub API Media error", e);
    }
  }

  // 2. LOCAL DEV FILE SYSTEM (Full recursive parsing)
  try {
    const targetDir = path.join(PUBLIC_DIR, targetFolder);
    
    // Security to prevent directory traversal
    if (!targetDir.startsWith(PUBLIC_DIR)) {
      return NextResponse.json({ error: "Unauthorized path directory traversal" }, { status: 403 });
    }

    const files = await readDirectoryRecursive(targetDir);

    // Trier par dossier / puis alphabétique
    files.sort((a, b) => a.url.localeCompare(b.url));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Media API Error:", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

async function scanAndReplaceMdx(dir: string, oldStr: string, newStr: string): Promise<number> {
  let count = 0;
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        count += await scanAndReplaceMdx(fullPath, oldStr, newStr);
      } else if (file.name.endsWith(".mdx")) {
        let content = await fs.readFile(fullPath, "utf-8");
        // Look for the exact path inside quotes or parentheses (frontmatter or markdown image links)
        if (content.includes(oldStr)) {
          // Global replacement
          const escapedOldStr = oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          content = content.replace(new RegExp(escapedOldStr, 'g'), newStr);
          await fs.writeFile(fullPath, content, "utf-8");
          count++;
          
          // Optional: If in Prod, push the updated markdown to GitHub.
          // (Requires batching or executing sequential commits)
          if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
            const { pushToGithub } = await import("@/lib/admin/server/cms/engine");
            const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, "/");
            await pushToGithub(
              process.env.GITHUB_TOKEN, 
              process.env.GITHUB_REPO, 
              relPath, 
              `refactor(media): auto-update renamed asset ${oldStr}`,
              Buffer.from(content, "utf-8")
            );
          }
        }
      }
    }
  } catch (e) {
    console.error(`Failed to scan directory: ${dir}`, e);
  }
  return count;
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { oldUrl, newFilename } = body;

    // oldUrl is e.g. "/portfolio/lamp.webp" -> oldPath = "public/portfolio/lamp.webp"
    if (!oldUrl || !newFilename) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const currentRelativePath = oldUrl.replace(/^\//, "public/");
    const oldAbsolutePath = path.join(process.cwd(), currentRelativePath);
    
    // Create new relative path and URL
    const dirRelative = path.dirname(currentRelativePath);
    const newRelativePath = path.join(dirRelative, newFilename).replace(/\\/g, "/");
    const newAbsolutePath = path.join(process.cwd(), newRelativePath);
    const newUrl = "/" + newRelativePath.replace(/^public\//, "");

    try {
      if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
        // GitHub API Rename logic (We must Get old file SHA, Push new file, Delete old file)
        // For a full robust app, we'd do a Tree API commit. 
        // Here, we'll try to do the safe double-step.
        const { pushToGithub } = await import("@/lib/admin/server/cms/engine");
        
        // 1. Fetch old file buffer from GitHub
        const ghUrl = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${currentRelativePath}?ref=main`;
        const ghRes = await fetch(ghUrl, { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" } });
        
        if (ghRes.ok) {
           const ghData = await ghRes.json();
           const fileBuffer = Buffer.from(ghData.content, "base64");
           
           // 2. Push to new path
           await pushToGithub(process.env.GITHUB_TOKEN, process.env.GITHUB_REPO, newRelativePath, `feat(media): rename to ${newFilename}`, fileBuffer);
           
           // 3. Delete old path
           await fetch(ghUrl, {
             method: "DELETE",
             headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
             body: JSON.stringify({ message: `feat(media): delete old ${oldUrl}`, sha: ghData.sha, branch: "main" })
           });
        }
      } else {
        // Local rename
        await fs.stat(oldAbsolutePath);
        await fs.rename(oldAbsolutePath, newAbsolutePath);
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "File not found or rename failed" }, { status: 404 });
    }

    // Auto-Refactor Phase: Scan and Replace
    const contentDir = path.join(process.cwd(), "src/content");
    const updatedMdxCount = await scanAndReplaceMdx(contentDir, oldUrl, newUrl);

    return NextResponse.json({ 
      success: true, 
      url: newUrl,
      updatedFiles: updatedMdxCount,
      message: `Renamed to ${newFilename} and updated ${updatedMdxCount} files.`
    });

  } catch (error) {
    console.error("PUT Asset API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
