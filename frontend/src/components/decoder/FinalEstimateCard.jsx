import React from "react";

export default function FinalEstimateCard({ estimatedBits }) {
  if (!estimatedBits) return null;

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 18,
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>Estimated information bits</h3>

      <div
        style={{
          display: "inline-block",
          padding: "10px 14px",
          borderRadius: 12,
          background: "#f5f5f5",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        [{estimatedBits.join(", ")}]
      </div>
    </div>
  );
}