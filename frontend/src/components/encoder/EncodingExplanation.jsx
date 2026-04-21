import React from "react";
import SectionTitle from "../common/SectionTitle.jsx";
import InfoBox from "../common/InfoBox.jsx";

export default function EncodingExplanation({ result }) {
  if (!result) return null;

  return (
    <div>
      <SectionTitle>Stručné vysvetlenie</SectionTitle>

      <InfoBox>
        {result.explanation ||
          "Najprv sa vytvorí u-vektor, kde informačné bity obsadia spoľahlivé pozície a frozen pozície ostanú nulové. Následne sa vykoná polárna transformácia po stage-och, až kým nevznikne výsledné kódové slovo."}
      </InfoBox>
    </div>
  );
}