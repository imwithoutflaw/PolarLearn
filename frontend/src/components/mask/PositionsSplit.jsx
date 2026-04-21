import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";
import SubsectionTitle from "../common/SubsectionTitle.jsx";

export default function PositionsSplit({ result }) {
  if (!result) return null;

  return (
    <div>
      <SectionTitle>Rozdelenie pozícií</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <SubsectionTitle>Info pozície</SubsectionTitle>
          <div style={monoBox}>
            {result.info_positions.join(", ")}
          </div>
          <div style={mutedText}>
            Tieto pozície prenášajú informačné bity.
          </div>
        </div>

        <div>
          <SubsectionTitle>Frozen pozície</SubsectionTitle>
          <div style={monoBox}>
            {result.frozen_positions.join(", ")}
          </div>
          <div style={mutedText}>
            Tieto pozície sú pevne nastavené, spravidla na hodnotu 0.
          </div>
        </div>
      </div>
    </div>
  );
}

const monoBox = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 18,
  color: "#374151",
  marginBottom: 12,
};

const mutedText = {
  color: "#64748b",
  fontSize: 16,
  lineHeight: 1.6,
};