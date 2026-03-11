import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

export type ContentType = 'projects' | 'blog';

// Strict validation for Frontmatter using Zod
export const FrontmatterSchema = z.record(z.string(), z.unknown());
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export interface CMSContent {
  slug: string;
  lang: string;
  content: string;
  frontmatter: Frontmatter;
  lastModified: number;
}

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
    }));

    // Sort by order or date if available
    return contents.sort((a, b) => {
      const aOrder = typeof a.frontmatter.order === 'number' ? a.frontmatter.order : Infinity;
      const bOrder = typeof b.frontmatter.order === 'number' ? b.frontmatter.order : Infinity;
      
      if (aOrder !== Infinity && bOrder !== Infinity) {
        return aOrder - bOrder;
      }
      return b.lastModified - a.lastModified;
    });

  } catch (error) {
    console.error(`Error listing ${type} content:`, error);
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

/**
 * Saves (creates or overrides) a markdown file physically in the workspace
 */
export async function saveContent(
  type: ContentType, 
  slug: string, 
  lang: string, 
  frontmatter: Frontmatter, 
  content: string
): Promise<boolean> {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.${lang}.mdx`);
  
  try {
    // Generate the MDX string with frontmatter
    const validFrontmatter = FrontmatterSchema.parse(frontmatter);
    const mdxString = matter.stringify(content, validFrontmatter);
    await fs.writeFile(filePath, mdxString, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error saving ${type} content:`, error);
    return false;
  }
}

/**
 * Deletes a piece of content
 */
export async function deleteContent(type: ContentType, slug: string, lang: string): Promise<boolean> {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.${lang}.mdx`);
  
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Error deleting ${type} content:`, error);
    return false;
  }
}
