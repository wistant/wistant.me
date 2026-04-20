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
        backgroundColor: "#080f1e", // jahir's deep blue/black
        padding: "80px",
        fontFamily: "ClashDisplay, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Premium Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "140%",
          height: "140%",
          backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          opacity: 0.8,
        }}
      />
      
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative", zIndex: 10 }}>
        {/* Superior Label Badge */}
        {(label || type) && (
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#60a5fa",
              fontSize: "18px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              width: "fit-content",
              display: "flex"
            }}
          >
            {label || type}
          </div>
        )}

        {/* Supreme Title */}
        <h1
          style={{
            fontSize: "84px",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "white",
            margin: 0,
            letterSpacing: "-0.04em",
            maxWidth: "960px",
            display: "flex",
            flexWrap: "wrap",
            textShadow: "0 4px 12px rgba(0,0,0,0.5)"
          }}
        >
          {title}
        </h1>

        {/* Narrative Description */}
        {description && (
          <p
            style={{
              fontSize: "32px",
              lineHeight: 1.4,
              color: "rgba(255, 255, 255, 0.5)",
              margin: "12px 0 0 0",
              maxWidth: "840px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Signature Branding */}
      <div
        style={{
          position: "absolute",
          bottom: "70px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          zIndex: 10,
        }}
      >
        <div 
          style={{ 
            width: "56px", 
            height: "56px", 
            borderRadius: "16px", 
            backgroundColor: "white", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontWeight: 800,
            color: "#080f1e",
            fontSize: "28px"
          }}
        >
          W
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "white" }}>{DATA.name}</span>
          <span style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.3)", letterSpacing: "0.1em" }}>WISTANT.ME</span>
        </div>
      </div>
    </div>
  );
}
