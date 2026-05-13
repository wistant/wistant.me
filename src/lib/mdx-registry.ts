import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// --- SCHEMAS ---

const BlogDataSchema = z.object({
  title: z.string(),
  date: z.string(),
  image: z.string().optional(),
  slug: z.string(),
  description: z.string().optional(),
});

const CertDataSchema = z.object({
  title: z.string(),
  date: z.string(),
  image: z.string().optional(),
  issuer: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  href: z.string().optional(),
});

const ProjectDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  dates: z.string(),
  active: z.boolean().default(true),
  order: z.number().default(99),
  status: z.string().optional(),
  category: z.string(),
  image: z.string(),
  video: z.string().optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  slug: z.string(),
  links: z.array(z.object({
    type: z.string(),
    href: z.string(),
  })).default([]),
  images: z.array(z.string()).default([]),
});

export type BlogPost = z.infer<typeof BlogDataSchema>;
export type CertPost = z.infer<typeof CertDataSchema>;
export type ProjectEntry = z.infer<typeof ProjectDataSchema>;

/**
 * Extracts a JavaScript object block from MDX content using a variable name.
 */
function extractDataBlock(content: string, variableName: string): unknown {
  const startMarker = `export const ${variableName} = {`;
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return null;

  let braceCount = 1;
  let currentIndex = startIndex + startMarker.length;
  
  while (braceCount > 0 && currentIndex < content.length) {
    if (content[currentIndex] === '{') braceCount++;
    else if (content[currentIndex] === '}') braceCount--;
    currentIndex++;
  }

  if (braceCount !== 0) return null;

  const block = content.substring(startIndex + startMarker.length - 1, currentIndex);
  
  try {
    return new Function(`return ${block}`)();
  } catch (e) {
    console.error(`Failed to parse ${variableName} block in MDX:`, e);
    return null;
  }
}


export function getAllBlogs(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'src/app/[lang]/(web)/blog');
  if (!fs.existsSync(blogDir)) return [];

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[')) {
      const slug = entry.name;
      const mdxPath = path.join(blogDir, slug, 'page.mdx');
      
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf8');
        const rawData = extractDataBlock(content, 'blogData');
        
        if (rawData) {
          const result = BlogDataSchema.safeParse({ ...rawData, slug });
          if (result.success) posts.push(result.data);
        }
      }
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCertifications(): CertPost[] {
  const certDir = path.join(process.cwd(), 'src/app/[lang]/(web)/certifications');
  if (!fs.existsSync(certDir)) return [];

  const entries = fs.readdirSync(certDir, { withFileTypes: true });
  const certs: CertPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[')) {
      const slug = entry.name;
      const mdxPath = path.join(certDir, slug, 'page.mdx');
      
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf8');
        const rawData = extractDataBlock(content, 'certData');
        
        if (rawData) {
          const result = CertDataSchema.safeParse({ ...rawData, slug });
          if (result.success) certs.push(result.data);
        }
      }
    }
  }

  return certs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllProjects(): ProjectEntry[] {
  const projectDir = path.join(process.cwd(), 'src/app/[lang]/(web)/projects');
  if (!fs.existsSync(projectDir)) return [];

  const entries = fs.readdirSync(projectDir, { withFileTypes: true });
  const projects: ProjectEntry[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[')) {
      const slug = entry.name;
      const mdxPath = path.join(projectDir, slug, 'page.mdx');
      
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf8');
        const rawData = extractDataBlock(content, 'projectData');
        
        if (rawData) {
          const result = ProjectDataSchema.safeParse({ ...rawData, slug });
          if (result.success) projects.push(result.data);
          else console.warn(`Validation failed for project ${slug}:`, result.error.format());
        }
      }
    }
  }

  return projects.sort((a, b) => a.order - b.order);
}

