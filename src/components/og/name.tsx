import type { PathName } from './og';

const defaultFontSize = 36;

export const Name = (props: { path?: PathName; fontSize?: number }) => {
  const { path, fontSize = defaultFontSize } = props;
  if (!path) return null;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize,
        marginTop: 8,
      }}
    >
      <div
        style={{
          width: fontSize,
          height: fontSize,
          borderRadius: 8,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          color: '#080f1e',
          fontSize: fontSize * 0.6,
          marginRight: 12,
        }}
      >
        W
      </div>
      <p
        style={{
          fontWeight: 700,
          color: 'transparent',
          backgroundImage: 'linear-gradient(to right, #60a5fa, #38bdf8)',
          backgroundClip: 'text',
          margin: 0,
        }}
      >
        Wistant
      </p>
    </div>
  );
};
