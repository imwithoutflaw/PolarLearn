import React, { useMemo, useState } from "react";
import AppShell from "../components/layout/AppShell.jsx";
import PageTitle from "../components/common/PageTitle.jsx";
import SidebarPanelTitle from "../components/common/SidebarPanelTitle.jsx";
import ControlGroup from "../components/common/ControlGroup.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import InfoBox from "../components/common/InfoBox.jsx";

function becPolarizationStep(values) {
  const next = [];

  for (const e of values) {
    const eMinus = 2 * e - e * e;
    const ePlus = e * e;
    next.push(eMinus, ePlus);
  }

  return next;
}

function becPolarizationLevels(epsilon, n) {
  const levels = [[epsilon]];
  let current = [epsilon];

  for (let i = 0; i < n; i += 1) {
    current = becPolarizationStep(current);
    levels.push(current);
  }

  return levels;
}

function buildNaturalRows(finalValues) {
  return finalValues.map((value, index) => ({
    index,
    epsilon: value,
    type: value < 0.5 ? "lepší / spoľahlivejší" : "horší / menej spoľahlivý",
  }));
}

function buildHistogramBins(values, binCount = 10) {
  const bins = Array.from({ length: binCount }, (_, i) => ({
    label: `${(i / binCount).toFixed(1)}–${((i + 1) / binCount).toFixed(1)}`,
    count: 0,
    x0: i / binCount,
    x1: (i + 1) / binCount,
  }));

  values.forEach((value) => {
    const idx = Math.min(binCount - 1, Math.floor(value * binCount));
    bins[idx].count += 1;
  });

  return bins;
}

