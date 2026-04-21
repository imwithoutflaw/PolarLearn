import React from "react";

export default function SuccessBox({ children }) {
  return (
    <div
      style={{
        background: "#e8f5ea",
        border: "1px solid #b8e0c1",
        color: "#1f7a37",
        borderRadius: 18,
        padding: "16px 20px",
        fontSize: 17,
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}