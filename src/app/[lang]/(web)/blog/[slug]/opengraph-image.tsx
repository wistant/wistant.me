import { ImageResponse } from "next/og";
import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const getFontData = async () => {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(join(process.cwd(), "src/fonts/CabinetGrotesk-Medium.ttf")),
      readFile(join(process.cwd(), "src/fonts/ClashDisplay-Semibold.ttf")),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch {
    return null;
  }
};

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((p) => p.slug === params.slug);
  const fontData = await getFontData();

  const title = post?.title ?? "Blog Post";
  const summary = post?.summary ?? "";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const tags = post?.tags?.slice(0, 3) ?? [];

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
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top glow — blue */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -80,
            width: 700,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 65%)",
          }}
        />
        {/* Bottom glow — purple */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -60,
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 65%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            height: "100%",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header: site name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "Cabinet Grotesk",
                fontSize: 17,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.04em",
              }}
            >
              wistant.dev / blog
            </span>
            {tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: 12,
                }}
              >
                {tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "3px 12px",
                      borderRadius: 99,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Cabinet Grotesk",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main: title + summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontFamily: "Clash Display",
                fontSize: title.length > 50 ? 52 : 64,
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                maxWidth: 980,
              }}
            >
              {title}
            </div>
            {summary && (
              <div
                style={{
                  fontFamily: "Cabinet Grotesk",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.45,
                  maxWidth: 820,
                }}
              >
                {summary.length > 160 ? summary.slice(0, 157) + "…" : summary}
              </div>
            )}
          </div>

          {/* Footer: author + date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img
                src={`${DATA.url}${DATA.avatarUrl}`}
                alt={DATA.name}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.12)",
                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  fontFamily: "Cabinet Grotesk",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {DATA.name}
              </span>
            </div>
            {date && (
              <span
                style={{
                  fontFamily: "Cabinet Grotesk",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.02em",
                }}
              >
                {date}
              </span>
            )}
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
}
