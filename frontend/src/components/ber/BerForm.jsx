import React, { useMemo, useState } from "react";
import ControlGroup from "../common/ControlGroup.jsx";

const N_OPTIONS = [8, 16, 32, 64, 128];
const R_OPTIONS = [0.25, 0.5, 0.75];

function buildEbn0Points(start, stop, step) {
  const points = [];
  let current = Number(start);

  while (current <= Number(stop) + 1e-9) {
    points.push(Number(current.toFixed(6)));
    current += Number(step);
  }

  return points;
}

export default function BerForm({ onSubmit, loading }) {
  const [selectedN, setSelectedN] = useState([8, 16, 32]);
  const [R, setR] = useState(0.5);
  const [designEbN0, setDesignEbN0] = useState(2.0);
  const [ebn0Start, setEbn0Start] = useState(0);
  const [ebn0Stop, setEbn0Stop] = useState(6);
  const [ebn0Step, setEbn0Step] = useState(0.5);
  const [bitsTarget, setBitsTarget] = useState(100000);
  const [minErrPlot, setMinErrPlot] = useState(30);

  const codesPreview = useMemo(() => {
    return selectedN.map((N) => {
      let K = Math.round(N * R);
      K = Math.max(1, Math.min(K, N - 1));
      return {
        N,
        K,
        R: (K / N).toFixed(2),
      };
    });
  }, [selectedN, R]);

  const toggleN = (value) => {
    setSelectedN((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value].sort((a, b) => a - b);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedN.length) return;
    if (Number(ebn0Stop) <= Number(ebn0Start)) return;
    if (Number(ebn0Step) <= 0) return;

    const codes = selectedN.map((N) => {
      let K = Math.round(N * R);
      K = Math.max(1, Math.min(K, N - 1));
      return { N, K };
    });

    const ebn0_points_db = buildEbn0Points(ebn0Start, ebn0Stop, ebn0Step);

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
      <ControlGroup title="Vyber dĺžky kódu N">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {N_OPTIONS.map((value) => {
            const active = selectedN.includes(value);

            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleN(value)}
                style={{
                  ...chipStyle,
                  background: active ? "#ef6b5b" : "#ffffff",
                  color: active ? "#ffffff" : "#374151",
                  border: active
                    ? "1px solid #ef6b5b"
                    : "1px solid #d8dee8",
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </ControlGroup>

      <ControlGroup title="Kódový pomer R">
        <select
          value={R}
          onChange={(e) => setR(Number(e.target.value))}
          style={inputStyle}
        >
          {R_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </ControlGroup>

      <ControlGroup title="Design Eb/N0 (dB)">
        <input
          type="number"
          value={designEbN0}
          step="0.5"
          onChange={(e) => setDesignEbN0(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Eb/N0 od (dB)">
        <input
          type="number"
          value={ebn0Start}
          step="0.5"
          onChange={(e) => setEbn0Start(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Eb/N0 do (dB)">
        <input
          type="number"
          value={ebn0Stop}
          step="0.5"
          onChange={(e) => setEbn0Stop(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Krok Eb/N0">
        <input
          type="number"
          value={ebn0Step}
          step="0.5"
          onChange={(e) => setEbn0Step(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Počet prenesených bitov">
        <input
          type="number"
          value={bitsTarget}
          step="1000"
          min="1000"
          onChange={(e) => setBitsTarget(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Min. počet chýb pre vykreslenie bodu">
        <input
          type="number"
          value={minErrPlot}
          step="1"
          min="1"
          onChange={(e) => setMinErrPlot(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <button
        type="submit"
        disabled={loading || selectedN.length === 0}
        style={{
          marginTop: 8,
          padding: "14px 18px",
          borderRadius: 16,
          border: "1px solid #d8dee8",
          background: loading ? "#e5e7eb" : "#ffffff",
          color: "#374151",
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Simulácia prebieha..." : "Spustiť simuláciu"}
      </button>

      <div
        style={{
          marginTop: 18,
          padding: "14px 16px",
          borderRadius: 16,
          background: "#f8fafc",
          border: "1px solid #d8dee8",
          color: "#374151",
          lineHeight: 1.8,
          fontSize: 15,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>
          Preview konfigurácií
        </div>

        {codesPreview.map((item) => (
          <div key={item.N}>
            N={item.N}, K={item.K}, R≈{item.R}
          </div>
        ))}
      </div>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #d8dee8",
  background: "#fff",
  fontSize: 16,
};

const chipStyle = {
  padding: "10px 16px",
  borderRadius: 14,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};