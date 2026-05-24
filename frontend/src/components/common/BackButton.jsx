import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function BackButton() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      style={buttonStyle}
    >
      ← {t("backToMenu")}
    </button>
  );
}

const buttonStyle = {
  padding: "14px 18px",
  borderRadius: 18,
  border: "none",
  background: "#dbe1ea",
  color: "#1f2937",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  marginBottom: 24,
};