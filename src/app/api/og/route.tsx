import { ImageResponse } from 'next/og';
import { getContent } from "@/lib/admin/server/cms/engine";

export const runtime = "nodejs"; // On passe en Node.js pour pouvoir lire le filesystem (Settings)

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const type = searchParams.get("type") || "home";
    const imgParam = searchParams.get("img");

    // 1. Get site settings for fallback OG images
    const siteSettings = await getContent("settings", "site", "en");
    const ogDefaults: Record<string, string> = {
      home: siteSettings?.frontmatter?.ogHome || "/opengraph/me.png",
      blog: siteSettings?.frontmatter?.ogBlog || "/opengraph/blog.png",
      project: siteSettings?.frontmatter?.ogProject || "/opengraph/projects.png",
    };

    // 2. Resolve final image URL
    let imageUrl = imgParam || ogDefaults[type] || ogDefaults.home;
    
    // Ensure absolute URL for the image
    if (imageUrl.startsWith("/")) {
       imageUrl = `${origin}${imageUrl}`;
    }

    // 3. Render OG Image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Optionnel: Overlay branding si l'image n'est pas une "landing" complète */}
          {!imageUrl.includes('landing') && (
            <div style={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '10px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
               <img 
                 src={`${origin}/logo-wistant.png`} 
                 alt="Logo"
                 style={{ width: 30, height: 30, marginRight: 15 }} 
               />
               <span style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                 {siteSettings?.frontmatter?.title || "Wistant Kode"}
               </span>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("OG Generation Error:", e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
