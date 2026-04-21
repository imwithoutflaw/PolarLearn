import React from "react";

export default function BerInterpretation({ result }) {
  if (!result) return null;

  const sortedSeries = [...result.series].sort((a, b) => a.N - b.N);
  const codeSummary = sortedSeries.map((item) => `N=${item.N}, K=${item.K}`).join(" • ");

  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 18,
        background: "#fff",
        padding: 18,
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 26 }}>Stručné zhodnotenie</h2>

      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
        Porovnanie zahŕňa simulované BER krivky pre viaceré dĺžky polárneho kódu
        a referenčnú teoretickú BER krivku nekódovaného BPSK prenosu v AWGN kanáli.
      </p>

      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
        Simulované konfigurácie: <strong>{codeSummary}</strong>.
      </p>

      <p style={{ lineHeight: 1.6, marginBottom: 0 }}>
        Každý bod bol odhadnutý pomocou stopping kritéria založeného na spracovaní
        cieľového počtu bitov alebo nazbieraní minimálneho počtu chýb pre
        spoľahlivejšie vykreslenie bodu.
      </p>
    </div>
  );
}