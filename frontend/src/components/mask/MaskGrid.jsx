import React from "react";

export default function MaskGrid({ mask }) {
  if (!mask || mask.length === 0) return null;

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Mask visualization</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: 10,
        }}
      >
        {mask.map((bit, index) => {
          const isInfo = bit === 1;

          return (
            <div
              key={index}
              style={{
                borderRadius: 12,
                padding: 10,
                textAlign: "center",
                border: "1px solid #ddd",
                background: isInfo ? "#e8f5e9" : "#e3f2fd",
              }}
            >
              <div style={{ fontSize: 12, color: "#555" }}>pos {index}</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{bit}</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>
                {isInfo ? "info" : "frozen"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}