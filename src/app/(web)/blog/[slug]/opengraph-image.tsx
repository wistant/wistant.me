import { ImageResponse } from "next/og";
import { allPosts } from "content-collections";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#666",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            <span>Article</span>
            <div
              style={{ width: "4px", height: "4px", borderRadius: "2px", background: "#666" }}
            />
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
          </div>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#000",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: "28px",
              lineHeight: 1.5,
              color: "#444",
              marginTop: "20px",
              maxWidth: "900px",
            }}
          >
            {post.summary}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            borderTop: "2px solid #eee",
            paddingTop: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "30px",
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              DV
            </div>
            <span style={{ fontSize: "28px", fontWeight: "600" }}>Dillion Verma</span>
          </div>
          <span style={{ fontSize: "24px", color: "#888" }}>wistant.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
