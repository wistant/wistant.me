import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const getFontData = async () => {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      fetch(
        new URL("../../../../public/fonts/CabinetGrotesk-Medium.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL("../../../../public/fonts/ClashDisplay-Semibold.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts:", error);
    return null;
  }
};

const styles = {
  outerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  middleWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    position: "relative",
    padding: "40px",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    position: "relative",
    padding: "40px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
  },
  headerSection: {
    position: "absolute",
    top: "40px",
    left: "40px",
    display: "flex",
    alignItems: "center",
    zIndex: "2",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    position: "relative",
    zIndex: "1",
  },
  badge: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "4px 16px",
    borderRadius: "100px",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  title: {
    fontFamily: "Clash Display",
    fontSize: "64px",
    fontWeight: "600",
    lineHeight: "1.1",
    textAlign: "left",
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
    maxWidth: "900px",
  },
  description: {
    fontFamily: "Cabinet Grotesk",
    fontSize: "24px",
    fontWeight: "400",
    lineHeight: "1.5",
    textAlign: "left",
    maxWidth: "800px",
    color: "#404040",
    marginBottom: "32px",
    textWrap: "balance",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "24px",
    border: "2px solid #e5e5e5",
    objectFit: "cover",
  },
  domain: {
    fontFamily: "Cabinet Grotesk",
    fontSize: "20px",
    fontWeight: "600",
    color: "#888",
  },
} as const;

export default async function Image() {
  try {
    const fontData = await getFontData();
    const imageUrl = `${DATA.url}${DATA.avatarUrl}`;

    return new ImageResponse(
      (
        <div style={styles.outerWrapper}>
          <div style={styles.middleWrapper}>
            <div style={styles.wrapper}>
              <div style={styles.headerSection}>
                <div style={styles.badge}>Creations</div>
              </div>
              <div style={styles.mainContainer}>
                <div style={styles.title}>Projects & Experiments</div>
                <div style={styles.description}>
                  A curated collection of technical deep-dives, production apps, and creative experiments.
                </div>
                <div style={styles.footer}>
                  <img src={imageUrl} alt={DATA.name} style={styles.avatar as any} />
                  <span style={styles.domain}>wistant.dev/projects</span>
                </div>
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
      {
        status: 500,
      }
    );
  }
}
