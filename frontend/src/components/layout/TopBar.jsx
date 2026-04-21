import React from "react";

export default function TopBar() {
  return (
    <header
      style={{
        background: "#123a78",
        color: "#ffffff",
        borderRadius: 16,
        padding: "14px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 8px 24px rgba(10, 37, 78, 0.22)",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 0.4 }}>
        FEI STU
      </div>

      <button
        type="button"
        style={{
          border: "1px solid rgba(255,255,255,0.35)",
          background: "rgba(255,255,255,0.1)",
          color: "#ffffff",
          borderRadius: 10,
          padding: "8px 14px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </header>
  );
}