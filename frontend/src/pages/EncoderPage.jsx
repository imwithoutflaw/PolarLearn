import React, { useCallback, useMemo, useState } from "react";
import AppShell from "../components/layout/AppShell.jsx";
import PageTitle from "../components/common/PageTitle.jsx";
import EncoderSidebarControls from "../components/encoder/EncoderSidebarControls.jsx";
import EncoderSummary from "../components/encoder/EncoderSummary.jsx";
import EncoderStagesTable from "../components/encoder/EncoderStagesTable.jsx";
import ButterflyDiagram from "../components/encoder/ButterflyDiagram.jsx";
import EncodingExplanation from "../components/encoder/EncodingExplanation.jsx";
import InfoBox from "../components/common/InfoBox.jsx";
import { useEncoder } from "../hooks/useEncoder.js";
import BackButton from "../components/common/BackButton.jsx";

export default function EncoderPage() {
  const { result, loading, error, encode } = useEncoder();
  const [visibleStage, setVisibleStage] = useState(0);

  const handleSubmit = useCallback(
    (payload) => {
      encode(payload);
    },
    [encode]
  );

  const maxStage = useMemo(() => {
    if (!result?.stages?.length) return 0;
    return result.stages.length - 1;
  }, [result]);

  React.useEffect(() => {
    setVisibleStage(maxStage);
  }, [maxStage]);

  return (
    <AppShell
      sidebarControls={
        <EncoderSidebarControls loading={loading} onSubmit={handleSubmit} />
      }
    >
      <BackButton />

      <PageTitle
        title="Encoder – krok za krokom"
        description="Táto časť ukazuje, ako sa informačné bity vložia do u-vektora a ako sa následne cez polárnu transformáciu vytvorí výsledné kódové slovo."
      />

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ display: "grid", gap: 34 }}>
          <EncoderSummary result={result} />

          <hr style={dividerStyle} />

          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#374151",
                marginBottom: 12,
              }}
            >
              Zobraziť do stage
            </div>

            <div style={sliderControlsStyle}>
              <button
                type="button"
                onClick={() =>
                  setVisibleStage((prev) => Math.max(0, prev - 1))
                }
                disabled={visibleStage === 0}
                style={{
                  ...stepButtonStyle,
                  opacity: visibleStage === 0 ? 0.5 : 1,
                  cursor: visibleStage === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Back
              </button>

              <input
                type="range"
                min="0"
                max={maxStage}
                step="1"
                value={visibleStage}
                onChange={(e) => setVisibleStage(Number(e.target.value))}
                style={{ width: "100%" }}
              />

              <button
                type="button"
                onClick={() =>
                  setVisibleStage((prev) => Math.min(maxStage, prev + 1))
                }
                disabled={visibleStage === maxStage}
                style={{
                  ...stepButtonStyle,
                  opacity: visibleStage === maxStage ? 0.5 : 1,
                  cursor: visibleStage === maxStage ? "not-allowed" : "pointer",
                }}
              >
                Next →
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              <span>0</span>
              <span>{visibleStage}</span>
              <span>{maxStage}</span>
            </div>
          </div>

          <ButterflyDiagram result={result} visibleStage={visibleStage} />

          <InfoBox>
            OK: posledný stage sa zhoduje s kódovým slovom c.
          </InfoBox>

          <hr style={dividerStyle} />

          <EncoderStagesTable result={result} />

        </div>
      )}
    </AppShell>
  );
}

const dividerStyle = {
  border: "none",
  borderTop: "1px solid #d7dde5",
  margin: 0,
};

const errorStyle = {
  marginBottom: 24,
  padding: "16px 20px",
  borderRadius: 18,
  background: "#fdecea",
  border: "1px solid #f0b6b1",
  color: "#b42318",
  fontSize: 16,
};

const sliderControlsStyle = {
  display: "grid",
  gridTemplateColumns: "140px 1fr 140px",
  gap: 14,
  alignItems: "center",
};

const stepButtonStyle = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid #d8dee8",
  background: "#ffffff",
  color: "#374151",
  fontSize: 15,
  fontWeight: 700,
};