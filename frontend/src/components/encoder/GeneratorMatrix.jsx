import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

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

  const G = buildGeneratorMatrix(N);
  const n = Math.log2(N);

  const cellSize = N <= 8 ? 34 : N <= 16 ? 26 : 20;
  const fontSize = N <= 8 ? 15 : N <= 16 ? 12 : 10;

  return (
    <div>
      <SectionTitle>Generátorová matica G</SectionTitle>

      <div style={textStyle}>
        Kódovanie polárneho kódu je možné zapísať aj maticovo ako{" "}
        <strong>c = u · G</strong>, kde <strong>G = F⊗n</strong>. Matica G
        vzniká Kroneckerovým súčinom základnej matice F.
      </div>

      <div style={layoutStyle}>
        <div style={infoBoxStyle}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            Základná matica
          </div>

          <div style={monoStyle}>F = [[1, 0], [1, 1]]</div>

          <div style={{ marginTop: 12 }}>
            Pre aktuálne <strong>N = {N}</strong> platí:
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