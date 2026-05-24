import React from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function BerInterpretation() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        padding: "18px 20px",
        borderRadius: 18,
        background: "#eaf3ff",
        border: "1px solid #c9dcff",
        color: "#2457a6",
        fontSize: 17,
        lineHeight: 1.8,
      }}
    >
      {t("berInterpretationText")}
    </div>
  );
}