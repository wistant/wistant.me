import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const runtime = "edge";

export const alt = DATA.name;
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
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "black",
            padding: "40px 80px",
            borderRadius: "24px",
            color: "white",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              letterSpacing: "-0.05em",
              margin: 0,
            }}
          >
            {DATA.name.split(" ")[0]}
          </h1>
          <p
            style={{
              fontSize: "30px",
              marginTop: "10px",
              opacity: 0.7,
              margin: 0,
            }}
          >
            {DATA.description}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
