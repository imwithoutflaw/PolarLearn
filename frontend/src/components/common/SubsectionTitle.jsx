import React from "react";

export default function SubsectionTitle({ children }) {
  return (
    <h3
      style={{
        marginTop: 0,
        marginBottom: 14,
        fontSize: 22,
        fontWeight: 800,
        color: "#374151",
      }}
    >
      {children}
    </h3>
  );
}