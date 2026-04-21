import React from "react";

function flattenRows(result) {
  const rows = [];

  result.series.forEach((seriesItem) => {
    seriesItem.results.forEach((point) => {
      rows.push({
        N: seriesItem.N,
        K: seriesItem.K,
        R: seriesItem.rate,
        ebn0: point.ebn0_db,
        ber: point.ber,
      });
    });
  });

  return rows;
}

function formatBer(value) {
  if (value === null || value === undefined) {
    return "not enough errors";
  }
  return Number(value).toFixed(6);
}

export default function BerResultsTable({ result }) {
  if (!result) return null;

  const rows = flattenRows(result);

  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 18,
        background: "#fff",
        padding: 18,
        overflowX: "auto",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 26 }}>Tabuľka výsledkov</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>N</th>
            <th style={thStyle}>K</th>
            <th style={thStyle}>R</th>
            <th style={thStyle}>Eb/N0 (dB)</th>
            <th style={thStyle}>BER</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.N}-${row.K}-${row.ebn0}-${index}`}>
              <td style={tdStyle}>{row.N}</td>
              <td style={tdStyle}>{row.K}</td>
              <td style={tdStyle}>{row.R}</td>
              <td style={tdStyle}>{row.ebn0}</td>
              <td style={tdStyle}>{formatBer(row.ber)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  borderBottom: "1px solid #ddd",
  color: "#666",
  fontSize: 15,
};

const tdStyle = {
  padding: "14px 16px",
  borderBottom: "1px solid #eee",
  fontSize: 15,
};