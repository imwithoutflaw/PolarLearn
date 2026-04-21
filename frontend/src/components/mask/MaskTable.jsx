import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function MaskTable({ result }) {
  if (!result) return null;

  const infoSet = new Set(result.info_positions);

  const rows = Array.from({ length: result.N }, (_, index) => ({
    index,
    type: infoSet.has(index) ? "info" : "frozen",
  }));

  return (
    <div>
      <SectionTitle>Tabuľka všetkých pozícií</SectionTitle>

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
              <th style={thStyle}>Index</th>
              <th style={thStyle}>Typ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.index}>
                <td style={tdStyle}>{row.index}</td>
                <td style={tdStyle}>{row.type}</td>
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
};