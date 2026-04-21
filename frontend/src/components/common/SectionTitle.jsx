import React from "react";

export default function SectionTitle({ children }) {
  return (
    <h2
      style={{
        marginTop: 0,
        marginBottom: 18,
        fontSize: 30,
        fontWeight: 800,
        color: "#111827",
      }}
    >
      {children}
    </h2>
  );
}