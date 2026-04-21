import React from "react";

export default function InfoBox({ children }) {
  return (
    <div
      style={{
        background: "#e8f0fb",
        border: "1px solid #bfd3f2",
        color: "#1f4f9a",
        borderRadius: 20,
        padding: "18px 22px",
        fontSize: 17,
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  );
}