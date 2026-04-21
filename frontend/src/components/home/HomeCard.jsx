import React from "react";
import { Link } from "react-router-dom";

export default function HomeCard({ title, description, to }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#1e293b",
        background: "#ffffff",
        border: "1px solid #d8e3f2",
        borderRadius: 16,
        padding: "22px 20px",
        minHeight: 132,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 14px 28px rgba(18, 58, 120, 0.16)";
        e.currentTarget.style.borderColor = "#b6cbeb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.06)";
        e.currentTarget.style.borderColor = "#d8e3f2";
      }}
    >
      <div style={{ fontSize: 21, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
        {description}
      </div>
    </Link>
  );
}