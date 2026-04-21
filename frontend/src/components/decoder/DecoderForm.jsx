import React, { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>N</label>
        <input
          type="number"
          value={N}
          onChange={(e) => setN(e.target.value)}
          style={{ width: "100%", maxWidth: 180, padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          LLR values (comma-separated)
        </label>
        <textarea
          value={llr}
          onChange={(e) => setLlr(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          Mask (comma-separated 0/1)
        </label>
        <textarea
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          rows={2}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Decoding..." : "Run SC Decode"}
      </button>
    </form>
  );
}