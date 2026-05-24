import React from "react";
import InfoBox from "../common/InfoBox.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function DecoderStepExplanation({ step }) {
  if (!step) return null;

  const { t, language } = useLanguage();

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
    text =
      language === "sk"
        ? `Na tomto kroku sa spracúva frozen bit s indexom ${bitIndex}. Keďže ide o frozen bit, jeho hodnota je pevne určená na 0 bez ohľadu na LLR.`
        : `At this step, a frozen bit with index ${bitIndex} is processed. Since it is a frozen bit, its value is fixed to 0 regardless of the LLR value.`;
  } else {
    const signText =
      language === "sk"
        ? llrValue >= 0
          ? "kladná"
          : "záporná"
        : llrValue >= 0
        ? "positive"
        : "negative";

    text =
      language === "sk"
        ? `Na tomto kroku sa dekóduje informačný bit s indexom ${bitIndex}. Hodnota LLR je ${Number(llrValue).toFixed(4)}, teda je ${signText}. Preto dekóder rozhodol hodnotu ${decision}.`
        : `At this step, an information bit with index ${bitIndex} is decoded. The LLR value is ${Number(llrValue).toFixed(4)}, therefore it is ${signText}. The decoder therefore decided the value ${decision}.`;
  }

  return (
    <div>
      <SectionTitle>{t("currentStepDescription")}</SectionTitle>

      <InfoBox>{text}</InfoBox>
    </div>
  );
}