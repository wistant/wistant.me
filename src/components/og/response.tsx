import { SITE_CONFIG } from '@/config/metadata';
import type { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori';
import { ImageResponse } from 'next/og';
import { OgImage } from './og-image';

const getFonts = async (): Promise<SatoriOptions['fonts'] | undefined> => {
  try {
    const [clashData] = await Promise.all([
      fetch(new URL('../../assets/fonts/ClashDisplay-Semibold.ttf', import.meta.url)).then(res => res.arrayBuffer())
    ]);

    return [
      {
        name: 'ClashDisplay',
        data: clashData,
        style: 'normal',
        weight: 700,
      }
    ];
  } catch (e) {
    console.error("Failed to load fonts for OG:", e);
    return undefined;
  }
};

export const getOgImage = async (
  options: {
    title: string;
    description?: string;
    type?: "home" | "blog" | "projects" | "about" | "contact";
    label?: string;
    lang?: string;
  }
) => {
  const { title, description, type = "home", label, lang = 'en' } = options;

  try {
    const fonts = await getFonts();
    
    return new ImageResponse(
      <OgImage 
        title={title} 
        description={description} 
        type={type as "home" | "blog" | "projects" | "about" | "contact"} 
        label={label} 
        lang={lang as "en" | "fr"} 
      />,
      {
        width: 1200,
        height: 630,
        fonts: fonts,
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    // Fallback to basic text response if ImageResponse fails
    return new Response(`Error generating image: ${error}`, { status: 500 });
  }
};
