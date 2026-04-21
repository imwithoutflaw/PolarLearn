import React from "react";

export default function MutedText({ children }) {
  return (
    <div
      style={{
        color: "#666",
        fontSize: 15,
        lineHeight: 1.55,
      }}
    >
      {children}
    </div>
  );
}