function LineChartCard({
  title,
  values,
  xLabel,
  yLabel,
  sorted = false,
  normalizedX = false,
  height = 360,
}) {
  const width = 1100;
  const padding = { top: 28, right: 28, bottom: 64, left: 84 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = values.map((value, index) => {
    const xValue = normalizedX
      ? (values.length === 1 ? 0 : index / (values.length - 1))
      : index;

    return { xValue, yValue: value };
  });

  const maxX = normalizedX ? 1 : Math.max(1, values.length - 1);

  const toX = (x) => padding.left + (x / maxX) * chartWidth;
  const toY = (y) => padding.top + (1 - y) * chartHeight;

  const pathD = points
    .map((point, index) => {
      const x = toX(point.xValue);
      const y = toY(point.yValue);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const gridYs = [0, 0.2, 0.4, 0.6, 0.8, 1];

  const gridXs = normalizedX
    ? [0, 0.2, 0.4, 0.6, 0.8, 1]
    : Array.from({ length: values.length }, (_, i) => i).filter(
        (_, i, arr) => arr.length <= 16 || i % 2 === 0
      );

  return (
    <div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#374151",
          marginBottom: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          background: "#fff",
          padding: 14,
          overflowX: "auto",
        }}
      >
        <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
          {gridYs.map((tick) => (
            <g key={`gy-${tick}`}>
              <line
                x1={padding.left}
                y1={toY(tick)}
                x2={width - padding.right}
                y2={toY(tick)}
                stroke="#d1d5db"
                strokeWidth="1"
              />
              <text
                x={padding.left - 14}
                y={toY(tick) + 5}
                textAnchor="end"
                fontSize="14"
                fill="#6b7280"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}

          {gridXs.map((tick) => (
            <line
              key={`gx-${tick}`}
              x1={toX(tick)}
              y1={padding.top}
              x2={toX(tick)}
              y2={height - padding.bottom}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#6b7280"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#6b7280"
            strokeWidth="1.5"
          />

          <path
            d={pathD}
            fill="none"
            stroke="#2f6fb0"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {points.map((point, index) => (
            <circle
              key={index}
              cx={toX(point.xValue)}
              cy={toY(point.yValue)}
              r="5.5"
              fill="#2f6fb0"
            />
          ))}

          {gridXs.map((tick) => (
            <text
              key={`xt-${tick}`}
              x={toX(tick)}
              y={height - padding.bottom + 24}
              textAnchor="middle"
              fontSize="14"
              fill="#6b7280"
            >
              {normalizedX ? tick.toFixed(1) : tick}
            </text>
          ))}

          <text
            x={width / 2}
            y={height - 14}
            textAnchor="middle"
            fontSize="16"
            fill="#374151"
          >
            {xLabel}
          </text>

          <text
            x={26}
            y={height / 2}
            textAnchor="middle"
            fontSize="16"
            fill="#374151"
            transform={`rotate(-90 26 ${height / 2})`}
          >
            {yLabel}
          </text>
        </svg>
      </div>
    </div>
  );
}

function HistogramCard({ title, bins }) {
  const width = 1100;
  const height = 340;
  const padding = { top: 28, right: 28, bottom: 64, left: 84 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxCount = Math.max(1, ...bins.map((b) => b.count));
  const barWidth = chartWidth / bins.length;

  const toY = (v) => padding.top + (1 - v / maxCount) * chartHeight;

  const yTicks = Array.from({ length: maxCount + 1 }, (_, i) => i);

  return (
    <div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#374151",
          marginBottom: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          background: "#fff",
          padding: 14,
          overflowX: "auto",
        }}
      >
        <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={toY(tick)}
                x2={width - padding.right}
                y2={toY(tick)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding.left - 14}
                y={toY(tick) + 5}
                textAnchor="end"
                fontSize="14"
                fill="#6b7280"
              >
                {tick}
              </text>
            </g>
          ))}

          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#6b7280"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#6b7280"
            strokeWidth="1.5"
          />

          {bins.map((bin, index) => {
            const x = padding.left + index * barWidth + 10;
            const barH = height - padding.bottom - toY(bin.count);
            const y = height - padding.bottom - barH;

            return (
              <g key={bin.label}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth - 20}
                  height={barH}
                  fill="#2f6fb0"
                />
              </g>
            );
          })}

          <text
            x={width / 2}
            y={height - 14}
            textAnchor="middle"
            fontSize="16"
            fill="#374151"
          >
            Hodnota ε
          </text>

          <text
            x={26}
            y={height / 2}
            textAnchor="middle"
            fontSize="16"
            fill="#374151"
            transform={`rotate(-90 26 ${height / 2})`}
          >
            Počet podkanálov
          </text>
        </svg>
      </div>
    </div>
  );
}

function PolarizationTable({ rows }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Index podkanála</th>
            <th style={thStyle}>ε</th>
            <th style={thStyle}>Typ kanála</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.index}>
              <td style={tdStyle}>{row.index}</td>
              <td style={tdStyle}>{row.epsilon.toFixed(4)}</td>
              <td style={tdStyle}>{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PolarizationPage() {
  const [epsilon, setEpsilon] = useState(0.5);
  const [n, setN] = useState(4);
  const [showSorted, setShowSorted] = useState(true);
  const [showHistogram, setShowHistogram] = useState(true);
  const [showTable, setShowTable] = useState(true);

  const { finalValues, sortedValues, rows, histogramBins } = useMemo(() => {
    const levels = becPolarizationLevels(epsilon, n);
    const finalValues = levels[levels.length - 1];
    const sortedValues = [...finalValues].sort((a, b) => a - b);
    const rows = buildNaturalRows(finalValues);
    const histogramBins = buildHistogramBins(finalValues, 10);

    return {
      finalValues,
      sortedValues,
      rows,
      histogramBins,
    };
  }, [epsilon, n]);

  const goodCount = rows.filter((row) => row.epsilon < 0.5).length;
  const badCount = rows.length - goodCount;

  const sidebarControls = (
    <div>
      <SidebarPanelTitle>Parametre</SidebarPanelTitle>

      <ControlGroup title="Pravdepodobnosť vymazania ε">
        <input
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          value={epsilon}
          onChange={(e) => setEpsilon(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={sliderValueStyle}>{epsilon.toFixed(2)}</div>
      </ControlGroup>

      <ControlGroup title="Počet úrovní polarizácie n">
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={sliderValueStyle}>{n}</div>
      </ControlGroup>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        <label style={checkStyle}>
          <input
            type="checkbox"
            checked={showSorted}
            onChange={(e) => setShowSorted(e.target.checked)}
          />
          <span>Zobraziť zoradené hodnoty</span>
        </label>

        <label style={checkStyle}>
          <input
            type="checkbox"
            checked={showHistogram}
            onChange={(e) => setShowHistogram(e.target.checked)}
          />
          <span>Zobraziť histogram</span>
        </label>

        <label style={checkStyle}>
          <input
            type="checkbox"
            checked={showTable}
            onChange={(e) => setShowTable(e.target.checked)}
          />
          <span>Zobraziť tabuľku hodnôt</span>
        </label>
      </div>
    </div>
  );

  return (
    <AppShell sidebarControls={sidebarControls}>
      <PageTitle
        title="Channel polarization demo (BEC)"
        description="Táto časť ukazuje princíp polarizácie kanálov na príklade BEC (Binary Erasure Channel)."
      />

      <div
        style={{
          fontSize: 17,
          lineHeight: 1.8,
          color: "#374151",
          marginBottom: 20,
          maxWidth: 1200,
        }}
      >
        Pre základný kanál s pravdepodobnosťou vymazania <strong>ε</strong> vznikajú po jednom kroku dva podkanály:
        <ul style={{ marginTop: 10, marginBottom: 10 }}>
          <li>horší podkanál: <strong>ε⁻ = 2ε - ε²</strong></li>
          <li>lepší podkanál: <strong>ε⁺ = ε²</strong></li>
        </ul>
        Po opakovaní tejto transformácie sa podkanály postupne polarizujú: niektoré sú veľmi spoľahlivé
        (<strong>ε blízko 0</strong>), iné veľmi nespoľahlivé (<strong>ε blízko 1</strong>).
      </div>

      <div style={{ display: "grid", gap: 34 }}>
        <div>
          <SectionTitle>Základné informácie</SectionTitle>
          <InfoBox>
            Počet výsledných podkanálov: <strong>N = 2^{n} = {2 ** n}</strong>. Pri ε = {epsilon.toFixed(2)} sa po {n} úrovniach vytvorí {2 ** n} syntetizovaných podkanálov.
          </InfoBox>
        </div>

        <div>
          <SectionTitle>Výsledné hodnoty podkanálov</SectionTitle>
          <LineChartCard
            title="Podkanály po polarizácii (prirodzené poradie)"
            values={finalValues}
            xLabel="Index podkanála"
            yLabel="Hodnota ε"
          />
        </div>

        {showSorted && (
          <div>
            <SectionTitle>Zoradené hodnoty podkanálov</SectionTitle>
            <LineChartCard
              title="Zoradené hodnoty ε po polarizácii"
              values={sortedValues}
              xLabel="Normalizovaný index"
              yLabel="Hodnota ε"
              sorted
              normalizedX
            />
          </div>
        )}

        {showHistogram && (
          <div>
            <SectionTitle>Histogram hodnôt</SectionTitle>
            <HistogramCard
              title="Histogram výsledných hodnôt ε"
              bins={histogramBins}
            />
          </div>
        )}

        {showTable && (
          <div>
            <SectionTitle>Tabuľka výsledných podkanálov</SectionTitle>
            <PolarizationTable rows={rows} />
          </div>
        )}

        <div>
          <SectionTitle>Stručné vysvetlenie</SectionTitle>

          <div
            style={{
              padding: "18px 20px",
              borderRadius: 18,
              background: "#e8f5e9",
              border: "1px solid #c8e6c9",
              color: "#2e7d32",
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 22,
            }}
          >
            Po polarizácii vzniklo <strong>{goodCount} lepších</strong> a <strong>{badCount} horších</strong> podkanálov (pri hranici ε = 0.5).
          </div>

          <div style={{ color: "#374151", fontSize: 17, lineHeight: 1.8 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>
              Ako tomu rozumieť?
            </div>

            <ul style={{ marginTop: 0, paddingLeft: 24 }}>
              <li>Hodnoty <strong>blízko 0</strong> znamenajú, že podkanál je <strong>spoľahlivý</strong>.</li>
              <li>Hodnoty <strong>blízko 1</strong> znamenajú, že podkanál je <strong>nespoľahlivý</strong>.</li>
              <li>S rastúcim počtom úrovní <strong>n</strong> sa hodnoty čoraz viac rozdeľujú k extrémom 0 a 1.</li>
            </ul>

            <div style={{ marginTop: 16 }}>
              Práve tento jav je základom polárnych kódov: na prenos informačných bitov sa vyberajú len tie <strong>najspoľahlivejšie podkanály</strong>.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f8fafc",
  color: "#6b7280",
  fontSize: 15,
};

const tdStyle = {
  padding: "14px 16px",
  borderBottom: "1px solid #eef2f7",
  color: "#374151",
  fontSize: 15,
};

const sliderValueStyle = {
  marginTop: 8,
  color: "#ef4444",
  fontWeight: 700,
  fontSize: 15,
};

const checkStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#374151",
  fontSize: 16,
};