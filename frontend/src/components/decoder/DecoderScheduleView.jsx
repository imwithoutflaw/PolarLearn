import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

export default function DecoderScheduleView({ steps = [], visibleStep = 0 }) {
  if (!steps.length) return null;

  const leafSteps = steps.filter((step) => step.step_type === "leaf_decision");
  const N = leafSteps.length || 8;
  const n = Math.log2(N);

  const width = 1200;
  const height = Math.max(460, N * 58 + 90);

  const marginLeft = 120;
  const marginRight = 120;
  const marginTop = 60;
  const marginBottom = 70;

  const xStep = (width - marginLeft - marginRight) / n;
  const yStep = (height - marginTop - marginBottom) / (N - 1);

  const getX = (stage) => marginLeft + stage * xStep;
  const getY = (index) => marginTop + index * yStep;

  const totalSteps = Math.max(steps.length, 1);
  const progress = Math.min(1, Math.max(0, visibleStep / totalSteps));

  function buildFullButterflyEdges() {
    const edges = [];

    for (let stage = 0; stage < n; stage += 1) {
      const distance = 2 ** (n - stage - 1);

      for (let i = 0; i < N; i += 1) {
        edges.push({
          type: "horizontal",
          stage,
          from: i,
          to: i,
        });
      }

      for (let i = 0; i < N; i += 2 * distance) {
        for (let j = 0; j < distance; j += 1) {
          const top = i + j;
          const bottom = i + j + distance;

          edges.push({
            type: "diagonal",
            stage,
            from: top,
            to: bottom,
          });

          edges.push({
            type: "diagonal",
            stage,
            from: bottom,
            to: top,
          });
        }
      }
    }

    return edges;
  }

  const edges = buildFullButterflyEdges();
  const activeEdgeCount = Math.round(edges.length * progress);

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
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ minWidth: 900, display: "block" }}
        >
          {edges.map((edge, index) => {
            const active = index < activeEdgeCount;
            const current = index === activeEdgeCount - 1 && visibleStep > 0;

            return (
              <line
                key={`edge-${index}`}
                x1={getX(edge.stage)}
                y1={getY(edge.from)}
                x2={getX(edge.stage + 1)}
                y2={getY(edge.to)}
                stroke={current ? "#ec4899" : active ? "#ef4444" : "#e5e7eb"}
                strokeWidth={current ? 4 : active ? 2.7 : 1.5}
                strokeLinecap="round"
              />
            );
          })}

          {Array.from({ length: n + 1 }, (_, stage) =>
            Array.from({ length: N }, (_, index) => {
              const nodeProgressIndex =
                Math.round((stage / n) * edges.length) + index;

              const active =
                visibleStep >= totalSteps ||
                nodeProgressIndex < activeEdgeCount;

              return (
                <circle
                  key={`node-${stage}-${index}`}
                  cx={getX(stage)}
                  cy={getY(index)}
                  r={active ? 7 : 5}
                  fill={active ? "#fef08a" : "#000"}
                  stroke={active ? "#111827" : "none"}
                  strokeWidth="1.4"
                />
              );
            })
          )}

          {Array.from({ length: N }, (_, index) => (
            <text
              key={`index-${index}`}
              x={marginLeft - 35}
              y={getY(index) + 5}
              fontSize="14"
              fill="#374151"
              textAnchor="middle"
            >
              {index}
            </text>
          ))}

          {Array.from({ length: n + 1 }, (_, stage) => (
            <text
              key={`stage-${stage}`}
              x={getX(stage)}
              y={height - 30}
              fontSize="14"
              fill="#374151"
              textAnchor="middle"
            >
              {stage}
            </text>
          ))}

          <text
            x={width / 2}
            y={height - 8}
            fontSize="16"
            fill="#374151"
            textAnchor="middle"
          >
            Stage
          </text>
        </svg>
      </div>
    </div>
  );
}