import type { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori';
import { ImageResponse } from 'next/og';
import { OgImage } from './og-image';

const getFont = async (): Promise<SatoriOptions['fonts'] | undefined> => {
  // Use a reliable font URL or local path. For Edge, local relative paths are better.
  const url = new URL('../../../public/fonts/ClashDisplay-Semibold.ttf', import.meta.url);
  try {
    const fontData = await fetch(url).then((res) => res.arrayBuffer());
    return [
      {
        name: 'ClashDisplay',
        data: fontData,
        style: 'normal',
      },
    ];
  } catch (e) {
    console.error("Failed to load font for OG:", e);
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
      fonts: await getFont(),
    },
  );
};
