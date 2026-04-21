import React from "react";
import InfoBox from "../common/InfoBox.jsx";

export default function MaskSummary({ result }) {
  if (!result) return null;

  const K = result.K ?? result.info_positions.length;
  const frozenCount = result.frozen_positions.length;

  return (
    <>
      <InfoBox>
        Na základe zvolenej dĺžky kódu N, kódového pomeru R a návrhovej hodnoty Eb/N0
        sa vytvorí maska informačných a frozen bitov. Spoľahlivejšie podkanály sú
        použité na prenos informačných bitov.
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
          Zvolené parametre:
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
          <li>návrhové Eb/N0 = {Number(result.design_ebn0_db).toFixed(2)} dB</li>
        </ul>
      </div>
    </>
  );
}