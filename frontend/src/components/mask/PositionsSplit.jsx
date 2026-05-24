import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";
import SubsectionTitle from "../common/SubsectionTitle.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function PositionsSplit({ result }) {
  if (!result) return null;
  const { t } = useLanguage();

  return (
    <div>
      <SectionTitle>{t("positionsSplitTitle")}</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <SubsectionTitle>{t("infoPositions")}</SubsectionTitle>
          <div style={monoBox}>
            {result.info_positions.join(", ")}
          </div>
          <div style={mutedText}>
            {t("infoPositionsDescription")}
          </div>
        </div>

        <div>
          <SubsectionTitle>{t("frozenPositions")}</SubsectionTitle>
          <div style={monoBox}>
            {result.frozen_positions.join(", ")}
          </div>
          <div style={mutedText}>
            {t("frozenPositionsDescription")}
          </div>
        </div>
      </div>
    </div>
  );
}

const monoBox = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 18,
  color: "#374151",
  marginBottom: 12,
};

const mutedText = {
  color: "#64748b",
  fontSize: 16,
  lineHeight: 1.6,
};