import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function buildChartData(result) {
  if (!result) return [];

  const sortedEbn0 = [...result.ebn0_points_db].sort((a, b) => a - b);

  return sortedEbn0.map((ebn0) => {
    const row = { ebn0_db: ebn0 };

    result.series.forEach((seriesItem) => {
      const point = seriesItem.results.find((item) => item.ebn0_db === ebn0);
      row[`N=${seriesItem.N}, K=${seriesItem.K}, R≈${seriesItem.rate.toFixed(2)}`] =
        point ? point.ber : null;
    });

    const theoryPoint = result.theoretical_uncoded_bpsk.find(
      (item) => item.ebn0_db === ebn0
    );
    row["Teoretická BER (nekódovaný BPSK)"] = theoryPoint ? theoryPoint.ber : null;

    return row;
  });
}

function formatYAxis(value) {
  if (value === null || value === undefined || Number.isNaN(value) || value <= 0) {
    return "";
  }

  const exponent = Math.log10(value);
  const rounded = Math.round(exponent);

  if (Math.abs(exponent - rounded) < 1e-9) {
    return `10^${rounded}`;
  }

  return "";
}

function formatTooltipValue(value) {
  if (value === null || value === undefined) {
    return "not enough errors";
  }
  return Number(value).toExponential(3);
}

const SERIES_COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd", "#8c564b"];

export default function BerChart({ result }) {
  if (!result) return null;

  const data = buildChartData(result);

  return (
    <>
      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 26 }}>
        BER polárnych kódov pri SC dekódovaní
      </h2>

      <div style={{ width: "100%", height: 520 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 24, left: 24, bottom: 20 }}
          >
            <CartesianGrid stroke="#b0b0b0" strokeDasharray="3 3" />

            <XAxis
              dataKey="ebn0_db"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickCount={7}
              label={{ value: "Eb/N0 (dB)", position: "insideBottom", offset: -8 }}
            />

            <YAxis
              type="number"
              scale="log"
              domain={[1e-4, 2e-1]}
              tickFormatter={formatYAxis}
              label={{ value: "BER", angle: -90, position: "insideLeft" }}
            />

            <Tooltip formatter={formatTooltipValue} />
            <Legend />

            {result.series.map((seriesItem, index) => (
              <Line
                key={seriesItem.N}
                type="linear"
                dataKey={`N=${seriesItem.N}, K=${seriesItem.K}, R≈${seriesItem.rate.toFixed(2)}`}
                stroke={SERIES_COLORS[index % SERIES_COLORS.length]}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                connectNulls={false}
                isAnimationActive={false}
              />
            ))}

            <Line
              type="linear"
              dataKey="Teoretická BER (nekódovaný BPSK)"
              stroke="#d62728"
              strokeWidth={3}
              strokeDasharray="6 4"
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}