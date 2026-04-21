import React from "react";
import PageContainer from "../components/layout/PageContainer.jsx";
import EncoderForm from "../components/encoder/EncoderForm.jsx";
import EncoderStagesTable from "../components/encoder/EncoderStagesTable.jsx";
import { useEncoder } from "../hooks/useEncoder.js";

export default function EncoderPage() {
  const { result, loading, error, encode } = useEncoder();

  return (
    <PageContainer>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
        <h1 style={{ marginBottom: 8 }}>Polar Encoder</h1>
        <p style={{ marginTop: 0, marginBottom: 24, color: "#444" }}>
          Build the u-vector, encode information bits, and inspect stage-by-stage transformation.
        </p>

        <EncoderForm onSubmit={encode} loading={loading} />

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
            <div
              style={{
                border: "1px solid #d0d0d0",
                padding: 16,
                borderRadius: 16,
                background: "#fff",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Summary</h3>
              <div>N: {result.N}</div>
              <div>K: {result.K}</div>
              <div>Design Eb/N0: {result.design_ebn0_db}</div>
              <div style={{ marginTop: 12 }}>Mask: [{result.mask.join(", ")}]</div>
              <div style={{ marginTop: 8 }}>Info positions: [{result.info_positions.join(", ")}]</div>
              <div style={{ marginTop: 8 }}>Frozen positions: [{result.frozen_positions.join(", ")}]</div>
              <div style={{ marginTop: 8 }}>u-vector: [{result.u_vector.join(", ")}]</div>
              <div style={{ marginTop: 8, fontWeight: 700 }}>
                codeword: [{result.codeword.join(", ")}]
              </div>
              <div style={{ marginTop: 12, color: "#444" }}>{result.explanation}</div>
            </div>

            <EncoderStagesTable stages={result.stages} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}