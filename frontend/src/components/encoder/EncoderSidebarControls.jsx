import React, { useEffect, useMemo, useRef, useState } from "react";
import ControlGroup from "../common/ControlGroup.jsx";
import SidebarPanelTitle from "../common/SidebarPanelTitle.jsx";

const N_OPTIONS = [8, 16, 32, 64];
const R_OPTIONS = [0.25, 0.5, 0.75];

function buildDefaultBits(K) {
  return Array.from({ length: K }, (_, i) => (i % 2 === 0 ? 1 : 0)).join(", ");
}

function parseBits(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map(Number);
}

export default function EncoderSidebarControls({ onSubmit, loading }) {
  const [N, setN] = useState(8);
  const [R, setR] = useState(0.5);
  const [designEbN0, setDesignEbN0] = useState(2.0);
  const [infoBits, setInfoBits] = useState(buildDefaultBits(4));
  const initializedRef = useRef(false);

  const K = useMemo(() => {
    let value = Math.round(N * R);
    value = Math.max(1, Math.min(value, N - 1));
    return value;
  }, [N, R]);

  useEffect(() => {
    setInfoBits(buildDefaultBits(K));
  }, [K]);

  const submitCurrent = () => {
    onSubmit({
      N,
      K,
      design_ebn0_db: designEbN0,
      info_bits: parseBits(infoBits),
    });
  };

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      submitCurrent();
    }
  }, []);

  return (
    <div>
      <SidebarPanelTitle>Parametre kódu</SidebarPanelTitle>

      <ControlGroup title="Dĺžka kódu N">
        <select
          value={N}
          onChange={(e) => setN(Number(e.target.value))}
          style={inputStyle}
        >
          {N_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
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

      <ControlGroup title="Návrhové Eb/N0 (dB)">
        <input
          type="range"
          min="0"
          max="6"
          step="0.25"
          value={designEbN0}
          onChange={(e) => setDesignEbN0(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={sliderValueStyle}>{Number(designEbN0).toFixed(2)}</div>
      </ControlGroup>

      <ControlGroup title={`Zadaj ${K} bitov (oddelené čiarkou)`}>
        <textarea
          value={infoBits}
          onChange={(e) => setInfoBits(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
      </ControlGroup>

      <button
        type="button"
        onClick={submitCurrent}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Počítam..." : "Spustiť encoder"}
      </button>
    </div>
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

const textareaStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #d8dee8",
  background: "#fff",
  fontSize: 16,
  resize: "vertical",
  fontFamily: "inherit",
};

const sliderValueStyle = {
  marginTop: 8,
  color: "#ef4444",
  fontWeight: 700,
  fontSize: 15,
};

const buttonStyle = {
  marginTop: 6,
  width: "100%",
  padding: "14px 18px",
  borderRadius: 16,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};