import DecoderForm from "../components/decoder/DecoderForm.jsx";
import DecisionSteps from "../components/decoder/DecisionSteps.jsx";
import FinalEstimateCard from "../components/decoder/FinalEstimateCard.jsx";
import { useDecoder } from "../hooks/useDecoder.js";

export default function DecoderPage() {
  const { result, loading, error, decode } = useDecoder();

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <h1>SC Decoder</h1>
      <p>Run baseline successive cancellation decoding and inspect each decision step.</p>

      <DecoderForm onSubmit={decode} loading={loading} />

      {error && (
        <div style={{ marginTop: "16px", color: "red" }}>
          {error}
        </div>
      )}

      {result && (
        <>
          <div style={{ marginTop: "24px" }}>
            <FinalEstimateCard estimatedBits={result.estimated_bits} />
          </div>
          <div style={{ marginTop: "24px" }}>
            <DecisionSteps steps={result.steps} />
          </div>
        </>
      )}
    </div>
  );
}