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
import BackButton from "../components/common/BackButton.jsx";

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
      <BackButton />

      <PageTitle
        title="SC dekódovanie – krok za krokom"
        description="Táto časť ukazuje, ako prebieha successive cancellation decoding krok po kroku."
      />

      {error && <div style={errorStyle}>{error}</div>}

      {result && (
        <div style={{ display: "grid", gap: 34 }}>
          <DecoderSummary result={result} />

          <div>
            <div style={sectionTitle}>
              Vizualizácia dekódovania
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              <label style={radioStyle}>
                <input
                  type="radio"
                  checked={viewMode === "tree"}
                  onChange={() => setViewMode("tree")}
                />
                <span>Strom</span>
              </label>
            </div>
              <div style={noteStyle}>
                Jeden krok v tejto vizualizácii predstavuje rozhodnutie jedného
                bitu alebo combine operáciu. Pri rozhodnutí bitu sa zvýrazní celá cesta v SC
                strome k príslušnému listu, pretože dekodér musí prejsť viacerými úrovňami stromu.
              </div>
          </div>

          <div>
            <div style={sectionTitle}>
              Zobraziť kroky do:
            </div>

            <div style={sliderControlsStyle}>
              <button
                type="button"
                onClick={() => setVisibleStep((prev) => Math.max(0, prev - 1))}
                disabled={visibleStep === 0}
                style={{
                  ...stepButtonStyle,
                  opacity: visibleStep === 0 ? 0.5 : 1,
                }}
              >
                ← Back
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
                }}
              >
                Next →
              </button>
            </div>

            <div style={sliderNumbers}>
              <span>0</span>
              <span>{visibleStep}</span>
              <span>{maxStep}</span>
            </div>
          </div>

          <div>
            <DecoderTreeView steps={steps} visibleStep={visibleStep} />
            <DecoderStepExplanation step={currentStep} />
          </div>

          <DecisionLogTable steps={steps.slice(0, visibleStep)} />
        </div>
      )}
    </AppShell>
  );
}


const errorStyle = {
  marginBottom: 24,
  padding: "16px 20px",
  borderRadius: 18,
  background: "#fdecea",
  border: "1px solid #f0b6b1",
  color: "#b42318",
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: 700,
  color: "#374151",
  marginBottom: 12,
};

const radioStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 16,
  color: "#374151",
};

const noteStyle = {
  marginTop: 12,
  padding: "12px 16px",
  borderRadius: 14,
  background: "#eef6ff",
  border: "1px solid #bfdbfe",
  color: "#1e3a8a",
  fontSize: 15,
  lineHeight: 1.6,
};

const sliderControlsStyle = {
  display: "grid",
  gridTemplateColumns: "140px 1fr 140px",
  gap: 14,
  alignItems: "center",
};

const sliderNumbers = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 8,
  color: "#6b7280",
  fontSize: 14,
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