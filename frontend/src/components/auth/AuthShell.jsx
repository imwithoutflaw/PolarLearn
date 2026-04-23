import React from "react";
import TopBar from "../layout/TopBar.jsx";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#edf2f9",
        padding: 18,
      }}
    >
      <TopBar />

      <div
        style={{
          maxWidth: 520,
          margin: "40px auto 0",
          background: "#f8fbff",
          border: "1px solid #d8e3f2",
          borderRadius: 24,
          padding: "32px 30px",
          boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>{title}</h1>
        <p style={{ margin: "12px 0 24px", color: "#475569", lineHeight: 1.6 }}>
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}