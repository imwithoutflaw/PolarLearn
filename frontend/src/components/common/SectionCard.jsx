import React from "react";

export default function SectionCard({ title, children }) {
  return (
    <section
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 22,
        background: "#fff",
        padding: 22,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      {title && (
        <h2
          style={{
            marginTop: 0,
            marginBottom: 18,
            fontSize: 26,
            fontWeight: 800,
            color: "#111",
          }}
        >
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}