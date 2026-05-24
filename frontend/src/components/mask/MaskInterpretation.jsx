import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";
import InfoBox from "../common/InfoBox.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function MaskInterpretation({ result }) {
  if (!result) return null;

  const { t } = useLanguage();

  const infoCount = result.info_positions.length;
  const frozenCount = result.frozen_positions.length;

  return (
    <div>
      <SectionTitle>{t("maskInterpretationTitle")}</SectionTitle>

      <InfoBox>
        {t("maskInterpretationPart1")}{" "}
        <strong>{infoCount} {t("informationPositionsLower")}</strong> {t("and")}{" "}
        <strong>{frozenCount} {t("frozenPositionsLower")}</strong>.{" "}
        {t("maskInterpretationPart2")}
      </InfoBox>
    </div>
  );
}