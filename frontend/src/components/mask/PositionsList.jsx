import React from "react";

function Box({ title, values }) {
  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div>[{values.join(", ")}]</div>
    </div>
  );
}

export default function PositionsList({ infoPositions, frozenPositions }) {
  if (!infoPositions || !frozenPositions) return null;

  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
      <Box title="Information positions" values={infoPositions} />
      <Box title="Frozen positions" values={frozenPositions} />
    </div>
  );
}