/* eslint-disable @next/next/no-img-element */

import { PageTitle } from './page-title';
import { Name } from './name';

export type PathName =
  | 'home'
  | 'blog'
  | 'projects'
  | 'about'
  | 'contact'
  | 'certifications'
  | 'hackathons'
  | null;

const pathEmojiMap: Record<NonNullable<PathName>, string> = {
  home: '🏠',
  blog: '📄',
  projects: '💼',
  about: '😀',
  contact: '📬',
  certifications: '🎓',
  hackathons: '⚡',
};

const titleFontSize = 64;

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_ENV === 'preview'
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://wistant.me'
      : 'https://wistant.me';

const getGradientOverlay = (title?: string | null) => {
  const hasTitle = Boolean(title);
  return [
    'rgba(8, 15, 30, 1) 0%',
    `rgba(8, 15, 30, 0.5) ${hasTitle ? 60 : 50}%`,
    `rgba(8, 15, 30, ${hasTitle ? 0.05 : 0}) 100%`,
  ];
};

interface OgImageProps {
  path?: PathName;
  title?: string | null;
  hero?: string | null;
}

export const OgImage = (props: OgImageProps) => {
  const { path, title, hero } = props;
  const emoji = path ? pathEmojiMap[path] : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '56px 104px',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        fontFamily: 'ClashDisplay, sans-serif',
        color: 'white',
        textShadow: '0px 2px 4px rgba(8, 15, 30, 0.5)',
        backgroundColor: 'rgb(8, 15, 30)',
      }}
    >
      {/* Background image */}
      <img
        src={`${baseUrl}/${hero}`}
        alt={title || 'Hero image'}
        width={1200}
        height={630}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          margin: 0,
        }}
      />
      {/* Gradient overlay for readability */}
      <div
        style={{
          backgroundImage: `linear-gradient(65deg, ${getGradientOverlay(title).join(', ')})`,
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
      {/* Logo or Emoji */}
      {emoji ? (
        <span style={{ fontSize: titleFontSize }}>{emoji}</span>
      ) : (
        <div
          style={{
            width: titleFontSize * 2,
            height: titleFontSize * 2,
            borderRadius: 24,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            color: '#080f1e',
            fontSize: titleFontSize * 0.8,
          }}
        >
          W
        </div>
      )}
      <PageTitle path={path} title={title} />
      <Name path={path} />
    </div>
  );
};
