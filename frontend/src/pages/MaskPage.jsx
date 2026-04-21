import React, { useCallback } from "react";
import AppShell from "../components/layout/AppShell.jsx";
import PageTitle from "../components/common/PageTitle.jsx";
import MaskSidebarControls from "../components/mask/MaskSidebarControls.jsx";
import MaskSummary from "../components/mask/MaskSummary.jsx";
import PositionsSplit from "../components/mask/PositionsSplit.jsx";
import MaskGrid from "../components/mask/MaskGrid.jsx";
import MaskInterpretation from "../components/mask/MaskInterpretation.jsx";
import MaskTable from "../components/mask/MaskTable.jsx";
import { useMask } from "../hooks/useMask.js";

export default function MaskPage() {
  const { result, loading, error, runMask } = useMask();

  const handleSubmit = useCallback((payload) => {
    runMask(payload);
  }, [runMask]);

  return (
    <AppShell
      sidebarControls={
        <MaskSidebarControls
          loading={loading}
          onSubmit={handleSubmit}
        />
      }
    >
      <PageTitle
        title="Konštrukcia kódu – informačné a frozen bity"
        description="Táto časť ukazuje, ktoré pozície v polárnom kóde budú použité na prenos informačných bitov a ktoré budú nastavené ako frozen bity. Používateľ môže meniť parametre kódu a sledovať, ako sa mení výsledná maska."
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
          <MaskSummary result={result} />

          <hr style={dividerStyle} />

          <PositionsSplit result={result} />

          <hr style={dividerStyle} />

          <MaskGrid result={result} />

          <hr style={dividerStyle} />

          <MaskInterpretation result={result} />

          <hr style={dividerStyle} />

          <MaskTable result={result} />
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