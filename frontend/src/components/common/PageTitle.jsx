import React from "react";

export default function PageTitle({ title, description }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1
        style={{
          margin: 0,
          fontSize: 56,
          lineHeight: 1.05,
          fontWeight: 800,
          color: "#111827",
        }}
      >
        {title}
      </h1>

      {description && (
        <p
          style={{
            marginTop: 18,
            marginBottom: 0,
            fontSize: 18,
            lineHeight: 1.7,
            color: "#4b5563",
            maxWidth: 1200,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}