import React, { useMemo, useState } from "react";
import ControlGroup from "../common/ControlGroup.jsx";

const N_OPTIONS = [8, 16, 32, 64, 128];
const R_OPTIONS = [0.25, 0.5, 0.75];

function buildEbn0Points(start, end, step) {
  const points = [];
  for (let value = start; value <= end + 1e-9; value += step) {
    points.push(Number(value.toFixed(2)));
  }
  return points;
}

export default function BerSidebarControls({ onSubmit, loading }) {
  const [NList, setNList] = useState([8, 16, 32]);
  const [R, setR] = useState(0.5);
  const [designEbN0, setDesignEbN0] = useState(2);
  const [ebn0Start, setEbn0Start] = useState(0);
  const [ebn0End, setEbn0End] = useState(6);
  const [ebn0Step, setEbn0Step] = useState(0.5);
  const [bitsTarget, setBitsTarget] = useState(100000);
  const [minErrPlot, setMinErrPlot] = useState(30);
  
  const codesPreview = useMemo(() => {
    return NList.map((N) => {
      const K = Math.max(1, Math.min(N - 1, Math.round(N * R)));
      return {
        N,
        K,
        rate: (K / N).toFixed(2),
      };
    });
  }, [NList, R]);

  const toggleN = (value) => {
    setNList((prev) => {
      if (prev.includes(value)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== value);
      }
      return [...prev, value].sort((a, b) => a - b);
    });
  };

  const submitCurrent = () => {
    const payload = {
      codes: codesPreview.map((item) => ({
        N: item.N,
        K: item.K,
      })),
      design_ebn0_db: Number(designEbN0),
      ebn0_points_db: buildEbn0Points(
        Number(ebn0Start),
        Number(ebn0End),
        Number(ebn0Step)
      ),
      bits_target: Number(bitsTarget),
      min_err_plot: Number(minErrPlot),
    };

    onSubmit(payload);
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <ControlGroup title="Vyber dĺžky kódu N">
        <div style={chipsContainer}>
          {N_OPTIONS.map((value) => {
            const active = NList.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleN(value)}
                style={{
                  ...chipButton,
                  ...(active ? chipButtonActive : chipButtonInactive),
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
          min="0"
          max="6"
          step="0.25"
          value={designEbN0}
          onChange={(e) => setDesignEbN0(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Eb/N0 od (dB)">
        <input
          type="number"
          min="0"
          max="20"
          step="0.5"
          value={ebn0Start}
          onChange={(e) => setEbn0Start(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Eb/N0 do (dB)">
        <input
          type="number"
          min="0"
          max="20"
          step="0.5"
          value={ebn0End}
          onChange={(e) => setEbn0End(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Krok Eb/N0">
        <input
          type="number"
          min="0.25"
          max="5"
          step="0.25"
          value={ebn0Step}
          onChange={(e) => setEbn0Step(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Počet prenesených bitov">
        <input
          type="number"
          min="1000"
          step="1000"
          value={bitsTarget}
          onChange={(e) => setBitsTarget(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <ControlGroup title="Min. počet chýb pre vykreslenie bodu">
        <input
          type="number"
          min="1"
          step="1"
          value={minErrPlot}
          onChange={(e) => setMinErrPlot(Number(e.target.value))}
          style={inputStyle}
        />
      </ControlGroup>

      <button
        type="button"
        onClick={submitCurrent}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Počítam..." : "Spustiť simuláciu"}
      </button>

      <div style={previewBox}>
        <div style={previewTitle}>Preview konfigurácií</div>
        <div style={previewList}>
          {codesPreview.map((item) => (
            <div key={item.N}>
              N={item.N}, K={item.K}, R≈{item.rate}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const chipsContainer = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const chipButton = {
  minWidth: 56,
  padding: "10px 16px",
  borderRadius: 16,
  border: "1px solid #cfd8e6",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  transition: "0.15s ease",
};

const chipButtonActive = {
  background: "#e67e63",
  color: "#fff",
  borderColor: "#e67e63",
};

const chipButtonInactive = {
  background: "#fff",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #d8dee8",
  background: "#fff",
  fontSize: 16,
};

const buttonStyle = {
  marginTop: 8,
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  padding: "14px 18px",
  borderRadius: 16,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

const previewBox = {
  marginTop: 18,
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #d8dee8",
  background: "#f8fafc",
};

const previewTitle = {
  fontSize: 16,
  fontWeight: 700,
  color: "#374151",
  marginBottom: 10,
};

const previewList = {
  display: "grid",
  gap: 8,
  color: "#4b5563",
  fontSize: 15,
  lineHeight: 1.6,
};