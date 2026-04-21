import React from "react";

export default function EncoderStagesTable({ stages }) {
  if (!stages || stages.length === 0) return null;

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Encoding stages</h3>

      <div style={{ display: "grid", gap: 12 }}>
        {stages.map((stage, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e0e0e0",
              padding: 12,
              borderRadius: 12,
              background: index === 0 ? "#f3e5f5" : "#fafafa",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              {index === 0 ? "Input vector u" : `Stage ${index}`}
            </div>
            <div>[{stage.join(", ")}]</div>
          </div>
        ))}
      </div>
    </div>
  );
}