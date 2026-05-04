import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function MaskGrid({ result }) {
  if (!result) return null;

  const mask = result.mask || [];

  return (
    <div style={{ minWidth: 0, maxWidth: "100%" }}>
      <SectionTitle>Vizualizácia masky</SectionTitle>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          background: "#fff",
          padding: 10,
          overflowX: "auto",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${mask.length}, minmax(72px, 1fr))`,
            minWidth: Math.max(720, mask.length * 78),
          }}
        >
          {mask.map((value, index) => {
            const isInfo = value === 1;

            return (
              <div key={index}>
                <div
                  style={{
                    height: 140,
                    background: isInfo ? "#3BB143" : "#1569C7",
                    borderRight: "1px solid rgba(255,255,255,0.15)",
                    borderBottom: "1px solid #d1d5db",
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: 10,
                    paddingBottom: 8,
                    color: "#374151",
                    fontSize: 15,
                  }}
                >
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          color: "#64748b",
          fontSize: 17,
          lineHeight: 1.7,
          overflowWrap: "anywhere",
        }}
      >
        Hodnota 1 predstavuje informačný bit, hodnota 0 predstavuje frozen bit.
      </div>
    </div>
  );
}