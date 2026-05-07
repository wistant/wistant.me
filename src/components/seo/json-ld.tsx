import { DATA } from "@/data/resume";
import { siteConfig as SITE_CONFIG } from "@/config/site";

export type JsonLdType = "Person" | "ProfessionalService" | "SoftwareSourceCode" | "Article";

interface JsonLdProps {
  type: JsonLdType;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  publishDate?: string;
  authorName?: string;
}

export const JsonLd = ({
  type,
  title,
  description,
  url,
  image,
  publishDate,
  authorName,
}: JsonLdProps) => {
  const currentUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url;
  const currentImage = image || `${SITE_CONFIG.url}${DATA.avatarUrl}`;
  const currentTitle = title || SITE_CONFIG.name;
  const currentDescription = description || DATA.description;

  const baseSchema = {
    "@context": "https://schema.org",
  };

  let specificSchema = {};

  switch (type) {
    case "Person":
      specificSchema = {
        "@type": "Person",
        name: DATA.name,
        url: SITE_CONFIG.url,
        image: currentImage,
        jobTitle: "Senior Software Engineer & Distributed Systems Architect",
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
        sameAs: [
          SITE_CONFIG.links.github,
          SITE_CONFIG.links.x,
          SITE_CONFIG.links.linkedin,
        ],
      };
      break;
    case "ProfessionalService":
      specificSchema = {
        "@type": "ProfessionalService",
        name: currentTitle,
        description: currentDescription,
        image: currentImage,
        url: currentUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Douala",
          addressCountry: "CM",
        },
        priceRange: "$$$",
      };
      break;
    case "SoftwareSourceCode":
      specificSchema = {
        "@type": "SoftwareSourceCode",
        name: currentTitle,
        description: currentDescription,
        codeRepository: url, // Assuming url passed is the github link for projects
        programmingLanguage: ["TypeScript", "Next.js", "React", "Node.js"],
        author: {
          "@type": "Person",
          name: DATA.name,
        },
      };
      break;
    case "Article":
      specificSchema = {
        "@type": "Article",
        headline: currentTitle,
        description: currentDescription,
        image: currentImage,
        author: {
          "@type": "Person",
          name: authorName || DATA.name,
          url: SITE_CONFIG.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_CONFIG.url}${DATA.avatarUrl}`,
          },
        },
        datePublished: publishDate ? new Date(publishDate).toISOString() : new Date().toISOString(),
      };
      break;
  }

  const schema = { ...baseSchema, ...specificSchema };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
