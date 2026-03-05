/**
 * The Pure Geometric Satori Architect Template.
 * Rules from the USER:
 * - NO text generation (Title/Description). Text is handled by meta tags.
 * - Monolithic / Black Diamond structure.
 * - The input `imageUrl` is seamlessly mapped/projected onto this structure.
 */

export const OgVisualArchitect = ({ imageUrl, type }: { imageUrl: string; type: string }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background wireframe grids simulating a 3D architectural blueprint */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
        }}
      />
      
      {/* 
        The "Monolith": A sharply bordered central projection plane
        It wraps the image tightly, adding an "architectural edge" 
      */}
      <div
        style={{
          display: "flex",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          padding: "16px",
          backgroundColor: "#0a0a0a",
          boxShadow: "0 0 100px rgba(0, 0, 0, 0.8)",
          /* Dynamic styling based on the type */
          borderRadius: type === "project" ? "0px" : "12px",
          position: "relative",
        }}
      >
        {/* The projected thumbnail image */}
        {/* Satori supports standard div backgrounds if the image is valid */}
        <div
          style={{
            display: "flex",
            width: "800px",
            height: "450px",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
            filter: "grayscale(15%) contrast(110%)", // Slight aggressive treatment
          }}
        />

        {/* Minimalist Tech-Hud Accents on the corners */}
        <div
          style={{
            position: "absolute",
            top: "-2px",
            left: "-2px",
            width: "20px",
            height: "20px",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            width: "20px",
            height: "20px",
            borderBottom: "2px solid #ffffff",
            borderRight: "2px solid #ffffff",
            display: "flex",
          }}
        />
      </div>
    </div>
  );
};
