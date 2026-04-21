import React from "react";

export default function SidebarSection({ title, children }) {
  return (
    <section style={{ marginBottom: 30 }}>
      <h2
        style={{
          marginTop: 0,
          marginBottom: 18,
          fontSize: 24,
          fontWeight: 800,
          color: "#111",
        }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}