import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function DecoderLlrTable({ result }) {
  if (!result) return null;

  const rows = (result.alpha || result.llr || []).map((value, index) => ({
    index,
    c: Array.isArray(result.codeword) ? result.codeword[index] : 0,
    alpha: value,
  }));

  return (
    <div>
      <SectionTitle>AWGN kanál (LLR)</SectionTitle>

      <div
        style={{
          marginBottom: 14,
          color: "#6b7280",
          fontSize: 17,
        }}
      >
        alpha = LLR hodnoty na vstupe SC dekódera (kladné → skôr 0, záporné → skôr 1)
      </div>

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
              <th style={thStyle}>c</th>
              <th style={thStyle}>alpha (LLR)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.index}>
                <td style={tdStyle}>{row.index}</td>
                <td style={tdStyle}>{row.c}</td>
                <td style={tdStyle}>{Number(row.alpha).toFixed(4)}</td>
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