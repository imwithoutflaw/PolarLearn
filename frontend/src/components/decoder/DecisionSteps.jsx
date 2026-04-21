import React from "react";
import BitRoleBadge from "./BitRoleBadge.jsx";

function getStepColor(type) {
  if (type === "leaf_decision") return "#f8fbff";
  if (type === "combine") return "#f6fbf7";
  return "#f5f5f5";
}

function Row({ label, children }) {
  return (
    <div style={{ marginTop: 6 }}>
      <span style={{ color: "#555", fontWeight: 600 }}>{label}: </span>
      <span>{children}</span>
    </div>
  );
}

export default function DecisionSteps({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 16 }}>Decoding steps</h3>

      <div style={{ display: "grid", gap: 14 }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e0e0e0",
              padding: 14,
              borderRadius: 14,
              background: getStepColor(step.step_type),
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <div style={{ fontWeight: 700 }}>
                Step {index + 1} • {step.step_type}
              </div>

              {step.role && <BitRoleBadge role={step.role} />}
            </div>

            {step.step_type === "leaf_decision" && (
              <>
                <Row label="Bit">{step.bit_index}</Row>
                <Row label="Offset">{step.offset}</Row>
                <Row label="LLR">{Number(step.llr_value).toFixed(3)}</Row>
                <Row label="Decision">
                  <strong>{step.decision}</strong>
                </Row>
              </>
            )}

            {step.step_type === "combine" && (
              <>
                <Row label="Offset">{step.offset}</Row>
                <Row label="Size">{step.size}</Row>
                <Row label="Left">[{step.left_bits?.join(", ")}]</Row>
                <Row label="Right">[{step.right_bits?.join(", ")}]</Row>
                <Row label="Result">
                  <strong>[{step.combined_bits?.join(", ")}]</strong>
                </Row>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}