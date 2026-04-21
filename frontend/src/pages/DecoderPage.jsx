import React from "react";
import DecoderForm from "../components/decoder/DecoderForm.jsx";
import DecisionSteps from "../components/decoder/DecisionSteps.jsx";
import FinalEstimateCard from "../components/decoder/FinalEstimateCard.jsx";
import { useDecoder } from "../hooks/useDecoder.js";

export default function DecoderPage() {
  const { result, loading, error, decode } = useDecoder();

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>SC Decoder</h1>
      <p style={{ marginTop: 0, marginBottom: 24, color: "#444" }}>
        Run baseline successive cancellation decoding and inspect each decision step.
      </p>

      <DecoderForm onSubmit={decode} loading={loading} />

      {error && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #e57373",
            background: "#fdecea",
            color: "#b71c1c",
            borderRadius: 12,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 24, display: "grid", gap: 24 }}>
          <FinalEstimateCard estimatedBits={result.estimated_bits} />
          <DecisionSteps steps={result.steps} />
        </div>
      )}
    </div>
  );
}