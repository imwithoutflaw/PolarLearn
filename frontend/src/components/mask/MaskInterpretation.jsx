import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";
import InfoBox from "../common/InfoBox.jsx";

export default function MaskInterpretation({ result }) {
  if (!result) return null;

  const infoCount = result.info_positions.length;
  const frozenCount = result.frozen_positions.length;

  return (
    <div>
      <SectionTitle>Stručné vysvetlenie</SectionTitle>

      <InfoBox>
        Pre zvolený kód vzniklo <strong>{infoCount} informačných pozícií</strong> a{" "}
        <strong>{frozenCount} frozen pozícií</strong>. Pri väčšej hodnote K sa do
        prenosu zaraďuje viac podkanálov, vrátane menej spoľahlivých. Pri menšej hodnote K
        sa využívajú len najspoľahlivejšie pozície.
      </InfoBox>
    </div>
  );
}