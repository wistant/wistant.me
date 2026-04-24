import type { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori';
import { ImageResponse } from 'next/og';

import { config } from '@/utils/og';

import type { PathName } from './og';
import { OgImage } from './og';

const getClashFont = async (): Promise<SatoriOptions['fonts'] | undefined> => {
  const url = new URL('../../assets/fonts/ClashDisplay-Semibold.ttf', import.meta.url);
  try {
    const fontData = await fetch(url).then((res) => res.arrayBuffer());
    return [
      {
        name: 'ClashDisplay',
        data: fontData,
        style: 'normal',
        weight: 700,
      },
    ];
  } catch {
    return undefined;
  }
};

export const getOgImage = async (
  path?: PathName,
  title?: string | null,
  hero?: string | null,
) => {
  const actualPath = (path || null) as PathName;
  let actualHero = hero || 'me/me.webp';
  if (actualHero.startsWith('/')) actualHero = actualHero.substring(1);

  return new ImageResponse(
    <OgImage path={actualPath} title={title} hero={actualHero} />,
    {
      width: config.size.width,
      height: config.size.height,
      fonts: await getClashFont(),
    },
  );
};
