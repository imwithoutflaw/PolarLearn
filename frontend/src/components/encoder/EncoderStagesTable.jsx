import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function EncoderStagesTable({ result }) {
  if (!result || !result.stages) return null;

  const stages = result.stages;
  const stageCount = stages.length;
  const bitCount = stages[0]?.length || 0;

  return (
    <div>
      <SectionTitle>Hodnoty po jednotlivých stage-och</SectionTitle>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          overflowX: "auto",
          background: "#fff",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              <th style={thStyle}>Index bitu</th>
              {Array.from({ length: stageCount }, (_, stageIndex) => (
                <th key={stageIndex} style={thStyle}>
                  Stage {stageIndex}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: bitCount }, (_, bitIndex) => (
              <tr key={bitIndex}>
                <td style={tdStyle}>{bitIndex}</td>
                {Array.from({ length: stageCount }, (_, stageIndex) => (
                  <td key={stageIndex} style={tdStyle}>
                    {stages[stageIndex][bitIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f8fafc",
  color: "#6b7280",
  fontSize: 15,
};

const tdStyle = {
  padding: "14px 16px",
  borderBottom: "1px solid #eef2f7",
  color: "#374151",
  fontSize: 15,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
};