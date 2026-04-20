export default function DecisionSteps({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: 16 }}>
      <h3>Decoding steps</h3>

      {steps.map((step, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}
        >
          <div><strong>Step {index + 1}</strong></div>
          <div>type: {step.step_type}</div>
          <div>offset: {step.offset}</div>
          <div>size: {step.size}</div>

          {step.bit_index !== null && step.bit_index !== undefined && (
            <div>bit_index: {step.bit_index}</div>
          )}

          {step.role && <div>role: {step.role}</div>}

          {step.llr_value !== null && step.llr_value !== undefined && (
            <div>llr_value: {step.llr_value}</div>
          )}

          {step.decision !== null && step.decision !== undefined && (
            <div>decision: {step.decision}</div>
          )}

          {step.left_bits && <div>left_bits: [{step.left_bits.join(", ")}]</div>}
          {step.right_bits && <div>right_bits: [{step.right_bits.join(", ")}]</div>}
          {step.combined_bits && <div>combined_bits: [{step.combined_bits.join(", ")}]</div>}
        </div>
      ))}
    </div>
  );
}