import React from "react";
import AppShell from "../components/layout/AppShell.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import SidebarSection from "../components/layout/SidebarSection.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
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

  const sidebar = (
    <>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 22 }}>Polar Lab</div>

        <div style={{ display: "grid", gap: 12, color: "#555", fontSize: 15 }}>
          <div>Konštrukcia masky</div>
          <div>Encoder</div>
          <div>Decoder SC</div>
          <div
            style={{
              fontWeight: 800,
              background: "#e8f5e9",
              border: "2px solid #a5d6a7",
              borderRadius: 16,
              padding: "14px 16px",
              color: "#111",
            }}
          >
            BER simulacia
          </div>
          <div>Channel polarization</div>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "26px 0" }} />

      <SidebarSection title="Parametre simulácie">
        <BerForm onSubmit={handleSubmit} loading={loading} />
      </SidebarSection>
    </>
  );

  return (
    <AppShell sidebar={sidebar}>
      <PageHeader
        title="Výsledky simulácie"
        subtitle="Porovnanie BER polárnych kódov pri SC dekódovaní s teoretickou krivkou nekódovaného BPSK prenosu."
      />

      {loading && (
        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              width: "100%",
              height: 14,
              borderRadius: 999,
              background: "#dbeafe",
              overflow: "hidden",
              marginBottom: 14,
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
          <div style={{ fontSize: 18, color: "#444" }}>Simulácia prebieha...</div>
        </div>
      )}

      {!loading && result && (
        <div style={{ fontSize: 18, color: "#444", marginBottom: 22 }}>
          Simulácia dokončená.
        </div>
      )}

      {!loading && !result && !error && (
        <div style={{ fontSize: 18, color: "#666", marginBottom: 22 }}>
          Nastav parametre simulácie vľavo a klikni na „Spustiť simuláciu“.
        </div>
      )}

      {error && (
        <div
          style={{
            marginBottom: 24,
            padding: 16,
            border: "1px solid #e57373",
            background: "#fdecea",
            color: "#b71c1c",
            borderRadius: 16,
            fontSize: 16,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div style={{ display: "grid", gap: 24 }}>
          <SectionCard>
            <BerChart result={result} />
          </SectionCard>

          <SectionCard title="Tabuľka výsledkov">
            <BerResultsTable result={result} />
          </SectionCard>

          <SectionCard title="Stručné zhodnotenie">
            <BerInterpretation result={result} />
          </SectionCard>
        </div>
      )}
    </AppShell>
  );
}