export default function FinalEstimateCard({ estimatedBits }) {
  if (!estimatedBits) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: 16 }}>
      <h3>Estimated information bits</h3>
      <div>[{estimatedBits.join(", ")}]</div>
    </div>
  );
}