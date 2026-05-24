import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

function kroneckerProduct(A, B) {
  const result = [];

  for (let i = 0; i < A.length; i += 1) {
    for (let bi = 0; bi < B.length; bi += 1) {
      const row = [];

      for (let j = 0; j < A[i].length; j += 1) {
        for (let bj = 0; bj < B[bi].length; bj += 1) {
          row.push(A[i][j] * B[bi][bj]);
        }
      }

      result.push(row);
    }
  }

  return result;
}

function buildGeneratorMatrix(N) {
  const F = [
    [1, 0],
    [1, 1],
  ];

  let G = F;
  const n = Math.log2(N);

  for (let i = 1; i < n; i += 1) {
    G = kroneckerProduct(G, F);
  }

  return G;
}

export default function GeneratorMatrix({ N }) {
  if (!N) return null;

  const { t } = useLanguage();

  const G = buildGeneratorMatrix(N);
  const n = Math.log2(N);

  const cellSize = N <= 8 ? 34 : N <= 16 ? 26 : 20;
  const fontSize = N <= 8 ? 15 : N <= 16 ? 12 : 10;

  return (
    <div>
      <SectionTitle>{t("generatorMatrixTitle")}</SectionTitle>

      <div style={textStyle}>
        {t("generatorMatrixDescriptionPart1")}{" "}
        <strong>c = u · G</strong>, {t("where")}{" "}
        <strong>G = F⊗n</strong>. {t("generatorMatrixDescriptionPart2")}
      </div>

      <div style={layoutStyle}>
        <div style={infoBoxStyle}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            {t("baseMatrix")}
          </div>

          <div style={monoStyle}>F = [[1, 0], [1, 1]]</div>

          <div style={{ marginTop: 12 }}>
            {t("forCurrent")} <strong>N = {N}</strong> {t("holds")}:
            <br />
            <strong>
              G{N} = F⊗{n}
            </strong>
          </div>
        </div>

        <div style={matrixWrapperStyle}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${N}, ${cellSize}px)`,
              width: N * cellSize,
              borderTop: "1px solid #d1d5db",
              borderLeft: "1px solid #d1d5db",
            }}
          >
            {G.flatMap((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid #d1d5db",
                    borderBottom: "1px solid #d1d5db",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize,
                    fontWeight: 700,
                    color: value === 1 ? "#0f172a" : "#94a3b8",
                    background: value === 1 ? "#eef6ff" : "#ffffff",
                  }}
                >
                  {value}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const textStyle = {
  color: "#6b7280",
  fontSize: 16,
  lineHeight: 1.7,
  marginBottom: 14,
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(220px, 320px) 1fr",
  gap: 16,
  alignItems: "start",
};

const infoBoxStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: "16px 18px",
  color: "#374151",
  fontSize: 16,
  lineHeight: 1.7,
};

const monoStyle = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 20,
  lineHeight: 1.5,
};

const matrixWrapperStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: 16,
  overflowX: "auto",
};