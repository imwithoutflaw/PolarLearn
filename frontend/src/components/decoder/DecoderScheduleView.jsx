import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function DecoderScheduleView({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <SectionTitle>SC dekódovanie – schedule (butterfly)</SectionTitle>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: 20,
          overflowX: "auto",
        }}
      >
        <svg width="1200" height="520" viewBox="0 0 1200 520">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <line x1="80" y1={60 + i * 55} x2="1120" y2={60 + i * 55} stroke="#d1d5db" strokeWidth="1.5" />
            </g>
          ))}

          {Array.from({ length: 4 }, (_, i) => (
            <g key={i}>
              {Array.from({ length: 8 }, (_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={120 + i * 300}
                  cy={60 + j * 55}
                  r="5"
                  fill="#000"
                />
              ))}
            </g>
          ))}

          <line x1="120" y1="115" x2="420" y2="60" stroke="#ef4444" strokeWidth="3" />
          <line x1="120" y1="225" x2="420" y2="170" stroke="#ef4444" strokeWidth="3" />
          <line x1="120" y1="390" x2="420" y2="335" stroke="#ef4444" strokeWidth="3" />

          <line x1="420" y1="170" x2="720" y2="60" stroke="#ef4444" strokeWidth="3" />
          <line x1="420" y1="335" x2="720" y2="225" stroke="#ef4444" strokeWidth="3" />

          <line x1="720" y1="390" x2="1020" y2="60" stroke="#ef4444" strokeWidth="3" />
          <line x1="720" y1="445" x2="1020" y2="115" stroke="#ef4444" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}