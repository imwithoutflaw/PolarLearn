import React, { useState } from "react";

export default function MaskForm({ onSubmit, loading }) {
  const [N, setN] = useState(8);
  const [K, setK] = useState(4);
  const [designEbN0, setDesignEbN0] = useState(2.0);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      N: Number(N),
      K: Number(K),
      design_ebn0_db: Number(designEbN0),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #d0d0d0",
        padding: 16,
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>N</label>
          <input
            type="number"
            value={N}
            onChange={(e) => setN(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>K</label>
          <input
            type="number"
            value={K}
            onChange={(e) => setK(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Design Eb/N0 (dB)</label>
          <input
            type="number"
            step="0.1"
            value={designEbN0}
            onChange={(e) => setDesignEbN0(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Building..." : "Construct Mask"}
      </button>
    </form>
  );
}