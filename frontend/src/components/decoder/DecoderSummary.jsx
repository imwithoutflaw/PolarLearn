import React from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function DecoderSummary({ result }) {
  if (!result) return null;

  const { t } = useLanguage();

  const originalBits = result.original_bits || [];
  const codeword = result.codeword || [];
  const uHat = result.u_hat || [];
  const msgHat = result.estimated_bits || result.msg_hat || [];

  const isOk =
    originalBits.length > 0
      ? originalBits.join("") === msgHat.join("")
      : result.decode_ok ?? result.success ?? true;

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
        }}
      >
        <div style={boxStyle}>
          <div style={labelStyle}>{t("originalMessage")}:</div>
          <div style={monoStyle}>
            {originalBits.length ? originalBits.join(" ") : "—"}
          </div>
        </div>

        <div style={boxStyle}>
          <div style={labelStyle}>{t("encodedCodeword")}:</div>
          <div style={monoStyle}>
            {codeword.length ? codeword.join(" ") : "—"}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 18,
        }}
      >
        <div style={boxStyle}>
          <div style={labelStyle}>{t("uHatResult")}:</div>
          <div style={monoStyle}>{uHat.join(" ")}</div>
        </div>

        <div style={boxStyle}>
          <div style={labelStyle}>{t("msgHatEstimate")}:</div>
          <div style={monoStyle}>{msgHat.join(" ")}</div>
        </div>

        <div
          style={{
            ...boxStyle,
            background: isOk ? "#eaf6ea" : "#fdecea",
            border: `1px solid ${isOk ? "#b7dfb9" : "#f0b6b1"}`,
          }}
        >
          <div style={labelStyle}>{t("comparison")}:</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: isOk ? "#2f7d32" : "#b42318",
            }}
          >
            {isOk ? t("decodingOk") : t("decodingMismatch")}
          </div>
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