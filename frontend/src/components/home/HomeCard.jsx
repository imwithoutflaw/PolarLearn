import React from "react";
import { Link } from "react-router-dom";

export default function HomeCard({ title, description, to }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          minHeight: 170,
          padding: "22px 20px",
          borderRadius: 22,
          background: "#ffffff",
          border: "1px solid #d9e3f1",
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 18px 32px rgba(15, 23, 42, 0.10)";
          e.currentTarget.style.borderColor = "#bcd0ec";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.06)";
          e.currentTarget.style.borderColor = "#d9e3f1";
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              margin: "12px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#64748b",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 14,
            fontWeight: 800,
            color: "#1d4ed8",
          }}
        >
          Open module →
        </div>
      </div>
    </Link>
  );
}