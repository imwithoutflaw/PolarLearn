import React from "react";

export default function BerInterpretation({ result }) {
  if (!result) return null;

  const sortedSeries = [...result.series].sort((a, b) => a.N - b.N);
  const codeSummary = sortedSeries.map((item) => `N=${item.N}, K=${item.K}`).join(" • ");

  return (
    <div style={{ lineHeight: 1.7, fontSize: 17, color: "#333" }}>
      <p style={{ marginTop: 0 }}>
        Porovnanie zahŕňa simulované BER krivky pre viaceré dĺžky polárneho kódu
        a referenčnú teoretickú BER krivku nekódovaného BPSK prenosu v AWGN kanáli.
      </p>

      <p>
        Simulované konfigurácie: <strong>{codeSummary}</strong>.
      </p>

      <p style={{ marginBottom: 0 }}>
        Každý bod bol odhadnutý pomocou stopping kritéria založeného na spracovaní
        cieľového počtu bitov alebo nazbieraní minimálneho počtu chýb pre
        spoľahlivejšie vykreslenie bodu.
      </p>
    </div>
  );
}