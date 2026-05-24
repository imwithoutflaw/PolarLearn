import React from "react";
import AppShell from "../components/layout/AppShell.jsx";
import PageTitle from "../components/common/PageTitle.jsx";
import SidebarSection from "../components/layout/SidebarSection.jsx";
import SectionCard from "../components/common/SectionCard.jsx";
import BerSidebarControls from "../components/ber/BerSidebarControls.jsx";
import BerChart from "../components/ber/BerChart.jsx";
import BerInterpretation from "../components/ber/BerInterpretation.jsx";
import BerResultsTable from "../components/ber/BerResultsTable.jsx";
import { useBer } from "../hooks/useBer.js";
import BackButton from "../components/common/BackButton.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function BerPage() {
  const { result, loading, error, runComparison } = useBer();
  const { t } = useLanguage();

  const handleSubmit = (payload) => {
    if (!payload) return;
    runComparison(payload);
  };

  const sidebarControls = (
    <SidebarSection title={t("simulationParameters")}>
      <BerSidebarControls onSubmit={handleSubmit} loading={loading} />
    </SidebarSection>
  );

  return (
    <AppShell sidebarControls={sidebarControls}>
      <BackButton />

      <PageTitle
        title={t("berPageTitle")}
        description={t("berPageDescription")}
      />

      {loading && (
        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              width: "100%",
              height: 10,
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
                background: "#3b82f6",
              }}
            />
          </div>

          <div style={{ fontSize: 18, color: "#444" }}>
            {t("simulationRunning")}
          </div>
        </div>
      )}

      {!loading && result && (
        <div style={{ fontSize: 18, color: "#444", marginBottom: 22 }}>
          {t("simulationFinished")}
        </div>
      )}

      {!loading && !result && !error && (
        <div style={{ fontSize: 18, color: "#666", marginBottom: 22 }}>
          {t("simulationHint")}
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

          <SectionCard title={t("resultsTable")}>
            <BerResultsTable result={result} />
          </SectionCard>

          <SectionCard title={t("shortEvaluation")}>
            <BerInterpretation result={result} />
          </SectionCard>
        </div>
      )}
    </AppShell>
  );
}