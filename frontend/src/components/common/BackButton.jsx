import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/HomePage")}
      style={{
        marginBottom: 20,
        padding: "10px 16px",
        borderRadius: 12,
        border: "none",
        background: "#e2e8f0",
        cursor: "pointer",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      ← Späť na menu
    </button>
  );
}