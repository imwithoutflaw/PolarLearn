import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {subtitle && (
        <div
          style={{
            fontSize: 18,
            color: "#555",
            marginBottom: 10,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </div>
      )}

      <h1
        style={{
          margin: 0,
          fontSize: 56,
          lineHeight: 1.05,
          fontWeight: 800,
          color: "#111",
        }}
      >
        {title}
      </h1>
    </div>
  );
}