import React, { useCallback, useEffect, useMemo, useState } from "react";
import AppShell from "../components/layout/AppShell.jsx";
import PageTitle from "../components/common/PageTitle.jsx";
import DecoderSidebarControls from "../components/decoder/DecoderSidebarControls.jsx";
import DecoderSummary from "../components/decoder/DecoderSummary.jsx";
import DecoderStepExplanation from "../components/decoder/DecoderStepExplanation.jsx";
import DecoderLlrTable from "../components/decoder/DecoderLlrTable.jsx";
import DecisionLogTable from "../components/decoder/DecisionLogTable.jsx";
import DecoderTreeView from "../components/decoder/DecoderTreeView.jsx";
import DecoderScheduleView from "../components/decoder/DecoderScheduleView.jsx";
import { useDecoder } from "../hooks/useDecoder.js";

export default function DecoderPage() {
  const { result, loading, error, decode } = useDecoder();
  const [visibleStep, setVisibleStep] = useState(0);
  const [viewMode, setViewMode] = useState("tree");

  const handleSubmit = useCallback(
    (payload) => {
      decode(payload);
    },
    [decode]
  );

  const steps = result?.steps || [];
  const maxStep = useMemo(() => steps.length, [steps]);

  useEffect(() => {
    setVisibleStep(maxStep);
  }, [maxStep]);

  const currentStep = visibleStep > 0 ? steps[visibleStep - 1] : null;

  return (
    <AppShell
      sidebarControls={
        <DecoderSidebarControls loading={loading} onSubmit={handleSubmit} />
      }
    >
      <PageTitle
        title="SC dekódovanie – krok za krokom"
        description="Táto časť ukazuje, ako prebieha successive cancellation decoding krok po kroku."
      />

      {error && (
        <div
          style={{
            marginBottom: 24,
            padding: "16px 20px",
            borderRadius: 18,
            background: "#fdecea",
            border: "1px solid #f0b6b1",
            color: "#b42318",
            fontSize: 16,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div style={{ display: "grid", gap: 34 }}>
          <DecoderSummary result={result} />

          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#374151",
                marginBottom: 12,
              }}
            >
              Zobraziť kroky do:
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 180px",
                gap: 14,
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => setVisibleStep((prev) => Math.max(0, prev - 1))}
                disabled={visibleStep === 0}
                style={{
                  ...stepButtonStyle,
                  opacity: visibleStep === 0 ? 0.5 : 1,
                  cursor: visibleStep === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Predchádzajúci krok
              </button>

              <input
                type="range"
                min="0"
                max={maxStep}
                step="1"
                value={visibleStep}
                onChange={(e) => setVisibleStep(Number(e.target.value))}
                style={{ width: "100%" }}
              />

              <button
                type="button"
                onClick={() =>
                  setVisibleStep((prev) => Math.min(maxStep, prev + 1))
                }
                disabled={visibleStep === maxStep}
                style={{
                  ...stepButtonStyle,
                  opacity: visibleStep === maxStep ? 0.5 : 1,
                  cursor: visibleStep === maxStep ? "not-allowed" : "pointer",
                }}
              >
                Ďalší krok →
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
              <span>{visibleStep}</span>
              <span>{maxStep}</span>
            </div>

            {currentStep && (
              <div
                style={{
                  marginTop: 14,
                  color: "#6b7280",
                  fontSize: 15,
                }}
              >
                Aktuálny krok: Step={visibleStep}, Index=
                {currentStep.bit_index ?? currentStep.index_l ?? "-"}, Type=
                {currentStep.role ?? currentStep.step_type ?? "-"}, LLR=
                {Number(
                  currentStep.llr_value ?? currentStep.llr ?? 0
                ).toFixed(4)}
                , Decision={currentStep.decision ?? "-"}
              </div>
            )}
          </div>

          <DecoderStepExplanation step={currentStep} />

          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#374151",
                marginBottom: 12,
              }}
            >
              Vizualizácia dekódovania
            </div>

            <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
              <label style={radioStyle}>
                <input
                  type="radio"
                  checked={viewMode === "tree"}
                  onChange={() => setViewMode("tree")}
                />
                <span>Strom</span>
              </label>

              <label style={radioStyle}>
                <input
                  type="radio"
                  checked={viewMode === "schedule"}
                  onChange={() => setViewMode("schedule")}
                />
                <span>Schedule (butterfly)</span>
              </label>
            </div>

            <div
              style={{
                color: "#6b7280",
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              {viewMode === "tree"
                ? "Zvýrazňuje sa cesta v strome ku listom, ktoré už boli rozhodnuté."
                : "Táto schéma zobrazuje výpočtový graf SC dekódovania."}
            </div>

            {viewMode === "tree" ? (
              <DecoderTreeView steps={steps.slice(0, visibleStep)} />
            ) : (
              <DecoderScheduleView steps={steps.slice(0, visibleStep)} />
            )}
          </div>

          <DecoderLlrTable result={result} />

          <DecisionLogTable steps={steps.slice(0, visibleStep)} />
        </div>
      )}
    </AppShell>
  );
}

const radioStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 16,
  color: "#374151",
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