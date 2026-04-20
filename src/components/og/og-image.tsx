import { DATA } from "@/data/resume";
import { OgImageParams } from "@/lib/og/schema";

export function OgImage({ title, description, type, label }: OgImageParams) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#0d0d0d", // Deep sober black
        padding: "80px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Gradient Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "150%",
          height: "150%",
          backgroundImage: "radial-gradient(circle at center, #1a1a1a 0%, transparent 70%)",
          opacity: 0.8,
        }}
      />
      
      {/* Top Accent Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative", zIndex: 10 }}>
        {/* Label Badge */}
        {(label || type) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#a3a3a3",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              width: "fit-content",
            }}
          >
            {label || type}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "white",
            margin: 0,
            letterSpacing: "-0.04em",
            maxWidth: "900px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#a3a3a3",
              margin: 0,
              maxWidth: "800px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Footer Branding */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          zIndex: 10,
        }}
      >
        <div 
          style={{ 
            width: "48px", 
            height: "48px", 
            borderRadius: "50%", 
            backgroundColor: "white", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontWeight: 900,
            color: "black",
            fontSize: "24px"
          }}
        >
          W
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>{DATA.name}</span>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>wistant.me</span>
        </div>
      </div>
    </div>
  );
}
