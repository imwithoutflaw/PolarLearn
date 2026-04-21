import React, { useEffect, useMemo, useRef, useState } from "react";
import ControlGroup from "../common/ControlGroup.jsx";
import SidebarPanelTitle from "../common/SidebarPanelTitle.jsx";

const N_OPTIONS = [8, 16, 32, 64];
const R_OPTIONS = [0.25, 0.5, 0.75];

export default function MaskSidebarControls({ onSubmit, loading }) {
  const [N, setN] = useState(8);
  const [R, setR] = useState(0.5);
  const [designEbN0, setDesignEbN0] = useState(2.0);
  const initializedRef = useRef(false);

  const K = useMemo(() => {
    let value = Math.round(N * R);
    value = Math.max(1, Math.min(value, N - 1));
    return value;
  }, [N, R]);

  const submitCurrent = () => {
    onSubmit({
      N,
      K,
      design_ebn0_db: designEbN0,
    });
  };

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      submitCurrent();
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) {
      submitCurrent();
    }
  }, [N, K, designEbN0]);

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
        <div
          style={{
            marginTop: 8,
            color: "#ef4444",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {Number(designEbN0).toFixed(2)}
        </div>
      </ControlGroup>

      <div
        style={{
          marginTop: 18,
          padding: "14px 16px",
          borderRadius: 16,
          background: "#f8fafc",
          border: "1px solid #d8dee8",
          color: "#374151",
          lineHeight: 1.8,
          fontSize: 16,
        }}
      >
        <div><strong>N</strong> = {N}</div>
        <div><strong>K</strong> = {K}</div>
        <div><strong>R</strong> = {(K / N).toFixed(2)}</div>
      </div>

      {loading && (
        <div style={{ marginTop: 16, color: "#6b7280", fontSize: 15 }}>
          Počítam masku...
        </div>
      )}
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