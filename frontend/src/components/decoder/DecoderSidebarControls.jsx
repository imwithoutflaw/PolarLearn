import React, { useEffect, useMemo, useRef, useState } from "react";
import ControlGroup from "../common/ControlGroup.jsx";
import SidebarPanelTitle from "../common/SidebarPanelTitle.jsx";
import { constructMask } from "../../api/maskApi.js";

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
  return Array(N).fill(0).join(", ");
}

function parseNumberArray(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map(Number);
}

function polarEncode(u) {
  const x = [...u];
  let step = 1;

  while (step < x.length) {
    const blockSize = step * 2;

    for (let start = 0; start < x.length; start += blockSize) {
      for (let i = 0; i < step; i += 1) {
        x[start + i] = x[start + i] ^ x[start + i + step];
      }
    }

    step *= 2;
  }

  return x;
}

function gaussianNoise(sigma) {
  const u1 = Math.random() || 1e-12;
  const u2 = Math.random() || 1e-12;

  return (
    sigma *
    Math.sqrt(-2 * Math.log(u1)) *
    Math.cos(2 * Math.PI * u2)
  );
}

function ebn0DbToLinear(ebn0Db) {
  return 10 ** (ebn0Db / 10);
}

function computeSigma(ebn0Db, rate) {
  const ebn0Linear = ebn0DbToLinear(ebn0Db);
  return Math.sqrt(1 / (2 * rate * ebn0Linear));
}

function generateChannelLlr(codeword, ebn0Db, rate, mode) {
  if (mode === "ideal") {
    return codeword.map((bit) => (bit === 0 ? 50 : -50));
  }

  const sigma = computeSigma(ebn0Db, rate);

  return codeword.map((bit) => {
    const x = bit === 0 ? 1 : -1;
    const y = x + gaussianNoise(sigma);
    const llr = (2 * y) / (sigma * sigma);

    return Number(llr.toFixed(4));
  });
}

export default function DecoderSidebarControls({ onSubmit, loading }) {
  const [N, setN] = useState(8);
  const [R, setR] = useState(0.5);
  const [designEbN0Mask, setDesignEbN0Mask] = useState(2.0);
  const [channelEbN0, setChannelEbN0] = useState(2.0);
  const [channelMode, setChannelMode] = useState("ideal");
  const [maskMode, setMaskMode] = useState("auto");
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

  const submitCurrent = async () => {
    let maskArr;

    if (maskMode === "auto") {
      const maskResponse = await constructMask({
        N,
        K,
        design_ebn0_db: designEbN0Mask,
      });

      maskArr = maskResponse.mask;
      setMask(maskArr.join(", "));
    } else {
      maskArr = parseNumberArray(mask);
    }

    const originalBits = maskArr
      .map((m) => (m === 1 ? (Math.random() < 0.5 ? 0 : 1) : null))
      .filter((v) => v !== null);

    let infoIndex = 0;

    const u = maskArr.map((m) => {
      if (m === 1) {
        return originalBits[infoIndex++];
      }
      return 0;
    });

    const codeword = polarEncode(u);
    const rate = K / N;

    const generatedLLR = generateChannelLlr(
      codeword,
      channelEbN0,
      rate,
      channelMode
    );

    setLlr(generatedLLR.join(", "));

    onSubmit({
      N,
      llr: generatedLLR,
      mask: maskArr,
      original_bits: originalBits,
      u_vector: u,
      codeword,
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

      <ControlGroup title="Režim masky">
        <label style={radioRowStyle}>
          <input
            type="radio"
            checked={maskMode === "auto"}
            onChange={() => setMaskMode("auto")}
          />
          <span>Automatická maska</span>
        </label>

        <label style={radioRowStyle}>
          <input
            type="radio"
            checked={maskMode === "manual"}
            onChange={() => setMaskMode("manual")}
          />
          <span>Ručná maska</span>
        </label>
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
          readOnly
        />
      </ControlGroup>

      <ControlGroup title={`Mask (${N} hodnôt 0/1)`}>
        <textarea
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          rows={3}
          style={textareaStyle}
          readOnly={maskMode === "auto"}
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
  maxWidth: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #d8dee8",
  background: "#fff",
  fontSize: 16,
};

const textareaStyle = {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
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