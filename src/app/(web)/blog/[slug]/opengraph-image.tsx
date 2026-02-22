import { ImageResponse } from "next/og";
import { allPosts } from "content-collections";
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
        new URL("../../../../../public/fonts/CabinetGrotesk-Medium.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL("../../../../../public/fonts/ClashDisplay-Semibold.ttf", import.meta.url)
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
    gap: "12px",
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
    padding: "4px 12px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  date: {
    fontFamily: "Cabinet Grotesk",
    fontSize: "16px",
    color: "#737373",
    fontWeight: "500",
  },
  title: {
    fontFamily: "Clash Display",
    fontSize: "56px",
    fontWeight: "600",
    lineHeight: "1.2",
    textAlign: "left",
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
    maxWidth: "1000px",
  },
  description: {
    fontFamily: "Cabinet Grotesk",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "1.5",
    textAlign: "left",
    maxWidth: "850px",
    color: "#404040",
    marginBottom: "8px",
    textWrap: "balance",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "24px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "24px",
    border: "2px solid #e5e5e5",
    objectFit: "cover",
  },
  authorName: {
    fontFamily: "Cabinet Grotesk",
    fontSize: "18px",
    fontWeight: "600",
    color: "#000",
  },
} as const;

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) return new Response("Not found", { status: 404 });

    const fontData = await getFontData();
    const imageUrl = `${DATA.url}${DATA.avatarUrl}`;

    return new ImageResponse(
      (
        <div style={styles.outerWrapper}>
          <div style={styles.middleWrapper}>
            <div style={styles.wrapper}>
              <div style={styles.headerSection}>
                <div style={styles.badge}>Article</div>
                <div style={styles.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div style={styles.mainContainer}>
                <div style={styles.title}>{post.title}</div>
                {post.summary && (
                  <div style={styles.description}>{post.summary}</div>
                )}
                <div style={styles.footer}>
                  <img src={imageUrl} alt={DATA.name} style={styles.avatar as any} />
                  <span style={styles.authorName}>{DATA.name}</span>
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
