import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function ButterflyDiagram({ result, visibleStage }) {
  if (!result || !result.stages || result.stages.length === 0) return null;

  const stages = result.stages;
  const stageCount = stages.length;
  const bitCount = stages[0].length;

  const maxVisibleStage = Math.max(
    0,
    Math.min(
      typeof visibleStage === "number" ? visibleStage : stageCount - 1,
      stageCount - 1
    )
  );

  const colGap = bitCount <= 8 ? 260 : bitCount <= 16 ? 220 : 170;
  const rowGap = bitCount <= 8 ? 56 : bitCount <= 16 ? 42 : 30;

  const leftPad = 90;
  const topPad = 40;
  const rightPad = 80;
  const bottomPad = 60;

  const width = leftPad + (stageCount - 1) * colGap + rightPad;
  const height = topPad + (bitCount - 1) * rowGap + bottomPad;

  const nodeRadius = bitCount <= 8 ? 6 : 5;
  const valueFontSize = bitCount <= 8 ? 16 : 13;
  const indexFontSize = 14;

  const xAt = (stageIndex) => leftPad + stageIndex * colGap;
  const yAt = (bitIndex) => topPad + bitIndex * rowGap;

  const renderConnections = () => {
    const lines = [];

    for (let s = 0; s < stageCount - 1; s += 1) {
      const isVisibleConnection = s < maxVisibleStage;

      const step = 2 ** s;
      const block = 2 ** (s + 1);

      for (let start = 0; start < bitCount; start += block) {
        for (let j = 0; j < step; j += 1) {
          const top = start + j;
          const bottom = start + j + step;

          if (bottom >= bitCount) continue;

          const x1 = xAt(s);
          const x2 = xAt(s + 1);

          const yTop = yAt(top);
          const yBottom = yAt(bottom);

          const lineStyle = {
            stroke: isVisibleConnection ? "#9ca3af" : "#e5e7eb",
            strokeWidth: isVisibleConnection ? "2" : "1.5",
          };

          lines.push(
            <line
              key={`h-top-${s}-${top}`}
              x1={x1}
              y1={yTop}
              x2={x2}
              y2={yTop}
              {...lineStyle}
            />
          );

          lines.push(
            <line
              key={`h-bottom-${s}-${bottom}`}
              x1={x1}
              y1={yBottom}
              x2={x2}
              y2={yBottom}
              {...lineStyle}
            />
          );

          lines.push(
            <line
              key={`diag-${s}-${top}-${bottom}`}
              x1={x1}
              y1={yBottom}
              x2={x2}
              y2={yTop}
              {...lineStyle}
            />
          );

          const xorX = x2 - 40;

          lines.push(
            <g key={`xor-${s}-${top}-${bottom}`}>
                <circle
                    cx={xorX}
                    cy={yTop}
                    r={bitCount <= 8 ? 15 : 12}
                    fill="#ffffff"
                    stroke={isVisibleConnection ? "#6b7280" : "#d1d5db"}
                    strokeWidth="1.8"
                />
                <line
                    x1={xorX - (bitCount <= 8 ? 9 : 7)}
                    y1={yTop}
                    x2={xorX + (bitCount <= 8 ? 9 : 7)}
                    y2={yTop}
                    stroke={isVisibleConnection ? "#6b7280" : "#d1d5db"}
                    strokeWidth="1.5"
                />
                <line
                    x1={xorX}
                    y1={yTop - (bitCount <= 8 ? 9 : 7)}
                    x2={xorX}
                    y2={yTop + (bitCount <= 8 ? 9 : 7)}
                    stroke={isVisibleConnection ? "#6b7280" : "#d1d5db"}
                    strokeWidth="1.5"
                />
                </g>
          );
        }
      }
    }

    return lines;
  };

  return (
    <div>
      <SectionTitle>Schéma encoderu (butterfly)</SectionTitle>

      <div
        style={{
          color: "#6b7280",
          fontSize: 17,
          lineHeight: 1.7,
          marginBottom: 18,
        }}
      >
        V každom stage sa v horných vetvách robí XOR s príslušnou spodnou vetvou
        (spodná vetva ostáva). Čísla pri uzloch ukazujú hodnoty po každom stage.
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: 18,
          overflowX: "auto",
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
        >
          {renderConnections()}

          {Array.from({ length: bitCount }, (_, bitIndex) => (
            <text
              key={`idx-${bitIndex}`}
              x={22}
              y={yAt(bitIndex) + 5}
              fontSize={indexFontSize}
              fill="#374151"
            >
              {bitIndex}
            </text>
          ))}

          {Array.from({ length: stageCount }, (_, stageIndex) => (
            <text
              key={`stage-label-${stageIndex}`}
              x={xAt(stageIndex) - 6}
              y={height - 10}
              fontSize="14"
              fill="#374151"
            >
              {stageIndex}
            </text>
          ))}

          {Array.from({ length: stageCount }, (_, stageIndex) =>
            Array.from({ length: bitCount }, (_, bitIndex) => {
              const x = xAt(stageIndex);
              const y = yAt(bitIndex);
              const value = stages[stageIndex][bitIndex];
              const showValue = stageIndex <= maxVisibleStage;

              return (
                <g key={`node-${stageIndex}-${bitIndex}`}>
                  <circle cx={x} cy={y} r={nodeRadius} fill="#000" />
                  {showValue && (
                    <text
                      x={x + 14}
                      y={y - 2}
                      fontSize={valueFontSize}
                      fill="#111827"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    >
                      {value}
                    </text>
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}