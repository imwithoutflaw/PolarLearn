import React from "react";
import InfoBox from "../common/InfoBox.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function MaskSummary({ result }) {
  if (!result) return null;
  const { t } = useLanguage();

  const K = result.K ?? result.info_positions.length;
  const frozenCount = result.frozen_positions.length;

  return (
    <>
      <InfoBox>
        {t("maskSummaryInfo")}
      </InfoBox>

      <div style={{ marginTop: 28 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#374151",
            marginBottom: 14,
          }}
        >
          {t("selectedParameters")}
        </div>

        <ul
          style={{
            margin: 0,
            paddingLeft: 32,
            lineHeight: 1.9,
            color: "#374151",
            fontSize: 17,
          }}
        >
          <li>N = {result.N}</li>
          <li>K = {K}</li>
          <li>R = {(K / result.N).toFixed(2)}</li>
          <li>
            {t("designEbN0Label")} ={" "}
            {Number(result.design_ebn0_db).toFixed(2)} dB
          </li>
        </ul>
      </div>
    </>
  );
}