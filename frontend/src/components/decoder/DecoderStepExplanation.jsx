import React from "react";
import InfoBox from "../common/InfoBox.jsx";
import SectionTitle from "../common/SectionTitle.jsx";

export default function DecoderStepExplanation({ step }) {
  if (!step) return null;

  const isFrozen = step.role === "frozen" || step.type === "frozen";
  const llrValue =
    step.llr ??
    step.llr_value ??
    0;

  const bitIndex =
    step.bit_index ??
    step.index_l ??
    step.index ??
    0;

  const decision =
    step.decision ??
    0;

  let text = "";

  if (isFrozen) {
    text = `Na tomto kroku sa spracúva frozen bit s indexom ${bitIndex}. Keďže ide o frozen bit, jeho hodnota je pevne určená na 0 bez ohľadu na LLR.`;
  } else {
    const signText = llrValue >= 0 ? "kladná" : "záporná";
    text = `Na tomto kroku sa dekóduje informačný bit s indexom ${bitIndex}. Hodnota LLR je ${Number(llrValue).toFixed(4)}, teda je ${signText}. Preto dekóder rozhodol hodnotu ${decision}.`;
  }

  return (
    <div>
      <SectionTitle>Opis aktuálneho kroku</SectionTitle>
      <InfoBox>{text}</InfoBox>
    </div>
  );
}