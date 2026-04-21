import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function DecisionLogTable({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <SectionTitle>Tabuľka krokov (log)</SectionTitle>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Step</th>
              <th style={thStyle}>Index</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>LLR</th>
              <th style={thStyle}>Decision</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, index) => {
              const bitIndex =
                step.bit_index ??
                step.index_l ??
                step.index ??
                index;

              const type =
                step.role ??
                step.type ??
                step.step_type ??
                "-";

              const llr =
                step.llr ??
                step.llr_value ??
                0;

              const decision =
                step.decision ??
                "-";

              return (
                <tr key={index}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{bitIndex}</td>
                  <td style={tdStyle}>{type}</td>
                  <td style={tdStyle}>
                    {typeof llr === "number" ? llr.toFixed(4) : llr}
                  </td>
                  <td style={tdStyle}>{decision}</td>
                </tr>
              );
            })}
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
};