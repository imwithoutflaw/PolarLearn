import React, { useState } from "react";

export default function BerSidebarControls({ onSubmit, loading }) {
  const [NList, setNList] = useState([8, 16, 32]);
  const [R, setR] = useState(0.5);

  const handleRun = () => {
    onSubmit({
      codes: NList.map((N) => ({
        N,
        K: Math.round(N * R),
      })),
      ebn0_start: 0,
      ebn0_end: 6,
      ebn0_step: 0.5,
      bits_target: 100000,
    });
  };

  return (
    <div>
      <button onClick={handleRun} disabled={loading}>
        Spustiť simuláciu
      </button>
    </div>
  );
}