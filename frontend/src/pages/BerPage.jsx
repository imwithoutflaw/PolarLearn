import React from "react";
import PageContainer from "../components/layout/PageContainer.jsx";
import BerForm from "../components/ber/BerForm.jsx";
import BerChart from "../components/ber/BerChart.jsx";
import BerInterpretation from "../components/ber/BerInterpretation.jsx";
import BerResultsTable from "../components/ber/BerResultsTable.jsx";
import { useBer } from "../hooks/useBer.js";

export default function BerPage() {
  const { result, loading, error, runComparison } = useBer();

  const handleSubmit = (payload) => {
    if (!payload) return;
    runComparison(payload);
  };

  return (
    <PageContainer>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: 24,
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <aside
          style={{
            position: "sticky",
            top: 90,
            borderRight: "1px solid #ddd",
            paddingRight: 24,
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Polar Lab</div>
            <div style={{ display: "grid", gap: 12, color: "#555", fontSize: 15 }}>
              <div>Konstrukcia masky</div>
              <div>Encoder</div>
              <div>Decoder SC</div>
              <div
                style={{
                  fontWeight: 800,
                  background: "#e8f5e9",
                  border: "1px solid #a5d6a7",
                  borderRadius: 12,
                  padding: "10px 12px",
                  color: "#111",
                }}
              >
                BER simulacia
              </div>
              <div>Channel polarization</div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "24px 0" }} />

          <h2 style={{ marginTop: 0, marginBottom: 20, fontSize: 26 }}>Parametre simulácie</h2>
          <BerForm onSubmit={handleSubmit} loading={loading} />
        </aside>

        <section>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 18, color: "#444", marginBottom: 10 }}>
              nekódovaného BPSK prenosu.
            </div>

            <h1 style={{ fontSize: 42, margin: "0 0 18px 0" }}>Výsledky simulácie</h1>

            {loading && (
              <>
                <div
                  style={{
                    width: "100%",
                    height: 14,
                    borderRadius: 999,
                    background: "#dbeafe",
                    overflow: "hidden",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#1976d2",
                    }}
                  />
                </div>
                <div style={{ fontSize: 18, color: "#444" }}>Prebieha simulácia...</div>
              </>
            )}

            {!loading && result && (
              <div style={{ fontSize: 18, color: "#444" }}>Simulácia dokončená.</div>
            )}

            {!loading && !result && !error && (
              <div style={{ fontSize: 18, color: "#666" }}>
                Nastav parametre simulácie vľavo a klikni na „Spustiť simuláciu“.
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                marginBottom: 24,
                padding: 14,
                border: "1px solid #e57373",
                background: "#fdecea",
                color: "#b71c1c",
                borderRadius: 14,
                fontSize: 16,
              }}
            >
              {error}
            </div>
          )}

          {result && (
            <div style={{ display: "grid", gap: 24 }}>
              <BerChart result={result} />
              <BerResultsTable result={result} />
              <BerInterpretation result={result} />
            </div>
          )}
        </section>
      </div>
    </PageContainer>
  );
}