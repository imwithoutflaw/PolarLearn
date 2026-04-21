import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";

function buildNodePositions(levels, leafCount, width, height, paddingX = 140, paddingY = 36) {
  const pos = {};
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  for (let level = levels; level >= 0; level -= 1) {
    const nodesInLevel = 2 ** level;

    // root left, leaves right
    const x = paddingX + (level / levels) * usableWidth;

    for (let i = 0; i < nodesInLevel; i += 1) {
      if (level === levels) {
        const y =
          paddingY + (i / Math.max(leafCount - 1, 1)) * usableHeight;
        pos[`${level}-${i}`] = { x, y };
      } else {
        const left = pos[`${level + 1}-${2 * i}`];
        const right = pos[`${level + 1}-${2 * i + 1}`];
        pos[`${level}-${i}`] = {
          x,
          y: (left.y + right.y) / 2,
        };
      }
    }
  }

  return pos;
}

function getPathToLeaf(leafIndex, levels) {
  const path = [];
  let nodeIndex = 0;

  path.push({ level: 0, index: 0 });

  for (let level = 1; level <= levels; level += 1) {
    const bit = (leafIndex >> (levels - level)) & 1;
    nodeIndex = nodeIndex * 2 + bit;
    path.push({ level, index: nodeIndex });
  }

  return path;
}

function edgeKey(a, b) {
  return `${a.level}-${a.index}->${b.level}-${b.index}`;
}

export default function DecoderTreeView({ steps }) {
  if (!steps || steps.length === 0) return null;

  const leafSteps = steps
    .map((step, idx) => {
      const bitIndex =
        step.bit_index ??
        step.index_l ??
        step.index ??
        idx;

      const role =
        step.role ??
        step.type ??
        (step.step_type === "leaf_decision" ? "info" : undefined) ??
        "info";

      const decision = step.decision ?? 0;

      return {
        bitIndex,
        role,
        decision,
      };
    })
    .filter((step) => Number.isInteger(step.bitIndex));

  const maxLeafIndex = leafSteps.length
    ? Math.max(...leafSteps.map((s) => s.bitIndex))
    : 1;

  const leafCount = 2 ** Math.ceil(Math.log2(Math.max(maxLeafIndex + 1, 2)));
  const levels = Math.round(Math.log2(leafCount));

  const width = 1180;
  const height = 620;
  const positions = buildNodePositions(levels, leafCount, width, height);

  const highlightedEdges = new Set();
  const highlightedNodes = new Set();
  const revealedLeaves = new Map();

  leafSteps.forEach((step, i) => {
    const path = getPathToLeaf(step.bitIndex, levels);

    path.forEach((node) => {
      highlightedNodes.add(`${node.level}-${node.index}`);
    });

    for (let k = 0; k < path.length - 1; k += 1) {
      highlightedEdges.add(edgeKey(path[k], path[k + 1]));
    }

    revealedLeaves.set(step.bitIndex, {
      ...step,
      isCurrent: i === leafSteps.length - 1,
    });
  });

  const edges = [];
  for (let level = 0; level < levels; level += 1) {
    const nodesInLevel = 2 ** level;

    for (let i = 0; i < nodesInLevel; i += 1) {
      const parent = { level, index: i };
      const left = { level: level + 1, index: i * 2 };
      const right = { level: level + 1, index: i * 2 + 1 };

      edges.push([parent, left]);
      edges.push([parent, right]);
    }
  }

  return (
    <div>
      <SectionTitle>SC dekódovanie – vizualizácia krokov (strom)</SectionTitle>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: 20,
          overflowX: "auto",
        }}
      >
        <svg width="100%" height="640" viewBox={`0 0 ${width} ${height}`}>
          {edges.map(([a, b], idx) => {
            const pa = positions[`${a.level}-${a.index}`];
            const pb = positions[`${b.level}-${b.index}`];
            const isActive = highlightedEdges.has(edgeKey(a, b));

            return (
              <line
                key={idx}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={isActive ? "#555" : "#d9d9d9"}
                strokeWidth={isActive ? 3.5 : 2}
                strokeLinecap="round"
              />
            );
          })}

          {Array.from({ length: levels + 1 }, (_, level) => {
            const nodesInLevel = 2 ** level;

            return Array.from({ length: nodesInLevel }, (_, i) => {
              const p = positions[`${level}-${i}`];
              const isActive = highlightedNodes.has(`${level}-${i}`);

              return (
                <circle
                  key={`${level}-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={level === levels ? 7 : 5}
                  fill={isActive ? "#111" : "#cfcfcf"}
                />
              );
            });
          })}

          {Array.from({ length: leafCount }, (_, leafIndex) => {
            const p = positions[`${levels}-${leafIndex}`];
            const leaf = revealedLeaves.get(leafIndex);

            if (!leaf) {
              return (
                <text
                  key={`leaf-idx-${leafIndex}`}
                  x={70}
                  y={p.y + 5}
                  fontSize="16"
                  fill="#555"
                >
                  {leafIndex}
                </text>
              );
            }

            const roleLabel = leaf.role === "frozen" ? "F" : "I";

            return (
              <g key={`leaf-label-${leafIndex}`}>
                <text
                  x={70}
                  y={p.y + 5}
                  fontSize="16"
                  fill="#555"
                >
                  {leafIndex}
                </text>

                <text
                  x={p.x - 34}
                  y={p.y - 10}
                  fontSize="18"
                  fill={leaf.isCurrent ? "#444" : "#7a7a7a"}
                  fontWeight={leaf.isCurrent ? 700 : 500}
                  textAnchor="middle"
                >
                  {roleLabel}
                </text>

                <text
                  x={p.x + 24}
                  y={p.y + 6}
                  fontSize="22"
                  fill="#111"
                  fontWeight={leaf.isCurrent ? 700 : 500}
                >
                  {leaf.decision}
                </text>
              </g>
            );
          })}

          {Array.from({ length: levels + 1 }, (_, level) => {
            const x = positions[`${level}-0`].x;
            return (
              <text
                key={`xidx-${level}`}
                x={x}
                y={height - 14}
                fontSize="16"
                fill="#555"
                textAnchor="middle"
              >
                {level}
              </text>
            );
          })}

          <text
            x={width / 2}
            y={height - 40}
            fontSize="18"
            fill="#555"
            textAnchor="middle"
          >
            Úroveň stromu (depth)
          </text>

          <text
            x={32}
            y={height / 2}
            transform={`rotate(-90 32 ${height / 2})`}
            fontSize="18"
            fill="#555"
            textAnchor="middle"
          >
            Index bitu (listy)
          </text>
        </svg>
      </div>
    </div>
  );
}