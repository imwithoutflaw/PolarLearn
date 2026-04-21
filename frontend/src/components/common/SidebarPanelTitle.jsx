import React from "react";

export default function SidebarPanelTitle({ children }) {
  return (
    <h2
      style={{
        marginTop: 0,
        marginBottom: 22,
        fontSize: 24,
        fontWeight: 800,
        color: "#374151",
      }}
    >
      {children}
    </h2>
  );
}