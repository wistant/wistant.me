import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';


import { FrontmatterSchema, Frontmatter, CMSContent, ContentType } from "../../schemas";

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Retrieves all content of a specific type and language
 */
export async function listContent(type: ContentType, lang: string = 'en'): Promise<CMSContent[]> {
  const dirPath = path.join(CONTENT_DIR, type);
  
  try {
    const files = await fs.readdir(dirPath);
    
    // Fallback Logic: Base en English, Override by requested lang
    const slugMap = new Map<string, string>();
    files.forEach(f => {
      if (f.endsWith('.en.mdx')) {
         slugMap.set(f.replace('.en.mdx', ''), f);
      }
    });
    if (lang !== 'en') {
      files.forEach(f => {
        if (f.endsWith(`.${lang}.mdx`)) {
           slugMap.set(f.replace(`.${lang}.mdx`, ''), f);
        }
      });
    }
    
    const mdxEntries = Array.from(slugMap.entries());
    
    const contents = await Promise.all(mdxEntries.map(async ([slug, file]) => {
      try {
        const filePath = path.join(dirPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const stats = await fs.stat(filePath);
        
        const parsed = matter(fileContent);
        
        return {
          slug,
          lang,
          content: parsed.content,
          frontmatter: parsed.data,
          lastModified: stats.mtimeMs
        };
      } catch (err) {
        console.error(`Error parsing MDX file ${file}:`, err);
        return null;
      }
    }));

    // Filter out nulls from failed parses
    const validContents = contents.filter((c): c is CMSContent => c !== null);

    // Sort by order or date if available
    return validContents.sort((a, b) => {
      const aOrder = typeof a.frontmatter.order === 'number' ? a.frontmatter.order : Infinity;
      const bOrder = typeof b.frontmatter.order === 'number' ? b.frontmatter.order : Infinity;
      
      if (aOrder !== Infinity && bOrder !== Infinity) {
        return aOrder - bOrder;
      }
      return b.lastModified - a.lastModified;
    });

  } catch (error) {
    console.error(`Error listing ${type} content in ${dirPath}:`, error);
    return [];
  }
}

/**
 * Retrieves a single file's content
 */
export async function getContent(type: ContentType, slug: string, lang: string = 'en'): Promise<CMSContent | null> {
  let filePath = path.join(CONTENT_DIR, type, `${slug}.${lang}.mdx`);
  let isFallback = false;
  
  try {
    let fileContent: string;
    let stats;
    try {
      fileContent = await fs.readFile(filePath, 'utf-8');
      stats = await fs.stat(filePath);
    } catch {
      if (lang !== 'en') {
        filePath = path.join(CONTENT_DIR, type, `${slug}.en.mdx`);
        fileContent = await fs.readFile(filePath, 'utf-8');
        stats = await fs.stat(filePath);
        isFallback = true;
      } else {
        throw new Error("File not found");
      }
    }
    const parsed = matter(fileContent);
    
    return {
      slug,
      lang: isFallback ? 'en' : lang,
      content: parsed.content,
      frontmatter: parsed.data,
      lastModified: stats.mtimeMs
    };
  } catch {
    return null; // File might not exist
  }
}

export async function pushToGithub(githubToken: string, githubRepo: string, path: string, message: string, content: string | Buffer | null = null, isDelete = false): Promise<boolean> {
  const branches = ["main", "dev"];
  let success = true;

  const base64Content = content ? (Buffer.isBuffer(content) ? content.toString("base64") : Buffer.from(content).toString("base64")) : undefined;

  for (const branch of branches) {
    // 1. Get file SHA if it exists on this specific branch (required for update/delete)
    const fileUrl = `https://api.github.com/repos/${githubRepo}/contents/${path}?ref=${branch}`;
    let sha = undefined;
    
    const getRes = await fetch(fileUrl, {
      headers: { Authorization: `token ${githubToken}` }
    });
    
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (isDelete) {
      continue; // File doesn't exist on this branch, nothing to delete
    }

    // 2. Put or Delete file on this branch
    const actionUrl = `https://api.github.com/repos/${githubRepo}/contents/${path}`;
    const actionRes = await fetch(actionUrl, {
      method: isDelete ? "DELETE" : "PUT",
      headers: {
        Authorization: `token ${githubToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: isDelete ? undefined : base64Content,
        sha,
        branch, // Specify branch explicitly
      }),
    });

    if (!actionRes.ok) {
      console.error(`Github API Error on branch ${branch}:`, await actionRes.text());
      success = false;
    }
  }
  return success;
}

export async function saveContent(
  type: ContentType, 
  slug: string, 
  lang: string, 
  frontmatter: Frontmatter, 
  content: string
): Promise<boolean> {
  const fileRelativePath = `src/content/${type}/${slug}.${lang}.mdx`;
  const filePath = path.join(process.cwd(), fileRelativePath);
  
  try {
    // Generate the MDX string with frontmatter
    const validFrontmatter = FrontmatterSchema.parse(frontmatter);
    const mdxString = matter.stringify(content, validFrontmatter);

    if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      return await pushToGithub(
        process.env.GITHUB_TOKEN,
        process.env.GITHUB_REPO,
        fileRelativePath,
        `feat(content): publish ${type} ${slug} in ${lang}`,
        mdxString,
        false
      );
    } else {
      // LOCAL: Dev environment, write directly to file system.
      await fs.writeFile(filePath, mdxString, 'utf-8');
      return true;
    }
  } catch (error) {
    console.error(`Error saving ${type} content:`, error);
    return false;
  }
}

export async function deleteContent(type: ContentType, slug: string, lang: string): Promise<boolean> {
  const fileRelativePath = `src/content/${type}/${slug}.${lang}.mdx`;
  const filePath = path.join(process.cwd(), fileRelativePath);
  
  try {
    if (process.env.NODE_ENV === "production" && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
       return await pushToGithub(
         process.env.GITHUB_TOKEN,
         process.env.GITHUB_REPO,
         fileRelativePath,
         `chore(content): delete ${type} ${slug} in ${lang}`,
         null,
         true
       );
    } else {
       await fs.unlink(filePath);
       return true;
    }
  } catch (error) {
    console.error(`Error deleting ${type} content:`, error);
    return false;
  }
}
