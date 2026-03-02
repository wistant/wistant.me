import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs"; // Switched to nodejs for fs support

export const alt = DATA.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const getFontData = async () => {
  try {
    const cabinetGrotesk = await readFile(
      join(process.cwd(), "src/fonts/CabinetGrotesk-Medium.ttf")
    );
    const clashDisplay = await readFile(
      join(process.cwd(), "src/fonts/ClashDisplay-Semibold.ttf")
    );
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts from filesystem:", error);
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
              justifyContent: "center",
              padding: "60px 80px",
              height: "100%",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Top row: Avatar + Domain */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 40,
              }}
            >
              <img
                src={imageUrl}
                alt={DATA.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.2)",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontFamily: "Clash Display",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {DATA.name}
                </span>
                <span
                  style={{
                    fontFamily: "Cabinet Grotesk",
                    fontSize: 16,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  wistant.dev
                </span>
              </div>
            </div>

            {/* Headline */}
            <div
              style={{
                fontFamily: "Clash Display",
                fontSize: 84,
                fontWeight: 600,
                lineHeight: 1,
                color: "#ffffff",
                letterSpacing: "-0.04em",
                marginBottom: 24,
                maxWidth: 900,
              }}
            >
              Engineering Premium Web Systems.
            </div>

            {/* Sub-headline / Description (shorter for impact) */}
            <div
              style={{
                fontFamily: "Cabinet Grotesk",
                fontSize: 24,
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.4,
                maxWidth: 800,
                marginBottom: 48,
              }}
            >
              Building high-performance architectures & scalable digital experiences.
            </div>

            {/* Bottom Row: Tech Stack + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                }}
              >
                {["Next.js", "TypeScript", "Architect"].map((tech) => (
                  <div
                    key={tech}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 99,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      fontFamily: "Cabinet Grotesk",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div
                style={{
                  display: "flex",
                  padding: "12px 28px",
                  borderRadius: 12,
                  background: "#ffffff",
                  fontFamily: "Clash Display",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#000000",
                  boxShadow: "0 10px 25px rgba(255,255,255,0.15)",
                }}
              >
                Hire Me / Explore
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
