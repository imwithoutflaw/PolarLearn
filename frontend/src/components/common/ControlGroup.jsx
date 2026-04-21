import React from "react";

export default function ControlGroup({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#374151",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}