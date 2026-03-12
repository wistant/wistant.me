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
    const mdxFiles = files.filter(f => f.endsWith(`.${lang}.mdx`));
    
    const contents = await Promise.all(mdxFiles.map(async (file) => {
      try {
        const slug = file.replace(`.${lang}.mdx`, '');
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
  const filePath = path.join(CONTENT_DIR, type, `${slug}.${lang}.mdx`);
  
  try {
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
  } catch (error) {
    return null; // File might not exist
  }
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
      // PROD: Vercel is Read-Only. Push to GitHub to trigger a new build.
      const githubToken = process.env.GITHUB_TOKEN;
      const githubRepo = process.env.GITHUB_REPO; // e.g. "charmantmood/wistant"
      
      // 1. Get file SHA if it exists (required for update)
      const fileUrl = `https://api.github.com/repos/${githubRepo}/contents/${fileRelativePath}`;
      let sha = undefined;
      
      const getRes = await fetch(fileUrl, {
        headers: { Authorization: `token ${githubToken}` }
      });
      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      }

      // 2. Put file
      const putRes = await fetch(fileUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: update ${slug}.${lang}.mdx via admin dashboard`,
          content: Buffer.from(mdxString).toString("base64"),
          sha,
        }),
      });

      if (!putRes.ok) {
        console.error("Github API Error:", await putRes.text());
        return false;
      }
      return true;

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
       const githubToken = process.env.GITHUB_TOKEN;
       const githubRepo = process.env.GITHUB_REPO;
       
       const fileUrl = `https://api.github.com/repos/${githubRepo}/contents/${fileRelativePath}`;
       const getRes = await fetch(fileUrl, {
         headers: { Authorization: `token ${githubToken}` }
       });

       if (getRes.ok) {
         const data = await getRes.json();
         const deleteRes = await fetch(fileUrl, {
           method: "DELETE",
           headers: { Authorization: `token ${githubToken}`, "Content-Type": "application/json" },
           body: JSON.stringify({
             message: `cms: delete ${slug}.${lang}.mdx via admin dashboard`,
             sha: data.sha
           })
         });
         return deleteRes.ok;
       }
       return false;
    } else {
       await fs.unlink(filePath);
       return true;
    }
  } catch (error) {
    console.error(`Error deleting ${type} content:`, error);
    return false;
  }
}
