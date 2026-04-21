import React, { useEffect, useMemo, useRef, useState } from "react";
import ControlGroup from "../common/ControlGroup.jsx";
import SidebarPanelTitle from "../common/SidebarPanelTitle.jsx";

const N_OPTIONS = [8, 16, 32, 64];
const R_OPTIONS = [0.25, 0.5, 0.75];

function buildMask(N, K) {
  const mask = Array(N).fill(0);
  const start = N - K;
  for (let i = start; i < N; i += 1) {
    mask[i] = 1;
  }
  return mask.join(", ");
}

function buildLlr(N) {
  const base = [5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5];
  return Array.from({ length: N }, (_, i) => base[i % base.length]).join(", ");
}

function parseNumberArray(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map(Number);
}

export default function DecoderSidebarControls({ onSubmit, loading }) {
  const [N, setN] = useState(8);
  const [R, setR] = useState(0.5);
  const [designEbN0Mask, setDesignEbN0Mask] = useState(2.0);
  const [channelEbN0, setChannelEbN0] = useState(2.0);
  const [channelMode, setChannelMode] = useState("ideal");
  const [llr, setLlr] = useState(buildLlr(8));
  const [mask, setMask] = useState(buildMask(8, 4));
  const initializedRef = useRef(false);

  const K = useMemo(() => {
    let value = Math.round(N * R);
    value = Math.max(1, Math.min(value, N - 1));
    return value;
  }, [N, R]);

  useEffect(() => {
    setLlr(buildLlr(N));
    setMask(buildMask(N, K));
  }, [N, K]);

  const submitCurrent = () => {
    onSubmit({
      N,
      llr: parseNumberArray(llr),
      mask: parseNumberArray(mask),
      design_ebn0_db: designEbN0Mask,
      channel_ebn0_db: channelEbN0,
      channel_mode: channelMode,
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
      <SidebarPanelTitle>Parametre</SidebarPanelTitle>

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

      <ControlGroup title="Návrhové Eb/N0 pre masku (dB)">
        <input
          type="range"
          min="0"
          max="6"
          step="0.25"
          value={designEbN0Mask}
          onChange={(e) => setDesignEbN0Mask(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={sliderValueStyle}>{designEbN0Mask.toFixed(2)}</div>
      </ControlGroup>

      <ControlGroup title="Eb/N0 kanála (dB)">
        <input
          type="range"
          min="0"
          max="6"
          step="0.25"
          value={channelEbN0}
          onChange={(e) => setChannelEbN0(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={sliderValueStyle}>{channelEbN0.toFixed(2)}</div>
      </ControlGroup>

      <ControlGroup title="Režim kanála">
        <label style={radioRowStyle}>
          <input
            type="radio"
            checked={channelMode === "ideal"}
            onChange={() => setChannelMode("ideal")}
          />
          <span>Bez šumu (ideálne)</span>
        </label>
        <label style={radioRowStyle}>
          <input
            type="radio"
            checked={channelMode === "awgn"}
            onChange={() => setChannelMode("awgn")}
          />
          <span>AWGN (so šumom)</span>
        </label>
      </ControlGroup>

      <ControlGroup title={`LLR (${N} hodnôt, oddelené čiarkou)`}>
        <textarea
          value={llr}
          onChange={(e) => setLlr(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
      </ControlGroup>

      <ControlGroup title={`Mask (${N} hodnôt 0/1)`}>
        <textarea
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          rows={3}
          style={textareaStyle}
        />
      </ControlGroup>

      <button
        type="button"
        onClick={submitCurrent}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Počítam..." : "Spustiť dekódovanie"}
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

const radioRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
  color: "#374151",
  fontSize: 16,
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