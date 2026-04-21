import React from "react";

export default function FinalEstimateCard({ estimatedBits }) {
  if (!estimatedBits) return null;

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Estimated information bits</h3>
      <div style={{ fontSize: 18 }}>[{estimatedBits.join(", ")}]</div>
    </div>
  );
}