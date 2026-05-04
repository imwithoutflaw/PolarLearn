import React from "react";

export default function DecoderTreeView({ steps = [], visibleStep = 0 }) {
  if (!steps.length) return null;

  const leafSteps = steps.filter((step) => step.step_type === "leaf_decision");
  const N = leafSteps.length || 1;
  const depth = Math.ceil(Math.log2(N));

  const visibleSteps = steps.slice(0, visibleStep);
  const currentStep = visibleStep > 0 ? steps[visibleStep - 1] : null;

  const processedRanges = visibleSteps.map((step) => {
    if (step.step_type === "leaf_decision") {
      const index = step.bit_index;
      return { start: index, end: index, type: "leaf" };
    }

    if (step.step_type === "combine") {
      return {
        start: step.offset,
        end: step.offset + step.size - 1,
        type: "combine",
      };
    }

    return null;
  }).filter(Boolean);

  const width = 1000;
  const height = Math.max(360, N * 56);
  const marginLeft = 110;
  const marginRight = 110;
  const marginTop = 45;
  const marginBottom = 55;

  const xStep = (width - marginLeft - marginRight) / depth;
  const yStep = (height - marginTop - marginBottom) / Math.max(1, N - 1);

  function getNodePosition(level, leafStart, leafEnd) {
    return {
      x: marginLeft + level * xStep,
      y: marginTop + ((leafStart + leafEnd) / 2) * yStep,
    };
  }

  function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    return aStart <= bEnd && bStart <= aEnd;
  }

  function sameRange(range, start, end) {
    return range?.start === start && range?.end === end;
  }

  function getCurrentRange() {
    if (!currentStep) return null;

    if (currentStep.step_type === "leaf_decision") {
      return {
        start: currentStep.bit_index,
        end: currentStep.bit_index,
        type: "leaf",
      };
    }

    if (currentStep.step_type === "combine") {
      return {
        start: currentStep.offset,
        end: currentStep.offset + currentStep.size - 1,
        type: "combine",
      };
    }

    return null;
  }

  const currentRange = getCurrentRange();

  function buildEdges(level, leafStart, leafEnd, edges = []) {
    if (level === depth || leafStart === leafEnd) {
      return edges;
    }

    const mid = Math.floor((leafStart + leafEnd) / 2);

    const parent = getNodePosition(level, leafStart, leafEnd);
    const leftChild = getNodePosition(level + 1, leafStart, mid);
    const rightChild = getNodePosition(level + 1, mid + 1, leafEnd);

    edges.push({
      from: parent,
      to: leftChild,
      parentStart: leafStart,
      parentEnd: leafEnd,
      childStart: leafStart,
      childEnd: mid,
    });

    edges.push({
      from: parent,
      to: rightChild,
      parentStart: leafStart,
      parentEnd: leafEnd,
      childStart: mid + 1,
      childEnd: leafEnd,
    });

    buildEdges(level + 1, leafStart, mid, edges);
    buildEdges(level + 1, mid + 1, leafEnd, edges);

    return edges;
  }

  function buildNodes(level, leafStart, leafEnd, nodes = []) {
    const position = getNodePosition(level, leafStart, leafEnd);

    nodes.push({
      ...position,
      level,
      leafStart,
      leafEnd,
      isLeaf: level === depth || leafStart === leafEnd,
    });

    if (level === depth || leafStart === leafEnd) {
      return nodes;
    }

    const mid = Math.floor((leafStart + leafEnd) / 2);

    buildNodes(level + 1, leafStart, mid, nodes);
    buildNodes(level + 1, mid + 1, leafEnd, nodes);

    return nodes;
  }

  function edgeIsProcessed(edge) {
    return processedRanges.some((range) =>
      rangesOverlap(edge.childStart, edge.childEnd, range.start, range.end)
    );
  }

  function nodeIsProcessed(node) {
    return processedRanges.some((range) =>
      rangesOverlap(node.leafStart, node.leafEnd, range.start, range.end)
    );
  }

  function edgeIsCurrent(edge) {
    if (!currentRange) return false;

    if (currentRange.type === "leaf") {
      return (
        currentRange.start >= edge.childStart &&
        currentRange.start <= edge.childEnd
      );
    }

    if (currentRange.type === "combine") {
      return (
        rangesOverlap(
          edge.childStart,
          edge.childEnd,
          currentRange.start,
          currentRange.end
        ) &&
        edge.parentStart >= currentRange.start &&
        edge.parentEnd <= currentRange.end
      );
    }

    return false;
  }

  function nodeIsCurrent(node) {
    if (!currentRange) return false;

    return sameRange(currentRange, node.leafStart, node.leafEnd);
  }

  const edges = buildEdges(0, 0, N - 1);
  const nodes = buildNodes(0, 0, N - 1);

  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 30 }}>
        SC dekódovanie – vizualizácia krokov (strom)
      </h2>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          background: "#fff",
          padding: 16,
          overflowX: "auto",
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            width: "100%",
            minWidth: 860,
            height: "auto",
            display: "block",
          }}
        >
          {edges.map((edge, index) => {
            const current = edgeIsCurrent(edge);
            const processed = edgeIsProcessed(edge);

            return (
              <line
                key={`edge-${index}`}
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                stroke={
                  current
                    ? "#ec4899"
                    : processed
                      ? "#111827"
                      : "#d1d5db"
                }
                strokeWidth={current ? 4.5 : processed ? 3.2 : 2}
                strokeLinecap="round"
              />
            );
          })}

          {nodes.map((node, index) => {
            const current = nodeIsCurrent(node);
            const processed = nodeIsProcessed(node);

            return (
              <circle
                key={`node-${index}`}
                cx={node.x}
                cy={node.y}
                r={current ? 8 : 5.5}
                fill={
                  current
                    ? "#ec4899"
                    : processed
                      ? "#111827"
                      : "#cbd5e1"
                }
              />
            );
          })}

          {leafSteps.map((step, index) => {
            const pos = getNodePosition(depth, index, index);
            const processed = processedRanges.some((range) =>
              rangesOverlap(index, index, range.start, range.end)
            );
            const current =
              currentRange?.type === "leaf" &&
              currentRange.start === index &&
              currentRange.end === index;

            return (
              <g key={`leaf-label-${index}`}>
                <text
                  x={pos.x - 28}
                  y={pos.y - 10}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill={
                    current
                      ? "#ec4899"
                      : processed
                        ? "#111827"
                        : "#94a3b8"
                  }
                >
                  {step.role === "frozen" ? "F" : "I"}
                </text>

                <text
                  x={pos.x + 28}
                  y={pos.y + 6}
                  fontSize="18"
                  fontWeight="700"
                  fill={
                    current
                      ? "#ec4899"
                      : processed
                        ? "#111827"
                        : "#94a3b8"
                  }
                >
                  {processed ? step.decision ?? "" : ""}
                </text>
              </g>
            );
          })}

          {Array.from({ length: N }, (_, index) => {
            const y = marginTop + index * yStep;

            return (
              <text
                key={`index-${index}`}
                x={marginLeft - 55}
                y={y + 5}
                fontSize="15"
                fill="#374151"
                textAnchor="middle"
              >
                {index}
              </text>
            );
          })}

          {Array.from({ length: depth + 1 }, (_, level) => {
            const x = marginLeft + level * xStep;

            return (
              <text
                key={`depth-${level}`}
                x={x}
                y={height - 22}
                fontSize="15"
                fill="#374151"
                textAnchor="middle"
              >
                {level}
              </text>
            );
          })}

          <text
            x={38}
            y={height / 2}
            fontSize="17"
            fill="#374151"
            textAnchor="middle"
            transform={`rotate(-90, 38, ${height / 2})`}
          >
            Index bitu (listy)
          </text>

          <text
            x={width / 2}
            y={height - 6}
            fontSize="17"
            fill="#374151"
            textAnchor="middle"
          >
            Úroveň stromu (depth)
          </text>
        </svg>
      </div>
    </div>
  );
}