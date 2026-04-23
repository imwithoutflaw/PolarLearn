import React from "react";
import logo from "../../assets/stu-fei-logo.png";

export default function TopBar() {
  return (
    <header
      style={{
        width: "100%",
        background: "#184293",
        borderRadius: 24,
        padding: "18px 26px",
        minHeight: 92,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: 56,
        }}
      >
        <img
          src={logo}
          alt="STU FEI"
          style={{
            height: 100,
            width: "100",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      <button
        type="button"
        style={{
          padding: "10px 18px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
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