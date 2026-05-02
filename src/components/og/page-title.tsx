import type { PathName } from './og';

const pathTitleMap: Record<NonNullable<PathName>, string> = {
  home: 'Home',
  blog: 'Blog',
  projects: 'Projects',
  about: 'About',
  contact: 'Contact',
  certifications: 'Certifications',
  hackathons: 'Hackathons',
};

const titleFontSize = 64;

export const PageTitle = (props: {
  path?: PathName;
  title?: string | null;
}) => {
  const { path, title } = props;
  const pathTitle = path ? pathTitleMap[path] || null : null;
  return (
    <p
      style={{
        alignSelf: 'flex-start',
        fontSize: titleFontSize,
        fontWeight: 700,
        maxWidth: 900,
        margin: 0,
        color: 'white',
      }}
    >
      {title || pathTitle || 'Wistant'}
    </p>
  );
};
