import React, { useMemo, useState } from "react";

const AVAILABLE_N = [8, 16, 32, 64, 128];
const AVAILABLE_R = [0.25, 0.5, 0.75];

function buildEbn0Range(start, stop, step) {
  const values = [];
  const epsilon = 1e-9;

  for (let x = start; x <= stop + epsilon; x += step) {
    values.push(Number(x.toFixed(6)));
  }

  return values;
}

function toggleValue(list, value) {
  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  }
  return [...list, value].sort((a, b) => a - b);
}

export default function BerForm({ onSubmit, loading }) {
  const [NList, setNList] = useState([8, 16, 32]);
  const [R, setR] = useState(0.5);
  const [ebStart, setEbStart] = useState(0.0);
  const [ebStop, setEbStop] = useState(6.0);
  const [ebStep, setEbStep] = useState(0.5);
  const [bitsTarget, setBitsTarget] = useState(100000);
  const [minErrPlot, setMinErrPlot] = useState(30);
  const [designEbN0, setDesignEbN0] = useState(2.0);

  const previewCodes = useMemo(() => {
    return NList.map((N) => {
      let K = Math.round(R * N);
      K = Math.max(1, Math.min(K, N - 1));
      return { N, K, rate: K / N };
    });
  }, [NList, R]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (NList.length === 0) {
      onSubmit(null);
      return;
    }

    const codes = NList.map((N) => {
      let K = Math.round(R * N);
      K = Math.max(1, Math.min(K, N - 1));
      return { N, K };
    });

    const ebn0_points_db = buildEbn0Range(
      Number(ebStart),
      Number(ebStop),
      Number(ebStep)
    );

    onSubmit({
      codes,
      design_ebn0_db: Number(designEbN0),
      ebn0_points_db,
      bits_target: Number(bitsTarget),
      min_err_plot: Number(minErrPlot),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Vyber dĺžky kódu N
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            padding: 14,
            borderRadius: 14,
            background: "#fff",
            border: "1px solid #d8d8d8",
          }}
        >
          {AVAILABLE_N.map((value) => {
            const selected = NList.includes(value);

            return (
              <button
                key={value}
                type="button"
                onClick={() => setNList((prev) => toggleValue(prev, value))}
                style={{
                  border: selected ? "1px solid #ef5350" : "1px solid #ccc",
                  background: selected ? "#ff5a52" : "#f7f7f7",
                  color: selected ? "#fff" : "#222",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Kódový pomer R
        </div>

        <select
          value={R}
          onChange={(e) => setR(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        >
          {AVAILABLE_R.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Design Eb/N0 (dB)
        </div>

        <input
          type="number"
          step="0.1"
          value={designEbN0}
          onChange={(e) => setDesignEbN0(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Eb/N0 od (dB)
        </div>
        <input
          type="number"
          step="0.5"
          value={ebStart}
          onChange={(e) => setEbStart(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Eb/N0 do (dB)
        </div>
        <input
          type="number"
          step="0.5"
          value={ebStop}
          onChange={(e) => setEbStop(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Krok Eb/N0
        </div>
        <input
          type="number"
          step="0.25"
          value={ebStep}
          onChange={(e) => setEbStep(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Počet prenesených bitov
        </div>
        <input
          type="number"
          value={bitsTarget}
          onChange={(e) => setBitsTarget(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
          Min. počet chýb pre vykreslenie bodu
        </div>
        <input
          type="number"
          value={minErrPlot}
          onChange={(e) => setMinErrPlot(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d8d8d8",
            background: "#fff",
            fontSize: 16,
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading || NList.length === 0}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: 14,
          border: "1px solid #111",
          background: loading ? "#444" : "#111",
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Prebieha simulácia..." : "Spustiť simuláciu"}
      </button>

      <div
        style={{
          marginTop: 20,
          padding: 14,
          borderRadius: 14,
          background: "#fff",
          border: "1px solid #e1e1e1",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Preview konfigurácií</div>
        {previewCodes.map((item) => (
          <div key={item.N}>
            N={item.N}, K={item.K}, R≈{item.rate.toFixed(2)}
          </div>
        ))}
      </div>
    </form>
  );
}