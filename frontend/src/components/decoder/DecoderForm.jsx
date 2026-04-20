import { useState } from "react";

function parseNumberArray(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map(Number);
}

export default function DecoderForm({ onSubmit, loading }) {
  const [N, setN] = useState(8);
  const [llr, setLlr] = useState("5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5");
  const [mask, setMask] = useState("0, 0, 0, 1, 0, 1, 1, 1");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      N: Number(N),
      llr: parseNumberArray(llr),
      mask: parseNumberArray(mask),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: 16, marginTop: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <label>N</label>
        <br />
        <input
          type="number"
          value={N}
          onChange={(e) => setN(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>LLR values</label>
        <br />
        <textarea
          value={llr}
          onChange={(e) => setLlr(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Mask</label>
        <br />
        <textarea
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          rows={2}
          style={{ width: "100%" }}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Decoding..." : "Run SC Decode"}
      </button>
    </form>
  );
}