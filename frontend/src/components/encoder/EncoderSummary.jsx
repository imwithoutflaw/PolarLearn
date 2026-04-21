import React from "react";
import InfoBox from "../common/InfoBox.jsx";

export default function EncoderSummary({ result }) {
  if (!result) return null;

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <InfoBox>
        Informačné bity sa najprv vložia na spoľahlivé pozície u-vektora a potom sa
        vykoná polárna transformácia po jednotlivých stage-och až po výsledné kódové slovo.
      </InfoBox>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        <div style={boxStyle}>
          <div style={labelStyle}>u (s vloženými frozen bitmi):</div>
          <div style={monoStyle}>{result.u_vector.join(" ")}</div>
        </div>

        <div style={boxStyle}>
          <div style={labelStyle}>kódové slovo c:</div>
          <div style={monoStyle}>{result.codeword.join(" ")}</div>
        </div>
      </div>
    </div>
  );
}

const boxStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: "18px 20px",
};

const labelStyle = {
  fontSize: 18,
  fontWeight: 700,
  color: "#374151",
  marginBottom: 12,
};

const monoStyle = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 22,
  color: "#1f2937",
};