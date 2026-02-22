import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              background: "#000",
              color: "white",
              borderRadius: "100px",
              fontSize: "20px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Creations
          </div>
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#000",
            }}
          >
            Projects & Showcase
          </h1>
          <p
            style={{
              fontSize: "30px",
              color: "#666",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            A collection of technical experiments, full-stack applications, and open-source contributions.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "60px",
            gap: "20px",
          }}
        >
          <span style={{ fontSize: "24px", color: "#888", fontWeight: "600" }}>wistant.dev/projects</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
