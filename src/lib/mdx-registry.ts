import fs from 'fs';
import path from 'path';

export interface BlogPost {
  title: string;
  date: string;
  image?: string;
  slug: string;
}

export function getAllBlogs(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'src/app/[lang]/(web)/blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[')) {
      const slug = entry.name;
      const mdxPath = path.join(blogDir, slug, 'page.mdx');
      
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf8');
        
        // Extract raw object string
        const dataMatch = content.match(/export const blogData = {([\s\S]*?)};/);
        if (dataMatch && dataMatch[1]) {
           const block = dataMatch[1];
           const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
           const dateMatch = block.match(/date:\s*["']([^"']+)["']/);
           const imageMatch = block.match(/image:\s*["']([^"']+)["']/);

           posts.push({
             title: titleMatch ? titleMatch[1] : slug,
             date: dateMatch ? dateMatch[1] : "",
             image: imageMatch ? imageMatch[1] : "",
             slug: slug,
           });
        }
      }
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface CertPost {
  title: string;
  date: string;
  image?: string;
  issuer?: string;
  description?: string;
  slug: string;
}

export function getAllCertifications(): CertPost[] {
  const certDir = path.join(process.cwd(), 'src/app/[lang]/(web)/certifications');
  
  if (!fs.existsSync(certDir)) {
    return [];
  }

  const entries = fs.readdirSync(certDir, { withFileTypes: true });
  const certs: CertPost[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[')) {
      const slug = entry.name;
      const mdxPath = path.join(certDir, slug, 'page.mdx');
      
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf8');
        
        const dataMatch = content.match(/export const certData = {([\s\S]*?)};/);
        if (dataMatch && dataMatch[1]) {
           const block = dataMatch[1];
           const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
           const dateMatch = block.match(/date:\s*["']([^"']+)["']/);
           const imageMatch = block.match(/image:\s*["']([^"']+)["']/);
           const issuerMatch = block.match(/issuer:\s*["']([^"']+)["']/);
           const descMatch = block.match(/description:\s*["']([^"']+)["']/);

           certs.push({
             title: titleMatch ? titleMatch[1] : slug,
             date: dateMatch ? dateMatch[1] : "",
             image: imageMatch ? imageMatch[1] : "",
             issuer: issuerMatch ? issuerMatch[1] : "",
             description: descMatch ? descMatch[1] : "",
             slug: slug,
           });
        }
      }
    }
  }

  return certs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
