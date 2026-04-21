import React from "react";

export default function DecisionSteps({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Decoding steps</h3>

      <div style={{ display: "grid", gap: 12 }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e0e0e0",
              padding: 12,
              borderRadius: 10,
              background: "#fafafa",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              Step {index + 1}: {step.step_type}
            </div>

            <div>offset: {step.offset}</div>
            <div>size: {step.size}</div>

            {step.bit_index !== null && step.bit_index !== undefined && (
              <div>bit_index: {step.bit_index}</div>
            )}

            {step.role && <div>role: {step.role}</div>}

            {step.llr_value !== null && step.llr_value !== undefined && (
              <div>llr_value: {Number(step.llr_value).toFixed(4)}</div>
            )}

            {step.decision !== null && step.decision !== undefined && (
              <div>decision: {step.decision}</div>
            )}

            {step.left_bits && <div>left_bits: [{step.left_bits.join(", ")}]</div>}
            {step.right_bits && <div>right_bits: [{step.right_bits.join(", ")}]</div>}
            {step.combined_bits && (
              <div>combined_bits: [{step.combined_bits.join(", ")}]</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}