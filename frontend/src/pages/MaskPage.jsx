import React from "react";
import MaskForm from "../components/mask/MaskForm.jsx";
import MaskGrid from "../components/mask/MaskGrid.jsx";
import PositionsList from "../components/mask/PositionsList.jsx";
import PageContainer from "../components/layout/PageContainer.jsx";
import { useMask } from "../hooks/useMask.js";

export default function MaskPage() {
  const { result, loading, error, buildMask } = useMask();

  return (
    <PageContainer>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
        <h1 style={{ marginBottom: 8 }}>Mask Construction</h1>
        <p style={{ marginTop: 0, marginBottom: 24, color: "#444" }}>
          Build a polar code mask and inspect information and frozen bit positions.
        </p>

        <MaskForm onSubmit={buildMask} loading={loading} />

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
              <div>Rate: {result.rate}</div>
              <div style={{ marginTop: 8, color: "#444" }}>{result.explanation}</div>
            </div>

            <PositionsList
              infoPositions={result.info_positions}
              frozenPositions={result.frozen_positions}
            />

            <MaskGrid mask={result.mask} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}