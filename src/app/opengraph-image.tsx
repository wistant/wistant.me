import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const runtime = "edge";

export const alt = DATA.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const getFontData = async () => {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      fetch(
        new URL("../../public/fonts/CabinetGrotesk-Medium.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL("../../public/fonts/ClashDisplay-Semibold.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts:", error);
    return null;
  }
};

export default async function Image() {
  try {
    const fontData = await getFontData();
    const imageUrl = `${DATA.url}${DATA.avatarUrl}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#09090b",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid background pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Glow top-left */}
          <div
            style={{
              position: "absolute",
              top: -120,
              left: -80,
              width: 600,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
            }}
          />
          {/* Glow bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: -100,
              right: -60,
              width: 500,
              height: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "60px 64px",
              height: "100%",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Avatar + domain row (top) */}
            <div
              style={{
                position: "absolute",
                top: 52,
                left: 64,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <img
                src={imageUrl}
                alt={DATA.name}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.15)",
                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  fontFamily: "Cabinet Grotesk",
                  fontSize: 18,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.02em",
                }}
              >
                wistant.dev
              </span>
            </div>

            {/* Main title */}
            <div
              style={{
                fontFamily: "Clash Display",
                fontSize: 76,
                fontWeight: 600,
                lineHeight: 1.05,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                marginBottom: 20,
                maxWidth: 900,
              }}
            >
              {DATA.name}
            </div>

            {/* Description */}
            <div
              style={{
                fontFamily: "Cabinet Grotesk",
                fontSize: 22,
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.4,
                maxWidth: 720,
                marginBottom: 40,
              }}
            >
              {DATA.description}
            </div>

            {/* Bottom tag pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 16px",
                  borderRadius: 99,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cabinet Grotesk",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Next.js · TypeScript · React
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: fontData
          ? [
              {
                name: "Cabinet Grotesk",
                data: fontData.cabinetGrotesk,
                weight: 400,
                style: "normal",
              },
              {
                name: "Clash Display",
                data: fontData.clashDisplay,
                weight: 600,
                style: "normal",
              },
            ]
          : undefined,
      }
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    );
  }
}
